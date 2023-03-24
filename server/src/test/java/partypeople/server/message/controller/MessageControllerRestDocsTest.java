package partypeople.server.message.controller;

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
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import partypeople.server.config.SecurityConfigurationTest;
import partypeople.server.message.dto.MessageDto;
import partypeople.server.message.entity.Message;
import partypeople.server.message.mapper.MessageMapper;
import partypeople.server.message.service.MessageService;
import partypeople.server.message.sse.SseEmitters;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.mockito.BDDMockito.*;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static partypeople.server.util.ApiDocumentUtils.*;

@WebMvcTest(MessageController.class)
@MockBean(JpaMetamodelMappingContext.class)
@Import(SecurityConfigurationTest.class)
@AutoConfigureRestDocs
class MessageControllerRestDocsTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private MessageService messageService;

    @MockBean
    private SseEmitters sseEmitters;

    @MockBean
    private MessageMapper mapper;

    @DisplayName("Post Message Test")
    @Test
    void postMessageTest() throws Exception {
        //given
        MessageDto.Post post = new MessageDto.Post("쪽지 생성",
            1L, 2L, 3L);
        String content = gson.toJson(post);
        Message message = new Message();
        message.setMessageId(1L);

        given(mapper.messagePostToMessage(Mockito.any(MessageDto.Post.class))).willReturn(new Message());
        given(messageService.createMessage(Mockito.any(Message.class)))
            .willReturn(message);

        //when
        ResultActions actions = mockMvc.perform(post("/messages")
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON)
            .content(content));

        //then
        actions
            .andExpect(status().isCreated())
            .andExpect(header().string("location", is(startsWith("/messages/"))))
            .andDo(document("message-post-message",
                getRequestPreProcessor(),
                getResponsePreProcessor(),
                requestFields(
                    List.of(
                        fieldWithPath("content").type(JsonFieldType.STRING).description("쪽지 내용")
                            .attributes(key("constraints").value("공백 허용 안함")),
                        fieldWithPath("senderId").type(JsonFieldType.NUMBER).description("보내는 회원 식별자"),
                        fieldWithPath("receiverId").type(JsonFieldType.NUMBER).description("받는 회원 식별자"),
                        fieldWithPath("companionId").type(JsonFieldType.NUMBER).description("동행글 식별자/(일반:1, 시스템:해당 동행글 식별자)")
                    )
                ),
                responseHeaders(
                    headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                )));
    }

    @DisplayName("Get Message Test")
    @Test
    void getMessageTest() throws Exception {
        //given
        long messageId = 1L;
        MessageDto.Response response = new MessageDto.Response(1L,
            "Message Test", 1L,
            new MessageDto.Response.Sender(2L, "test"), LocalDateTime.now(), true);

        given(messageService.findMessage(Mockito.anyLong())).willReturn(new Message());
        given(mapper.messageToMessageResponse(Mockito.any(Message.class))).willReturn(response);

        //when
        ResultActions actions = mockMvc.perform(
            get("/messages/{message-id}", messageId)
                .accept(MediaType.APPLICATION_JSON));

        //then
        actions
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.data.content").value(response.getContent()))
            .andExpect(jsonPath("$.data.companionId").value(response.getCompanionId()))
            .andExpect(jsonPath("$.data.sender.id").value(2L))
            .andExpect(jsonPath("$.data.read").value(true))
            .andDo(document("message-get-message",
                getRequestPreProcessor(),
                getResponsePreProcessor(),
                pathParameters(
                    parameterWithName("message-id").description("쪽지 식별자")
                ),
                responseFields(
                    List.of(
                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                        fieldWithPath("data.messageId").type(JsonFieldType.NUMBER).description("쪽지 식별자"),
                        fieldWithPath("data.content").type(JsonFieldType.STRING).description("쪽지 내용"),
                        fieldWithPath("data.companionId").type(JsonFieldType.NUMBER).description("동행글 식별자"),
                        fieldWithPath("data.sender").type(JsonFieldType.OBJECT).description("보낸 회원 데이터"),
                        fieldWithPath("data.sender.id").type(JsonFieldType.NUMBER).description("보낸 회원 식별자"),
                        fieldWithPath("data.sender.nickname").type(JsonFieldType.STRING).description("보낸 회원 닉네임"),
                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("쪽지 보낸 시간(yyyy-MM-dd HH:mm"),
                        fieldWithPath("data.read").type(JsonFieldType.BOOLEAN).description("쪽지 읽은 여부")
                    )
                )));
    }

    @DisplayName("Get Messages Test")
    @Test
    void getMessagesTest() throws Exception{
        //given
        MessageDto.Response response1 = new MessageDto.Response(1L,
            "Message Test1", 1L,
            new MessageDto.Response.Sender(2L, "test"), LocalDateTime.now(), false);
        MessageDto.Response response2 = new MessageDto.Response(2L,
            "Message Test2", 1L,
            new MessageDto.Response.Sender(2L, "test"), LocalDateTime.now(), false);
        List<MessageDto.Response> responses = List.of(response1, response2);

        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("memberId", "1");


        given(messageService.findMessages(Mockito.anyLong())).willReturn(new ArrayList<Message>());
        given(mapper.messagesToMessageResponses(Mockito.anyList())).willReturn(responses);

        //when
        ResultActions actions = mockMvc.perform(
            get("/messages")
                .params(queryParams)
                .accept(MediaType.APPLICATION_JSON)
        );

        //then
        MvcResult result = actions
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.data").isArray())
            .andDo(document("message-get-messages",
                getRequestPreProcessor(),
                getResponsePreProcessor(),
                requestParameters(
                    parameterWithName("memberId").description("로그인 한 회원 식별자")
                ),
                responseFields(
                    List.of(
                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
                        fieldWithPath("data[].messageId").type(JsonFieldType.NUMBER).description("쪽지 식별자"),
                        fieldWithPath("data[].content").type(JsonFieldType.STRING).description("쪽지 내용"),
                        fieldWithPath("data[].companionId").type(JsonFieldType.NUMBER).description("동행글 식별자"),
                        fieldWithPath("data[].sender").type(JsonFieldType.OBJECT).description("보낸 회원 데이터"),
                        fieldWithPath("data[].sender.id").type(JsonFieldType.NUMBER).description("보낸 회원 식별자"),
                        fieldWithPath("data[].sender.nickname").type(JsonFieldType.STRING).description("보낸 회원 닉네임"),
                        fieldWithPath("data[].createdAt").type(JsonFieldType.STRING).description("쪽지 보낸 시간(yyyy-MM-dd HH:mm"),
                        fieldWithPath("data[].read").type(JsonFieldType.BOOLEAN).description("쪽지 읽은 여부")
                    )
                )))
            .andReturn();

        List list = JsonPath.parse(result.getResponse().getContentAsString()).read("$.data");
        assertThat(list.size(), is(2));
    }

    @DisplayName("Delete Message Test")
    @Test
    void deleteMessageTest() throws Exception{
        //given
        long messageId = 1L;
        willDoNothing().given(messageService).deleteMessage(Mockito.anyLong());

        //when
        ResultActions actions = mockMvc.perform(
            delete("/messages/{message-id}", messageId)
                .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
            .andExpect(status().isNoContent())
            .andDo(document("message-delete-message",
                getRequestPreProcessor(),
                getResponsePreProcessor(),
                pathParameters(
                    parameterWithName("message-id").description("쪽지 식별자")
                )));
    }
}