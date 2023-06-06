package test.websocket.repository;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import test.websocket.dto.ChatRoom;

import java.util.List;


public interface MongoDBRepository extends ReactiveMongoRepository<ChatRoom, String>, MongoDBRepositoryCustom {
    Mono<ChatRoom> findByRoomId(String roomId);

    Flux<ChatRoom> findByUsersEmailOrderByLastTimeDesc(String email);

//    @Query("{'users.email': ?0}")
//    Mono<List<ChatRoom>> findByUsersContainingOrderByLastTimeDesc(String email);
//    Flux<ChatRoom> findByUsersContaining(String email);
}
