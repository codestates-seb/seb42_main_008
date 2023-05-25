package partypeople.server.companion.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import partypeople.server.companion.dto.CompanionChatDTO;
import partypeople.server.companion.dto.CompanionDto;
import partypeople.server.companion.entity.Companion;
import partypeople.server.companion.entity.Participant;
import partypeople.server.companion.repository.CompanionRepository;
import partypeople.server.companion.repository.CompanionTagRepository;
import partypeople.server.exception.BusinessLogicException;
import partypeople.server.exception.ExceptionCode;
import partypeople.server.member.entity.Member;
import partypeople.server.member.service.MemberService;
import partypeople.server.message.dto.MessageDto;
import partypeople.server.message.entity.Message;
import partypeople.server.message.mapper.MessageMapper;
import partypeople.server.message.service.MessageService;
import partypeople.server.nation.entity.Nation;
import partypeople.server.nation.service.NationService;
import partypeople.server.review.entity.Review;
import partypeople.server.review.service.ReviewService;
import partypeople.server.utils.CustomBeanUtils;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@EnableScheduling
public class CompanionService {
    private final CompanionRepository companionRepository;
    private final CompanionTagRepository companionTagRepository;
    private final MemberService memberService;
    private final NationService nationService;
    private final ReviewService reviewService;
    private final MessageService messageService;
    private final MessageMapper messageMapper;
    private final CustomBeanUtils<Companion> beanUtils;
    private final ChatRoomService chatRoomService;

    public Companion createCompanion(Companion companion) {
        memberService.findMember(companion.getMember().getMemberId());
        Nation nation = nationService.findNation(companion.getNation());
        companion.setNation(nation);

        Companion savedCompanion = companionRepository.save(companion);

        chatRoomService.createChatRoom(savedCompanion);

        return savedCompanion;
    }

    public Companion updateCompanion(Companion companion) {
        Companion findCompanion = findVerifiedCompanionById(companion.getCompanionId());
        if (companion.getNation() != null && !findCompanion.getNation().getName().equals(companion.getNation().getName())) {
            Nation nation = nationService.findNation(companion.getNation());
            companion.setNation(nation);
        } else if (companion.getNation() != null) {
            companion.setNation(findCompanion.getNation());
        }

        Optional.ofNullable(companion.getCompanionTags()).ifPresent(companionTags -> {
            companionTagRepository.deleteByCompanionCompanionId(findCompanion.getCompanionId());
            findCompanion.setCompanionTags(companionTags);
        });

        Companion updateCompanion = beanUtils.copyNonNullProperties(companion, findCompanion);

        return updateCompanion;
    }

    public void deleteCompanion(Long companionId) {
        findVerifiedCompanionById(companionId);
        companionRepository.deleteById(companionId);
    }

    @Transactional(readOnly = true)
    public Companion findCompanion(Long companionId) {
        return findVerifiedCompanionById(companionId);
    }

    @Transactional(readOnly = true)
    public Page<Companion> findCompanionsByNation(int page, int size, String sortDir, String sortBy, String nationCode) {
        return companionRepository.findByNationCode(PageRequest.of(page, size, Sort.Direction.valueOf(sortDir), sortBy), nationCode);
    }

    @Transactional(readOnly = true)
    public List<Companion> findCompanionsByContinent(int continent) {
        return companionRepository.findByNationContinent(continent);
    }

    @Transactional(readOnly = true)
    public List<CompanionDto.ReviewedMember> findReviewedMember(Long companionId, Long memberId) {
        List<Review> reviews = reviewService.getReviewsByCompanionIdAndMemberId(companionId, memberId);
        List<CompanionDto.ReviewedMember> reviewedMembers = new ArrayList<>();

        for (Review review : reviews) {
            CompanionDto.ReviewedMember reviewedMember = new CompanionDto.ReviewedMember();
            reviewedMember.setMemberId(review.getReviewedMember().getMemberId());
            reviewedMembers.add(reviewedMember);
        }

        return reviewedMembers;
    }

    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul")
    public void updateCompanionStatus() {
        List<Companion> companions = companionRepository.findByDateBeforeAndCompanionStatusFalse(LocalDate.now());

        String content = "여행은 즐거우셨나요? 리뷰를 남겨주세요!";
        Long senderId = 1L;

        for (Companion companion : companions) {
            List<Member> receivers = companion.getParticipants().stream().map(Participant::getMember).collect(Collectors.toList());
            receivers.add(companion.getMember());

            for (Member receiver : receivers) {
                MessageDto.Post post = new MessageDto.Post(content, senderId, receiver.getMemberId(), companion.getCompanionId());
                Message message = messageMapper.messagePostToMessage(post);
                messageService.createMessage(message);
            }
            companion.setCompanionStatus(true);
        }
    }

    public List<CompanionChatDTO> getIncompleteCompanions() {
        List<Companion> incompleteCompanions = companionRepository.findByCompanionStatusFalse();
        List<CompanionChatDTO> companions = incompleteCompanions.stream()
                .map(i -> new CompanionChatDTO(String.valueOf(i.getCompanionId()), i.getTitle()))
                .collect(Collectors.toList());

        return companions;
    }

    @Transactional(readOnly = true)
    public Page<Companion> findCompanionByKeyword(int page, int size, String sortDir, String sortBy, String condition,
                                                  String keyword, String nationCode, String date) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.Direction.valueOf(sortDir), sortBy);
        if (!date.equals("")) {
            LocalDate parseDate = LocalDate.parse(date);
            return getCompanionPage(condition, keyword, nationCode, pageRequest, parseDate);
        }
        return getCompanionPage(condition, keyword, nationCode, pageRequest);
    }

    private Companion findVerifiedCompanionById(Long companionId) {
        Optional<Companion> optionalCompanion = companionRepository.findById(companionId);

        return optionalCompanion.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMPANION_NOT_FOUND));
    }

    private Page<Companion> getCompanionPage(String condition, String keyword, String nationCode, PageRequest pageRequest, LocalDate parseDate) {
        Page<Companion> companionPage;

        if (condition.equals("tags")) {
            companionPage = companionRepository.findInTags(pageRequest, keyword, nationCode, parseDate);
        } else if (condition.equals("title")) {
            companionPage = companionRepository.findInTitle(pageRequest, keyword, nationCode, parseDate);
        } else if (condition.equals("content")) {
            companionPage = companionRepository.findInContent(pageRequest, keyword, nationCode, parseDate);
        } else if (condition.equals("address")) {
            companionPage = companionRepository.findInAddress(pageRequest, keyword, nationCode, parseDate);
        } else {
            companionPage = companionRepository.findInEntire(pageRequest, keyword, nationCode, parseDate);
        }
        return companionPage;
    }
    private Page<Companion> getCompanionPage(String condition, String keyword, String nationCode, PageRequest pageRequest) {
        Page<Companion> companionPage;

        if (condition.equals("tags")) {
            companionPage = companionRepository.findInTags(pageRequest, keyword, nationCode);
        } else if (condition.equals("title")) {
            companionPage = companionRepository.findInTitle(pageRequest, keyword, nationCode);
        } else if (condition.equals("content")) {
            companionPage = companionRepository.findInContent(pageRequest, keyword, nationCode);
        } else if (condition.equals("address")) {
            companionPage = companionRepository.findInAddress(pageRequest, keyword, nationCode);
        } else {
            companionPage = companionRepository.findInEntire(pageRequest, keyword, nationCode);
        }
        return companionPage;
    }
}