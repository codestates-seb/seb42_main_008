package test.websocket.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;
import test.websocket.dto.ChatData;
import test.websocket.dto.ChatRoom;
import test.websocket.dto.ChatUser;
import test.websocket.dto.CompanionChatDTO;
import test.websocket.repository.MongoDBRepository;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.List;


@RequiredArgsConstructor
@Service
@Slf4j
public class RoomService {
    private final MongoDBRepository mongoDBRepository;

    @PostConstruct
    public void init() {
        mongoDBRepository.findNotReadMessagesByRoomId("1", LocalDateTime.now()).subscribe();
    }

    @Transactional
    public Mono<Void> createRoom(Mono<CompanionChatDTO> requestBodyMono) {
        return requestBodyMono
                .flatMap(dto -> {
                    ChatRoom room = new ChatRoom(dto.getCompanionId(), dto.getCompanionTitle());
                    return mongoDBRepository.save(room);
                })
                .then();
    }

    public Mono<Void> insertMsg(ChatData chatData, String roomId) {
        return mongoDBRepository.pushMessage(roomId, chatData)
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

    public Mono<Integer> findNotReadMessageCount(String roomId, String email) {
        return mongoDBRepository.findUsersByRoomId(roomId)
                .flatMap(chatRoom -> {
                    List<ChatUser> users = chatRoom.getUsers();
                    ChatUser user = users.stream()
                            .filter(u -> u.getEmail().equals(email))
                            .findFirst()
                            .orElse(null);

                    if (user == null) {
                        return Mono.error(new IllegalArgumentException("User not found"));
                    }

                    LocalDateTime lastTime = user.getLastCheckTime();
                    System.out.println("lastTime = " + lastTime);
                    return mongoDBRepository.findNotReadMessagesByRoomId(roomId, lastTime);
                });
    }


    public Mono<Void> updateLastTime(String roomId, String email) {
        return mongoDBRepository.updateLastTime(roomId, email);
    }

}
