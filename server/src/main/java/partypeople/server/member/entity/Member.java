package partypeople.server.member.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import partypeople.server.audit.Auditable;
import partypeople.server.companion.entity.Companion;
import partypeople.server.companion.entity.Participant;
import partypeople.server.companion.entity.Subscriber;
import partypeople.server.message.entity.Message;
import partypeople.server.review.entity.Review;

import javax.persistence.*;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Member extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, unique = true, columnDefinition = "varbinary(100)")
    private String nickname;

    @Column(nullable = false, updatable = false, unique = true, columnDefinition = "varbinary(255)")
    private String email;

    @Column(length = 100, nullable = false)
    private String password;

    @Lob
    private String profile="https://source.boringavatars.com/beam";

    @Lob
    private String content;

    private String gender="NONE";

    private Integer score;

    private Integer followerCount;

    private Integer followingCount;

    @Enumerated(value = EnumType.STRING)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy = "follower", cascade = CascadeType.REMOVE) //필드명 으로 !
    private List<Follow> followers = new ArrayList<>();

    @OneToMany(mappedBy = "following", cascade = CascadeType.REMOVE)    //
    private List<Follow> followings = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)    //
    private List<Participant> participants = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)    //
    private List<Subscriber> subscribers = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)    //
    private List<Companion> companions = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)    //
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "reviewedMember", cascade = CascadeType.REMOVE)    //
    private List<Review> reviewedMembers = new ArrayList<>();

    @OneToMany(mappedBy = "sender", cascade = CascadeType.REMOVE)    //
    private List<Message> senders = new ArrayList<>();

    @OneToMany(mappedBy = "receiver", cascade = CascadeType.REMOVE)    //
    private List<Message> receivers = new ArrayList<>();


    public enum MemberStatus{
        MEMBER_ACTIVE("활동중"),
        MEMBER_QUIT("탈퇴 상태");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }
}
