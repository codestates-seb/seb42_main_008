package partypeople.server.companion.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import partypeople.server.companion.entity.Companion;
import partypeople.server.companion.repository.CompanionRepository;
import partypeople.server.companion.repository.CompanionTagRepository;
import partypeople.server.exception.BusinessLogicException;
import partypeople.server.exception.ExceptionCode;
import partypeople.server.member.entity.Member;
import partypeople.server.member.service.MemberService;
import partypeople.server.nation.entity.Nation;
import partypeople.server.nation.service.NationService;
import partypeople.server.utils.CustomBeanUtils;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CompanionService {
    private final CompanionRepository companionRepository;
    private final CompanionTagRepository companionTagRepository;
    private final MemberService memberService;
    private final NationService nationService;
    private final CustomBeanUtils<Companion> beanUtils;

    public Companion createCompanion(Companion companion) {
        Member member = memberService.findMember(companion.getMember().getMemberId());
        Nation nation = nationService.findNation(companion.getNation());
        companion.setMember(member);
        companion.setNation(nation);

        return companionRepository.save(companion);
    }

    public Companion updateCompanion(Companion companion) {
        Companion findCompanion = findVerifiedCompanionById(companion.getCompanionId());
        if (companion.getNation() != null && !findCompanion.getNation().equals(companion.getNation())) {
            Nation nation = nationService.findNation(companion.getNation());
            findCompanion.setNation(nation);
        }

        Optional.ofNullable(companion.getCompanionTags()).ifPresent(companionTags -> {
            companionTagRepository.deleteByCompanionCompanionId(findCompanion.getCompanionId());
            findCompanion.setCompanionTags(companionTags);
        });

        Companion updateCompanion = beanUtils.copyNonNullProperties(companion, findCompanion);

        return updateCompanion;
    }

    private Companion findVerifiedCompanionById(Long companionId) {
        Optional<Companion> optionalCompanion = companionRepository.findById(companionId);
        Companion findCompanion = optionalCompanion.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMPANION_NOT_FOUND));

        return findCompanion;
    }
}