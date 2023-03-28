package partypeople.server.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import partypeople.server.member.entity.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {


//    @Query("SELECT m FROM Member m WHERE m.email = binary(:email)")
    Optional<Member> findByEmail(String email);

//    @Query("SELECT m FROM Member m WHERE m.nickname = binary(:nickname)")
    Optional<Member> findByNickname(String nickname);
    @Query("SELECT m.nickname FROM Member m")
    List<String> findAllNicknames();
}
