using Microsoft.AspNetCore.Mvc;
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
    public IEnumerable<GroupDT> Get()
    {
        var groups = this._context.Groups.ToList();
        var dtos = this._mapper.Map<List<GroupDT>>(groups);
        return dtos;
    }

    [HttpPost]
    public ActionResult<GroupDT> Post(PostGroupDT dto)
    {
        var group = this._mapper.Map<Group>(dto);
        this._context.Groups.Add(group);
        this._context.SaveChanges();
        var result = this._mapper.Map<GroupDT>(group);
        return CreatedAtAction(nameof(Get), new { id = group.Id }, result);
    }
}
