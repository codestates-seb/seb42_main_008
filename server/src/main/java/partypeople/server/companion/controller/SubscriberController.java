package partypeople.server.companion.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import partypeople.server.companion.dto.SubscriberParticipantDto;
import partypeople.server.companion.entity.Subscriber;
import partypeople.server.companion.mapper.SubscriberMapper;
import partypeople.server.companion.service.ParticipantService;
import partypeople.server.companion.service.SubscriberService;
import partypeople.server.dto.SingleResponseDto;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/companions/{companion-id}/subscribers")
public class SubscriberController {
    private final SubscriberService subscriberService;
    private final ParticipantService participantService;
    private final SubscriberMapper mapper;

    @PostMapping
    public ResponseEntity postSubscriber(@PathVariable("companion-id") @Positive Long companionId,
                                         @RequestBody SubscriberParticipantDto.Request requestBody) {
        Long memberId = requestBody.getMemberId();

        subscriberService.createSubscriber(memberId, companionId);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity getSubscribers(@PathVariable("companion-id") @Positive Long companionId) {
        List<Subscriber> subscribers = subscriberService.getSubscribers(companionId);

        return ResponseEntity.ok(
            new SingleResponseDto<>(mapper.subscribersToSubscriberResponses(subscribers))
        );
    }

    @PatchMapping
    public ResponseEntity patchSubscriber(@PathVariable("companion-id") @Positive Long companionId,
                                          @RequestBody SubscriberParticipantDto.Request requestBody) {
        Long memberId = requestBody.getMemberId();

        subscriberService.deleteSubscriber(memberId, companionId);
        participantService.createParticipant(memberId, companionId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity deleteSubscriber(@PathVariable("companion-id") @Positive Long companionId,
                                           @RequestBody SubscriberParticipantDto.Request requestBody) {
        Long memberId = requestBody.getMemberId();

        subscriberService.deleteSubscriber(memberId, companionId);
        return ResponseEntity.noContent().build();
    }
}
