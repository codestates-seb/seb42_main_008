package test.websocket.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;
import test.websocket.dto.ChatData;
import test.websocket.dto.ChatRoom;
import test.websocket.dto.CompanionChatDTO;
import test.websocket.dto.ChatUser;
import test.websocket.repository.MongoDBRepository;

import java.time.LocalDateTime;
import java.util.List;


@RequiredArgsConstructor
@Service
@Slf4j
public class RoomService {
    private final MongoDBRepository mongoDBRepository;

//    @Transactional
//    public Mono<Void> createRoom(Mono<CompanionChatDTO> requestBodyMono) {
//        return requestBodyMono
//                .flatMap(dto -> {
//                    ChatRoom room = new ChatRoom(dto.getCompanionId(), dto.getCompanionTitle());
//                    return mongoDBRepository.save(room).flatMap(savedRoom -> {
//                        // 익셉션 발생 시키기 (예시로 RuntimeException 사용)
//                        throw new RuntimeException("Rollback test");
//                    });
//                })
//                .then();
//    }
    @Transactional
    public Mono<Void> createRoom(Mono<CompanionChatDTO> requestBodyMono) {
        return requestBodyMono
                .flatMap(dto -> {
                    ChatRoom room = new ChatRoom(dto.getCompanionId(), dto.getCompanionTitle());
                    return mongoDBRepository.save(room);
//                            .flatMap(savedRoom -> {
//                                // 익셉션 발생 시키기 (예시로 RuntimeException 사용)
//                                throw new RuntimeException("Rollback test");
//                            });
                })
                .then();
    }

//    public Mono<Void> insertMsg(ChatData chatData, String roomId) {
//        return mongoDBRepository.findByRoomId(roomId)
//                .publishOn(Schedulers.boundedElastic())
//                .flatMap(c -> mongoDBRepository.findUsersByRoomId(roomId)
//                        .map(s -> s.getUsers().stream().map(
//                                ChatUser::getEmail
//                        ).collect(Collectors.toList()))
//                        .flatMap(names -> {
//                            names.remove(chatData.getEmail());
//                            chatData.setCheckList(names);
//                            return mongoDBRepository.pushMessage(roomId, chatData);
//                        }))
//                .doOnError(e -> log.info("message error: {}", e.getMessage()))
//                .then();
//    }
//    @Transactional
//    public Mono<Void> insertMsg(ChatData chatData, String roomId) {
//        /* 메세지에 유저리스트 넣는 부분인데 여기도 디비에 유저정보 요청이 들어감 수정필요 */
//        return mongoDBRepository.findByRoomId(roomId)
//                .publishOn(Schedulers.boundedElastic())
//                .flatMap(chatRoom -> mongoDBRepository.findUsersByRoomId(roomId)
//                        .map(users -> users.getUsers().stream()
//                                .map(ChatUser::getEmail)
//                                .filter(email -> !email.equals(chatData.getEmail()))
//                                .collect(Collectors.toList()))
//                        .flatMap(names -> {
//                            chatData.setCheckList(names);
//                            return mongoDBRepository.pushMessage(roomId, chatData);
//                        }))
//                .doOnError(e -> log.info("message error: {}", e.getMessage()));
//    }
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

//    public Mono<Void> deleteCheckListByEmail(String roomId,String email,String chatDataId) {
//        return mongoDBRepository.deleteCheckList(roomId, email, chatDataId);
//    }


//    public Mono<Integer> findNotReadMessageCount(String roomId, String email) {
//        /* lasttime을 어떻게 가져오지? */
//        return mongoDBRepository.findMessagesByRoomId(roomId, LocalDateTime.now().minusHours(10))
//                .map(chatRoom -> {
//                    List<ChatData> messages = chatRoom.getMessages();
//                    return (int) messages.stream()
//                            .filter(message -> message.getCheckList().contains(email))
//                            .count();
//                });
//    }

//    public Mono<Integer> findNotReadMessageCount(String roomId, String email) {
//        return mongoDBRepository.findMessagesByRoomId(roomId, mongoDBRepository.findUsersByRoomId(roomId)
//                        .map(users -> users.getUsers().stream()
//                        .filter(user -> user.getEmail().equals(email)))
//                        .map((Stream<ChatUser> t) -> ChatUser.getLastCheckTime(t))
//                        .next()
//                )
//                .map(chatRoom -> {
//                    List<ChatData> messages = chatRoom.getMessages();
//                    return messages.size();
//                });
//    }
    public Mono<Integer> findNotReadMessageCount(String roomId, String email) {
        long startTime = System.currentTimeMillis();
        Mono<ChatRoom> chatRoomMono = mongoDBRepository.findUsersByRoomId(roomId)
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
                    return mongoDBRepository.findMessagesByRoomId(roomId, lastTime);
                });

        return chatRoomMono
                .flatMap(chatRoom -> {
                    List<ChatData> messages = chatRoom.getMessages();
                    int count = messages.size();

                    long endTime = System.currentTimeMillis();
                    long executionTime = endTime - startTime;
                    System.out.println("Execution time: " + executionTime + "ms");

                    return Mono.just(count);
                });
    }


    public Mono<Void> updateLastTime(String roomId, String email) {
        return mongoDBRepository.updateLastTime(roomId,email);
    }
}
