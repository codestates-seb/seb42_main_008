package partypeople.server.companion.controller;

import com.google.gson.Gson;
import com.jayway.jsonpath.JsonPath;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import partypeople.server.companion.dto.CompanionDto;
import partypeople.server.companion.entity.Companion;
import partypeople.server.companion.mapper.CompanionMapper;
import partypeople.server.companion.service.CompanionService;
import partypeople.server.config.SecurityConfigurationTest;
import partypeople.server.tag.entity.Tag;
import partypeople.server.tag.service.TagService;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static partypeople.server.util.ApiDocumentUtils.*;

@AutoConfigureRestDocs
@WebMvcTest(CompanionController.class)
@MockBean(JpaMetamodelMappingContext.class)
@Import(SecurityConfigurationTest.class)
public class CompanionControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private CompanionService companionService;

    @MockBean
    private CompanionMapper mapper;

    @MockBean
    private TagService tagService;

    @Test
    @DisplayName("Post Companion Test")
    void postCompanionTest() throws Exception {
        // given
        Post request = new Post(
                "일본 유니버셜 같이 가요",
                "유니버셜 혼자 가게 됐는데 같이 가실 분 있나요? 같이 버터맥주 마셔요!",
                "2023-03-30",
                "일본 유니버셜스튜디오",
                123.45678,
                123.12345,
                "일본",
                "jpn",
                2,
                new ArrayList<>(Arrays.asList("내향", "테마파크")),
                2L
        );
        String content = gson.toJson(request);
        Companion companion = new Companion();
        companion.setCompanionId(1L);

        List<Tag> mockTagList = mock(List.class);
        Tag mockTag = mock(Tag.class);
        when(mockTagList.add(mockTag)).thenReturn(true);


        given(tagService.findTagsByNames(Mockito.anyList())).willReturn(new ArrayList<>());
        given(mapper.companionPostDtoToCompanion(Mockito.any(CompanionDto.Post.class), Mockito.anyList())).willReturn(new Companion());
        given(companionService.createCompanion(Mockito.any(Companion.class))).willReturn(companion);

        // when
        ResultActions actions = mockMvc.perform(
                post("/companions")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content));

        // then
        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("location", is(Matchers.startsWith("/companions"))))
                .andDo(document("companion-post-companion",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                fieldWithPath("title").type(JsonFieldType.STRING).description("동행글 제목").attributes(key("constraints").value("공백 허용 안 함")),
                                fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("작성자 식별자").attributes(key("constraints").value("자연수")),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("동행글 내용").attributes(key("constraints").value("공백 허용 안 함")),
                                fieldWithPath("date").type(JsonFieldType.STRING).description("동행 날짜").attributes(key("constraints").value("yyyy-mm-dd 형식")),
                                fieldWithPath("address").type(JsonFieldType.STRING).description("동행 주소").attributes(key("constraints").value("공백 허용 안 함")),
                                fieldWithPath("lat").type(JsonFieldType.NUMBER).description("위도").attributes(key("constraints").value("소수점 아래 5자리 포함 최대 8자리")),
                                fieldWithPath("lng").type(JsonFieldType.NUMBER).description("경도").attributes(key("constraints").value("소수점 아래 5자리 포함 최대 8자리")),
                                fieldWithPath("nationName").type(JsonFieldType.STRING).description("국가").attributes(key("constraints").value("공백 허용 안 함")),
                                fieldWithPath("nationCode").type(JsonFieldType.STRING).description("국가 코드").attributes(key("constraints").value("공백 허용 안 함")),
                                fieldWithPath("continent").type(JsonFieldType.NUMBER).description("대륙 코드").attributes(key("constraints").value("자연수")),
                                fieldWithPath("tags").type(JsonFieldType.ARRAY).description("태그").attributes(key("constraints").value("최소 2개, 최대 5개"))
                        ),
                        responseHeaders(
                                headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                        )));
    }

    @Test
    @DisplayName("Patch Companion Test")
    void patchCompanionTest() throws Exception {
        // given
        Patch request = new Patch(1L,
                "일본 유니버셜 같이 가요",
                "유니버셜 혼자 가게 됐는데 같이 가실 분 있나요? 같이 버터맥주 마셔요!",
                "2023-03-30",
                "일본 유니버셜스튜디오",
                123.45678,
                123.12345,
                "일본",
                "jpn",
                2,
                new ArrayList<>(Arrays.asList("내향", "테마파크"))
        );
        String content = gson.toJson(request);
        Companion companion = new Companion();
        companion.setCompanionId(1L);

        List<Tag> mockTagList = mock(List.class);
        Tag mockTag = mock(Tag.class);
        when(mockTagList.add(mockTag)).thenReturn(true);

        CompanionDto.Response response = new CompanionDto.Response(
                1L,
                2L,
                "member2",
                "profile",
                100,
                "일본 유니버셜 같이 가요",
                "유니버셜 혼자 가게 됐는데 같이 가실 분 있나요? 같이 버터맥주 마셔요!",
                LocalDate.of(2023, 3, 30),
                LocalDate.of(2023, 3, 29),
                "일본 유니버셜스튜디오",
                123.45678,
                123.12345,
                "일본",
                "jpn",
                2,
                new ArrayList<>(Arrays.asList("내향", "테마파크")),
                false
        );


        given(tagService.findTagsByNames(Mockito.anyList())).willReturn(new ArrayList<>());
        given(mapper.companionPatchDtoToCompanion(Mockito.any(CompanionDto.Patch.class), Mockito.anyList())).willReturn(new Companion());
        given(companionService.updateCompanion(Mockito.any(Companion.class))).willReturn(companion);
        given(mapper.companionToCompanionResponseDto(Mockito.any(Companion.class))).willReturn(response);


        // when
        ResultActions actions = mockMvc.perform(
                patch("/companions/{companion-id}", companion.getCompanionId())
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content));


        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.companionId").value(response.getCompanionId()))
                .andExpect(jsonPath("$.data.memberId").value(response.getMemberId()))
                .andExpect(jsonPath("$.data.nickname").value(response.getNickname()))
                .andExpect(jsonPath("$.data.profile").value(response.getProfile()))
                .andExpect(jsonPath("$.data.score").value(response.getScore()))
                .andExpect(jsonPath("$.data.title").value(response.getTitle()))
                .andExpect(jsonPath("$.data.content").value(response.getContent()))
                .andExpect(jsonPath("$.data.date").exists())
                .andExpect(jsonPath("$.data.createdAt").exists())
                .andExpect(jsonPath("$.data.address").value(response.getAddress()))
                .andExpect(jsonPath("$.data.lat").value(response.getLat()))
                .andExpect(jsonPath("$.data.lng").value(response.getLng()))
                .andExpect(jsonPath("$.data.nationName").value(response.getNationName()))
                .andExpect(jsonPath("$.data.nationCode").value(response.getNationCode()))
                .andExpect(jsonPath("$.data.continent").value(response.getContinent()))
                .andExpect(jsonPath("$.data.tags").isArray())
                .andExpect(jsonPath("$.data.companionStatus").value(response.isCompanionStatus()))
                .andDo(document("companion-patch-companion",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("companion-id").description("동행글 식별자")
                        ),
                        requestFields(
                                fieldWithPath("companionId").type(JsonFieldType.NUMBER).description("동행글 식별자").ignored(),
                                fieldWithPath("title").type(JsonFieldType.STRING).description("동행글 제목").optional().attributes(key("constraints").value("공백 허용 안 함")),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("동행글 내용").optional().attributes(key("constraints").value("공백 허용 안 함")),
                                fieldWithPath("date").type(JsonFieldType.STRING).description("동행 날짜").optional().attributes(key("constraints").value("yyyy-mm-dd 형식")),
                                fieldWithPath("address").type(JsonFieldType.STRING).description("동행 주소").optional().attributes(key("constraints").value("공백 허용 안 함")),
                                fieldWithPath("lat").type(JsonFieldType.NUMBER).description("위도").optional().attributes(key("constraints").value("소수점 아래 5자리 포함 최대 8자리")),
                                fieldWithPath("lng").type(JsonFieldType.NUMBER).description("경도").optional().attributes(key("constraints").value("소수점 아래 5자리 포함 최대 8자리")),
                                fieldWithPath("nationName").type(JsonFieldType.STRING).description("국가").optional().attributes(key("constraints").value("공백 허용 안 함")),
                                fieldWithPath("nationCode").type(JsonFieldType.STRING).description("국가 코드").optional().attributes(key("constraints").value("공백 허용 안 함")),
                                fieldWithPath("continent").type(JsonFieldType.NUMBER).description("대륙 코드").optional().attributes(key("constraints").value("자연수")),
                                fieldWithPath("tags").type(JsonFieldType.ARRAY).description("태그").optional().attributes(key("constraints").value("최소 2개, 최대 5개"))
                        ),
                        responseFields(
                                fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                fieldWithPath("data.companionId").type(JsonFieldType.NUMBER).description("동행글 식별자"),
                                fieldWithPath("data.memberId").type(JsonFieldType.NUMBER).description("작성자 식별자"),
                                fieldWithPath("data.nickname").type(JsonFieldType.STRING).description("작성자 닉네임"),
                                fieldWithPath("data.profile").type(JsonFieldType.STRING).description("작성자 프로필"),
                                fieldWithPath("data.score").type(JsonFieldType.NUMBER).description("작성자 점수"),
                                fieldWithPath("data.title").type(JsonFieldType.STRING).description("동행글 제목"),
                                fieldWithPath("data.content").type(JsonFieldType.STRING).description("동행글 내용"),
                                fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("동행글 작성 날짜"),
                                fieldWithPath("data.date").type(JsonFieldType.STRING).description("동행 날짜"),
                                fieldWithPath("data.address").type(JsonFieldType.STRING).description("동행 주소"),
                                fieldWithPath("data.lat").type(JsonFieldType.NUMBER).description("위도"),
                                fieldWithPath("data.lng").type(JsonFieldType.NUMBER).description("경도"),
                                fieldWithPath("data.nationName").type(JsonFieldType.STRING).description("국가"),
                                fieldWithPath("data.nationCode").type(JsonFieldType.STRING).description("국가 코드"),
                                fieldWithPath("data.continent").type(JsonFieldType.NUMBER).description("대륙 코드"),
                                fieldWithPath("data.tags").type(JsonFieldType.ARRAY).description("태그"),
                                fieldWithPath("data.companionStatus").type(JsonFieldType.BOOLEAN).description("동행 완료 여부")
                        )));
    }

    @Test
    @DisplayName("Delete Companion Test")
    void deleteCompanionTest() throws Exception {
        // given
        doNothing().when(companionService).deleteCompanion(Mockito.anyLong());
        Long companionId = 1L;

        //when
        ResultActions actions = mockMvc.perform(
                delete("/companions/{companion-id}", companionId)
        );

        // then
        actions
                .andExpect(status().isNoContent())
                .andDo(document("companion-delete-companion",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("companion-id").description("동행글 식별자")
                        )
                ));

    }

    @Test
    @DisplayName("Get Companion Test")
    void getCompanionTest() throws Exception {
        // given
        Long companionId = 1L;

        CompanionDto.Response response = new CompanionDto.Response(
                1L,
                2L,
                "member2",
                "profile",
                100,
                "일본 유니버셜 같이 가요",
                "유니버셜 혼자 가게 됐는데 같이 가실 분 있나요? 같이 버터맥주 마셔요!",
                LocalDate.of(2023, 3, 30),
                LocalDate.of(2023, 3, 29),
                "일본 유니버셜스튜디오",
                123.45678,
                123.12345,
                "일본",
                "jpn",
                2,
                new ArrayList<>(Arrays.asList("내향", "테마파크")),
                false
        );

        given(companionService.findCompanion(Mockito.anyLong())).willReturn(new Companion());
        given(mapper.companionToCompanionResponseDto(Mockito.any(Companion.class))).willReturn(response);


        // when
        ResultActions actions = mockMvc.perform(
                get("/companions/{companion-id}", companionId)
        );


        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.companionId").value(response.getCompanionId()))
                .andExpect(jsonPath("$.data.memberId").value(response.getMemberId()))
                .andExpect(jsonPath("$.data.nickname").value(response.getNickname()))
                .andExpect(jsonPath("$.data.profile").value(response.getProfile()))
                .andExpect(jsonPath("$.data.score").value(response.getScore()))
                .andExpect(jsonPath("$.data.title").value(response.getTitle()))
                .andExpect(jsonPath("$.data.content").value(response.getContent()))
                .andExpect(jsonPath("$.data.date").exists())
                .andExpect(jsonPath("$.data.createdAt").exists())
                .andExpect(jsonPath("$.data.address").value(response.getAddress()))
                .andExpect(jsonPath("$.data.lat").value(response.getLat()))
                .andExpect(jsonPath("$.data.lng").value(response.getLng()))
                .andExpect(jsonPath("$.data.nationName").value(response.getNationName()))
                .andExpect(jsonPath("$.data.nationCode").value(response.getNationCode()))
                .andExpect(jsonPath("$.data.continent").value(response.getContinent()))
                .andExpect(jsonPath("$.data.tags").isArray())
                .andExpect(jsonPath("$.data.companionStatus").value(response.isCompanionStatus()))
                .andDo(document("companion-get-companion",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("companion-id").description("동행글 식별자")
                        ),
                        responseFields(
                                fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                fieldWithPath("data.companionId").type(JsonFieldType.NUMBER).description("동행글 식별자"),
                                fieldWithPath("data.memberId").type(JsonFieldType.NUMBER).description("작성자 식별자"),
                                fieldWithPath("data.nickname").type(JsonFieldType.STRING).description("작성자 닉네임"),
                                fieldWithPath("data.profile").type(JsonFieldType.STRING).description("작성자 프로필"),
                                fieldWithPath("data.score").type(JsonFieldType.NUMBER).description("작성자 점수"),
                                fieldWithPath("data.title").type(JsonFieldType.STRING).description("동행글 제목"),
                                fieldWithPath("data.content").type(JsonFieldType.STRING).description("동행글 내용"),
                                fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("동행글 작성 날짜"),
                                fieldWithPath("data.date").type(JsonFieldType.STRING).description("동행 날짜"),
                                fieldWithPath("data.address").type(JsonFieldType.STRING).description("동행 주소"),
                                fieldWithPath("data.lat").type(JsonFieldType.NUMBER).description("위도"),
                                fieldWithPath("data.lng").type(JsonFieldType.NUMBER).description("경도"),
                                fieldWithPath("data.nationName").type(JsonFieldType.STRING).description("국가"),
                                fieldWithPath("data.nationCode").type(JsonFieldType.STRING).description("국가 코드"),
                                fieldWithPath("data.continent").type(JsonFieldType.NUMBER).description("대륙 코드"),
                                fieldWithPath("data.tags").type(JsonFieldType.ARRAY).description("태그"),
                                fieldWithPath("data.companionStatus").type(JsonFieldType.BOOLEAN).description("동행 완료 여부")
                        )));
    }

    @Test
    @DisplayName("Get Companions By Nation Test")
    void getCompanionsByNationTest() throws Exception {
        // given
        int page = 1;
        int size = 10;
        String sortDir = "DESC";
        String sortBy = "createdAt";
        String nationCode = "jpn";

        Companion companion = new Companion();
        CompanionDto.Response response = new CompanionDto.Response(
                1L,
                2L,
                "member2",
                "profile",
                100,
                "일본 유니버셜 같이 가요",
                "유니버셜 혼자 가게 됐는데 같이 가실 분 있나요? 같이 버터맥주 마셔요!",
                LocalDate.of(2023, 3, 30),
                LocalDate.of(2023, 3, 29),
                "일본 유니버셜스튜디오",
                123.45678,
                123.12345,
                "일본",
                "jpn",
                2,
                new ArrayList<>(Arrays.asList("내향", "테마파크")),
                false
        );

        Page<Companion> companionPage = new PageImpl<>(List.of(companion), PageRequest.of(0, size), 0);
        List<CompanionDto.Response> responses = new ArrayList<>(List.of(response));

        given(companionService.findCompanionsByNation(Mockito.anyInt(), Mockito.anyInt(), Mockito.anyString(), Mockito.anyString(), Mockito.anyString())).willReturn(companionPage);
        given(mapper.companionsToCompanionResponseDtos(Mockito.anyList())).willReturn(responses);


        // when
        ResultActions actions = mockMvc.perform(
                get("/companions/nations")
                        .param("page", String.valueOf(page))
                        .param("size", String.valueOf(size))
                        .param("sortDir", sortDir)
                        .param("sortBy", sortBy)
                        .param("nationCode", nationCode)
        );


        // then
        MvcResult result = actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andDo(document("companion-get-companions-by-nation",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestParameters(
                                parameterWithName("page").description("페이지 번호").optional().attributes(key("constraints").value("자연수")),
                                parameterWithName("size").description("페이지 당 동행글 수").optional().attributes(key("constraints").value("자연수")),
                                parameterWithName("sortDir").description("정렬 방향").optional().attributes(key("constraints").value("DESC/ASC")),
                                parameterWithName("sortBy").description("정렬 기준").optional().attributes(key("constraints").value("유효한 필드명")),
                                parameterWithName("nationCode").description("국가 코드")
                        ),
                        responseFields(
                                fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
                                fieldWithPath("data[].companionId").type(JsonFieldType.NUMBER).description("동행글 식별자"),
                                fieldWithPath("data[].memberId").type(JsonFieldType.NUMBER).description("작성자 식별자"),
                                fieldWithPath("data[].nickname").type(JsonFieldType.STRING).description("작성자 닉네임"),
                                fieldWithPath("data[].profile").type(JsonFieldType.STRING).description("작성자 프로필"),
                                fieldWithPath("data[].score").type(JsonFieldType.NUMBER).description("작성자 점수"),
                                fieldWithPath("data[].title").type(JsonFieldType.STRING).description("동행글 제목"),
                                fieldWithPath("data[].content").type(JsonFieldType.STRING).description("동행글 내용"),
                                fieldWithPath("data[].createdAt").type(JsonFieldType.STRING).description("동행글 작성 날짜"),
                                fieldWithPath("data[].date").type(JsonFieldType.STRING).description("동행 날짜"),
                                fieldWithPath("data[].address").type(JsonFieldType.STRING).description("동행 주소"),
                                fieldWithPath("data[].lat").type(JsonFieldType.NUMBER).description("위도"),
                                fieldWithPath("data[].lng").type(JsonFieldType.NUMBER).description("경도"),
                                fieldWithPath("data[].nationName").type(JsonFieldType.STRING).description("국가"),
                                fieldWithPath("data[].nationCode").type(JsonFieldType.STRING).description("국가 코드"),
                                fieldWithPath("data[].continent").type(JsonFieldType.NUMBER).description("대륙 코드"),
                                fieldWithPath("data[].tags").type(JsonFieldType.ARRAY).description("태그"),
                                fieldWithPath("data[].companionStatus").type(JsonFieldType.BOOLEAN).description("동행 완료 여부"),
                                fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
                                fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("현재 페이지"),
                                fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 당 동행글 수"),
                                fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("총 동행글 수"),
                                fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("총 페이지 수")
                        ))).andReturn();

        List list = JsonPath.parse(result.getResponse().getContentAsString()).read("$.data");
        assertThat(list.size(), is(1));
    }

    @Test
    @DisplayName("Get Counts Of Companions By Continent Test")
    void getCountsOfCompanionsByContinentTest() throws Exception {
        // given
        int continent = 2;
        Companion companion = new Companion();
        CompanionDto.ContinentResponse response = new CompanionDto.ContinentResponse("jpn", 1);

        List<Companion> companions = new ArrayList<>(List.of(companion));
        List<CompanionDto.ContinentResponse> responses = new ArrayList<>(List.of(response));

        given(companionService.findCompanionsByContinent(Mockito.anyInt())).willReturn(companions);
        given(mapper.companionsToContinentResponseDtos(Mockito.anyList())).willReturn(responses);


        // when
        ResultActions actions = mockMvc.perform(
                get("/companions/continents")
                        .param("continent", String.valueOf(continent))
        );


        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data[0].nationCode").value(responses.get(0).getNationCode()))
                .andExpect(jsonPath("$.data[0].companionsCount").value(responses.get(0).getCompanionsCount()))
                .andDo(document("companion-get-counts-of-companions-by-continent",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestParameters(
                                parameterWithName("continent").description("대륙 식별자").attributes(key("constraints").value("자연수"))
                        ),
                        responseFields(
                                fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
                                fieldWithPath("data[].nationCode").type(JsonFieldType.STRING).description("국가 코드"),
                                fieldWithPath("data[].companionsCount").type(JsonFieldType.NUMBER).description("동행글 수"))
                        )
                );
    }

    @Test
    @DisplayName("Get Reviewed Member Test")
    void getReviewedMemberTest() throws Exception {
        // given
        Long companionId = 1L;
        Long memberId = 2L;

        CompanionDto.ReviewedMember response = new CompanionDto.ReviewedMember(memberId);
        List<CompanionDto.ReviewedMember> responses = new ArrayList<>(List.of(response));

        given(companionService.findReviewedMember(Mockito.anyLong(), Mockito.anyLong())).willReturn(responses);


        // when
        ResultActions actions = mockMvc.perform(
                get("/companions/{companion-id}/reviewers", companionId)
                        .param("memberId", String.valueOf(memberId))
        );


        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data[0].memberId").value(responses.get(0).getMemberId()))
                .andDo(document("companion-get-reviewed-members",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestParameters(
                                parameterWithName("memberId").description("현재 로그인된 회원 식별자").attributes(key("constraints").value("자연수"))
                        ),
                        pathParameters(
                                parameterWithName("companion-id").description("동행글 식별자")
                        ),
                        responseFields(
                                fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
                                fieldWithPath("data[].memberId").type(JsonFieldType.NUMBER).description("회원 식별자")
                        )
                ));
    }

    @Test
    @DisplayName("Get Companions By Keyword Test")
    void getCompanionsByKeywordTest() throws Exception {
        // given
        int page = 1;
        int size = 10;
        String sortDir = "DESC";
        String sortBy = "createdAt";
        String condition = "title";
        String keyword = "universal";
        String nationCode = "jpn";
        String date = "2023-03-30";

        Companion companion = new Companion();
        CompanionDto.Response response = new CompanionDto.Response(
                1L,
                2L,
                "member2",
                "profile",
                100,
                "일본 유니버셜 같이 가요(universal studios Japan)",
                "유니버셜 혼자 가게 됐는데 같이 가실 분 있나요? 같이 버터맥주 마셔요!",
                LocalDate.of(2023, 3, 30),
                LocalDate.of(2023, 3, 29),
                "일본 유니버셜스튜디오",
                123.45678,
                123.12345,
                "일본",
                "jpn",
                2,
                new ArrayList<>(Arrays.asList("내향", "테마파크")),
                false
        );

        Page<Companion> companionPage = new PageImpl<>(List.of(companion), PageRequest.of(0, size), 0);
        List<CompanionDto.Response> responses = new ArrayList<>(List.of(response));

        given(companionService.findCompanionByKeyword(Mockito.anyInt(), Mockito.anyInt(), Mockito.anyString(), Mockito.anyString(),
                Mockito.anyString(), Mockito.anyString(), Mockito.anyString(), Mockito.anyString())).willReturn(companionPage);
        given(mapper.companionsToCompanionResponseDtos(Mockito.anyList())).willReturn(responses);


        // when
        ResultActions actions = mockMvc.perform(
                get("/companions/search")
                        .param("page", String.valueOf(page))
                        .param("size", String.valueOf(size))
                        .param("sortDir", sortDir)
                        .param("sortBy", sortBy)
                        .param("condition", condition)
                        .param("keyword", keyword)
                        .param("nationCode", nationCode)
                        .param("date", date)
        );


        // then
        MvcResult result = actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andDo(document("companion-get-companions-by-keyword",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestParameters(
                                parameterWithName("page").description("페이지 번호").optional().attributes(key("constraints").value("자연수")),
                                parameterWithName("size").description("페이지 당 동행글 수").optional().attributes(key("constraints").value("자연수")),
                                parameterWithName("sortDir").description("정렬 방향").optional().attributes(key("constraints").value("DESC/ASC")),
                                parameterWithName("sortBy").description("정렬 기준").optional().attributes(key("constraints").value("유효한 필드명")),
                                parameterWithName("condition").description("검색 조건").attributes(key("constraints").value("전체/태그/제목/내용/장소")),
                                parameterWithName("keyword").description("검색어"),
                                parameterWithName("nationCode").description("국가 코드"),
                                parameterWithName("date").description("날짜").optional().attributes(key("constraints").value("yyyy-mm-dd 형식"))
                        ),
                        responseFields(
                                fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
                                fieldWithPath("data[].companionId").type(JsonFieldType.NUMBER).description("동행글 식별자"),
                                fieldWithPath("data[].memberId").type(JsonFieldType.NUMBER).description("작성자 식별자"),
                                fieldWithPath("data[].nickname").type(JsonFieldType.STRING).description("작성자 닉네임"),
                                fieldWithPath("data[].profile").type(JsonFieldType.STRING).description("작성자 프로필"),
                                fieldWithPath("data[].score").type(JsonFieldType.NUMBER).description("작성자 점수"),
                                fieldWithPath("data[].title").type(JsonFieldType.STRING).description("동행글 제목"),
                                fieldWithPath("data[].content").type(JsonFieldType.STRING).description("동행글 내용"),
                                fieldWithPath("data[].createdAt").type(JsonFieldType.STRING).description("동행글 작성 날짜"),
                                fieldWithPath("data[].date").type(JsonFieldType.STRING).description("동행 날짜"),
                                fieldWithPath("data[].address").type(JsonFieldType.STRING).description("동행 주소"),
                                fieldWithPath("data[].lat").type(JsonFieldType.NUMBER).description("위도"),
                                fieldWithPath("data[].lng").type(JsonFieldType.NUMBER).description("경도"),
                                fieldWithPath("data[].nationName").type(JsonFieldType.STRING).description("국가"),
                                fieldWithPath("data[].nationCode").type(JsonFieldType.STRING).description("국가 코드"),
                                fieldWithPath("data[].continent").type(JsonFieldType.NUMBER).description("대륙 코드"),
                                fieldWithPath("data[].tags").type(JsonFieldType.ARRAY).description("태그"),
                                fieldWithPath("data[].companionStatus").type(JsonFieldType.BOOLEAN).description("동행 완료 여부"),
                                fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
                                fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("현재 페이지"),
                                fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 당 동행글 수"),
                                fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("총 동행글 수"),
                                fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("총 페이지 수")
                        ))).andReturn();

        List list = JsonPath.parse(result.getResponse().getContentAsString()).read("$.data");
        assertThat(list.size(), is(1));
    }

    private static class Post {
        @NotBlank
        private String title;

        @NotBlank
        private String content;

        private String date;

        @NotBlank
        private String address;

        @NotNull
        private Double lat;

        @NotNull
        private Double lng;

        @NotBlank
        private String nationName;

        @NotBlank
        private String nationCode;

        @Positive
        private Integer continent;

        @Size(min = 2, max = 5)
        private List<String> tags;

        @Positive
        private Long memberId;

        public Post(String title, String content, String date, String address, Double lat, Double lng, String nationName, String nationCode, Integer continent, List<String> tags, Long memberId) {
            this.title = title;
            this.content = content;
            this.date = date;
            this.address = address;
            this.lat = lat;
            this.lng = lng;
            this.nationName = nationName;
            this.nationCode = nationCode;
            this.continent = continent;
            this.tags = tags;
            this.memberId = memberId;
        }
    }

    public static class Patch {
        private Long companionId;

        private String title;

        private String content;

        private String date;

        private String address;

        private Double lat;

        private Double lng;

        private String nationName;

        private String nationCode;

        @Positive
        private Integer continent;

        @Size(min = 2, max = 5)
        private List<String> tags;

        public Patch(Long companionId, String title, String content, String date, String address, Double lat, Double lng, String nationName, String nationCode, Integer continent, List<String> tags) {
            this.companionId = companionId;
            this.title = title;
            this.content = content;
            this.date = date;
            this.address = address;
            this.lat = lat;
            this.lng = lng;
            this.nationName = nationName;
            this.nationCode = nationCode;
            this.continent = continent;
            this.tags = tags;
        }
    }

}
