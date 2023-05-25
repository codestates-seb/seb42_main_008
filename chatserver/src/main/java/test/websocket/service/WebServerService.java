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
    public List<CompanionChatDTO> getInCompleteNumbers() {
        String url = "http://localhost:8080/companions/incomplete-numbers";
        WebClient webClient = WebClient.create();

        Mono<List<CompanionChatDTO>> responseList = webClient.get()
                .uri(url)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<>() {});
        return responseList.block();
        // 하...... 오늘 무슨 날인가
        // 디코는 뭐가 문제인거야
    }
}
