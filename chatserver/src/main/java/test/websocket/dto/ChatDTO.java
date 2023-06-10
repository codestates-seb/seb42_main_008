package test.websocket.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatDTO {
    private String roomId;
    private String nickname;
    private String email;
    private String profile;
    private String message;
    private LocalDateTime curTime;

    public ChatDTO(ChatData chatData, String roomId) {
        this.roomId = roomId;
        this.nickname = chatData.getNickname();
        this.email = chatData.getEmail();
        this.profile = chatData.getProfile();
        this.message = chatData.getMessage();
        this.curTime = chatData.getCurTime();
    }

    public ChatDTO(String roomId, String nickname, String email, String profile, String message) {
        this.roomId = roomId;
        this.nickname = nickname;
        this.email = email;
        this.profile = profile;
        this.message = message;
    }

    @Getter
    @Setter
    public static class Check {
        private String roomId;
        private String email;
    }

}