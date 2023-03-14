package partypeople.server.companion.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import partypeople.server.companion.entity.Companion;
import partypeople.server.companion.entity.Participant;
import partypeople.server.companion.repository.ParticipantRepository;
import partypeople.server.exception.BusinessLogicException;
import partypeople.server.exception.ExceptionCode;
import partypeople.server.member.entity.Member;
import partypeople.server.member.service.MemberService;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ParticipantService {
    private final ParticipantRepository participantRepository;
    private final MemberService memberService;
    private final CompanionService companionService;

    @Transactional
    public Participant createParticipant(Long memberId, Long companionId) {
        verifyParticipant(memberId, companionId);

        Participant participant = new Participant();

        Member member = memberService.findMember(memberId);
        participant.setMember(member);

        Companion companion = companionService.findCompanion(companionId);
        participant.setCompanion(companion);

        return participantRepository.save(participant);
    }

    public List<Participant> findParticipantsByCompanion(Long companionId) {
        return participantRepository.findByCompanionCompanionId(companionId);
    }

    @Transactional
    public void deleteParticipant(Long memberId, Long companionId) {
        Participant participant = findVerifiedParticipant(memberId, companionId);
        participantRepository.deleteById(participant.getParticipantId());
    }

    private Participant findVerifiedParticipant(Long memberId, Long companionId) {
        memberService.findMember(memberId);
        companionService.findCompanion(companionId);
        Optional<Participant> optionalParticipant = participantRepository.findByMemberMemberIdAndCompanionCompanionId(memberId, companionId);
        return optionalParticipant.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PARTICIPANT_NOT_FOUND));
    }

    private void verifyParticipant(Long memberId, Long companionId) {
        Optional<Participant> optionalParticipant = participantRepository.findByMemberMemberIdAndCompanionCompanionId(memberId, companionId);
        if (optionalParticipant.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.PARTICIPANT_EXIST);
        }
    }
}
