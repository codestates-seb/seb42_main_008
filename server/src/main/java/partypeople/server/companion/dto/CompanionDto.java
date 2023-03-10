package partypeople.server.companion.dto;

import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDate;
import java.util.List;

public class CompanionDto {

    @Getter
    public static class Post {
        @NotBlank
        private String title;

        private String content;

        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        private LocalDate date;

        @NotBlank
        private String address;

        private Double lat;

        private Double lng;

        @NotBlank
        private String nationName;

        @NotBlank
        private String nationCode;

        @Positive
        private Integer continent;

        private List<String> tags;

        @Positive
        private Long memberId;
    }
}
