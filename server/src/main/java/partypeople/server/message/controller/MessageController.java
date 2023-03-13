package partypeople.server.message.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import partypeople.server.dto.SingleResponseDto;
import partypeople.server.message.dto.MessageDto;
import partypeople.server.message.entity.Message;
import partypeople.server.message.mapper.MessageMapper;
import partypeople.server.message.service.MessageService;
import partypeople.server.utils.UriCreator;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/messages")
@RequiredArgsConstructor
@Validated
public class MessageController {

    private final MessageService messageService;
    private final MessageMapper mapper;

    @PostMapping
    public ResponseEntity postMessage(@RequestBody MessageDto.Post requestBody) {
        Message message = mapper.messagePostToMessage(requestBody);

        Message createdMessage = messageService.createMessage(message);
        URI location = UriCreator.createUri("/messages", createdMessage.getMessageId());

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{message-id}")
    public ResponseEntity getMessage(@PathVariable("message-id") Long messageId) {
        Message message = messageService.getMessage(messageId);

        return ResponseEntity.ok(
            new SingleResponseDto<>(mapper.messageToMessageResponse(message))
        );
    }

    @GetMapping
    public ResponseEntity getMessages(@RequestParam("memberId") Long memberId) {
        List<Message> messages = messageService.getMessages(memberId);

        return ResponseEntity.ok(
            new SingleResponseDto<>(mapper.messagesToMessageResponses(messages))
        );
    }


}
