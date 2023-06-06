package test.websocket.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatUser {
    private String email;
    private String profile;
    private String nickname;

    public ChatUser(ChatDTO chatDTO) {
        this.email = chatDTO.getEmail();
        this.nickname = chatDTO.getNickname();
        this.profile = chatDTO.getProfile();
    }
}
