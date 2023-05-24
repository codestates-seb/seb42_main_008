package test.websocket.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoomDTO {

    private String roomId;
    private String name;

    public static ChatRoomDTO create(CompanionChatDTO requestbody){
        ChatRoomDTO room = new ChatRoomDTO();

        room.roomId = requestbody.companionId;
        room.name = requestbody.companionTitle;
        return room;
    }
}