package partypeople.server.companion.controller;

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
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static partypeople.server.util.ApiDocumentUtils.getRequestPreProcessor;
import static partypeople.server.util.ApiDocumentUtils.getResponsePreProcessor;

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
        Post post = new Post(
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
        String content = gson.toJson(post);
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
                .andExpect(header().string("location", is(startsWith("/companions"))));
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
}
