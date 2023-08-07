package test.websocket.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoomDTO {
    private LocalDateTime lastTime;

    private List<ChatUser> users = new ArrayList<>();
    private List<ChatDTO> messages = new ArrayList<>();

    public ChatRoomDTO(ChatRoom chatRoom, String roomId) {
        this.users = chatRoom.getUsers();
        this.messages = chatRoom.getMessages().stream()
                .map(chatData -> new ChatDTO(chatData, roomId))
                .collect(Collectors.toList());
        this.lastTime = chatRoom.getLastTime();
    }
}
