package partypeople.server.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class FollowDto {
    @Getter
    @Builder
    public static class Post {
        private Long followerId;

        private Long followingId;
    }

    @Getter
    @Builder
    public static class FollowerResponse {
        private Long memberId;

        private String profile;

        private String nickname;
    }

    @Getter
    @Builder
    public static class FollowingResponse {
        private Long memberId;

        private String profile;

        private String nickname;
    }

    @Getter
    @AllArgsConstructor
    public static class FollowerStatus {
        @Setter
        private Boolean followerStatus;
    }

}
