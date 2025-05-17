namespace backend;

public class Group
{
    public int Id { set; get; }
    public string Title { set; get; }
    public Group(string title)
    {
        this.Title = title;
    }
}
