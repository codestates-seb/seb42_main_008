package partypeople.server.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import partypeople.server.member.entity.Follow;
import partypeople.server.member.entity.Member;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    Optional<Follow> findByFollowerMemberIdAndFollowingMemberId(Long followerId,Long followingId);

    List<Follow> findAllByFollowerMemberId(Long followerId);
    List<Follow> findAllByFollowingMemberId(Long followingId);

    Long countByFollowerMemberId(Long followerId);
    Long countByFollowingMemberId(Long followerId);

}
