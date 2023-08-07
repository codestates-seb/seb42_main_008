package partypeople.server.companion.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import partypeople.server.companion.entity.Companion;

import java.time.LocalDate;
import java.util.List;

public interface CompanionRepository extends JpaRepository<Companion, Long>, CompanionQueryRepository {
    @EntityGraph(attributePaths = {"member", "companionTags"})
    Page<Companion> findByNationCode(Pageable pageable, String nationCode);

    @EntityGraph(attributePaths = "nation")
    List<Companion> findByNationContinent(int continent);

    @EntityGraph(attributePaths = {"participants", "member"})
    List<Companion> findByDateBeforeAndCompanionStatusFalse(LocalDate today);

    List<Companion> findByCompanionStatusFalse();

    List<Companion> findAllByMemberMemberId(Long memberId); //작성자

    List<Companion> findByParticipantsMemberMemberId(Long memberId); //참여자

    List<Companion> findBySubscribersMemberMemberId(Long memberId); //신청자
}
