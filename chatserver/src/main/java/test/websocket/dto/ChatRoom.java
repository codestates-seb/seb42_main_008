package test.websocket.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document("chatRoom")
public class ChatRoom {
    @Id
    private String roomId;
    private String title;
    private LocalDateTime lastTime;

    private List<ChatUser> users = new ArrayList<>();
    private List<ChatData> messages = new ArrayList<>();

    public ChatRoom(String roomId, String title) {
        this.roomId = roomId;
        this.title = title;
        this.lastTime = LocalDateTime.now();
    }

}

