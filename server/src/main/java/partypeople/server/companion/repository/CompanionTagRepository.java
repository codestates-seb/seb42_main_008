package partypeople.server.companion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import partypeople.server.companion.entity.CompanionTag;

public interface CompanionTagRepository extends JpaRepository<CompanionTag, Long> {
    void deleteByCompanionCompanionId(Long companionId);
}
