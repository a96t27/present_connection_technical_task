namespace backend;

public class Transaction
{
    public int Id { get; set; }
    public int GroupId { get; set; }
    public string Title { get; set; } = null!;
    public double Amount { get; set; }
    public int PaidByMemberId { get; set; }
    public SplitType SplitType { get; set; }
    public IEnumerable<TransactionSplit> Splits { get; set; } = null!;
    public DateTime CrationTime { get; set; } = DateTime.UtcNow;
}

public class TransactionSplit
{
    public int Id { get; set; }
    public int TransactionID { get; set; }
    public int MemberId { get; set; }
    public double AmountOwed { get; set; }
}

public enum SplitType
{
    Equal,
    Percentage,
    Dynamic,
}
