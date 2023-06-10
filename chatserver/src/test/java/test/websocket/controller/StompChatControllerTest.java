package test.websocket.controller;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;
import test.websocket.dto.ChatDTO;
import test.websocket.dto.ChatData;
import test.websocket.service.RoomService;

import java.time.Duration;
import java.time.Instant;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class StompChatControllerTest {

    @Autowired
    private RoomService roomService;

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private StompChatController chatController;
    @Test
    void message() {
        ChatDTO message = new ChatDTO("5", "joe", "zipcks1381@gmail.com", "profile",  "me");
        Mono<Void> result = chatController.message(message);
        result.block();

        Instant startTime = Instant.now();

        result = chatController.message(message);

        result.subscribeOn(Schedulers.boundedElastic())
                .doOnSuccess(v -> {
                    Duration duration = Duration.between(startTime, Instant.now());
                    System.out.println("Processing time: " + duration.toMillis() + " milliseconds");
                })
                .block();

    }
}