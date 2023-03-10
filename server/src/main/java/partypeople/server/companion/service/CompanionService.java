package partypeople.server.companion.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import partypeople.server.companion.entity.Companion;
import partypeople.server.companion.repository.CompanionRepository;
import partypeople.server.nation.service.NationService;

@Service
@RequiredArgsConstructor
@Transactional
public class CompanionService {
    private final CompanionRepository companionRepository;
    private final NationService nationService;

    public Companion createCompanion(Companion companion) {

        companion.setNation(nationService.findNation(companion.getNation()));

        return companionRepository.save(companion);
    }
}
