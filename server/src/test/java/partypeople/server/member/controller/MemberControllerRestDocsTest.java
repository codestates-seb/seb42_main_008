package partypeople.server.member.controller;

import com.google.gson.Gson;
import lombok.Builder;
import lombok.Getter;
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
import org.springframework.http.ResponseEntity;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import partypeople.server.InitDb;
import partypeople.server.companion.dto.CompanionDto;
import partypeople.server.companion.entity.Companion;
import partypeople.server.companion.mapper.CompanionMapper;
import partypeople.server.config.SecurityConfigurationTest;
import partypeople.server.controller.MemberControllerTest;
import partypeople.server.dto.SingleResponseDto;
import partypeople.server.member.dto.FollowDto;
import partypeople.server.member.dto.MemberDto;
import partypeople.server.member.entity.Follow;
import partypeople.server.member.entity.Member;
import partypeople.server.member.mapper.MemberMapper;
import partypeople.server.member.service.FollowService;
import partypeople.server.member.service.MemberService;
import partypeople.server.review.dto.ReviewDto;
import partypeople.server.review.entity.Review;
import partypeople.server.review.mapper.ReviewMapper;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static partypeople.server.util.ApiDocumentUtils.getRequestPreProcessor;
import static partypeople.server.util.ApiDocumentUtils.getResponsePreProcessor;

@WebMvcTest(MemberController.class)
@MockBean(JpaMetamodelMappingContext.class)
@Import({SecurityConfigurationTest.class, MemberControllerTest.class})
@AutoConfigureRestDocs
public class MemberControllerRestDocsTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private MemberService memberService;
    @MockBean
    private MemberMapper memberMapper;
    @MockBean
    private FollowService followService;
    @MockBean
    private ReviewMapper reviewMapper;
    @MockBean
    private CompanionMapper companionMapper;


//    @WithMockUser(username= "zipcks1381@gmail2.com", password="a12345678", roles="USER")
    @Test
    @DisplayName("멤버 등록")
    public void postMemberTest() throws Exception {
        // given
        MemberDto.Post post = MemberDto.Post.builder()
                .email("postmember@gmail.com")
                .nickname("nickname")
                .password("a12345678")
                .build();

        String content = gson.toJson(post);

        Member mockResultMember = new Member();
        mockResultMember.setMemberId(1L);

        given(memberMapper.memberPostToMember(Mockito.any(MemberDto.Post.class))).willReturn(new Member());
        given(memberService.createMember(Mockito.any(Member.class))).willReturn(mockResultMember);



        // when
        ResultActions actions =
                mockMvc.perform(
                        post("/members")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        // then
        actions
                .andExpect(status().isCreated())
                .andDo(document(
                        "member-post-member",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("이메일")
                                                .attributes(key("constraints").value("이메일 주소의 형식만 가능")),
                                        fieldWithPath("nickname").type(JsonFieldType.STRING).description("닉네임")
                                                .attributes(key("constraints").value("중복 허용 안함")),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호")
                                                .attributes(key("constraints").value("문자 하나 포함, 길이 8이상, 숫자 포함"))
                                )
                        ),
                        responseHeaders(
                                headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI (ex) /members/{member-id}")
                        )
                ));
    }

    @Test
    @DisplayName("멤버 수정")
    public void patchMemberTest() throws Exception {
        //given
        long memberId = 1L;

        MemberDto.Patch patch = MemberDto.Patch.builder()
                .profile("profile-patch")
                .gender("gender-patch")
                .password("a123456789")
                .nickname("nickname-patch")
                .content("content-patch")
                .build();
        String content = gson.toJson(patch);

        Member mockResultMember = new Member();
        mockResultMember.setMemberId(1L);

        given(memberMapper.memberPatchToMember(Mockito.any(MemberDto.Patch.class))).willReturn(new Member());
        given(memberService.updateMember(Mockito.any(Member.class))).willReturn(mockResultMember);
//        given(memberMapper.memberToMemberResponse(Mockito.any(Member.class))).willReturn(responseDto);
        // when
        ResultActions actions =
                mockMvc.perform(
                        patch("/members/{member-id}",memberId)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );
        // then
        actions
                .andExpect(status().isOk())
                .andDo(document(
                        "member-patch-member",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("member-id").description("회원 식별자")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("nickname").type(JsonFieldType.STRING).description("닉네임 변경").optional()
                                                .attributes(key("constraints").value("중복 허용 안함")),
                                        fieldWithPath("profile").type(JsonFieldType.STRING).description("프로필 변경").optional(),
                                        fieldWithPath("gender").type(JsonFieldType.STRING).description("성별 변경").optional(),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호 변경").optional(),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("자기소개 글 변경").optional()

                                )
                        )
                ));
        //        MemberDto.Response responseDto = MemberDto.Response.builder()
//                .memberId(1L)
//                .nickname("nickname")
//                .email("postmember@gmail.com")
//                .profile("profile")
//                .createdAt("2023-03-14T12:03:28.538707")
//                .modifiedAt("2023-03-14T13:45:40.382285")
//                .followerCount(0)
//                .followingCount(0)
//                .memberStatus("활동중")
//                .score(50)
//                .build();
    }

    @Test
    @DisplayName("멤버 로그인")
    public void loginMemberTest() throws Exception {
        //given
        MemberDto.Login login = new MemberDto.Login();
        login.setEmail("zipcks1381@gmail2.com");
        login.setPassword("a12345678");
        String content = gson.toJson(login);

        ResultActions actions =
                mockMvc.perform(
                        post("/members/login")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        actions
                .andExpect(status().isOk())
                .andDo(document(
                        "member-login-member",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        responseHeaders(
                          headerWithName("Authorization").description("로그인 시 발급한 엑세스토큰(회원정보-식별자,닉네임,이메일,프로필,상태,성별,권한 들어있음)")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("로그인 아이디").optional()
                                                .attributes(key("constraints").value("이메일 형식")),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호").optional()
                                )
                        )
                        //응답데이터 아직 미정 TODO..

                ));
    }

    @Test
    @DisplayName("로그아웃")
    public void logoutMemberTest() throws Exception {
        String accessToken = "Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6WyJVU0VSIl0sIm1lbWJlclN0YXR1cyI6Ik1FTUJFUl9BQ1RJVkUiLCJlbWFpbCI6InppcGNrczEzODFAZ21haWwyLmNvbSIsIm1lbWJlcklkIjoyLCJzdWIiOiJ6aXBja3MxMzgxQGdtYWlsMi5jb20iLCJpYXQiOjE2NzkwMTU0NDcsImV4cCI6MTY3OTAxNjA0N30.2c_jkLcbh3MEVkWc4wGEUpVHKc0qyngL2_UahF7nri9UvxhwhawjYSul_4MuaV49";

        doNothing().when(memberService).logout(accessToken);

        ResultActions actions =
                mockMvc.perform(
                        post("/members/logout")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .header(HttpHeaders.AUTHORIZATION, accessToken)
                );

        actions
                .andExpect(status().isOk())
                .andDo(document(
                        "member-logout-member",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                                requestHeaders(
                                        headerWithName("Authorization").description("로그인한 유저의 유효한 AccessToken(만료를 위해 필요)")
                                )
                        )
                );

    }

    @Test
    @DisplayName("회원탈퇴")
    public void deleteMemberTest() throws Exception {
        Long memberId = 1L;
        MemberDto.Password password = new MemberDto.Password();
        password.setPassword("a12345678");
        String content = gson.toJson(password);

        doNothing().when(memberService).deleteMember(memberId, password.getPassword());

        ResultActions actions =
                mockMvc.perform(
                        delete("/members/{member-id}",memberId)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        actions
                .andExpect(status().isNoContent())
                .andDo(document(
                                "member-delete-member",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        parameterWithName("member-id").description("회원 식별자")
                                )
                        )
                );

    }

    @Test
    @DisplayName("엑세스토큰 재발급")
    public void reissueAccessTokenTest() throws Exception {
        //given
        String reissueAT = "Bearer eyJhbGciOiJIUzM4NCJ9.eyJnZW5kZXIiOiJOT05FIiwicHJvZmlsZSI6Imh0dHBzOi8vc291cmNlLmJvcmluZ2F2YXRhcnMuY29tL2JlYW0iLCJyb2xlcyI6WyJVU0VSIl0sIm5pY2tuYW1lIjoiSm9lMyIsIm1lbWJlclN0YXR1cyI6Ik1FTUJFUl9BQ1RJVkUiLCJlbWFpbCI6InppcGNrczEzODFAZ21haWwzLmNvbSIsIm1lbWJlcklkIjozLCJzdWIiOiJ6aXBja3MxMzgxQGdtYWlsMy5jb20iLCJpYXQiOjE2NzkzODI5MDcsImV4cCI6MTY3OTM4MzUwN30.zTHmlFbtwmaCYXs5ZqWcfJL-xm8W2mzhOdKgP2bHggrZLaGYoXzO9sOwvaD7x7u_";
        given(memberService.reissueAT(Mockito.anyString())).willReturn(reissueAT);

        //when
        ResultActions actions =
                mockMvc.perform(
                        post("/members/reissue")
                                .header("Refresh","eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ6aXBja3MxMzgxQGdtYWlsMy5jb20iLCJpYXQiOjE2NzkzODI2NjEsImV4cCI6MTY3OTQwMDY2MX0.apDLPBafmOyFh9Wj4nKKgD5hO73psz8k-TiCl1gZUjCtbhaGexjSmZiUOq8eHHRv")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                );
        //then
        actions
                .andExpect(status().isOk())
                .andDo(document(
                                "member-reissue-accessToken",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                requestHeaders(
                                    headerWithName("Refresh").description("유효한 리프레쉬 토큰 값")
                                ),
                                responseHeaders(
                                    headerWithName("Authorization").description("재발급한 엑세스 토큰값")
                                )
                        )
                );
    }

    @PostMapping("/reissue")
    public ResponseEntity reissueAccessToken(@RequestHeader("Refresh") String refreshToken) {
        //리프레쉬 토큰 유효시간 확인
        String reissueAT = memberService.reissueAT(refreshToken);
        //확인 후 유효기간 안이면 AccessToken 재발급 전송
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + reissueAT);

        return ResponseEntity.ok().headers(headers).build();
    }

    @Test
    @DisplayName("회원조회")
    public void getMemberTest() throws Exception {
        // given
        Long memberId = 1L;
        MemberDto.Response response = MemberDto.Response.builder()
                .email("postmember@gmail.com")
                .nickname("nickname")
                .profile("profile")
                .content("content")
                .gender("male")
                .score(0)
                .followerCount(0)
                .followingCount(0)
                .followerStatus(false)
                .memberStatus("활동중")
                .memberId(1L)
                .build();

        given(memberService.findMember(memberId)).willReturn(new Member());
        given(memberMapper.memberToMemberResponse(Mockito.any(Member.class),Mockito.anyBoolean())).willReturn(response);

        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("loginMemberId","2");

        //when
        ResultActions actions =
                mockMvc.perform(
                        get("/members/{member-id}",memberId)
                                .params(queryParams)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.memberId").value(response.getMemberId()))
                .andExpect(jsonPath("$.data.email").value(response.getEmail()))
                .andExpect(jsonPath("$.data.nickname").value(response.getNickname()))
                .andExpect(jsonPath("$.data.profile").value(response.getProfile()))
                .andExpect(jsonPath("$.data.content").value(response.getContent()))
                .andExpect(jsonPath("$.data.gender").value(response.getGender()))
                .andExpect(jsonPath("$.data.score").value(response.getScore()))
                .andExpect(jsonPath("$.data.followerCount").value(response.getFollowerCount()))
                .andExpect(jsonPath("$.data.followingCount").value(response.getFollowingCount()))
                .andExpect(jsonPath("$.data.followerStatus").value(response.getFollowerStatus()))
                .andExpect(jsonPath("$.data.memberStatus").value(response.getMemberStatus()))
                .andDo(document(
                                "member-get-member",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        parameterWithName("member-id").description("회원 식별자 (조회하려는 회원의 식별자)")
                                ),
                                requestParameters(
                                        parameterWithName("loginMemberId").description("현재 로그인한 회원의 식별자")
                                ),
                                responseFields(
                                        fieldWithPath("data.memberId").description("조회한 회원 식별자").attributes(
                                                key("constraints").value("ID")
                                        ),
                                        fieldWithPath("data.email").description("조회한 회원 이메일주소").attributes(
                                                key("constraints").value("E-mail 형식")
                                        ),
                                        fieldWithPath("data.nickname").description("회원 닉네임"),
                                        fieldWithPath("data.profile").description("회원 프로필"),
                                        fieldWithPath("data.content").description("회원 자기소개글"),
                                        fieldWithPath("data.gender").description("회원 성별").attributes(
                                                key("constraints").value("NONE / MALE / FEMALE")
                                        ),
                                        fieldWithPath("data.score").description("회원 점수").attributes(
                                                key("constraints").value("기본점수 50점")
                                        ),
                                        fieldWithPath("data.followerCount").description("회원 팔로워 수"),
                                        fieldWithPath("data.followingCount").description("회원 팔로잉 수"),
                                        fieldWithPath("data.memberStatus").description("회원 상태").attributes(
                                                key("constraints").value("활동중 / 탈퇴 상태")
                                        ),
                                        fieldWithPath("data.followerStatus").description("팔로워 상태").attributes(
                                                key("constraints").value("로그인한 회원이 조회한 회원을 팔로워 했는지 여부 (True/False)")
                                        ),
                                        fieldWithPath("data.createdAt").description("회원 생성 시간").ignored(),
                                        fieldWithPath("data.modifiedAt").description("회원 수정 시간").ignored()
                                )
                        )
                );

    }

    @Test
    @DisplayName("닉네임 중복 체크")
    public void nicknameCheckTest() throws Exception {
        MemberDto.Nickname nickname = new MemberDto.Nickname();
        nickname.setNickname("nickname");
        String content = gson.toJson(nickname);
        doNothing().when(memberService).verifyExistsNickname(Mockito.anyString());

        ResultActions actions =
                mockMvc.perform(
                        post("/members/nickname")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        actions
                .andExpect(status().isOk())
                .andDo(document(
                                "member-nickname-check",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                requestFields(
                                        List.of(
                                                fieldWithPath("nickname").type(JsonFieldType.STRING).description("확인 할 닉네임")
                                        )
                                )
                        )
                );
    }

    @Test
    @DisplayName("신청한 글 조회")
    public void getSubscriberListTest() throws Exception {
        Long memberId = 1L;
        List<CompanionDto.ResponseMember> responses = new ArrayList<>();
        responses.add(InitDb.response1);
        responses.add(InitDb.response2);
        responses.add(InitDb.response3);

        given(memberService.findAllSubscriberById(Mockito.anyLong())).willReturn(new ArrayList<Companion>());
        given(companionMapper.companionsToCompanionResponseMembers(Mockito.anyList())).willReturn(responses);

        //when
        ResultActions actions =
                mockMvc.perform(
                        get("/members/{member-id}/subscribers",memberId)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andDo(document(
                                "member-get-subscriberList",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        parameterWithName("member-id").description("회원 식별자")
                                ),
//                                requestParameters(
//                                        parameterWithName("loginMemberId").description("현재 로그인한 회원의 식별자")
//                                ),

                                responseFields(
                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("응답 데이터"),
                                        fieldWithPath("data[].companionId").type(JsonFieldType.NUMBER).description("동행글 식별자"),
                                        fieldWithPath("data[].address").type(JsonFieldType.STRING).description("여행 주소"),
                                        fieldWithPath("data[].lat").type(JsonFieldType.NUMBER).description("위도").attributes(
                                                key("constraints").value("000.00000")),
                                        fieldWithPath("data[].lng").type(JsonFieldType.NUMBER).description("경도").attributes(
                                                key("constraints").value("000.00000")),
                                        fieldWithPath("data[].date").type(JsonFieldType.STRING).description("여행 일자").attributes(
                                                key("constraints").value("0000-00-00")),
                                        fieldWithPath("data[].companionStatus").type(JsonFieldType.BOOLEAN).description("동행글 읽은 여부").attributes(
                                                key("constraints").value("0000-00-00"))
                                )
                        )
                );
    }

    @Test
    @DisplayName("참여한 글 조회")
    public void getParticipantListTest() throws Exception {
        Long memberId = 1L;
        List<CompanionDto.ResponseMember> responses = new ArrayList<>();
        responses.add(InitDb.response1);
        responses.add(InitDb.response2);
        responses.add(InitDb.response3);

        given(memberService.findAllParticipantById(Mockito.anyLong())).willReturn(new ArrayList<Companion>());
        given(companionMapper.companionsToCompanionResponseMembers(Mockito.anyList())).willReturn(responses);

        //when
        ResultActions actions =
                mockMvc.perform(
                        get("/members/{member-id}/participants",memberId)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andDo(document(
                                "member-get-participantList",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        parameterWithName("member-id").description("회원 식별자")
                                ),
//                                requestParameters(
//                                        parameterWithName("loginMemberId").description("현재 로그인한 회원의 식별자")
//                                ),

                                responseFields(
                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("응답 데이터"),
                                        fieldWithPath("data[].companionId").type(JsonFieldType.NUMBER).description("동행글 식별자"),
                                        fieldWithPath("data[].address").type(JsonFieldType.STRING).description("여행 주소"),
                                        fieldWithPath("data[].lat").type(JsonFieldType.NUMBER).description("위도").attributes(
                                                key("constraints").value("000.00000")),
                                        fieldWithPath("data[].lng").type(JsonFieldType.NUMBER).description("경도").attributes(
                                                key("constraints").value("000.00000")),
                                        fieldWithPath("data[].date").type(JsonFieldType.STRING).description("여행 일자").attributes(
                                                key("constraints").value("0000-00-00")),
                                        fieldWithPath("data[].companionStatus").type(JsonFieldType.BOOLEAN).description("동행글 읽은 여부").attributes(
                                                key("constraints").value("0000-00-00"))
                                )
                        )
                );
    }

    @Test
    @DisplayName("작성한 글 조회")
    public void getWriterListTest() throws Exception {
        Long memberId = 1L;
        List<CompanionDto.ResponseMember> responses = new ArrayList<>();
        responses.add(InitDb.response1);
        responses.add(InitDb.response2);
        responses.add(InitDb.response3);

        given(memberService.findAllWriterById(Mockito.anyLong())).willReturn(new ArrayList<Companion>());
        given(companionMapper.companionsToCompanionResponseMembers(Mockito.anyList())).willReturn(responses);

        //when
        ResultActions actions =
                mockMvc.perform(
                        get("/members/{member-id}/writers",memberId)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andDo(document(
                                "member-get-writerList",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        parameterWithName("member-id").description("회원 식별자")
                                ),
//                                requestParameters(
//                                        parameterWithName("loginMemberId").description("현재 로그인한 회원의 식별자")
//                                ),

                                responseFields(
                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("응답 데이터"),
                                        fieldWithPath("data[].companionId").type(JsonFieldType.NUMBER).description("동행글 식별자"),
                                        fieldWithPath("data[].address").type(JsonFieldType.STRING).description("여행 주소"),
                                        fieldWithPath("data[].lat").type(JsonFieldType.NUMBER).description("위도").attributes(
                                                key("constraints").value("000.00000")),
                                        fieldWithPath("data[].lng").type(JsonFieldType.NUMBER).description("경도").attributes(
                                                key("constraints").value("000.00000")),
                                        fieldWithPath("data[].date").type(JsonFieldType.STRING).description("여행 일자").attributes(
                                                key("constraints").value("0000-00-00")),
                                        fieldWithPath("data[].companionStatus").type(JsonFieldType.BOOLEAN).description("동행글 읽은 여부").attributes(
                                                key("constraints").value("0000-00-00"))
                                )
                        )
                );
    }

    @Test
    @DisplayName("리뷰 조회")
    public void getReviewListTest() throws Exception {
        Long memberId = 1L;
        List<ReviewDto.Response> responses = new ArrayList<>();
        responses.add(InitDb.review1);
        responses.add(InitDb.review2);
        responses.add(InitDb.review3);

        given(memberService.findAllReviewById(Mockito.anyLong())).willReturn(new ArrayList<Review>());
        given(reviewMapper.reviewsToReviewResponses(Mockito.anyList())).willReturn(responses);

        //when
        ResultActions actions =
                mockMvc.perform(
                        get("/members/{member-id}/reviews",memberId)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andDo(document(
                                "member-get-reviewList",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        parameterWithName("member-id").description("회원 식별자")
                                ),
                                responseFields(
                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("응답 데이터"),
                                        fieldWithPath("data[].score").type(JsonFieldType.NUMBER).description("리뷰 점수").attributes(
                                                key("constraints").value("1/0/-1 점수")),
                                        fieldWithPath("data[].content").type(JsonFieldType.STRING).description("리뷰 내용")
                                )
                        )
                );
    }

    @Test
    @DisplayName("팔로우 등록/취소")
    public void postFollowTest() throws Exception {
        Long followerId = 1L;
        Long followingId = 2L;
        FollowDto.Post followPost = FollowDto.Post.builder()
                .followerId(followerId)
                .followingId(followingId)
                .build();
        String content = gson.toJson(followPost);
        FollowDto.FollowerStatus followerStatus = new FollowDto.FollowerStatus(true);

        given(memberService.findMember(Mockito.anyLong())).willReturn(new Member());
        given(memberService.findMember(Mockito.anyLong())).willReturn(new Member());
        given(followService.followExe(Mockito.any(Follow.class))).willReturn(followerStatus);

        //when
        ResultActions actions =
                mockMvc.perform(
                        post("/members/follows")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );
        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.followerStatus").value(followerStatus.getFollowerStatus()))
                .andDo(document(
                        "follow-post-follow",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("followerId").type(JsonFieldType.NUMBER).description("팔로워 식별자").optional()
                                                .attributes(key("constraints").value("로그인한사람(신청자)")),
                                        fieldWithPath("followingId").type(JsonFieldType.NUMBER).description("팔로잉 식별자").optional()
                                                .attributes(key("constraints").value("팔로우 대상(대상자)"))
                                )
                        ),
                        responseFields(
                                fieldWithPath("data.followerStatus").type(JsonFieldType.BOOLEAN).description("팔로워 상태 여부").attributes(
                                        key("constraints").value("true : 팔로워 상태 / false : 팔로워 미상태"))
                        )
                ));
    }

    @Test
    @DisplayName("팔로잉 조회")
    public void getFollowingTest() throws Exception {
        Long memberId = 1L;
        List<FollowDto.FollowerResponse> responses = new ArrayList<>();
        responses.add(InitDb.follow1);
        responses.add(InitDb.follow2);
        responses.add(InitDb.follow3);

        given(followService.findFollowings(Mockito.anyLong())).willReturn(new ArrayList<Follow>());
        given(memberMapper.followsToFollowerResponses(Mockito.anyList())).willReturn(responses);

        //when
        ResultActions actions =
                mockMvc.perform(
                        get("/members/{member-id}/following",memberId)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                );
        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andDo(document(
                                "follow-get-followingList",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        parameterWithName("member-id").description("회원 식별자")
                                ),
                                responseFields(
                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("응답 데이터"),
                                        fieldWithPath("data[].memberId").type(JsonFieldType.NUMBER).description("팔로잉 멤버 식별자"),
                                        fieldWithPath("data[].profile").type(JsonFieldType.STRING).description("팔로잉 멤버 프로필"),
                                        fieldWithPath("data[].nickname").type(JsonFieldType.STRING).description("팔로잉 멤버 닉네임")
                                )
                        )
                );

    }

    @Test
    @DisplayName("팔로워 조회")
    public void getFollowerTest() throws Exception {
        Long memberId = 1L;
        List<FollowDto.FollowingResponse> responses = new ArrayList<>();
        responses.add(InitDb.follow4);
        responses.add(InitDb.follow5);
        responses.add(InitDb.follow6);

        given(followService.findFollowers(Mockito.anyLong())).willReturn(new ArrayList<Follow>());
        given(memberMapper.followsToFollowingResponses(Mockito.anyList())).willReturn(responses);

        //when
        ResultActions actions =
                mockMvc.perform(
                        get("/members/{member-id}/follower",memberId)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                );
        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andDo(document(
                                "follow-get-followerList",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        parameterWithName("member-id").description("회원 식별자")
                                ),
                                responseFields(
                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("응답 데이터"),
                                        fieldWithPath("data[].memberId").type(JsonFieldType.NUMBER).description("팔로워 멤버 식별자"),
                                        fieldWithPath("data[].profile").type(JsonFieldType.STRING).description("팔로워 멤버 프로필"),
                                        fieldWithPath("data[].nickname").type(JsonFieldType.STRING).description("팔로워 멤버 닉네임")
                                )
                        )
                );

    }
}
