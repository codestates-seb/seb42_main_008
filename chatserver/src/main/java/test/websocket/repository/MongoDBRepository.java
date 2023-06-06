package test.websocket.repository;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import test.websocket.dto.ChatRoom;
import test.websocket.dto.ChatUser;

import java.time.LocalDateTime;
import java.util.List;


public interface MongoDBRepository extends ReactiveMongoRepository<ChatRoom, String>, MongoDBRepositoryCustom {
    Mono<ChatRoom> findByRoomId(String roomId);

    Flux<ChatRoom> findByUsersEmailOrderByLastTimeDesc(String email);

    @Query(value = "{ '_id': ?0 }", fields = "{ 'users': 1, '_id': 0 }")
    Mono<ChatRoom> findUsersByRoomId(String roomId);

//    @Query(value = "{ '_id': ?0 }", fields = "{ 'messages': 1, '_id': 0 }")
//    Mono<ChatRoom> findMessagesByRoomId(String roomId);

    @Query(value = "{ '_id': ?0, 'messages.curTime': { $gt: ?1 } }", fields = "{ 'messages': 1, '_id': 0 }")
    Mono<ChatRoom> findMessagesByRoomId(String roomId, LocalDateTime afterTime);

//    @Query(value = "{ '_id': ?0, 'messages.curTime': { $gt: ?1 } }", fields = "{ 'messages': 1, 'users':1,'_id': 0 }")
//    Mono<ChatRoom> findMessagesByRoomId(String roomId, LocalDateTime afterTime);
//    @Query("{'users.email': ?0}")
//    Mono<List<ChatRoom>> findByUsersContainingOrderByLastTimeDesc(String email);
//    Flux<ChatRoom> findByUsersContaining(String email);
}
