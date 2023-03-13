package partypeople.server.companion.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import partypeople.server.companion.entity.Companion;

public interface CompanionRepository extends JpaRepository<Companion, Long> {
    Page<Companion> findByNationCode(Pageable pageable, String nationCode);
}
    