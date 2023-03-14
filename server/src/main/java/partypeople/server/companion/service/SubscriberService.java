package partypeople.server.companion.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import partypeople.server.companion.entity.Companion;
import partypeople.server.companion.entity.Subscriber;
import partypeople.server.companion.repository.SubscriberRepository;
import partypeople.server.exception.BusinessLogicException;
import partypeople.server.exception.ExceptionCode;
import partypeople.server.member.entity.Member;
import partypeople.server.member.service.MemberService;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SubscriberService {
    private final SubscriberRepository subscriberRepository;
    private final CompanionService companionService;
    private final MemberService memberService;

    @Transactional
    public Subscriber createSubscriber(Long memberId, Long companionId) {
        verifySubscriber(memberId, companionId);

        Subscriber subscriber = new Subscriber();

        Member member = memberService.findMember(memberId);
        subscriber.setMember(member);

        Companion companion = companionService.findCompanion(companionId);
        subscriber.setCompanion(companion);

        return subscriberRepository.save(subscriber);
    }

    public List<Subscriber> findSubscribersByCompanion(Long companionId) {
        return subscriberRepository.findByCompanionCompanionId(companionId);
    }

    public List<Subscriber> findSubscribersByMember(Long memberId) {
        return subscriberRepository.findByMemberMemberId(memberId);
    }

    @Transactional
    public void deleteSubscriber(Long memberId, Long companionId) {
        Subscriber subscriber = findVerifiedSubscriber(memberId, companionId);
        subscriberRepository.deleteById(subscriber.getSubscriberId());
    }

    private Subscriber findVerifiedSubscriber(Long memberId, Long companionId) {
        memberService.findMember(memberId);
        companionService.findCompanion(companionId);
        Optional<Subscriber> optionalSubscriber = subscriberRepository.findByMemberMemberIdAndCompanionCompanionId(memberId, companionId);
        return optionalSubscriber.orElseThrow(() -> new BusinessLogicException(ExceptionCode.SUBSCRIBER_NOT_FOUND));
    }

    private void verifySubscriber(Long memberId, Long companionId) {
        Optional<Subscriber> optionalSubscriber = subscriberRepository.findByMemberMemberIdAndCompanionCompanionId(memberId, companionId);
        if (optionalSubscriber.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.SUBSCRIBER_EXIST);
        }
    }
}
