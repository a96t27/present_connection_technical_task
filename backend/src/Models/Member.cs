namespace backend;

public class Member
{
    public int Id { get; set; }
    public String Name { get; set; } = null!;
    public double Debt { get; set; }
    public int GroupId { get; set; }
    public Group Group { get; set; } = null!;
}
