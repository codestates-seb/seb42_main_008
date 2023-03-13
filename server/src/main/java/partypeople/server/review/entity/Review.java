package partypeople.server.review.entity;

import lombok.Getter;
import lombok.Setter;
import partypeople.server.companion.entity.Companion;
import partypeople.server.member.entity.Member;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    private int score;

    @Column(columnDefinition = "TEXT")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "REVIEWED_MEMBER_ID")
    private Member reviewedMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COMPANION_ID")
    private Companion companion;

}
