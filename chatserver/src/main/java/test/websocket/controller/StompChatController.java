package test.websocket.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import reactor.core.publisher.Mono;
import test.websocket.annotation.MeasureExecutionTime;
import test.websocket.dto.ChatData;
import test.websocket.dto.ChatDTO;
import test.websocket.dto.ChatUser;
import test.websocket.service.RoomService;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
public class StompChatController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
    private final RoomService roomService;

    @MessageMapping(value = "/chat/enter")
    public Mono<Void> enter(ChatDTO chatDto) {
        return Mono.just(chatDto).flatMap(m -> {
            m.setCurTime(LocalDateTime.now());
            template.convertAndSend("/sub/chat/room/" + m.getRoomId(), m);
            return roomService.saveUser(new ChatUser(m), m.getRoomId());
        });
    }

    @MessageMapping(value = "/chat/message")
//    @MeasureExecutionTime
    public Mono<Void> message(ChatDTO message) {
        Instant startTime = Instant.now();
        return Mono.just(message).flatMap(m -> {
            m.setCurTime(LocalDateTime.now());
            template.convertAndSend("/sub/chat/room/" + m.getRoomId(), m);
            return roomService.insertMsg(new ChatData(m), m.getRoomId())
                    .doOnSuccess(v -> {
                        Duration duration = Duration.between(startTime, Instant.now());
                        System.out.println("Processing time: " + duration.toMillis() + " milliseconds");
                    });
        });
    }

//    @MessageMapping(value = "/chat/check")
//    public Mono<Void> checkMessage(@RequestBody ChatDTO.Check check) {
//        return roomService.deleteCheckListByEmail(check.getRoomId(), check.getEmail(), check.getChatDataId())
//                .then();
//    }

//    @MessageMapping(value = "/chat/check")
//    public Mono<Void> checkMessage(@RequestBody ChatDTO.Check check) {
//        return roomService.deleteCheckListByEmail(check.getRoomId(), check.getEmail(), check.getChatDataId())
//                .then(Mono.defer(() -> roomService.updateLastTime(check.getRoomId(), check.getEmail())));
//    }
    @MessageMapping(value = "/chat/check")
    public Mono<Void> checkMessage(@RequestBody ChatDTO.Check check) {

        return roomService.updateLastTime(check.getRoomId(), check.getEmail());
    }
}