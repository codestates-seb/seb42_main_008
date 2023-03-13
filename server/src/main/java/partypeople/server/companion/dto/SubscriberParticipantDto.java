package partypeople.server.companion.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Positive;

public class SubscriberParticipantDto {
    @Getter
    public static class Request {
        @Positive
        private Long memberId;
    }

    @AllArgsConstructor
    public static class Response {
        private Long memberId;
        private String profile;
        private String nickname;
    }

}
