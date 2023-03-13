package partypeople.server.companion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import partypeople.server.companion.entity.Subscriber;

public interface SubscriberRepository extends JpaRepository<Subscriber, Long> {
    void deleteByMemberMemberIdAndCompanionCompanionId(long memberId, long companionId);
}
