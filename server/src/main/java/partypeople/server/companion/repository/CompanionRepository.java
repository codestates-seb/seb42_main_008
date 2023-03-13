package partypeople.server.companion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import partypeople.server.companion.entity.Companion;

import java.util.List;

public interface CompanionRepository extends JpaRepository<Companion, Long> {

    List<Companion> findAllByMemberMemberId(Long memberId);
}
