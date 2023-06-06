package test.websocket.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import test.websocket.dto.ChatData;
import test.websocket.dto.ChatRoom;
import test.websocket.dto.CompanionChatDTO;
import test.websocket.dto.ChatUser;
import test.websocket.repository.MongoDBRepository;

import java.util.List;


@RequiredArgsConstructor
@Service
@Slf4j
public class RoomService {
    private final MongoDBRepository mongoDBRepository;

    public void createRoom(CompanionChatDTO requestBody) {
        Mono.just(requestBody)
                .flatMap(dto -> {
                    ChatRoom room = new ChatRoom(dto.getCompanionId(), dto.getCompanionTitle());
                    return mongoDBRepository.save(room);
                }).subscribe();
    }

    public Mono<Void> insertMsg(ChatData chatData, String roomId) {
        return mongoDBRepository.findByRoomId(roomId)
                .then(mongoDBRepository.pushMessage(roomId, chatData))
                .doOnError(e -> log.info("message error: {}", e.getMessage()));
    }

    public Mono<Void> saveUser(ChatUser user, String roomId) {
        return mongoDBRepository.findByRoomId(roomId)
                .then(mongoDBRepository.pushUser(roomId, user).doOnError(e -> log.info("message error: {}", e.getMessage())));
    }

    public Mono<List<ChatRoom>> findRooms(String email) {
        return mongoDBRepository.findByUsersEmailOrderByLastTimeDesc(email)
                .collectList();
    }

    public Mono<ChatRoom> findRoomByRoomId(String roomId) {
        return mongoDBRepository.findByRoomId(roomId);
    }
}
