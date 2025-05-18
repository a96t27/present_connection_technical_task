namespace backend;
using AutoMapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Group, GroupDT>();
        CreateMap<Group, GroupSumDT>()
            .ForMember(dest => dest.Debt,
            opt => opt.MapFrom(src => src.Members.Sum(m => m.Debt)));
        CreateMap<PostGroupDT, Group>();
        CreateMap<Member, MemberDT>();
    }
}
