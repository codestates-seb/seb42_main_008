package test.websocket.service;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import test.websocket.dto.CompanionChatDTO;

import java.util.List;

@Service
public class WebServerService {
    public Mono<List<CompanionChatDTO>> getInCompleteNumbers() {
        String url = "http://localhost:8082/companions/incomplete-numbers";
        WebClient webClient = WebClient.create();

        return webClient.get()
                .uri(url)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<>() {});
    }
}
