package test.websocket.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import test.websocket.dto.ChatData;

import java.util.List;

@Service
public class WebServerService {
    @Value("${config.web-server}")
    private String url;

    private final WebClient webClient= WebClient.create();;

    public void loadInitialChatData() {
        getInCompleteNumbers().subscribe();
    }

    private Mono<Void> getInCompleteNumbers() {
        return webClient.get().uri(url + "/companions/incomplete-numbers").accept(MediaType.APPLICATION_JSON).retrieve().bodyToMono(new ParameterizedTypeReference<>() {
        }).then();
    }
}
