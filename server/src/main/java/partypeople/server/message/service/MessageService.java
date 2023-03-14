package partypeople.server.message.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import partypeople.server.exception.BusinessLogicException;
import partypeople.server.exception.ExceptionCode;
import partypeople.server.member.service.MemberService;
import partypeople.server.message.entity.Message;
import partypeople.server.message.repository.MessageRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final MemberService memberService;

    public Message createMessage(Message message) {
        memberService.findMember(message.getSender().getMemberId());
        memberService.findMember(message.getReceiver().getMemberId());
        return messageRepository.save(message);
    }

    public Message findMessage(Long messageId) {
        Message findMessage = findVerifiedMessage(messageId);
        findMessage.checkMessage();
        return findMessage;
    }

    @Transactional(readOnly = true)
    public List<Message> findMessages(Long memberId) {
        return messageRepository.findByReceiverMemberId(memberId);
    }

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
