package partypeople.server.companion.controller;

import com.google.gson.Gson;
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
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
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

import static org.hamcrest.Matchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
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
                "일본 유니버셜 가고싶은데 혼자라 부끄러워요ㅠ 같이 가실 분 구함~",
                "2023-03-10",
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
                .andDo(document("post-companion",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                fieldWithPath("title").type(JsonFieldType.STRING).description("동행글 제목"),
                                fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("작성자 식별자"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("동행글 내용"),
                                fieldWithPath("date").type(JsonFieldType.STRING).description("동행 날짜"),
                                fieldWithPath("address").type(JsonFieldType.STRING).description("동행 주소"),
                                fieldWithPath("lat").type(JsonFieldType.NUMBER).description("위도"),
                                fieldWithPath("lng").type(JsonFieldType.NUMBER).description("경도"),
                                fieldWithPath("nationName").type(JsonFieldType.STRING).description("국가"),
                                fieldWithPath("nationCode").type(JsonFieldType.STRING).description("국가 코드"),
                                fieldWithPath("continent").type(JsonFieldType.NUMBER).description("대륙 코드"),
                                fieldWithPath("tags").type(JsonFieldType.ARRAY).description("태그")
                        )));
    }

    @Test
    @DisplayName("Patch Companion Test")
    void patchCompanionTest() throws Exception {
        // given
        Patch request = new Patch(1L,
                "일본 유니버셜 같이 가요",
                "일본 유니버셜 가고싶은데 혼자라 부끄러워요ㅠ 같이 가실 분 구함~",
                "2023-03-10",
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
                100,
                "일본 유니버셜 같이 가요",
                "일본 유니버셜 가고싶은데 혼자라 부끄러워요ㅠ 같이 가실 분 구함~",
                LocalDate.of(2023, 3, 20),
                LocalDate.of(2023, 3, 10),
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
                .andDo(document("patch-companion",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("companion-id").description("동행글 식별자")
                        ),
                        requestFields(
                                fieldWithPath("companionId").type(JsonFieldType.NUMBER).description("동행글 식별자").ignored(),
                                fieldWithPath("title").type(JsonFieldType.STRING).description("동행글 제목").optional(),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("동행글 내용").optional(),
                                fieldWithPath("date").type(JsonFieldType.STRING).description("동행 날짜").optional(),
                                fieldWithPath("address").type(JsonFieldType.STRING).description("동행 주소").optional(),
                                fieldWithPath("lat").type(JsonFieldType.NUMBER).description("위도").optional(),
                                fieldWithPath("lng").type(JsonFieldType.NUMBER).description("경도").optional(),
                                fieldWithPath("nationName").type(JsonFieldType.STRING).description("국가").optional(),
                                fieldWithPath("nationCode").type(JsonFieldType.STRING).description("국가 코드").optional(),
                                fieldWithPath("continent").type(JsonFieldType.NUMBER).description("대륙 코드").optional(),
                                fieldWithPath("tags").type(JsonFieldType.ARRAY).description("태그").optional()
                        ),
                        responseFields(
                                fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                fieldWithPath("data.companionId").type(JsonFieldType.NUMBER).description("동행글 식별자"),
                                fieldWithPath("data.memberId").type(JsonFieldType.NUMBER).description("작성자 식별자"),
                                fieldWithPath("data.nickname").type(JsonFieldType.STRING).description("작성자 닉네임"),
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
                .andDo(document("delete-companion",
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
                100,
                "일본 유니버셜 같이 가요",
                "일본 유니버셜 가고싶은데 혼자라 부끄러워요ㅠ 같이 가실 분 구함~",
                LocalDate.of(2023, 3, 20),
                LocalDate.of(2023, 3, 10),
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
                .andDo(document("get-companion",
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
                100,
                "일본 유니버셜 같이 가요",
                "일본 유니버셜 가고싶은데 혼자라 부끄러워요ㅠ 같이 가실 분 구함~",
                LocalDate.of(2023, 3, 20),
                LocalDate.of(2023, 3, 10),
                "일본 유니버셜스튜디오",
                123.45678,
                123.12345,
                "일본",
                "jpn",
                2,
                new ArrayList<>(Arrays.asList("내향", "테마파크")),
                false
        );

        Page<Companion> companionPage = new PageImpl<>(List.of(companion));
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
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data[0].companionId").value(responses.get(0).getCompanionId()))
                .andExpect(jsonPath("$.data[0].memberId").value(responses.get(0).getMemberId()))
                .andExpect(jsonPath("$.data[0].nickname").value(responses.get(0).getNickname()))
                .andExpect(jsonPath("$.data[0].score").value(responses.get(0).getScore()))
                .andExpect(jsonPath("$.data[0].title").value(responses.get(0).getTitle()))
                .andExpect(jsonPath("$.data[0].content").value(responses.get(0).getContent()))
                .andExpect(jsonPath("$.data[0].date").exists())
                .andExpect(jsonPath("$.data[0].createdAt").exists())
                .andExpect(jsonPath("$.data[0].address").value(responses.get(0).getAddress()))
                .andExpect(jsonPath("$.data[0].lat").value(responses.get(0).getLat()))
                .andExpect(jsonPath("$.data[0].lng").value(responses.get(0).getLng()))
                .andExpect(jsonPath("$.data[0].nationName").value(responses.get(0).getNationName()))
                .andExpect(jsonPath("$.data[0].nationCode").value(responses.get(0).getNationCode()))
                .andExpect(jsonPath("$.data[0].continent").value(responses.get(0).getContinent()))
                .andExpect(jsonPath("$.data[0].tags").isArray())
                .andExpect(jsonPath("$.data[0].companionStatus").value(responses.get(0).isCompanionStatus()))
                .andDo(document("get-companions-by-nation",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestParameters(
                                parameterWithName("page").description("페이지 번호").optional(),
                                parameterWithName("size").description("페이지 당 동행글 수").optional(),
                                parameterWithName("sortDir").description("정렬 방향").optional(),
                                parameterWithName("sortBy").description("정렬 기준").optional(),
                                parameterWithName("nationCode").description("국가 코드")
                        ),
                        responseFields(
                                fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
                                fieldWithPath("data[].companionId").type(JsonFieldType.NUMBER).description("동행글 식별자"),
                                fieldWithPath("data[].memberId").type(JsonFieldType.NUMBER).description("작성자 식별자"),
                                fieldWithPath("data[].nickname").type(JsonFieldType.STRING).description("작성자 닉네임"),
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
                        )));
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
                .andDo(document("get-counts-of-companions-by-continent",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestParameters(
                                parameterWithName("continent").description("대륙 식별자")
                        ),
                        responseFields(
                                fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
                                fieldWithPath("data[].nationCode").type(JsonFieldType.STRING).description("국가 코드"),
                                fieldWithPath("data[].companionsCount").type(JsonFieldType.NUMBER).description("동행글 수"))
                        )
                );
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
