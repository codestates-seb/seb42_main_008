package partypeople.server.companion.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import partypeople.server.audit.Auditable;
import partypeople.server.member.entity.Member;
import partypeople.server.nation.entity.Nation;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Companion extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long companionId;

    private String title;

    private String content;

    private LocalDate date;

    private String address;

    @Column(columnDefinition = "DECIMAL(8,5)")
    private Double lat;

    @Column(columnDefinition = "DECIMAL(8,5)")
    private Double lng;

    private Boolean companionStatus = false;

    @OneToMany(mappedBy = "companion", cascade = CascadeType.ALL)
    private List<CompanionTag> companionTags = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "NATION_ID")
    private Nation nation;

    public void addCompanionTag(CompanionTag companionTag) {
        this.companionTags.add(companionTag);

        if (companionTag.getCompanion() != this) {
            companionTag.setCompanion(this);
        }
    }
}
