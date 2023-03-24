package partypeople.server.companion.controller;

import com.google.gson.Gson;
import com.jayway.jsonpath.JsonPath;
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
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import partypeople.server.companion.dto.SubscriberParticipantDto;
import partypeople.server.companion.mapper.ParticipantMapper;
import partypeople.server.companion.service.ParticipantService;
import partypeople.server.config.SecurityConfigurationTest;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static partypeople.server.util.ApiDocumentUtils.getRequestPreProcessor;
import static partypeople.server.util.ApiDocumentUtils.getResponsePreProcessor;

@WebMvcTest(ParticipantController.class)
@MockBean(JpaMetamodelMappingContext.class)
@Import(SecurityConfigurationTest.class)
@AutoConfigureRestDocs
class ParticipantControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private ParticipantService participantService;

    @MockBean
    private ParticipantMapper mapper;

    @DisplayName("Get Participants Test")
    @Test
    void getParticipants() throws Exception {
        //given
        long companionId = 1L;
        SubscriberParticipantDto.Response response1 = new SubscriberParticipantDto.Response(
            1L, "profile1", "nickname1"
        );
        SubscriberParticipantDto.Response response2 = new SubscriberParticipantDto.Response(
            2L, "profile2", "nickname2"
        );
        List<SubscriberParticipantDto.Response> responses = List.of(response1, response2);

        given(participantService.findParticipantsByCompanion(Mockito.anyLong())).willReturn(new ArrayList<>());
        given(mapper.participantsToParticipantResponses(Mockito.anyList())).willReturn(responses);

        //when
        ResultActions actions = mockMvc.perform(
            get("/companions/{companion-id}/participants", companionId)
                .accept(MediaType.APPLICATION_JSON)
        );

        //then
        MvcResult result = actions
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.data").isArray())
            .andDo(document("participant-get-participants",
                getRequestPreProcessor(),
                getResponsePreProcessor(),
                pathParameters(
                    parameterWithName("companion-id").description("동행글 식별자")
                ),
                responseFields(
                    List.of(
                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
                        fieldWithPath("data[].memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                        fieldWithPath("data[].profile").type(JsonFieldType.STRING).description("회원 프로필"),
                        fieldWithPath("data[].nickname").type(JsonFieldType.STRING).description("회원 닉네임")
                    )
                ))).andReturn();
        List list = JsonPath.parse(result.getResponse().getContentAsString()).read("$.data");
        assertThat(list.size(), is(2));

    }

    @DisplayName("Delete Participant Test")
    @Test
    void deleteParticipation() throws Exception {
        //given
        long companionId = 1L;
        SubscriberParticipantDto.Request request = new SubscriberParticipantDto.Request();
        request.setMemberId(1L);
        String content = gson.toJson(request);

        willDoNothing().given(participantService).deleteParticipant(Mockito.anyLong(), Mockito.anyLong());

        //when
        ResultActions actions = mockMvc.perform(
            delete("/companions/{companion-id}/participants", companionId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
        );

        //then
        actions
            .andExpect(status().isNoContent())
            .andDo(document("participant-delete-participant",
                getRequestPreProcessor(),
                getResponsePreProcessor(),
                pathParameters(
                    parameterWithName("companion-id").description("동행글 식별자")
                ),
                requestFields(
                    fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자")
                )));
    }
}