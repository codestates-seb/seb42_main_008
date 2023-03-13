package partypeople.server.review.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import partypeople.server.member.service.MemberService;
import partypeople.server.review.entity.Review;
import partypeople.server.review.repository.ReviewRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final MemberService memberService;

    public Review createReview(Review review) {
        memberService.findMember(review.getMember().getMemberId());
        memberService.findMember(review.getReviewedMember().getMemberId());

        return reviewRepository.save(review);
    }

    public List<Review> getReviews(Long memberId) {
        List<Review> reviews = reviewRepository.findByMemberId(memberId);
        return reviews;
    }
}
