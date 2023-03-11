package partypeople.server.companion.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import partypeople.server.tag.entity.Tag;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class CompanionTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long companionTagId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TAG_ID")
    private Tag tag;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COMPANION_ID")
    private Companion companion;

    public void setCompanion(Companion companion) {
        this.companion = companion;

        if (!companion.getCompanionTags().contains(this)) {
            companion.getCompanionTags().add(this);
        }
    }
}
