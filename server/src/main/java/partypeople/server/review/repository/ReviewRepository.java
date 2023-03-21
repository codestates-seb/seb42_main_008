package partypeople.server.review.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import partypeople.server.review.entity.Review;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query("select r from Review r where r.reviewedMember.memberId = :memberId " +
        "and nullif(r.content,'') is not null")
    List<Review> findByMemberId(@Param("memberId") Long memberId);

    @Query("SELECT SUM(score) FROM Review r WHERE r.reviewedMember.memberId = :memberId")
    int sumScoreByMemberId(@Param("memberId") Long memberId);

    @EntityGraph(attributePaths = {"companion", "member"})
    List<Review> findByCompanionCompanionIdAndMemberMemberId(Long companionId, Long memberId, Sort sort);
}
