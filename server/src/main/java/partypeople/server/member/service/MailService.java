package partypeople.server.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

@Service
@EnableAsync
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender javaMailSender;
    @Async
    public void sendEmail(String email, String subject, String body) {
//        System.out.println("Execute method asynchronously. " + Thread.currentThread().getName());

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setFrom("PARTYPEOPLE@partypeople.co.kr");
        message.setSubject(subject);
        message.setText(body);
        javaMailSender.send(message);
    }
}
