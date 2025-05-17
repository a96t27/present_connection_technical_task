namespace backend;

public class Group
{
    public int Id { set; get; }
    public string Title { set; get; } = null!;
    public ICollection<Member> Members { get; set; } = new List<Member>();
}
