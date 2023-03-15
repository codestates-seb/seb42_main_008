package partypeople.server.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class MemberDto {
    @Getter
    @Builder
    public static class Post {
        @Email
        private String email;

        @NotBlank
        private String nickname;

        @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$",
        message = "Passwords must contain at least eight characters, including at least 1 letter and 1 number.")
        private String password;
    }

    @Getter
    @Builder
    public static class Patch {
        @Setter
        private Long memberId;
        private String profile;

        @NotBlank
        private String nickname;
        private String content;

        @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$",
                message = "Passwords must contain at least eight characters, including at least 1 letter and 1 number.")
        private String password;
        private String gender;
    }

    @Getter
    public static class Login {
        @Email
        private String email;
        private String password;
    }

    @Getter
    public static class Password {
        private String password;
    }

    @Getter
    public static class Nickname {
        @NotBlank
        private String nickname;
    }

    @Getter
    public static class MemberId {
        private Long memberId;
    }

    @Getter
    @Builder
    public static class Response {
        private Long memberId;

        private String nickname;

        private String email;

        private String profile;

        private String createdAt;

        private String modifiedAt;

        private Integer followerCount;

        private Integer followingCount;

        private String memberStatus;

        private Integer score;

        private Boolean followerStatus;
    }

}
