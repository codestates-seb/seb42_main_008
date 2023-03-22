package partypeople.server.message.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import partypeople.server.message.dto.MessageDto;
import partypeople.server.message.entity.Message;

import java.time.format.DateTimeFormatter;
import java.util.List;

@Mapper(componentModel = "spring")
public interface MessageMapper {

    @Mapping(source = "senderId", target = "sender.memberId")
    @Mapping(source = "receiverId", target = "receiver.memberId")
    @Mapping(source = "companionId", target = "companion.companionId")
    Message messagePostToMessage(MessageDto.Post requestBody);

    @Mapping(source = "sender.memberId", target = "sender.id")
    @Mapping(source = "sender.nickname", target = "sender.nickname")
    @Mapping(source = "companion.companionId", target = "companionId")
    MessageDto.Response messageToMessageResponse(Message message);

    List<MessageDto.Response> messagesToMessageResponses(List<Message> messages);
}
