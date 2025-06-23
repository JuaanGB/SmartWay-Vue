

public class TodoItemDTO
{
    public long Id { get; set; }
    public string? Titulo { get; set; }
    /* Los atributos con ? indican que están ocultos para el usuario u omitirlo para disminuir carga útil
    Se crea un clase ${clase}DTO que es la que verá el usuario, que omite esos atributos ocultos
    */
    public string? Descripcion { get; set; }
    public bool Completa { get; set; }

}