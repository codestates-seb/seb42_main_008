package partypeople.server.companion.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import partypeople.server.companion.entity.Companion;

import java.time.LocalDate;
import java.util.List;

public interface CompanionRepository extends JpaRepository<Companion, Long> {
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

    @Query("SELECT distinct c FROM Companion c join c.companionTags ct join ct.tag t" +
        " WHERE c.date = :date" +
        " AND c.nation.code = :nationCode" +
        " AND (c.title LIKE %:keyword% OR c.address LIKE %:keyword%" +
        " OR c.content LIKE %:keyword%" +
        " OR ct.tag.name LIKE %:keyword%)")
    @EntityGraph(attributePaths = {"member"})
    Page<Companion> findInEntire(Pageable pageable, @Param("keyword") String keyword,
                                 @Param("nationCode") String nationCode,
                                 @Param("date")LocalDate date);
    @Query("SELECT distinct c FROM Companion c join c.companionTags ct join ct.tag t" +
        " WHERE c.nation.code = :nationCode" +
        " AND (c.title LIKE %:keyword% OR c.address LIKE %:keyword%" +
        " OR c.content LIKE %:keyword%" +
        " OR ct.tag.name LIKE %:keyword%)")
    @EntityGraph(attributePaths = {"member"})
    Page<Companion> findInEntire(Pageable pageable, @Param("keyword") String keyword,
                                 @Param("nationCode") String nationCode);

    @Query("SELECT distinct c FROM Companion c join c.companionTags ct join ct.tag t" +
        " WHERE c.date = :date" +
        " AND c.nation.code = :nationCode" +
        " AND ct.tag.name LIKE %:keyword%")
    @EntityGraph(attributePaths = {"member"})
    Page<Companion> findInTags(Pageable pageable, @Param("keyword") String keyword,
                               @Param("nationCode") String nationCode,
                               @Param("date")LocalDate date);
    @Query("SELECT distinct c FROM Companion c join c.companionTags ct join ct.tag t" +
        " WHERE c.nation.code = :nationCode" +
        " AND ct.tag.name LIKE %:keyword%")
    @EntityGraph(attributePaths = {"member"})
    Page<Companion> findInTags(Pageable pageable, @Param("keyword") String keyword,
                               @Param("nationCode") String nationCode);

    @Query("SELECT distinct c FROM Companion c join c.companionTags ct join ct.tag t" +
        " WHERE c.date = :date" +
        " AND c.nation.code = :nationCode" +
        " AND c.title LIKE %:keyword%")
    @EntityGraph(attributePaths = {"member"})
    Page<Companion> findInTitle(Pageable pageable, @Param("keyword") String keyword,
                                 @Param("nationCode") String nationCode,
                                 @Param("date")LocalDate date);

    @Query("SELECT distinct c FROM Companion c join c.companionTags ct join ct.tag t" +
        " WHERE c.nation.code = :nationCode" +
        " AND c.title LIKE %:keyword%")
    @EntityGraph(attributePaths = {"member"})
    Page<Companion> findInTitle(Pageable pageable, @Param("keyword") String keyword,
                                 @Param("nationCode") String nationCode);

    @Query("SELECT distinct c FROM Companion c join c.companionTags ct join ct.tag t" +
        " WHERE c.date = :date" +
        " AND c.nation.code = :nationCode" +
        " AND c.content LIKE %:keyword%")
    @EntityGraph(attributePaths = {"member"})
    Page<Companion> findInContent(Pageable pageable, @Param("keyword") String keyword,
                                 @Param("nationCode") String nationCode,
                                 @Param("date")LocalDate date);

    @Query("SELECT distinct c FROM Companion c join c.companionTags ct join ct.tag t" +
        " WHERE c.nation.code = :nationCode" +
        " AND c.content LIKE %:keyword%")
    @EntityGraph(attributePaths = {"member"})
    Page<Companion> findInContent(Pageable pageable, @Param("keyword") String keyword,
                                 @Param("nationCode") String nationCode);

    @Query("SELECT distinct c FROM Companion c join c.companionTags ct join ct.tag t" +
        " WHERE c.date = :date" +
        " AND c.nation.code = :nationCode" +
        " AND c.address LIKE %:keyword%")
    @EntityGraph(attributePaths = {"member"})
    Page<Companion> findInAddress(Pageable pageable, @Param("keyword") String keyword,
                                 @Param("nationCode") String nationCode,
                                 @Param("date")LocalDate date);
    @Query("SELECT distinct c FROM Companion c join c.companionTags ct join ct.tag t" +
        " WHERE c.nation.code = :nationCode" +
        " AND c.address LIKE %:keyword%")
    @EntityGraph(attributePaths = {"member"})
    Page<Companion> findInAddress(Pageable pageable, @Param("keyword") String keyword,
                                 @Param("nationCode") String nationCode);

}
