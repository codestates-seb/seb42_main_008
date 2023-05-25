package test.websocket.repository;

import org.springframework.stereotype.Repository;
import test.websocket.dto.ChatRoomDTO;
import test.websocket.dto.CompanionChatDTO;

import javax.annotation.PostConstruct;
import java.util.*;

@Repository
public class ChatRoomRepository {

    private Map<String, ChatRoomDTO> chatRoomDTOMap;

    @PostConstruct
    private void init(){
        chatRoomDTOMap = new LinkedHashMap<>();
    }

    public List<ChatRoomDTO> findAllRooms(){
        List<ChatRoomDTO> result = new ArrayList<>(chatRoomDTOMap.values());
        Collections.reverse(result);

        return result;
    }

    public ChatRoomDTO findRoomById(String id){
        return chatRoomDTOMap.get(id);
    }

    public ChatRoomDTO createChatRoomDTO(CompanionChatDTO requestbody){
        ChatRoomDTO room = ChatRoomDTO.create(requestbody);
        chatRoomDTOMap.put(room.getRoomId(), room);

        return room;
    }
}