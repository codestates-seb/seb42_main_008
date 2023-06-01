package test.websocket.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatData {
    private String email;
    private String message;
    private String nickname;
    private LocalDateTime createdAt;

    public ChatData(
            ChatDTO chatDTO) {
        this.email = chatDTO.getEmail();
        this.message = chatDTO.getMessage();
        this.nickname = chatDTO.getNickname();
        this.createdAt = chatDTO.getCurTime();
    }
}
