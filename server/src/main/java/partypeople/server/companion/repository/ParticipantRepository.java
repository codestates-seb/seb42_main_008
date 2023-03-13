package partypeople.server.companion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import partypeople.server.companion.entity.Participant;

import java.util.List;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {
    void deleteByMemberMemberIdAndCompanionCompanionId(long memberId, long companionId);

    List<Participant> findByCompanionCompanionId(Long companionId);
}
