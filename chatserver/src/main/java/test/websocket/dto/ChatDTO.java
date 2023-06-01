package test.websocket.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ChatDTO {
    private String roomId;
    private String nickname;
    private String email;
    private String profile;
    private String message;
    private LocalDateTime curTime;
}