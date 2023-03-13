package partypeople.server.companion.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import partypeople.server.companion.entity.Companion;
import partypeople.server.companion.entity.Subscriber;
import partypeople.server.companion.repository.SubscriberRepository;
import partypeople.server.member.entity.Member;
import partypeople.server.member.service.MemberService;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SubscriberService {
    private final SubscriberRepository subscriberRepository;
    private final CompanionService companionService;
    private final MemberService memberService;

    public Subscriber createSubscriber(Long memberId, Long companionId) {
//        Companion companion = companionService.findCompanion(companionId);
//        subscriber.setCompanion(companion);
        Member member = memberService.findMember(memberId);
        Companion companion = new Companion();
        companion.setCompanionId(companionId);

        Subscriber subscriber = new Subscriber();
        subscriber.setMember(member);
        subscriber.setCompanion(companion);
        return subscriberRepository.save(subscriber);
    }

    public List<Subscriber> getSubscribers(Long companionId) {
        return subscriberRepository.findByCompanionCompanionId(companionId);
    }

    public void deleteSubscriber(Long memberId, Long companionId) {
//        memberService.findMember(memberId);
//        companionService.fincCompanion(companionId);
        subscriberRepository.deleteByMemberMemberIdAndCompanionCompanionId(memberId, companionId);
    }
}
