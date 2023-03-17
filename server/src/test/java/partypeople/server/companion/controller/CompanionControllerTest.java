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
    @DisplayName("Companion Post Test")
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
    @DisplayName("Companion Patch Test")
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
                                fieldWithPath("data.tags").type(JsonFieldType.ARRAY).description("태그"),
                                fieldWithPath("data.companionStatus").type(JsonFieldType.BOOLEAN).description("동행 완료 여부")
                        )));
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
