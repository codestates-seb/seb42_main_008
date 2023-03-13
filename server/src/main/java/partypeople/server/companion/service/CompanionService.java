package partypeople.server.companion.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import partypeople.server.companion.entity.Companion;
import partypeople.server.companion.repository.CompanionRepository;
import partypeople.server.exception.BusinessLogicException;
import partypeople.server.exception.ExceptionCode;
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
    private final MemberService memberService;
    private final NationService nationService;

    public Companion createCompanion(Companion companion) {
        Member member = memberService.findMember(companion.getMember().getMemberId());
        Nation nation = nationService.findNation(companion.getNation());
        companion.setMember(member);
        companion.setNation(nation);

        return companionRepository.save(companion);
    }
}
