package partypeople.server.init;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import partypeople.server.companion.dto.CompanionDto;
import partypeople.server.companion.entity.Companion;
import partypeople.server.companion.mapper.CompanionMapper;
import partypeople.server.companion.service.CompanionService;
import partypeople.server.member.entity.Member;
import partypeople.server.nation.entity.Nation;
import partypeople.server.tag.entity.Tag;
import partypeople.server.tag.service.TagService;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class initDb {
    private final InitService initService;

    @PostConstruct
    public void init() {
        initService.dbInit1();
        initService.dbInit2();
    }

    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {
        private final EntityManager em;

        private final PasswordEncoder passwordEncoder;
        private final CompanionService companionService;
        private final CompanionMapper companionMapper;

        private final TagService tagService;

        public void dbInit1() {
            Member member1 = createMember("system@system.com", "SYSTEM","partypeople");
            em.persist(member1);

            Member member2 = createMember("zipcks1381@gmail2.com", "Joe2","a12345678");
            em.persist(member2);

            Member member3 = createMember("zipcks1381@gmail3.com", "Joe3","a12345678");
            em.persist(member3);

            Member member4 = createMember("zipcks1381@gmail4.com", "Joe4","a12345678");
            em.persist(member4);

            Member member5 = createMember("zipcks1381@gmail5.com", "Joe5","a12345678");
            em.persist(member5);

            Member member6 = createMember("zipcks1381@gmail6.com", "Joe6","a12345678");
            em.persist(member6);

            Member member7 = createMember("zipcks1381@gmail7.com", "Joe7","a12345678");
            em.persist(member7);
        }


        public void dbInit2() {

            CompanionDto.Post post1 = new CompanionDto.Post(
                    "?????? ???????????? ?????? ??????",
                    "?????? ???????????? ??????????????? ????????? ?????????????????? ?????? ?????? ??? ??????~",
                    LocalDate.of(2023, 3, 20),
                    "?????? ????????????????????????",
                    123.45678,
                    123.12345,
                    "??????",
                    "jpn",
                    2,
                    new ArrayList<>(Arrays.asList("??????", "????????????")),
                    2L
            );
            List<Tag> tags1 = tagService.findTagsByNames(post1.getTags());
            companionService.createCompanion(companionMapper.companionPostDtoToCompanion(post1, tags1));

            CompanionDto.Post post2 = new CompanionDto.Post(
                    "?????? ?????? ?????? ?????? ??? ??????~",
                    "????????? ????????? ????????? ??????",
                    LocalDate.of(2023, 3, 15),
                    "?????? ?????? ??????",
                    123.45678,
                    123.12345,
                    "??????",
                    "deu",
                    3,
                    new ArrayList<>(Arrays.asList("??????", "??????")),
                    3L
            );
            List<Tag> tags2 = tagService.findTagsByNames(post2.getTags());
            companionService.createCompanion(companionMapper.companionPostDtoToCompanion(post2, tags2));

            CompanionDto.Post post3 = new CompanionDto.Post(
                    "?????? ????????? ???????????? ???",
                    "????????? ???????????????!!!! ????????????????????? ?????? ??????????????????????",
                    LocalDate.of(2023, 2, 23),
                    "??????????????? ???????????? ??? ????????? ???",
                    123.45678,
                    123.12345,
                    "???????????????",
                    "isl",
                    3,
                    new ArrayList<>(Arrays.asList("??????", "??? ??????", "??????")),
                    4L
            );
            List<Tag> tags3 = tagService.findTagsByNames(post3.getTags());
            companionService.createCompanion(companionMapper.companionPostDtoToCompanion(post3, tags3));
        }

        private Member createMember(String email, String nickname, String password) {
            Member member = new Member();
            member.setEmail(email);
            member.setNickname(nickname);
            member.setPassword(passwordEncoder.encode(password));
            return member;
        }
    }
}
