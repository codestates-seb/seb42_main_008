package test.websocket.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import reactor.core.publisher.Mono;
import test.websocket.dto.ChatData;
import test.websocket.dto.ChatRoom;
import test.websocket.dto.ChatUser;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.project;
import static org.springframework.data.mongodb.core.query.Criteria.where;

@RequiredArgsConstructor
public class MongoDBRepositoryImpl implements MongoDBRepositoryCustom {
    private final ReactiveMongoTemplate mongoTemplate;

    @Override
    public Mono<Void> pushMessage(String roomId, ChatData chatData) {
        return mongoTemplate.updateFirst(
                        Query.query(where("roomId").is(roomId)),
                        new Update().push("messages", chatData)
                                .set("lastTime", chatData.getCurTime()), ChatRoom.class)
                .then();
    }

    @Override
    public Mono<Void> pushUser(String roomId, ChatUser user) {
        return mongoTemplate.updateFirst(
                        Query.query(where("roomId").is(roomId).and("users.email").is(user.getEmail())),
                        new Update().set("users.$", user),
                        ChatRoom.class)
                .flatMap(updateResult -> {
                    if (updateResult.getModifiedCount() == 0) {
                        return mongoTemplate.updateFirst(
                                Query.query(where("roomId").is(roomId)),
                                new Update().addToSet("users", user),
                                ChatRoom.class);
                    }
                    return Mono.empty();
                }).then();
    }

    @Override
    public Mono<Void> deleteCheckList(String roomId, String email, String uuid) {
        return mongoTemplate.updateFirst(
                        Query.query(where("roomId").is(roomId).and("messages._id").is(uuid)),
                        new Update().pull("messages.$.checkList", email), ChatRoom.class)
                .then();
    }

    @Override
    public Mono<Void> updateLastTime(String roomId, String email) {
        Instant startTime = Instant.now();
        Query query = Query.query(where("roomId").is(roomId).and("users.email").is(email));
        Update update = new Update().set("users.$.lastCheckTime", LocalDateTime.now());
        return mongoTemplate.updateFirst(query, update, ChatRoom.class).then()
                .doOnSuccess(v -> {
                    Duration duration = Duration.between(startTime, Instant.now());
                    System.out.println("Processing time: " + duration.toMillis() + " milliseconds");
                });
    }

    @Override
    public Mono<Integer> findNotReadMessagesByRoomId(String roomId, LocalDateTime afterTime) {
        MatchOperation match = Aggregation.match(where("_id").is(roomId));
        ProjectionOperation project = project().andExclude("_id").and(ArrayOperators.Filter.filter("messages")
                        .as("message")
                        .by(ComparisonOperators.Gt.valueOf("$$message.curTime").greaterThanValue(afterTime)))
                .as("messages");
        TypedAggregation<ChatRoom> aggregation = Aggregation.newAggregation(ChatRoom.class, match, project);

        return mongoTemplate.aggregate(aggregation, ChatRoom.class)
                .singleOrEmpty()
                .map(chatRoom -> chatRoom.getMessages().size())
                .defaultIfEmpty(0);
    }
}
