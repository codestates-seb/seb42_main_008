package partypeople.server.companion.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import partypeople.server.companion.dto.SubscriberParticipantDto;
import partypeople.server.companion.entity.Participant;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ParticipantMapper {

    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "member.profile", target = "profile")
    @Mapping(source = "member.nickname", target = "nickname")
    SubscriberParticipantDto.Response participantToParticipantResponse(Participant participant);

    List<SubscriberParticipantDto.Response> participantsToParticipantResponses(List<Participant> participants);
}
