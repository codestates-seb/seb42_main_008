package test.websocket.repository;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import test.websocket.dto.ChatRoom;


public interface MongoDBRepository extends ReactiveMongoRepository<ChatRoom, String>, MongoDBRepositoryCustom {
    Mono<ChatRoom> findByRoomId(String roomId);

    Flux<ChatRoom> findByUsersEmailOrderByLastTimeDesc(String email);

    @Query(value = "{ '_id': ?0 }", fields = "{ 'users': 1, '_id': 0 }")
    Mono<ChatRoom> findUsersByRoomId(String roomId);
}
