package test.websocket.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {
    private String email;
    private String profile;
    private String nickname;

    public User(ChatDTO chatDTO) {
        this.email = chatDTO.getEmail();
        this.nickname = chatDTO.getNickname();
        this.profile = chatDTO.getProfile();
    }
}
