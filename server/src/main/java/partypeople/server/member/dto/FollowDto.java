package partypeople.server.member.dto;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class FollowDto {
    @Getter
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
}
