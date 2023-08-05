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

    public Mono<List<ChatData>> getInCompleteNumbers() {
//        String url = "http://localhost:8080/companions/incomplete-numbers";
//        String url = "http://ec2-54-180-24-129.ap-northeast-2.compute.amazonaws.com:8080/companions/incomplete-numbers";
        WebClient webClient = WebClient.create();

        return webClient.get().uri(url).accept(MediaType.APPLICATION_JSON).retrieve().bodyToMono(new ParameterizedTypeReference<>() {
        });
    }
}
