using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class GroupsController : ControllerBase
{
    private string[] Title { set; get; } = new[] { "First group", "Second group", "Last group" };
    private readonly GroupContext _context;
    public GroupsController(GroupContext context)
    {
        this._context = context;
    }

    [HttpGet]
    public IEnumerable<Group> Get()
    {
        return _context.Groups.ToList<Group>();
        //
        // return Enumerable.Range(0, 3).Select(index => new Group(this.Title[index])).ToArray();
    }

    [HttpPost]
    public ActionResult<Group> Post(Group group)
    {
        this._context.Groups.Add(group);
        this._context.SaveChanges();
        return CreatedAtAction(nameof(Get), new { title = group.Title }, group);
    }
}
