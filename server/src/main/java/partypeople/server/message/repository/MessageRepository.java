package partypeople.server.message.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import partypeople.server.message.entity.Message;

import java.util.List;
import java.util.Optional;

public interface MessageRepository extends JpaRepository<Message, Long> {
    @EntityGraph(attributePaths = {"receiver", "sender"})
    List<Message> findByReceiverMemberId(Long receiverId);

    @EntityGraph(attributePaths = {"sender"})
    Optional<Message> findById(Long messageId);

    Long countByReceiverMemberIdAndIsReadFalse(Long receiverId);
}
