package test.websocket.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import test.websocket.dto.ChatMessageDTO;

@Controller
@RequiredArgsConstructor
public class StompChatController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달

    @MessageMapping(value = "/chat/enter")  //pub/chat/enter (/app)
    public void enter(ChatMessageDTO message){

        message.setMessage(message.getWriter() + "님이 입장하셨습니다.");
        template.convertAndSend("/sub/chat/room/" + message.getRoomId(), message); // (/topic/chat/room)
    }

    @MessageMapping(value = "/chat/message")
    public void message(ChatMessageDTO message){
        template.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
    }

}