using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TodoApi.Models;
using System.Text.Json;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;

namespace TodoApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TodoItemsController : ControllerBase
{
    /* La base de datos es de TodoItem, pero yo quiero mostrar y devolver TodoItemDTO, así que necesito un
    método que dado un TodoItem me devuelva un TodoItemDTO (para no tener acceso a esos atributos)
    */
    private readonly TodoContext _context;

    public TodoItemsController(TodoContext context)
    {
        _context = context;
    }

    // GET: api/TodoItems
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoItemDTO>>> GetTodoItems()
    {
        return await _context.TodoItems
            .OrderBy(x => x.Id)
            .Select(x => ItemToDTO(x))
            .ToListAsync();
    }

    // GET: api/TodoItems/5
    // <snippet_GetByID>
    [HttpGet("{id}")]
    public async Task<ActionResult<TodoItemDTO>> GetTodoItem(long id)
    {
        var todoItem = await _context.TodoItems.FindAsync(id);

        if (todoItem == null)
        {
            return NotFound();
        }

        return ItemToDTO(todoItem);
    }
    // </snippet_GetByID>

    // PUT: api/TodoItems/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    // <snippet_Update>
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTodoItem(long id, TodoItemDTO todoDTO)
    {
        if (id != todoDTO.Id)
        {
            return BadRequest();
        }

        var todoItem = await _context.TodoItems.FindAsync(id);
        if (todoItem == null)
        {
            return NotFound();
        }

        todoItem.Titulo = todoDTO.Titulo;
        todoItem.Completa = todoDTO.Completa;
        todoItem.Descripcion = todoDTO.Descripcion;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException) when (!TodoItemExists(id))
        {
            return NotFound();
        }

        // Añadimos el log de edición
        var logInfo = new LogInfo
        {
            Fecha = DateTime.Now,
            Info = "Has editado la tarea '" + todoItem.Titulo + "'"
        };
        _context.LogInfos.Add(logInfo);
        await _context.SaveChangesAsync();

        return NoContent();
    }
    // </snippet_Update>

    [HttpPatch("{id}")]
    public async Task<IActionResult> PatchTodoItem(long id, JsonElement json)
    {
        var todoItem = await _context.TodoItems.FindAsync(id);
        if (todoItem == null)
        {
            return NotFound();
        }

        // Añadimos el log de edición
        var logInfo = new LogInfo
        { 
            Fecha = DateTime.Now
        };

        if (json.TryGetProperty("titulo", out var titulo))
        {
            var tituloNuevo = titulo.ToString();
            if (tituloNuevo != todoItem.Titulo)
            {
                logInfo.Info = "Título cambiado: " + todoItem.Titulo + " -> " + tituloNuevo;
                todoItem.Titulo = tituloNuevo;
                _context.LogInfos.Add(logInfo);
            }
            
        }
        if (json.TryGetProperty("descripcion", out var descripcion))
        {
            var descNueva = descripcion.ToString();
            if (descNueva != todoItem.Descripcion)
            {
                logInfo.Info = "Descripción alterada en tarea '" + todoItem.Titulo + "'";
                todoItem.Descripcion = descNueva;
                _context.LogInfos.Add(logInfo);
            }
        }
        if (json.TryGetProperty("completa", out var completa))
        {
            var nuevaCompleta = completa.GetBoolean();
            logInfo.Info = "Tarea '" + todoItem.Titulo + "' " + (nuevaCompleta ? "completada." : "reanudada.");
            todoItem.Completa = nuevaCompleta;
            _context.LogInfos.Add(logInfo);            
        }

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException) when (!TodoItemExists(id))
        {
            return NotFound();
        }
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // POST: api/TodoItems
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    // <snippet_Create>
    [HttpPost]
    public async Task<ActionResult<TodoItemDTO>> PostTodoItem(TodoItemDTO todoDTO)
    {
        var todoItem = new TodoItem
        {
            Completa = todoDTO.Completa,
            Titulo = todoDTO.Titulo,
            Descripcion = todoDTO.Descripcion
        };

        _context.TodoItems.Add(todoItem);
        await _context.SaveChangesAsync();

        var logInfo = new LogInfo
        {
            Fecha = DateTime.Now,
            Info = "Nueva tarea '" + todoItem.Titulo + "'."
        };
        _context.LogInfos.Add(logInfo);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetTodoItem),
            new { id = todoItem.Id },
            ItemToDTO(todoItem));
    }
    // </snippet_Create>

    // DELETE: api/TodoItems/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodoItem(long id)
    {
        var todoItem = await _context.TodoItems.FindAsync(id);
        if (todoItem == null)
        {
            return NotFound();
        }

        _context.TodoItems.Remove(todoItem);
        await _context.SaveChangesAsync();

        var logInfo = new LogInfo
        {
            Fecha = DateTime.Now,
            Info = "Tarea '" + todoItem.Titulo + "' eliminada."
        };
        _context.LogInfos.Add(logInfo);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool TodoItemExists(long id)
    {
        return _context.TodoItems.Any(e => e.Id == id);
    }

    private static TodoItemDTO ItemToDTO(TodoItem todoItem) =>
       new TodoItemDTO
       {
           Id = todoItem.Id,
           Titulo = todoItem.Titulo,
           Descripcion = todoItem.Descripcion,
           Completa = todoItem.Completa
       };
}