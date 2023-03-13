package partypeople.server.companion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import partypeople.server.companion.entity.Participant;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {
    void deleteByMemberMemberIdAndCompanionCompanionId(long memberId, long companionId);
}
