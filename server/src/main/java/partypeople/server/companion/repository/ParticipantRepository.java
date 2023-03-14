package partypeople.server.companion.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import partypeople.server.companion.entity.Participant;

import java.util.List;
import java.util.Optional;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {
    Optional<Participant> findByMemberMemberIdAndCompanionCompanionId(Long memberId, Long companionId);

    @EntityGraph(attributePaths = {"member"})
    List<Participant> findByCompanionCompanionId(Long companionId);

}
