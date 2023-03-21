package partypeople.server.message.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import partypeople.server.dto.SingleResponseDto;
import partypeople.server.message.dto.MessageDto;
import partypeople.server.message.entity.Message;
import partypeople.server.message.mapper.MessageMapper;
import partypeople.server.message.service.MessageService;
import partypeople.server.message.sse.SseEmitters;
import partypeople.server.utils.UriCreator;

import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/messages")
@RequiredArgsConstructor
@Validated
public class MessageController {

    private final MessageService messageService;
    private final MessageMapper mapper;
    private final SseEmitters sseEmitters;

    @PostMapping
    public ResponseEntity postMessage(@RequestBody MessageDto.Post requestBody) {
        Message message = mapper.messagePostToMessage(requestBody);

        Message createdMessage = messageService.createMessage(message);
        URI location = UriCreator.createUri("/messages", createdMessage.getMessageId());
        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{message-id}")
    public ResponseEntity getMessage(@PathVariable("message-id") Long messageId) {
        Message message = messageService.findMessage(messageId);

        return ResponseEntity.ok(
            new SingleResponseDto<>(mapper.messageToMessageResponse(message))
        );
    }

    @GetMapping
    public ResponseEntity getMessages(@RequestParam("memberId") Long memberId) {
        List<Message> messages = messageService.findMessages(memberId);

        return ResponseEntity.ok(
            new SingleResponseDto<>(mapper.messagesToMessageResponses(messages))
        );
    }

    @PatchMapping("/{message-id}")
    public ResponseEntity patchMessage(@PathVariable("message-id") Long messageId,
                                       @RequestBody MessageDto.Patch requestBody) {
        messageService.changeMessageStatus(messageId, requestBody.isRead());

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{message-id}")
    public ResponseEntity deleteMessage(@PathVariable("message-id") Long messageId) {
        messageService.deleteMessage(messageId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/not-read/{member-id}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connect(@PathVariable("member-id") @Positive Long memberId) {
        SseEmitter emitter = new SseEmitter(60 * 1000L * 10);
        sseEmitters.add(memberId, emitter);
        sseEmitters.count(memberId);
        return ResponseEntity.ok(emitter);
    }
}
