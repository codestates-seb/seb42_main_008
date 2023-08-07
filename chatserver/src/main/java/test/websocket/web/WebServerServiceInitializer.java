package test.websocket.web;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import test.websocket.service.WebServerService;

@Component
@RequiredArgsConstructor
public class WebServerServiceInitializer implements ApplicationListener<ApplicationReadyEvent> {
    private final WebServerService webServerService;
    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        webServerService.loadInitialChatData();
    }
}
