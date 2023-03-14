package partypeople.server.companion.entity;

import lombok.Getter;
import lombok.Setter;
import partypeople.server.member.entity.Member;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long participantId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COMPANION_ID")
    private Companion companion;
}
