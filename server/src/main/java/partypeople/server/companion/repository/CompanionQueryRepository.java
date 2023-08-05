package partypeople.server.companion.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import partypeople.server.companion.entity.Companion;

public interface CompanionQueryRepository {
    Page<Companion> findCompanion(Pageable pageable, String condition,
                                  String keyword,
                                  String nationCode,
                                  String date);
}
