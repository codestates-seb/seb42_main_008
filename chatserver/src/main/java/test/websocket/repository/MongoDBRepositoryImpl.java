package test.websocket.repository;

import com.mongodb.client.result.UpdateResult;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import reactor.core.publisher.Mono;
import test.websocket.dto.ChatData;
import test.websocket.dto.ChatRoom;
import test.websocket.dto.User;

@RequiredArgsConstructor
public class MongoDBRepositoryImpl implements MongoDBRepositoryCustom{
    private final ReactiveMongoTemplate mongoTemplate;

    @Override
    public Mono<Void> pushMessage(String roomId, ChatData chatData) {
        return mongoTemplate.updateFirst(
                Query.query(Criteria.where("roomId").is(roomId)),
                new Update().push("messages", chatData)
                        .set("lastTime",chatData.getCreatedAt()), ChatRoom.class)
                .then();
    }

    @Override
    public Mono<Void> pushUser(String roomId, User user) {
        return mongoTemplate.updateFirst(
                Query.query(Criteria.where("roomId").is(roomId)),
                new Update().push("users", user), ChatRoom.class)
                .then();
    }

}
