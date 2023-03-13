package partypeople.server.companion.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import partypeople.server.companion.dto.CompanionDto;
import partypeople.server.companion.entity.Companion;
import partypeople.server.companion.entity.CompanionTag;
import partypeople.server.member.entity.Member;
import partypeople.server.nation.entity.Nation;
import partypeople.server.tag.entity.Tag;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface CompanionMapper {
    default Companion companionPostDtoToCompanion(CompanionDto.Post requestBody, List<Tag> tags) {
        if ( requestBody == null ) {
            return null;
        }

        Companion companion = new Companion();

        Member member = new Member();
        member.setMemberId(requestBody.getMemberId());

        Nation nation = new Nation();
        nation.setName(requestBody.getNationName());
        nation.setCode(requestBody.getNationCode());
        nation.setContinent(requestBody.getContinent());

        companion.setMember( member );
        companion.setNation( nation );
        companion.setTitle( requestBody.getTitle() );
        companion.setContent( requestBody.getContent() );
        companion.setDate( requestBody.getDate() );
        companion.setAddress( requestBody.getAddress() );
        companion.setLat( requestBody.getLat() );
        companion.setLng( requestBody.getLng() );

        companion.setCompanionTags(tagsToCompanionTags(companion, tags));

        return companion;
    }

    default Companion companionPatchDtoToCompanion(CompanionDto.Patch requestBody, List<Tag> tags) {
        if ( requestBody == null ) {
            return null;
        }

        Companion companion = new Companion();

        Nation nation = null;
        if (requestBody.getNationCode() != null) {
            nation = new Nation();
            nation.setName(requestBody.getNationName());
            nation.setCode(requestBody.getNationCode());
            nation.setContinent(requestBody.getContinent());
        }

        companion.setNation( nation );
        companion.setCompanionId(requestBody.getCompanionId());
        companion.setTitle( requestBody.getTitle() );
        companion.setContent( requestBody.getContent() );
        companion.setDate( requestBody.getDate() );
        companion.setAddress( requestBody.getAddress() );
        companion.setLat( requestBody.getLat() );
        companion.setLng( requestBody.getLng() );

        List<CompanionTag> companionTags = tags.isEmpty() ? null : tagsToCompanionTags(companion, tags);
        companion.setCompanionTags(companionTags);

        return companion;
    }

    default CompanionDto.Response companionToCompanionResponseDto(Companion companion) {
        if ( companion == null ) {
            return null;
        }

        CompanionDto.Response response = new CompanionDto.Response();

        response.setMemberId( companion.getMember().getMemberId() );
        response.setNickname( companion.getMember().getNickname() );
        response.setScore(companion.getMember().getScore());
        response.setCompanionId( companion.getCompanionId() );
        response.setTitle( companion.getTitle() );
        response.setContent( companion.getContent() );
        response.setDate( companion.getDate() );
        response.setAddress( companion.getAddress() );
        response.setLat( companion.getLat() );
        response.setLng( companion.getLng() );
        response.setCompanionStatus(companion.isCompanionStatus());

        List<String> tags = companion.getCompanionTags().stream()
                .map(companionTag -> companionTag.getTag().getName())
                .collect(Collectors.toList());
        response.setTags(tags);

        return response;
    }

    List<CompanionDto.Response> companionsToCompanionResponseDtos(List<Companion> companions);

    default List<CompanionTag> tagsToCompanionTags(Companion companion, List<Tag> tags) {
        List<CompanionTag> companionTags = tags.stream()
                .map(tag -> {
                            CompanionTag companionTag = new CompanionTag();
                            companionTag.setCompanion(companion);
                            companionTag.setTag(tag);
                            return companionTag;
                        }
                ).collect(Collectors.toList());

        return companionTags;
    }
}
