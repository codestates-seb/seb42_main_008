package partypeople.server.message.dto;

import lombok.*;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class MessageDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotEmpty
        private String content;
        @Positive
        private Long senderId;
        @Positive
        private Long receiverId;
        @Positive
        private Long companionId;
    }

    @Getter
    @Setter
    public static class Patch {
        private boolean read;
    }


    @Getter
    @Setter
    public static class Response {
        private Long messageId;
        private String content;
        private Long companionId;
        private Sender sender;
        private String createdAt;
        private boolean isRead;

        @AllArgsConstructor
        @Getter
        @Setter
        public static class Sender {
            private Long id;
            private String nickname;
        }

        public Response(Long messageId, String content, Long companionId, Sender sender, LocalDateTime createdAt, Boolean isRead) {
            this.messageId = messageId;
            this.content = content;
            this.companionId = companionId;
            this.sender = sender;
            this.createdAt = createdAt.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
            this.isRead = isRead;
        }
    }

    @AllArgsConstructor
    @Getter
    public static class NotReadResponse {
        private Long notReadCount;
    }

}
