package partypeople.server;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import partypeople.server.companion.dto.CompanionDto;
import partypeople.server.member.dto.FollowDto;
import partypeople.server.review.dto.ReviewDto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;

public class InitDb {
    public static CompanionDto.ResponseMember response1 = CompanionDto.ResponseMember.builder()
                    .companionId(1L)
                    .address("일본 유니버셜스튜디오")
                    .lng(123.45678)
                    .lat(123.45678)
                    .date(LocalDate.of(2023, 3, 20))
                    .companionStatus(false)
                    .build();

    public static CompanionDto.ResponseMember response2 = CompanionDto.ResponseMember.builder()
            .companionId(2L)
            .address("한국 주소")
            .lng(123.45678)
            .lat(123.45678)
            .date(LocalDate.of(2023, 3, 20))
            .companionStatus(false)
            .build();

    public static CompanionDto.ResponseMember response3 = CompanionDto.ResponseMember.builder()
            .companionId(3L)
            .address("영국 주소")
            .lng(123.45678)
            .lat(123.45678)
            .date(LocalDate.of(2023, 3, 20))
            .companionStatus(false)
            .build();


    public static ReviewDto.Response review1 = new ReviewDto.Response(1,"GOOD");
    public static ReviewDto.Response review2 = new ReviewDto.Response(0,"SO-SO");
    public static ReviewDto.Response review3 = new ReviewDto.Response(-1,"BAD");

    public static FollowDto.FollowerResponse follow1 = FollowDto.FollowerResponse.builder()
            .memberId(1L)
            .nickname("nickname1")
            .profile("profile1")
            .build();
    public static FollowDto.FollowerResponse follow2 = FollowDto.FollowerResponse.builder()
            .memberId(2L)
            .nickname("nickname2")
            .profile("profile2")
            .build();
    public static FollowDto.FollowerResponse follow3 = FollowDto.FollowerResponse.builder()
            .memberId(3L)
            .nickname("nickname3")
            .profile("profile3")
            .build();

    public static FollowDto.FollowingResponse follow4 = FollowDto.FollowingResponse.builder()
            .memberId(1L)
            .nickname("nickname1")
            .profile("profile1")
            .build();
    public static FollowDto.FollowingResponse follow5 = FollowDto.FollowingResponse.builder()
            .memberId(2L)
            .nickname("nickname2")
            .profile("profile2")
            .build();
    public static FollowDto.FollowingResponse follow6 = FollowDto.FollowingResponse.builder()
            .memberId(3L)
            .nickname("nickname3")
            .profile("profile3")
            .build();

}
