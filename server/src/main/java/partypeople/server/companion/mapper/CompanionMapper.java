package partypeople.server.companion.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import partypeople.server.companion.dto.CompanionDto;
import partypeople.server.companion.entity.Companion;
import partypeople.server.companion.entity.CompanionTag;
import partypeople.server.member.entity.Member;
import partypeople.server.nation.entity.Nation;
import partypeople.server.review.dto.ReviewDto;
import partypeople.server.review.entity.Review;
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

    CompanionDto.Response companionToCompanionResponse(Companion companion);

    List<CompanionDto.Response> companionsToCompanionResponses(List<Companion> companions);
}
