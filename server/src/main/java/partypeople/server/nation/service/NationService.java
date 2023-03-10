package partypeople.server.nation.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import partypeople.server.nation.entity.Nation;
import partypeople.server.nation.repository.NationRepository;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class NationService {
    private final NationRepository nationRepository;

    public Nation findNation(Nation nation) {
        Optional<Nation> optionalNation = nationRepository.findByCode(nation.getCode());

        return optionalNation.orElseGet(() -> nationRepository.save(nation));
    }

}
