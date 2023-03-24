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
import partypeople.server.companion.entity.Participant;
import partypeople.server.companion.entity.Subscriber;
import partypeople.server.companion.mapper.SubscriberMapper;
import partypeople.server.companion.service.ParticipantService;
import partypeople.server.companion.service.SubscriberService;
import partypeople.server.config.SecurityConfigurationTest;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static partypeople.server.util.ApiDocumentUtils.*;

@WebMvcTest(SubscriberController.class)
@MockBean(JpaMetamodelMappingContext.class)
@Import(SecurityConfigurationTest.class)
@AutoConfigureRestDocs
class SubscriberControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private SubscriberService subscriberService;

    @MockBean
    private ParticipantService participantService;

    @MockBean
    private SubscriberMapper mapper;

    @DisplayName("Post Subscriber Test")
    @Test
    void postSubscriberTest() throws Exception {
        //given
        SubscriberParticipantDto.Request request = new SubscriberParticipantDto.Request();
        request.setMemberId(1L);

        Subscriber subscriber = new Subscriber();
        subscriber.setSubscriberId(1L);
        long companionId = 1L;

        String content = gson.toJson(request);

        given(subscriberService.createSubscriber(Mockito.anyLong(), Mockito.anyLong())).willReturn(new Subscriber());

        //when
        ResultActions actions = mockMvc.perform(
            post("/companions/{companion-id}/subscribers", companionId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
        );

        //then
        actions
            .andExpect(status().isOk())
            .andDo(document("subscriber-post-subscriber",
                getRequestPreProcessor(),
                getResponsePreProcessor(),
                pathParameters(
                    parameterWithName("companion-id").description("동행글 식별자")
                ),
                requestFields(
                    fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("로그인한 회원 식별자")
                )));
    }

    @DisplayName("Get Subscribers Test")
    @Test
    void getSubscribersTest() throws Exception {
        //given
        long companionId = 1L;
        SubscriberParticipantDto.Response response1 = new SubscriberParticipantDto.Response(
            1L, "profile1", "nickname1"
        );
        SubscriberParticipantDto.Response response2 = new SubscriberParticipantDto.Response(
            2L, "profile2", "nickname2"
        );
        List<SubscriberParticipantDto.Response> responses = List.of(response1, response2);

        given(subscriberService.findSubscribersByCompanion(Mockito.anyLong())).willReturn(new ArrayList<Subscriber>());
        given(mapper.subscribersToSubscriberResponses(Mockito.anyList())).willReturn(responses);

        //when
        ResultActions actions = mockMvc.perform(
            get("/companions/{companion-id}/subscribers", companionId)
                .accept(MediaType.APPLICATION_JSON)
        );

        //then
        MvcResult result = actions
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.data").isArray())
            .andDo(document("subscriber-get-subscribers",
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

    @DisplayName("Patch Subscriber Test")
    @Test
    void patchSubscriberTest() throws Exception {
        //given
        long companionId = 1L;
        SubscriberParticipantDto.Request request = new SubscriberParticipantDto.Request();
        request.setMemberId(1L);
        String content = gson.toJson(request);

        willDoNothing().given(subscriberService).deleteSubscriber(Mockito.anyLong(), Mockito.anyLong());
        given(participantService.createParticipant(Mockito.anyLong(), Mockito.anyLong())).willReturn(new Participant());

        //when
        ResultActions actions = mockMvc.perform(
            patch("/companions/{companion-id}/subscribers", companionId)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
        );

        //then
        actions
            .andExpect(status().isOk())
            .andDo(document("subscriber-patch-subscriber",
                getRequestPreProcessor(),
                getResponsePreProcessor(),
                pathParameters(
                    parameterWithName("companion-id").description("동행글 식별자")
                ),
                requestFields(
                    fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("로그인한 회원 식별자")
                )));
    }

    @DisplayName("Delete Subscriber Test")
    @Test
    void deleteSubscriberTest() throws Exception {
        //given
        long companionId = 1L;
        SubscriberParticipantDto.Request request = new SubscriberParticipantDto.Request();
        request.setMemberId(1L);
        String content = gson.toJson(request);

        willDoNothing().given(subscriberService).deleteSubscriber(Mockito.anyLong(), Mockito.anyLong());

        //when
        ResultActions actions = mockMvc.perform(
            delete("/companions/{companion-id}/subscribers", companionId)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
        );

        //then
        actions
            .andExpect(status().isNoContent())
            .andDo(document("subscriber-delete-subscriber",
                getRequestPreProcessor(),
                getResponsePreProcessor(),
                pathParameters(
                    parameterWithName("companion-id").description("동행글 식별자")
                ),
                requestFields(
                    fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("로그인한 회원 식별자")
                )));
    }
}