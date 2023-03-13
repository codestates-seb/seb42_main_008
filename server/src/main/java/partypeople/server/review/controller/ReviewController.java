package partypeople.server.review.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import partypeople.server.review.dto.ReviewDto;
import partypeople.server.review.entity.Review;
import partypeople.server.review.mapper.ReviewMapper;
import partypeople.server.review.service.ReviewService;
import partypeople.server.utils.UriCreator;

import java.net.URI;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/reviews")
public class ReviewController {
    private final ReviewService reviewService;
    private final ReviewMapper mapper;

    @PostMapping
    public ResponseEntity postReview(@RequestBody ReviewDto.Post requestBody) {
        Review review = mapper.reviewPostToReview(requestBody);
        Review createdReview = reviewService.createReview(review);

        URI location = UriCreator.createUri("/reviews", createdReview.getReviewId());
        return ResponseEntity.created(location).build();
    }
}