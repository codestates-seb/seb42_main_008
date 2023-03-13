package partypeople.server.message.controller;

import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import partypeople.server.message.dto.MessageDto;
import partypeople.server.message.entity.Message;
import partypeople.server.message.mapper.MessageMapper;
import partypeople.server.message.service.MessageService;

import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class MessageControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private MessageService messageService;

    @MockBean
    private MessageMapper mapper;

    @Test
    void postMessageTest() throws Exception {
        //given
        MessageDto.Post post = new MessageDto.Post("Message Test",
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
            .andExpect(header().string("location", is(startsWith("/messages"))));
    }

    @Test
    void getMessage() {
    }

    @Test
    void getMessages() {
    }

    @Test
    void deleteMessage() {
    }
}