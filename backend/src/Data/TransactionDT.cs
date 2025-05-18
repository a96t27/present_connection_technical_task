namespace backend;

public class PostTransactionDT
{
    public String Title { get; set; } = null!;
    public double Amount { get; set; }
    public int PaidByMemberId { get; set; }
    public SplitType SplitType { get; set; }
    public IEnumerable<PostTransactionSplitDT> Splits { get; set; } = null!;
}

public class PostTransactionSplitDT
{
    public int MemberId { get; set; }
    public double Value { get; set; }
}
