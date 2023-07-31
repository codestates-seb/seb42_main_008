package test.websocket.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import test.websocket.dto.ChatRoomDTO;
import test.websocket.dto.CompanionChatDTO;
import test.websocket.dto.JoinChatRoom;
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

    @GetMapping(value = "/rooms")
    public Mono<ResponseEntity<List<JoinChatRoom>>> rooms(@RequestParam("email") String email) {
        return roomService.findRooms(email).map(rooms -> ResponseEntity.ok(rooms.stream().map(JoinChatRoom::new).collect(Collectors.toList())));
    }

    @GetMapping(value = "/not-read")
    public Mono<ResponseEntity<Integer>> notReadMessage(@RequestParam("roomId") String roomId, @RequestParam("email") String email) {
        return roomService.findNotReadMessageCount(roomId, email).map(ResponseEntity::ok);
    }

    @PostMapping(value = "/room")
    public Mono<ResponseEntity<Void>> create(@RequestBody CompanionChatDTO requestBody) {
        return roomService.createRoom(Mono.just(requestBody)).then(Mono.just(ResponseEntity.ok().build()));
    }

    @GetMapping("/room/{room-id}")
    public Mono<ResponseEntity<ChatRoomDTO>> getRoom(@PathVariable("room-id") String roomId) {
        return roomService.findRoomByRoomId(roomId).map(body -> ResponseEntity.ok(new ChatRoomDTO(body, body.getRoomId())));
    }

    @PostMapping(value = "/initializeChatRoom")
    public Mono<ResponseEntity<Void>> initializeChatRoom(@RequestBody List<CompanionChatDTO> companionChatDTOS) {
        return roomService.initializeChatRoomsForCompanions(Flux.fromIterable(companionChatDTOS))
                .then(Mono.just(ResponseEntity.ok().build()));
    }

    @DeleteMapping("/room/{room-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> deleteRoom(@PathVariable("room-id") String roomId) {
        return roomService.deleteRoomByRoomId(roomId);
    }
}
