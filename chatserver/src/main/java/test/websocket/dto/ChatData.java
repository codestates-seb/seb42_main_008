package test.websocket.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatData {
//    private String id;
    private String nickname;
    private String email;
    private String profile;
    private String message;
    private LocalDateTime curTime;
//    private List<String> checkList = new ArrayList<>();

    public ChatData(ChatDTO chatDTO) {
//        this.id = UUID.randomUUID().toString();
        this.email = chatDTO.getEmail();
        this.message = chatDTO.getMessage();
        this.nickname = chatDTO.getNickname();
        this.curTime = chatDTO.getCurTime();
        this.profile = chatDTO.getProfile();
    }
}
