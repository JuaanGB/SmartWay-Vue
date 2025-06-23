namespace TodoApi.Models;

public class TodoItem
{
    public long Id { get; set; }
    public string? Name { get; set; }
    /* Los atributos con ? indican que están ocultos para el usuario u omitirlo para disminuir carga útil
    Se crea un clase ${clase}DTO que es la que verá el usuario, que omite esos atributos ocultos
    */
    public bool IsComplete { get; set; }
    public string? Secreto { get; set; }
}