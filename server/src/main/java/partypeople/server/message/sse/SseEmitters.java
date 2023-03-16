package partypeople.server.message.sse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import partypeople.server.dto.SingleResponseDto;
import partypeople.server.message.dto.MessageDto;
import partypeople.server.message.repository.MessageRepository;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SseEmitters {
    private final Map<Long, SseEmitter> emitterMap = new ConcurrentHashMap<>();
    private final MessageRepository messageRepository;

    public SseEmitters(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public SseEmitter add(Long memberId, SseEmitter emitter) {
        this.emitterMap.put(memberId, emitter);
        emitter.onCompletion(() -> {
            this.emitterMap.remove(memberId);
        });
        emitter.onTimeout(() -> {
            emitter.complete();
        });
        return emitter;
    }

    public void count(Long receiverId) {
        Long notReadCount = messageRepository.countByReceiverMemberIdAndIsReadFalse(receiverId);
        try {
            if (emitterMap.containsKey(receiverId)) {
                emitterMap.get(receiverId)
                        .send(SseEmitter.event()
                            .name("notReadCount")
                            .data(new SingleResponseDto<>(new MessageDto.NotReadResponse(notReadCount))));
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
