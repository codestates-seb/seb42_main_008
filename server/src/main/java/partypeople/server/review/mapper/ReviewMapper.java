package partypeople.server.review.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import partypeople.server.review.dto.ReviewDto;
import partypeople.server.review.entity.Review;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    @Mapping(source = "memberId", target = "member.memberId")
    @Mapping(source = "reviewedMemberId", target = "reviewedMember.memberId")
    @Mapping(source = "companionId", target = "companion.companionId")
    Review reviewPostToReview(ReviewDto.Post requestBody);

    ReviewDto.Response reviewToReviewResponse(Review review);

    List<ReviewDto.Response> reviewsToReviewResponses(List<Review> reviews);
}
