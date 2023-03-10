package partypeople.server.member.mapper;

import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import partypeople.server.member.dto.FollowDto;
import partypeople.server.member.dto.MemberDto;
import partypeople.server.member.entity.Follow;
import partypeople.server.member.entity.Member;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPostToMember(MemberDto.Post requestBody);

    Member memberPatchToMember(MemberDto.Patch requestBody);

    MemberDto.Response membertoMemberResponse(Member member);

    List<MemberDto.Response> membersToMemberResponses(List<Member> members);

    @Named("F2R1")
    @Mapping(source = "follower.memberId",target = "memberId")
    @Mapping(source = "follower.profile",target = "profile")
    @Mapping(source = "follower.nickname",target = "nickname")
    FollowDto.FollowerResponse followToFollowerResponse(Follow follow);

    @IterableMapping(qualifiedByName = "F2R1")
    List<FollowDto.FollowerResponse> followsToFollowerResponses(List<Follow> follows);

    @Named("F2R2")
    @Mapping(source = "following.memberId",target = "memberId")
    @Mapping(source = "following.profile",target = "profile")
    @Mapping(source = "following.nickname",target = "nickname")
    FollowDto.FollowingResponse followToFollowingResponse(Follow follow);

    @IterableMapping(qualifiedByName = "F2R2")
    List<FollowDto.FollowingResponse> followsToFollowingResponses(List<Follow> follows);
}
