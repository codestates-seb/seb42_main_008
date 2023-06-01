package test.websocket.repository;

import reactor.core.publisher.Mono;
import test.websocket.dto.ChatData;
import test.websocket.dto.User;

public interface MongoDBRepositoryCustom {
    Mono<Void> pushMessage(String roomId, ChatData chatData);
    Mono<Void> pushUser(String roomId, User user);
}
