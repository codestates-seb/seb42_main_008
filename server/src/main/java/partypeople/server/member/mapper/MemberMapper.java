package partypeople.server.member.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import partypeople.server.member.dto.MemberDto;
import partypeople.server.member.entity.Member;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPostToMember(MemberDto.Post requestBody);

    Member memberPatchToMember(MemberDto.Patch requestBody);

    MemberDto.Response membertoMemberResponse(Member member);

    List<MemberDto.Response> membersToMemberResponses(List<Member> members);
}
