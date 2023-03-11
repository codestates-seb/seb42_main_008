package partypeople.server.companion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import partypeople.server.companion.entity.Companion;

public interface CompanionRepository extends JpaRepository<Companion, Long> {
}
