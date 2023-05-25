package partypeople.server.companion.controller;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import partypeople.server.companion.dto.CompanionDto;
import partypeople.server.companion.entity.Companion;
import partypeople.server.companion.mapper.CompanionMapper;
import partypeople.server.companion.service.ChatRoomService;
import partypeople.server.companion.service.CompanionService;
import partypeople.server.dto.MultiResponseDto;
import partypeople.server.dto.SingleResponseDto;
import partypeople.server.tag.entity.Tag;
import partypeople.server.tag.service.TagService;
import partypeople.server.utils.UriCreator;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @PatchMapping("/{companion-id}")
    public ResponseEntity patchCompanion(@PathVariable("companion-id") @Positive Long companionId,
                                         @Valid @RequestBody CompanionDto.Patch requestBody) {
        requestBody.setCompanionId(companionId);
        List<Tag> tags = tagService.findTagsByNames(requestBody.getTags());
        Companion companion = companionService.updateCompanion(mapper.companionPatchDtoToCompanion(requestBody, tags));

        return ResponseEntity.ok(new SingleResponseDto<>(mapper.companionToCompanionResponseDto(companion)));
    }

    @DeleteMapping("/{companion-id}")
    public ResponseEntity deleteCompanion(@PathVariable("companion-id") @Positive Long companionId) {
        companionService.deleteCompanion(companionId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{companion-id}")
    public ResponseEntity getCompanion(@PathVariable("companion-id") @Positive Long companionId) {
        Companion companion = companionService.findCompanion(companionId);

        return ResponseEntity.ok(new SingleResponseDto<>(mapper.companionToCompanionResponseDto(companion)));
    }

    @GetMapping("/nations")
    public ResponseEntity getCompanionsByNation(@RequestParam(value = "page", required = false, defaultValue = "1") int page,
                                                @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                @RequestParam(value = "sortDir", required = false, defaultValue = "DESC") String sortDir,
                                                @RequestParam(value = "sortBy", required = false, defaultValue = "createdAt") String sortBy,
                                                @RequestParam("nationCode") String nationCode) {
        Page<Companion> companionPage = companionService.findCompanionsByNation(page - 1, size, sortDir, sortBy, nationCode);
        List<Companion> companions = companionPage.getContent();

        return ResponseEntity.ok(
            new MultiResponseDto<>(mapper.companionsToCompanionResponseDtos(companions), companionPage)
        );
    }

    @GetMapping("/continents")
    public ResponseEntity getCountsOfCompanionsByContinent(@RequestParam("continent") int continent) {
        List<Companion> companions = companionService.findCompanionsByContinent(continent);

        return ResponseEntity.ok(new SingleResponseDto<>(mapper.companionsToContinentResponseDtos(companions)));
    }

    @GetMapping("/{companion-id}/reviewers")
    public ResponseEntity getReviewedMember(@PathVariable("companion-id") @Positive Long companionId,
                                            @RequestParam("memberId") Long memberId) {
        List<CompanionDto.ReviewedMember> members = companionService.findReviewedMember(companionId, memberId);

        return ResponseEntity.ok(new SingleResponseDto<>(members));
    }

    @GetMapping("/search")
    public ResponseEntity getCompanion(@RequestParam(value = "page", required = false, defaultValue = "1") int page,
                                       @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                       @RequestParam(value = "sortDir", required = false, defaultValue = "DESC") String sortDir,
                                       @RequestParam(value = "sortBy", required = false, defaultValue = "createdAt") String sortBy,
                                       @RequestParam(value = "condition") String condition,
                                       @RequestParam(value = "keyword") String keyword,
                                       @RequestParam(value = "nationCode") String nationCode,
                                       @RequestParam(value = "date") String date) {
        Page<Companion> companionPage = companionService.findCompanionByKeyword(page - 1, size, sortDir, sortBy,
            condition, keyword, nationCode, date);
        List<Companion> companions = companionPage.getContent();

        return ResponseEntity.ok(
            new MultiResponseDto<>(mapper.companionsToCompanionResponseDtos(companions), companionPage)
        );
    }

    @GetMapping("/incomplete-numbers")
    public ResponseEntity getIncomplete() {
        return ResponseEntity.ok(companionService.getIncompleteCompanions());
    }
}
