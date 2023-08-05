package test.websocket.repository;

import reactor.core.publisher.Mono;
import test.websocket.dto.ChatData;
import test.websocket.dto.ChatUser;

import java.time.LocalDateTime;

public interface MongoDBRepositoryCustom {
    Mono<Void> pushMessage(String roomId, ChatData chatData);
    Mono<Void> pushUser(String roomId, ChatUser user);
    Mono<Void> deleteCheckList(String roomId, String email, String uuid);

    Mono<Void> updateLastTime(String roomId,String email);

    Mono<Integer> findNotReadMessagesByRoomId(String roomId, LocalDateTime afterTime);
}
