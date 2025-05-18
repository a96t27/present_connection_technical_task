namespace backend;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

[ApiController]
[Route("/api/groups/{groupId}/[controller]")]
public class TransactionsController : ControllerBase
{
    private readonly GroupContext _context;
    private readonly IMapper _mapper;
    public TransactionsController(GroupContext context, IMapper mapper)
    {
        this._context = context;
        this._mapper = mapper;
    }

    [HttpPost]
    public ActionResult Post(int groupId, [FromBody] PostTransactionDT dto)
    {
        var group = _context.Groups
            .Include(g => g.Members)
            .FirstOrDefault(g => g.Id == groupId);

        if (group == null)
        {
            return NotFound("$Group {groupId} not found.");
        }

        if (!group.Members.Any(m => m.Id == dto.PaidByMemberId))
        {
            return BadRequest($"Member with id {dto.PaidByMemberId} is not member of this group.");
        }

        var members = group.Members
            .Where(m => m.Id != dto.PaidByMemberId)
            .ToList();
        var splits = new List<TransactionSplit>();
        switch (dto.SplitType)
        {
            case SplitType.Equal:
                if (members.Count == 0)
                {
                    return BadRequest("No other members to split with.");
                }
                var equalAmount = Math.Round(dto.Amount / (members.Count + 1), 2);
                foreach (var member in members)
                {
                    splits.Add(new TransactionSplit
                    {
                        MemberId = member.Id,
                        AmountOwed = equalAmount
                    });
                }
                break;
            default:
                return BadRequest("Unsupported split type.");
        }

        var transaction = new Transaction
        {
            GroupId = groupId,
            Title = dto.Title,
            Amount = dto.Amount,
            PaidByMemberId = dto.PaidByMemberId,
            SplitType = dto.SplitType,
            Splits = splits
        };
        this._context.Transactions.Add(transaction);
        this._context.SaveChanges();

        return CreatedAtAction(nameof(Get),
        new { groupId, transactionId = transaction.Id },
        new { transaction.Id });
    }

    [HttpGet]
    public ActionResult Get(int groupId)
    {
        var transactions = this._context.Transactions
            .Include(t => t.Splits);

        if (transactions == null)
        {
            return NotFound();
        }
        return Ok(transactions);
    }

    [HttpGet("{transactionId}")]
    public ActionResult Get(int groupId, int transactionId)
    {
        var transaction = this._context.Transactions
            .Include(t => t.Splits)
            .FirstOrDefault(t => t.Id == transactionId && t.GroupId == groupId);
        if (transaction == null)
        {
            return NotFound("Transaction not found");
        }
        return Ok(transaction);
    }
}
