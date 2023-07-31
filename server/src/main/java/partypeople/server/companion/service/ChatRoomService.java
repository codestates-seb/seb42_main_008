package partypeople.server.companion.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import partypeople.server.companion.dto.CompanionChatDTO;
import partypeople.server.companion.entity.Companion;
import reactor.core.publisher.Flux;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatRoomService {

    @Value("${config.chat-server}")
    private String chatUrl;
    private final WebClient webClient = WebClient.create();

    public void createChatRoom(Companion companion) {
        Map<String, String> body = new HashMap<>();
        body.put("companionId", String.valueOf(companion.getCompanionId()));
        body.put("companionTitle", companion.getTitle());

        String url = chatUrl + "/chat/room";
        webClient.post().uri(url).contentType(MediaType.APPLICATION_JSON).bodyValue(body).retrieve().bodyToMono(String.class).subscribe();
    }

    public void removeChatRoom(Long companionId) {
        String url = chatUrl + "/chat/room/" + companionId;
        webClient.delete().uri(url).retrieve().bodyToMono(String.class).subscribe();
    }
}
