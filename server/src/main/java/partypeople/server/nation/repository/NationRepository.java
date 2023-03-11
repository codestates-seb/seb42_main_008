package partypeople.server.nation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import partypeople.server.nation.entity.Nation;

import java.util.Optional;

public interface NationRepository extends JpaRepository<Nation, Long> {
    Optional<Nation> findByCode(String code);
}
