package partypeople.server.companion.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import partypeople.server.companion.entity.Subscriber;

import java.util.List;

public interface SubscriberRepository extends JpaRepository<Subscriber, Long> {
    void deleteByMemberMemberIdAndCompanionCompanionId(long memberId, long companionId);

    @EntityGraph(attributePaths = {"member"})
    List<Subscriber> findByCompanionCompanionId(Long companionId);
}
