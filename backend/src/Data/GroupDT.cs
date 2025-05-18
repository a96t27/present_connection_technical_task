namespace backend;

public class GroupDT
{
    public int Id { set; get; }
    public string Title { get; set; } = null!;
    public IEnumerable<MemberDT> Members { get; set; } = null!;
    public IEnumerable<Transaction> Transactions { get; set; } = null!;
}

public class GroupSumDT
{
    public int Id { set; get; }
    public string Title { get; set; } = null!;
    public double Debt { get; set; }
}

public class PostGroupDT
{
    public string Title { get; set; } = null!;
}
