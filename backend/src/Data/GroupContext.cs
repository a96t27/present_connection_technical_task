using Microsoft.EntityFrameworkCore;
namespace backend;

public class GroupContext : DbContext
{
    public GroupContext(DbContextOptions<GroupContext> options)
        : base(options)
    {
    }
    public DbSet<Group> Groups { get; set; }
}
