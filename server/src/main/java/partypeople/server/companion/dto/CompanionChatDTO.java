package partypeople.server.companion.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public class CompanionChatDTO {
    String companionId;
    String companionTitle;

    public CompanionChatDTO(Long companionId, String title) {
        this.companionId = String.valueOf(companionId);
        this.companionTitle = title;
    }
}
