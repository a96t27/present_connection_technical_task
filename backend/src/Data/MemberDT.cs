namespace backend;

public class MemberDT
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public float Debt { get; set; }
}

public class PostMemberDT
{
    public string Name { get; set; } = null!;
}
