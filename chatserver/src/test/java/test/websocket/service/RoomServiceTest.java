package test.websocket.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;
import test.websocket.dto.ChatRoom;
import test.websocket.repository.MongoDBRepository;

@SpringBootTest
class RoomServiceTest {
    @Autowired
    private RoomService roomService;

    @Autowired
    private MongoDBRepository mongoDBRepository;

    @Test
    public void testSaveTransaction() {
        Flux.range(10, 1)
                .parallel()
                .runOn(Schedulers.parallel())
                .flatMap(i -> {
                    ChatRoom room = new ChatRoom("CompanionId" + i, "CompanionTitle" + i);
                    return mongoDBRepository.save(room)
                            .onErrorResume(throwable -> {
                                System.out.println(throwable.getMessage());
                                return Mono.error(throwable);
                            });
                })
                .sequential()
                .then()
                .doOnError(throwable -> {
                    System.out.println("Transaction rolled back: " + throwable.getMessage());
                })
                .block();
    }
}