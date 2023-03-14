package partypeople.server.companion.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import partypeople.server.companion.entity.Subscriber;

import java.util.List;
import java.util.Optional;

public interface SubscriberRepository extends JpaRepository<Subscriber, Long> {
    Optional<Subscriber> findByMemberMemberIdAndCompanionCompanionId(Long memberId, Long companionId);

    @EntityGraph(attributePaths = {"member"})
    List<Subscriber> findByCompanionCompanionId(Long companionId);

}
