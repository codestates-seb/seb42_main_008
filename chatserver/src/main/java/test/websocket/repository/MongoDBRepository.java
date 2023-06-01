package test.websocket.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;
import test.websocket.dto.ChatRoom;

public interface MongoDBRepository extends ReactiveMongoRepository<ChatRoom, String>, MongoDBRepositoryCustom {
    Mono<ChatRoom> findByRoomId(String roomId);
}
