package partypeople.server.companion.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import partypeople.server.companion.dto.SubscriberParticipantDto;
import partypeople.server.companion.service.ParticipantService;
import partypeople.server.companion.service.SubscriberService;

import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/companions/{companion-id}")
public class SubscriberController {
    private final SubscriberService subscriberService;
    private final ParticipantService participantService;

    @PostMapping("/subscribers")
    public ResponseEntity postSubscriber(@PathVariable("companion-id") @Positive Long companionId,
                                         @RequestBody SubscriberParticipantDto.Request requestBody) {
        Long memberId = requestBody.getMemberId();

        subscriberService.createSubscriber(memberId, companionId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/subscribers")
    public ResponseEntity patchSubscriber(@PathVariable("companion-id") @Positive Long companionId,
                                          @RequestBody SubscriberParticipantDto.Request requestBody) {
        Long memberId = requestBody.getMemberId();

        subscriberService.deleteSubscriber(memberId, companionId);
        participantService.createParticipant(memberId, companionId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/subscribers")
    public ResponseEntity deleteSubscriber(@PathVariable("companion-id") @Positive Long companionId,
                                           @RequestBody SubscriberParticipantDto.Request requestBody) {
        Long memberId = requestBody.getMemberId();

        subscriberService.deleteSubscriber(memberId, companionId);
        return ResponseEntity.noContent().build();
    }

}
