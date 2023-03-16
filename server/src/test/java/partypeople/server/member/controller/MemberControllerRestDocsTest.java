package partypeople.server.member.controller;

import com.google.gson.Gson;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import partypeople.server.auth.configure.SecurityConfiguration;
import partypeople.server.companion.mapper.CompanionMapper;
import partypeople.server.config.SecurityConfigurationTest;
import partypeople.server.dto.SingleResponseDto;
import partypeople.server.member.dto.MemberDto;
import partypeople.server.member.entity.Member;
import partypeople.server.member.mapper.MemberMapper;
import partypeople.server.member.service.MemberService;
import partypeople.server.review.mapper.ReviewMapper;

import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static partypeople.server.util.ApiDocumentUtils.getRequestPreProcessor;
import static partypeople.server.util.ApiDocumentUtils.getResponsePreProcessor;

@WebMvcTest(MemberController.class)
@MockBean(JpaMetamodelMappingContext.class)
@Import(SecurityConfigurationTest.class)
@AutoConfigureRestDocs
//@ContextConfiguration(classes = SecurityConfiguration.class)
//@WebAppConfiguration
//@SpringBootTest
public class MemberControllerRestDocsTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MemberService memberService;

    @MockBean
    private MemberMapper memberMapper;

    @MockBean
    private ReviewMapper reviewMapper;

    @MockBean
    private CompanionMapper companionMapper;

    @Autowired
    private Gson gson;
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
                        "post-member",
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
//                        responseFields(
//                                fieldWithPath("status").description("응답 상태 코드").attributes(
//                                        key("constraints").value("201")
//                                ),
//                                fieldWithPath("message").description("응답 메시지"),
//                                fieldWithPath("data").description("응답 데이터").optional(),
//                                fieldWithPath("error").description("에러 정보").optional(),
//                                subsectionWithPath("error.code").description("에러 코드").attributes(
//                                        key("constraints").value("400, 401, 404, 500")
//                                ),
//                                subsectionWithPath("error.message").description("에러 메시지").attributes(
//                                        key("constraints").value("예: 유효하지 않은 요청입니다.")
//                                )
//                        )
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
                        "patch-member",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
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
    @WithMockUser(username= "zipcks1381@gmail2.com", password="a12345678", roles="USER")
    public void loginMemberTest() throws Exception {
        //given
        MemberDto.Login login = MemberDto.Login.builder()
                .email("zipcks1381@gmail2.com")
                .password("a12345678")
                .build();
        String content = gson.toJson(login);

        ResultActions actions =
                mockMvc.perform(
                        post("/members/login")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        actions
//                .andExpect(status().isOk())
                .andDo(document(
                        "login-member",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
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

}
