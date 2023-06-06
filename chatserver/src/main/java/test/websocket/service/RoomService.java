package test.websocket.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;
import test.websocket.dto.ChatData;
import test.websocket.dto.ChatRoom;
import test.websocket.dto.CompanionChatDTO;
import test.websocket.dto.ChatUser;
import test.websocket.repository.MongoDBRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


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
    public Mono<Void> insertMsg(ChatData chatData, String roomId) {
        /* 메세지에 유저리스트 넣는 부분인데 여기도 디비에 유저정보 요청이 들어감 수정필요 */
        return mongoDBRepository.findByRoomId(roomId)
                .publishOn(Schedulers.boundedElastic())
                .flatMap(chatRoom -> mongoDBRepository.findUsersByRoomId(roomId)
                        .map(users -> users.getUsers().stream()
                                .map(ChatUser::getEmail)
                                .filter(email -> !email.equals(chatData.getEmail()))
                                .collect(Collectors.toList()))
                        .flatMap(names -> {
                            chatData.setCheckList(names);
                            return mongoDBRepository.pushMessage(roomId, chatData);
                        }))
                .doOnError(e -> log.info("message error: {}", e.getMessage()))
                .then();
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

    public Mono<Void> deleteCheckListByEmail(String roomId,String email,String chatDataId) {
        return mongoDBRepository.deleteCheckList(roomId, email, chatDataId);
    }


    public Mono<Integer> findNotReadMessageCount(String roomId, String email) {
        /* lasttime을 어떻게 가져오지? */
        return mongoDBRepository.findMessagesByRoomId(roomId, LocalDateTime.now().minusHours(10))
                .map(chatRoom -> {
                    List<ChatData> messages = chatRoom.getMessages();
                    return (int) messages.stream()
                            .filter(message -> message.getCheckList().contains(email))
                            .count();
                });
    }

    public Mono<Void> updateLastTime(String roomId, String email) {
        return mongoDBRepository.updateLastTime(roomId,email);
    }
}
