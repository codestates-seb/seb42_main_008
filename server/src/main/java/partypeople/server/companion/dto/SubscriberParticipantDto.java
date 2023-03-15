package partypeople.server.companion.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Positive;

public class SubscriberParticipantDto {
    @Getter
    @AllArgsConstructor
    public static class Request {
        @Positive
        private Long memberId;
    }

    @AllArgsConstructor
    @Getter
    public static class Response {
        private Long memberId;
        private String profile;
        private String nickname;
    }

}
