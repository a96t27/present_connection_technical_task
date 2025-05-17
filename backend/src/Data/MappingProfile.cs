namespace backend;
using AutoMapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Group, GroupDT>();
        CreateMap<PostGroupDT, Group>();
    }
}
