package partypeople.server.companion.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import partypeople.server.companion.dto.SubscriberParticipantDto;
import partypeople.server.companion.entity.Participant;
import partypeople.server.companion.mapper.ParticipantMapper;
import partypeople.server.companion.service.ParticipantService;
import partypeople.server.dto.SingleResponseDto;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/companions/{companion-id}/participants")
public class ParticipantController {
    private final ParticipantService participantService;
    private final ParticipantMapper mapper;

    @GetMapping
    public ResponseEntity getParticipants(@PathVariable("companion-id") @Positive Long companionId) {
        List<Participant> participants = participantService.getParticipantsByCompanion(companionId);

        return ResponseEntity.ok(
            new SingleResponseDto<>(mapper.participantsToParticipantResponses(participants))
        );
    }

    @DeleteMapping
    public ResponseEntity deleteParticipation(@PathVariable("companion-id") @Positive Long companionId,
                                              @RequestBody SubscriberParticipantDto.Request requestBody) {
        Long memberId = requestBody.getMemberId();

        participantService.deleteParticipant(memberId, companionId);
        return ResponseEntity.noContent().build();
    }
}
