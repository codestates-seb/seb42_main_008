package partypeople.server.member.dto;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class MemberDto {
    @Getter
    @Setter
    @NoArgsConstructor
    public static class OAuth {
        private String email;

        private String nickname;

        private String profile;

        private String gender;

        private String client;
    }

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

        private String nickname;
        private String content;

        @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$",
                message = "Passwords must contain at least eight characters, including at least 1 letter and 1 number.")
        private String password;
        private String gender;
    }

    @Getter
//    @Builder
//    @AllArgsConstructor
    @Setter
    public static class Login {
        @Email
        private String email;
        private String password;
    }

    @Getter
    @Setter
    public static class Password {
        private String password;
    }

    @Getter
    @Setter
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

        private String content;

        private String gender;

        private String createdAt;

        private String modifiedAt;

        private Integer followerCount;

        private Integer followingCount;

        private String memberStatus;

        private Integer score;

        private Boolean followerStatus;
    }

}
