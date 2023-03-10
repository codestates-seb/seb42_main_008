package partypeople.server.member.dto;

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
}
