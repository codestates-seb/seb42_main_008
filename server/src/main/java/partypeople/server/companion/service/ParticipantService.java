package partypeople.server.companion.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import partypeople.server.companion.entity.Companion;
import partypeople.server.companion.entity.Participant;
import partypeople.server.companion.entity.Subscriber;
import partypeople.server.companion.repository.ParticipantRepository;
import partypeople.server.member.entity.Member;
import partypeople.server.member.service.MemberService;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ParticipantService {
    private final ParticipantRepository participantRepository;
    private final MemberService memberService;
    private final CompanionService companionService;

    public Participant createParticipant(Long memberId, Long companionId) {
//        Companion companion = companionService.findCompanion(companionId);
//        subscriber.setCompanion(companion);
        Member member = memberService.findMember(memberId);

        Companion companion = new Companion();
        companion.setCompanionId(companionId);

        Participant participant = new Participant();
        participant.setMember(member);
        participant.setCompanion(companion);
        return participantRepository.save(participant);
    }

    public List<Participant> getParticipants(Long companionId) {
        return participantRepository.findByCompanionCompanionId(companionId);
    }

    public void deleteParticipant(Long memberId, Long companionId) {
//        memberService.findMember(memberId);
//        companionService.findCompanion(companionId);
        participantRepository.deleteByMemberMemberIdAndCompanionCompanionId(memberId, companionId);
    }
}
