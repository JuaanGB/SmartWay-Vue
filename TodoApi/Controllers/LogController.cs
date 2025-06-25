using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;


namespace TodoApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LogController : ControllerBase
{

    private readonly TodoContext _context;

    public LogController(TodoContext context)
    {
        _context = context;
    }

    // GET: api/Log
    [HttpGet]
    public async Task<ActionResult<IEnumerable<string>>> GetLogItems()
    {
        return await _context.LogInfos
            .Select(x => "[" + x.Fecha.ToString("dd-MM-yyyy HH:mm:ss") + "]: " + x.Info + "\n")
            .ToListAsync();
    }

    
}