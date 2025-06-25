using Microsoft.EntityFrameworkCore;

namespace TodoApi.Models;

public class TodoContext : DbContext
{
    public TodoContext(DbContextOptions<TodoContext> options)
        : base(options)
    {
    }

    // Cada public aqui es una tabla sql
    public DbSet<TodoItem> TodoItems { get; set; } = null!;
    public DbSet<LogInfo> LogInfos { get; set; } = null!;
}