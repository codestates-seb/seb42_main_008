package partypeople.server.init;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import partypeople.server.member.entity.Member;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;

@Component
@RequiredArgsConstructor
public class initDb {
    private final InitService initService;

    @PostConstruct
    public void init() {
        initService.dbInit1();
    }

    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {
        private final EntityManager em;

        private final PasswordEncoder passwordEncoder;
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

        private Member createMember(String email, String nickname, String password) {
            Member member = new Member();
            member.setEmail(email);
            member.setNickname(nickname);
            member.setPassword(passwordEncoder.encode(password));
            return member;
        }
    }
}
