package test.websocket.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import test.websocket.dto.ChatRoomDTO;
import test.websocket.dto.CompanionChatDTO;
import test.websocket.service.WebServerService;

import javax.annotation.PostConstruct;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Repository
@RequiredArgsConstructor
public class ChatRoomRepository {

    private Map<String, ChatRoomDTO> chatRoomDTOMap;
    private final WebServerService webServerService;
    @PostConstruct
    private void init(){
        chatRoomDTOMap = new ConcurrentHashMap<>();
        //동행글번호 가져오기 (미완료된 동행글번호만) 웹서버에다가 >
        List<CompanionChatDTO> companionChatDTOS = webServerService.getInCompleteNumbers();
        for (CompanionChatDTO companion : companionChatDTOS) {
            createChatRoomDTO(companion);
        }
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