using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace backend;

[ApiController]
[Route("/api/groups/{groupId}/[controller]")]
public class MembersController : ControllerBase
{
    private readonly GroupContext _context;
    private readonly IMapper _mapper;
    public MembersController(GroupContext context, IMapper mapper)
    {
        this._context = context;
        this._mapper = mapper;
    }
    [HttpPost]
    public ActionResult<MemberDT> Post(int groupId, [FromBody] PostMemberDT dto)
    {
        var group = this._context.Groups
            .Include(g => g.Members)
            .FirstOrDefault(g => g.Id == groupId);
        if (group == null)
        {
            return NotFound($"Group {groupId} not found.");
        }
        if (group.Members.Any(m => m.Name == dto.Name))
        {
            return Conflict($"Member with name {dto.Name} already exists in group.");
        }
        var member = new Member
        {
            Name = dto.Name,
            GroupId = groupId
        };
        this._context.Members.Add(member);
        this._context.SaveChanges();

        var result = this._mapper.Map<MemberDT>(member);

        return CreatedAtAction(nameof(Post), new { groupId }, result);
    }
}
