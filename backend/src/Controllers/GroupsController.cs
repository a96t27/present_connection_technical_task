using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace backend;

[ApiController]
[Route("/api/[controller]")]
public class GroupsController : ControllerBase
{
    private string[] Title { set; get; } = new[] { "First group", "Second group", "Last group" };
    private readonly GroupContext _context;
    private readonly IMapper _mapper;

    public GroupsController(GroupContext context, IMapper mapper)
    {
        this._context = context;
        this._mapper = mapper;
    }

    [HttpGet]
    public IEnumerable<GroupSumDT> Get()
    {
        var groups = this._context.Groups.ToList();
        var dtos = this._mapper.Map<List<GroupSumDT>>(groups);
        return dtos;
    }

    [HttpPost]
    public ActionResult<GroupSumDT> Post(PostGroupDT dto)
    {
        var group = this._mapper.Map<Group>(dto);
        this._context.Groups.Add(group);
        this._context.SaveChanges();
        var result = this._mapper.Map<GroupSumDT>(group);
        return CreatedAtAction(nameof(Get), new { id = group.Id }, result);
    }

    [HttpGet("{id}", Name = "GetGroupById")]
    public ActionResult<GroupDT> GetGroupById(int id)
    {
        var group = this._context.Groups
            .Include(g => g.Members)
            .FirstOrDefault(g => g.Id == id);

        if (group == null)
        {
            return NotFound();

        }
        var groupDTO = this._mapper.Map<GroupDT>(group);
        return Ok(groupDTO);
    }
}
