package partypeople.server.companion.service;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import partypeople.server.companion.entity.Companion;

import java.util.HashMap;
import java.util.Map;

@Service
public class ChatRoomService {
    public void createChatRoom(Companion companion) {
        Map<String, String> body = new HashMap<>();
        body.put("companionId", String.valueOf(companion.getCompanionId()));
        body.put("companionTitle", companion.getTitle());

        String url = "http://localhost:8081/chat/room";
        WebClient webClient = WebClient.create();
        webClient.post()
                .uri(url)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .subscribe();
    }

    public void removeChatRoom(Long companionId) {
        String url = "http://localhost:8081/chat/room/"+companionId;
        WebClient webClient = WebClient.create();
        webClient.delete()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class)
                .subscribe();
    }
}
