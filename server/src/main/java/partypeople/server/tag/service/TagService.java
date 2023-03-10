package partypeople.server.tag.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import partypeople.server.tag.entity.Tag;
import partypeople.server.tag.repository.TagRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;

    public List<Tag> findTagsByNames(List<String> tagNames) {
        List<Tag> tags = new ArrayList<>();

        if (tagNames == null) {
            return tags;
        }

        for (String tagName : tagNames) {
            Optional<Tag> optionalTag = tagRepository.findByName(tagName);
            tags.add(optionalTag.orElseGet(() -> tagRepository.save(new Tag(tagName))));
        }

        return tags;
    }
}
