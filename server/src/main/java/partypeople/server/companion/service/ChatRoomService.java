package partypeople.server.companion.service;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import partypeople.server.companion.entity.Companion;

import java.util.HashMap;
import java.util.Map;

@Service
public class ChatRoomService {
    private final String chatUrl = "https://620a-59-10-231-15.ngrok-free.app/chat/room";
    public void createChatRoom(Companion companion) {
        Map<String, String> body = new HashMap<>();
        body.put("companionId", String.valueOf(companion.getCompanionId()));
        body.put("companionTitle", companion.getTitle());

        String url = chatUrl;
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
        String url = chatUrl+companionId;
        WebClient webClient = WebClient.create();
        webClient.delete()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class)
                .subscribe();
    }
}
