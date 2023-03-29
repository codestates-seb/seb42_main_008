package partypeople.server.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import partypeople.server.exception.BusinessLogicException;
import partypeople.server.exception.ExceptionCode;
import partypeople.server.member.dto.FollowDto;
import partypeople.server.member.entity.Follow;
import partypeople.server.member.entity.Member;
import partypeople.server.member.repository.FollowRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class FollowService {
    private final FollowRepository followRepository;


    public Boolean followerStatusUpdate(Member member, Long loginMemberId) {
        Optional<Follow> follow = followRepository.findByFollowerMemberIdAndFollowingMemberId(member.getMemberId(),loginMemberId);
        Boolean followerStatus;

        if (follow.isPresent()) {
            followerStatus=true;
        } else {
            followerStatus=false;
        }
        return followerStatus;
    }

    public Long followerCount(Member member) {
        return followRepository.countByFollowerMemberId(member.getMemberId());
    }

    public Long followingCount(Member member) {
        return followRepository.countByFollowingMemberId(member.getMemberId());
    }

    @Transactional(readOnly = true)
    public List<Follow> findFollowers(Long memberId) {
        return followRepository.findAllByFollowerMemberId(memberId);
    }

    //@Transactional(readOnly = true)
    public List<Follow> findFollowings(Long memberId) {
        return followRepository.findAllByFollowingMemberId(memberId);
    }

    public FollowDto.FollowerStatus followExe(Follow follow) {
        //중복 확인 ** 등록 되어 있으면 취소 삭제?
        Optional<Follow> optionalFollow = followRepository.findByFollowerMemberIdAndFollowingMemberId(follow.getFollower().getMemberId(),follow.getFollowing().getMemberId());
        FollowDto.FollowerStatus followerStatus = new FollowDto.FollowerStatus(false);
//        follow.setTest(memberService.generateRandomPassword());


//        try {
//            optionalFollow.ifPresent(followRepository::save);
//            optionalFollow.orElse(followRepository.save(follow));
//        } catch (Exception e) {
//            throw new BusinessLogicException(ExceptionCode.FOLLOW_ERROR);
//        }
        try {
            optionalFollow.ifPresentOrElse(
                    followRepository::delete,
                    ()->{
                        followerStatus.setFollowerStatus(true);
                        followRepository.save(follow);
                    }
            );
        } catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.FOLLOW_ERROR);
        }

        return followerStatus;
    }
}
