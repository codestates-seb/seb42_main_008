package test.websocket.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class JoinChatRoom {
    private String roomId;
    private Integer number;
    private LocalDateTime lastTime;
    private String title;

    public JoinChatRoom(ChatRoom chatRoom) {
        this.title = chatRoom.getTitle();
        this.roomId = chatRoom.getRoomId();
        this.number = chatRoom.getUsers().size();
        this.lastTime = chatRoom.getLastTime();
    }
}
