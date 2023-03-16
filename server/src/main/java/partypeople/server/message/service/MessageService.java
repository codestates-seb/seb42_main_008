package partypeople.server.message.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import partypeople.server.exception.BusinessLogicException;
import partypeople.server.exception.ExceptionCode;
import partypeople.server.member.service.MemberService;
import partypeople.server.message.entity.Message;
import partypeople.server.message.repository.MessageRepository;
import partypeople.server.message.sse.SseEmitters;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final MemberService memberService;
    private final SseEmitters sseEmitters;

    @Transactional
    public Message createMessage(Message message) {
        memberService.findMember(message.getSender().getMemberId());
        memberService.findMember(message.getReceiver().getMemberId());
        Message savedMessage = messageRepository.save(message);
        sseEmitters.count(message.getReceiver().getMemberId());
        return savedMessage;
    }

    @Transactional
    public Message findMessage(Long messageId) {
        Message findMessage = findVerifiedMessage(messageId);
        findMessage.checkMessage();
        sseEmitters.count(findMessage.getReceiver().getMemberId());
        return findMessage;
    }

    public List<Message> findMessages(Long memberId) {
        return messageRepository.findByReceiverMemberId(memberId);
    }

    @Transactional
    public void deleteMessage(Long messageId) {
        messageRepository.deleteById(messageId);
    }

    private Message findVerifiedMessage(Long messageId) {
        Optional<Message> optionalMessage = messageRepository.findById(messageId);
        Message findMessage = optionalMessage.orElseThrow(
            () -> new BusinessLogicException(ExceptionCode.MESSAGE_NOT_FOUND)
        );
        return findMessage;
    }


}
