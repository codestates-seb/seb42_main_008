package partypeople.server.message.entity;

import lombok.Getter;
import lombok.Setter;
import partypeople.server.audit.Auditable;
import partypeople.server.companion.entity.Companion;
import partypeople.server.member.entity.Member;

import javax.persistence.*;
import java.text.DecimalFormat;

@Entity
@Getter
@Setter
public class Message extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    private boolean isRead;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SENDER_ID")
    private Member sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "RECEIVER_ID")
    private Member receiver;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COMPANION_ID")
    private Companion companion;

    public boolean getIsRead() {
        return isRead;
    }

    public void checkMessage() {
        this.isRead = true;
    }
}
