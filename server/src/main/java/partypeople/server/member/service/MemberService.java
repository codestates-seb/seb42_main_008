package partypeople.server.member.service;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;
import partypeople.server.auth.jwt.JwtTokenizer;
import partypeople.server.auth.utils.CustomAuthorityUtils;
import partypeople.server.companion.entity.Companion;
import partypeople.server.companion.repository.CompanionRepository;
import partypeople.server.exception.BusinessLogicException;
import partypeople.server.exception.ExceptionCode;
import partypeople.server.member.entity.Follow;
import partypeople.server.member.entity.Member;
import partypeople.server.member.repository.FollowRepository;
import partypeople.server.member.repository.MemberRepository;
import partypeople.server.review.entity.Review;
import partypeople.server.review.repository.ReviewRepository;
import partypeople.server.utils.CustomBeanUtils;

import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    private final static Integer MEMBER_DEFUALT_SCORE = 50;
    private final CompanionRepository companionRepository;
    private final MemberRepository memberRepository;

    private final FollowRepository followRepository;
    private final CustomBeanUtils<Member> beanUtils;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final JwtTokenizer jwtTokenizer;
    private final RedisTemplate<String, String> redisTemplate;

    private final ReviewRepository reviewRepository;


    public Member createMember(Member member) {
        verifyExistsMember(member);

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        Member savedMember = memberRepository.save(member);
        return savedMember;
    }

    public void followExe(Follow follow) {
        //중복 확인 ** 등록 되어 있으면 취소 삭제?
        Optional<Follow> optionalFollow = followRepository.findByFollowerMemberIdAndFollowingMemberId(follow.getFollower().getMemberId(),follow.getFollowing().getMemberId());

        optionalFollow.ifPresentOrElse(
                followRepository::delete,
                ()->followRepository.save(follow)
        );
    }

    @Transactional(readOnly = true)
    public List<Follow> findFollowers(Long memberId) {
        return followRepository.findAllByFollowerMemberId(memberId);
    }

    @Transactional(readOnly = true)
    public List<Follow> findFollowings(Long memberId) {
        return followRepository.findAllByFollowingMemberId(memberId);
    }

    @Transactional(readOnly = true)
    public Member findMember(Long memberId) {
        return findVerifiedMemberById(memberId);
    }

    @Transactional(readOnly = true)
    public Member findMember(String email) {
        return findVerifiedMemberByEmail(email);
    }

    @Transactional(readOnly = true)
    public Page<Member> findMembers(int page, int size, String sortBy, String sortDir) {
        return memberRepository.findAll(PageRequest.of(page, size,
            Sort.Direction.valueOf(sortDir), sortBy));
    }

    public Member updateMember(Member member) {
        Member findMember = findVerifiedMemberById(member.getMemberId());
        Member updatedMember = beanUtils.copyNonNullProperties(member, findMember);

        return updatedMember;
    }

    public void deleteMember(long memberId,String password) {
        Member member = findVerifiedMemberById(memberId);

        if (passwordEncoder.matches(password, member.getPassword())) {
            member.setMemberStatus(Member.MemberStatus.MEMBER_QUIT);
        } else {
            throw new BusinessLogicException(ExceptionCode.PASSWORD_NOT_MATCH);
        }

    }

    private Member findVerifiedMemberByEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        Member findMember = optionalMember
            .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    private Member findVerifiedMemberById(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember
            .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    private void verifyExistsMember(Member member) {
        verifyExistsEmail(member.getEmail());
        verifyExistsNickname(member.getNickname());
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.EMAIL_EXISTS);
        }
    }

    public void verifyExistsNickname(String nickname) {
        Optional<Member> member = memberRepository.findByNickname(nickname);
        if (member.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.NICKNAME_EXIST);
        }
    }

    public void logout(String Authorization) {
        String accessToken = Authorization.replace("Bearer ", "");

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        try{
            Long expiration = jwtTokenizer.getExpiration(accessToken,base64EncodedSecretKey);
            redisTemplate.opsForValue().set(accessToken, "logout", expiration, TimeUnit.MILLISECONDS);
        } catch (SignatureException se) {
            throw new BusinessLogicException(ExceptionCode.SIGNATURE_ERROR);
        } catch (ExpiredJwtException ee) {
            throw new BusinessLogicException(ExceptionCode.EXPIRED_ERROR);
        } catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_TOKEN_ERROR);
        }
    }

    public Long followerCount(Member member) {
        return followRepository.countByFollowerMemberId(member.getMemberId());
    }

    public Long followingCount(Member member) {
        return followRepository.countByFollowingMemberId(member.getMemberId());
    }

    public int scoreCal(Member member) {
        try {
            return MEMBER_DEFUALT_SCORE + reviewRepository.sumScoreByMemberId(member.getMemberId());
        } catch (Exception e) { //점수조회 안될때 (리뷰 없을때)
            return MEMBER_DEFUALT_SCORE;
        }
    }



    public String reissueAT(String refreshToken) {
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        try{
            Long expiration = jwtTokenizer.getExpiration(refreshToken,base64EncodedSecretKey);
            //유효기간 안
            //DB안의 발행토큰인지 확인
            String value = redisTemplate.opsForValue().get(refreshToken);
            if (ObjectUtils.isEmpty(value)) {
                throw new BusinessLogicException(ExceptionCode.REFRESH_TOKEN_ERROR);
            } else {
                Member findmember = findMember(value);

                return jwtTokenizer.delegateAccessToken(findmember);
            }
        } catch (SignatureException se) {
            throw new BusinessLogicException(ExceptionCode.SIGNATURE_ERROR);
        } catch (ExpiredJwtException ee) {
            throw new BusinessLogicException(ExceptionCode.EXPIRED_ERROR);
        } catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.REFRESH_TOKEN_ERROR);
        }
    }

    public List<Review> findAllReviewById(Long memberId) {
        Member findMember = findVerifiedMemberById(memberId);
        return reviewRepository.findByMemberId(findMember.getMemberId());
    }

    public List<Companion> findAllWriterById(long memberId) {
        Member findMember = findVerifiedMemberById(memberId);
        return companionRepository.findAllByMemberMemberId(findMember.getMemberId());
    }
}
