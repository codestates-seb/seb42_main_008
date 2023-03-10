package partypeople.server.member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import partypeople.server.dto.MultiResponseDto;
import partypeople.server.dto.SingleResponseDto;
import partypeople.server.member.dto.MemberDto;
import partypeople.server.member.entity.Member;
import partypeople.server.member.mapper.MemberMapper;
import partypeople.server.member.service.MemberService;
import partypeople.server.utils.UriCreator;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@CrossOrigin
@RestController
@Validated
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberService memberService;
    private final MemberMapper memberMapper;

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = memberMapper.memberPostToMember(requestBody);

        Member createdMember = memberService.createMember(member);
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") long memberId) {
        Member member = memberService.findMember(memberId);

        return ResponseEntity.ok(
                new SingleResponseDto<>(memberMapper.membertoMemberResponse(member)));
    }

    @GetMapping
    public ResponseEntity getMembers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size,
                                     @RequestParam String sortBy,
                                     @RequestParam String sortDir) {
        Page<Member> pageMembers = memberService.findMembers(page - 1, size, sortBy, sortDir);
        List<Member> members = pageMembers.getContent();

        return ResponseEntity.ok(
                new MultiResponseDto<>(memberMapper.membersToMemberResponses(members), pageMembers)
        );
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") long memberId,
                                      @RequestBody MemberDto.Patch requestBody) {
        requestBody.setMemberId(memberId);
        Member member = memberMapper.memberPatchToMember(requestBody);

        Member updatedMember = memberService.updateMember(member);

        return ResponseEntity.ok(
                new SingleResponseDto<>(memberMapper.membertoMemberResponse(updatedMember)));
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") long memberId,
                                       @RequestBody MemberDto.Password password) {
        memberService.deleteMember(memberId,password.getPassword());
        return ResponseEntity.noContent().build();
    }

}
