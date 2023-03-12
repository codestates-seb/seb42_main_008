package partypeople.server.companion.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import partypeople.server.companion.dto.CompanionDto;
import partypeople.server.companion.entity.Companion;
import partypeople.server.companion.mapper.CompanionMapper;
import partypeople.server.companion.service.CompanionService;
import partypeople.server.tag.entity.Tag;
import partypeople.server.tag.service.TagService;
import partypeople.server.utils.UriCreator;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/companions")
@RequiredArgsConstructor
@Validated
public class CompanionController {
    private static final String COMPANION_DEFAULT_URL = "/companions";
    private final CompanionService companionService;
    private final CompanionMapper mapper;
    private final TagService tagService;

    @PostMapping
    public ResponseEntity postCompanion(@Valid @RequestBody CompanionDto.Post requestBody) {
        List<Tag> tags = tagService.findTagsByNames(requestBody.getTags());
        Companion companion = companionService.createCompanion(mapper.companionPostDtoToCompanion(requestBody, tags));
        URI location = UriCreator.createUri(COMPANION_DEFAULT_URL, companion.getCompanionId());

        return ResponseEntity.created(location).build();
    }
}
