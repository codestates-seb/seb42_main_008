package partypeople.server.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
//@Table(uniqueConstraints=@UniqueConstraint(columnNames={"follower_id", "following_id"}))
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long followId;

    @ManyToOne  //신청자
    @JoinColumn(name = "follower_id")
    private Member follower;

    @ManyToOne //대상자
    @JoinColumn(name = "following_id")
    private Member following;
    public void addFollower(Member follower) {
        this.follower = follower;
        if (!this.follower.getFollowers().contains(this)) {
            this.follower.getFollowers().add(this);
        }
    }

    public void addFollowing(Member following) {
        this.following = following;
        if (!this.following.getFollowings().contains(this)) {
            this.following.getFollowings().add(this);
        }
    }
}
