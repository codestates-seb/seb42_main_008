package partypeople.server.auth.userdetails;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import partypeople.server.auth.utils.CustomAuthorityUtils;
import partypeople.server.exception.BusinessLogicException;
import partypeople.server.exception.ExceptionCode;
import partypeople.server.member.entity.Member;
import partypeople.server.member.repository.MemberRepository;

import java.util.Collection;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class MemberDetailService implements UserDetailsService {
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return new MemberDetails(findMember);
    }

    private class MemberDetails extends Member implements UserDetails {
        public MemberDetails(Member member) {
            setMemberId(member.getMemberId());
            setNickname(member.getNickname());
            setEmail(member.getEmail());
            setProfile(member.getProfile());
            setPassword(member.getPassword());
            setRoles(member.getRoles());
            setCreatedAt(member.getCreatedAt());
            setModifiedAt(member.getModifiedAt());
            setMemberStatus(member.getMemberStatus());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}
