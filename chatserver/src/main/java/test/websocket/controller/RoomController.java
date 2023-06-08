package test.websocket.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;
import test.websocket.dto.*;
import test.websocket.service.RoomService;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping(value = "/chat")
@Slf4j
public class RoomController {

    private final RoomService roomService;

    //채팅방 목록 조회
    @GetMapping(value = "/rooms")
    public Mono<ResponseEntity<List<JoinChatRoom>>> rooms(@RequestParam("email") String email) {
        return roomService.findRooms(email)
                .map(rooms -> ResponseEntity.ok(rooms.stream()
                .map(JoinChatRoom::new)
                .collect(Collectors.toList())));
    }

    @GetMapping(value = "/not-read")
    public Mono<ResponseEntity<Integer>> notReadMessage(
            @RequestParam("roomId") String roomId,
            @RequestParam("email") String email
    ) {
        return roomService.findNotReadMessageCount(roomId, email)
                .map(ResponseEntity::ok);
    }

//    @GetMapping(value = "/test")
//    public Mono<Void> test() {
////        return roomService.test();
//    }

//    @PostMapping(value = "/room")
//    public Mono<ResponseEntity> create(@RequestBody CompanionChatDTO requestBody) {
//        return Mono.just(requestBody)
//                .map(body -> {
//                    roomService.createRoom(body);
//                    return ResponseEntity.ok().build();
//                });
//    }
    @PostMapping(value = "/room")
    public Mono<ResponseEntity<Void>> create(@RequestBody CompanionChatDTO requestBody) {
        return roomService.createRoom(Mono.just(requestBody))
                .then(Mono.just(ResponseEntity.ok().build()));
    }

//    @GetMapping("/room/{room-id}")
//    public Mono<ChatRoom> getRoom(@PathVariable("room-id") String roomId){
//        return roomService.findRoomByRoomId(roomId);
//    }

    @GetMapping("/room/{room-id}")
    public Mono<ResponseEntity<ChatRoomDTO>> getRoom(@PathVariable("room-id") String roomId) {
        return roomService.findRoomByRoomId(roomId)
                .map(body -> ResponseEntity.ok(new ChatRoomDTO(body, body.getRoomId())));
    }


//    @PostMapping("/check")
//    public Mono<Void> checkMessage(@RequestBody ChatDTO.Check check) {
//        return roomService.deleteCheckListByEmail(check.getRoomId(), check.getEmail(), check.getChatDataId())
//                .then();
//    }
}
