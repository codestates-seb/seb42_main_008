package partypeople.server.companion.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import partypeople.server.companion.dto.SubscriberParticipantDto;
import partypeople.server.companion.entity.Subscriber;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SubscriberMapper {
    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "member.profile", target = "profile")
    @Mapping(source = "member.nickname", target = "nickname")
    SubscriberParticipantDto.Response subscriberToSubscriberResponse(Subscriber subscriber);

    List<SubscriberParticipantDto.Response> subscribersToSubscriberResponses(List<Subscriber> subscribers);
}
