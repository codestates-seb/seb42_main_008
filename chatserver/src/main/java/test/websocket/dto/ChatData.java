package test.websocket.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatData {
    private String nickname;
    private String email;
    private String profile;
    private String message;
    private LocalDateTime curTime;

    public ChatData(ChatDTO chatDTO) {
        this.email = chatDTO.getEmail();
        this.message = chatDTO.getMessage();
        this.nickname = chatDTO.getNickname();
        this.curTime = chatDTO.getCurTime();
        this.profile = chatDTO.getProfile();
    }
}
