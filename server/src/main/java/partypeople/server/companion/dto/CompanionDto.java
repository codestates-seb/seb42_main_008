package partypeople.server.companion.dto;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

public class CompanionDto {

    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank
        private String title;

        @NotBlank
        private String content;

        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        private LocalDate date;

        @NotBlank
        private String address;

        @NotNull
        private Double lat;

        @NotNull
        private Double lng;

        @NotBlank
        private String nationName;

        @NotBlank
        private String nationCode;

        @Positive
        private Integer continent;

        @Size(min = 2, max = 5)
        private List<String> tags;

        @Positive
        private Long memberId;
    }

    @Getter
    @Setter
    public static class Patch {
        private Long companionId;

        private String title;

        private String content;

        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        private LocalDate date;

        private String address;

        private Double lat;

        private Double lng;

        private String nationName;

        private String nationCode;

        @Positive
        private Integer continent;

        @Size(min = 2, max = 5)
        private List<String> tags;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private Long companionId;

        private Long memberId;

        private String nickname;

        private String profile;

        private Integer score;

        private String title;

        private String content;

        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        private LocalDate date;

        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        private LocalDate createdAt;

        private String address;

        private Double lat;

        private Double lng;

        private String nationName;

        private String nationCode;

        private Integer continent;

        private List<String> tags;

        private boolean companionStatus;
    }


    @Getter
    @Builder
    public static class ResponseMember {
        private Long companionId;
        private String address;
        private Double lat;
        private Double lng;
        private LocalDate date;
        private boolean companionStatus;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ContinentResponse {
        private String nationCode;

        private Integer companionsCount;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ReviewedMember {
        private Long memberId;
    }
}
