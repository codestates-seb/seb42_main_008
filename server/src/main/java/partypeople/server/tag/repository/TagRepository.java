package partypeople.server.tag.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import partypeople.server.tag.entity.Tag;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByName(String name);
}
