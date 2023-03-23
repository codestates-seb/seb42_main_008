package partypeople.server.review.controller;

import com.google.gson.Gson;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import partypeople.server.config.SecurityConfigurationTest;
import partypeople.server.review.dto.ReviewDto;
import partypeople.server.review.entity.Review;
import partypeople.server.review.mapper.ReviewMapper;
import partypeople.server.review.service.ReviewService;

import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static partypeople.server.util.ApiDocumentUtils.*;

@WebMvcTest(ReviewController.class)
@MockBean(JpaMetamodelMappingContext.class)
@Import(SecurityConfigurationTest.class)
@AutoConfigureRestDocs
class ReviewControllerRestDocsTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private ReviewService reviewService;

    @MockBean
    private ReviewMapper mapper;

    @DisplayName("Post Review Test")
    @Test
    void postReviewTest() throws Exception {
        //given
        ReviewDto.Post post = new ReviewDto.Post(1L, 2L, 3L,
            0, "Review Test");
        String content = gson.toJson(post);
        Review review = new Review();
        review.setReviewId(1L);

        given(mapper.reviewPostToReview(Mockito.any(ReviewDto.Post.class))).willReturn(new Review());
        given(reviewService.createReview(Mockito.any(Review.class))).willReturn(review);

        //when
        ResultActions actions = mockMvc.perform(
            post("/reviews")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
        );

        //then
        actions
            .andExpect(status().isCreated())
            .andExpect(header().string(HttpHeaders.LOCATION, is(startsWith("/reviews/"))))
            .andDo(document("[review] post-review",
                getRequestPreProcessor(),
                getResponsePreProcessor(),
                requestFields(
                    List.of(
                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                        fieldWithPath("reviewedMemberId").type(JsonFieldType.NUMBER).description("리뷰 받는 회원 식별자"),
                        fieldWithPath("companionId").type(JsonFieldType.NUMBER).description("동행글 식별자"),
                        fieldWithPath("score").type(JsonFieldType.NUMBER).description("평가 점수"),
                        fieldWithPath("content").type(JsonFieldType.STRING).description("평가 내용").optional()
                    )
                ),
                responseHeaders(
                    headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                )));
    }
}