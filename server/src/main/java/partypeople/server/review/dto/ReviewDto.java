package partypeople.server.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public class ReviewDto {
    @AllArgsConstructor
    @Getter
    public static class Post {
        @Positive
        private Long memberId;
        @Positive
        private Long reviewedMemberId;
        @Positive
        private Long companionId;
        @NotNull
        private Integer score;
        private String content;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response {
        private Integer score;
        private String content;
    }

}
