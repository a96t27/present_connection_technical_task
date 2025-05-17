using Microsoft.EntityFrameworkCore;
namespace backend;

public class GroupContext : DbContext
{
    public GroupContext(DbContextOptions<GroupContext> options)
        : base(options)
    {
    }

    public DbSet<Group> Groups { get; set; } = null!;
    public DbSet<Member> Members { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Group>()
            .HasMany(g => g.Members)
            .WithOne(m => m.Group)
            .HasForeignKey(m => m.GroupId)
            .IsRequired();
    }
}
