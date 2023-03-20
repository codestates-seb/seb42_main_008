package partypeople.server;

import partypeople.server.companion.dto.CompanionDto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;

public class InitDb {
    public static CompanionDto.ResponseMember response1 = CompanionDto.ResponseMember.builder()
                    .companionId(1L)
                    .address("일본 유니버셜스튜디오")
                    .lng(123.45678)
                    .lat(123.45678)
                    .date(LocalDate.of(2023, 3, 20))
                    .companionStatus(false)
                    .build();

    public static CompanionDto.ResponseMember response2 = CompanionDto.ResponseMember.builder()
            .companionId(2L)
            .address("한국 주소")
            .lng(123.45678)
            .lat(123.45678)
            .date(LocalDate.of(2023, 3, 20))
            .companionStatus(false)
            .build();

    public static CompanionDto.ResponseMember response3 = CompanionDto.ResponseMember.builder()
            .companionId(3L)
            .address("영국 주소")
            .lng(123.45678)
            .lat(123.45678)
            .date(LocalDate.of(2023, 3, 20))
            .companionStatus(false)
            .build();


}
