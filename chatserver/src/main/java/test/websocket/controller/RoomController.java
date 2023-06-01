package test.websocket.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;
import test.websocket.dto.ChatRoom;
import test.websocket.dto.CompanionChatDTO;
import test.websocket.service.RoomService;


@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/chat")
@Log4j2
public class RoomController {

    private final ChatRoomRepository repository;

    //채팅방 목록 조회
    @GetMapping(value = "/rooms")
    public Flux<ResponseEntity> rooms(){
        return roomService.findRooms().map(rooms -> ResponseEntity.ok(rooms));
    }

    @PostMapping(value = "/room")
    public Mono<ResponseEntity> create(@RequestBody CompanionChatDTO requestBody) {
        return Mono.just(requestBody)
                .map(body -> {
                    roomService.createRoom(body);
                    return ResponseEntity.ok().build();
                });
    }

    @GetMapping("/room/{room-id}")
    public Mono<ChatRoom> getRoom(@PathVariable("room-id") String roomId){
        return roomService.findRoomByRoomId(roomId);
    }
}
