package partypeople.server.companion.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import partypeople.server.companion.entity.Companion;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.util.List;

import static org.springframework.util.StringUtils.*;
import static partypeople.server.companion.entity.QCompanion.*;
import static partypeople.server.companion.entity.QCompanionTag.*;
import static partypeople.server.member.entity.QMember.*;
import static partypeople.server.nation.entity.QNation.*;
import static partypeople.server.tag.entity.QTag.*;

public class CompanionQueryRepositoryImpl implements CompanionQueryRepository{

    private final JPAQueryFactory queryFactory;

    public CompanionQueryRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<Companion> findCompanion(Pageable pageable, String condition, String keyword, String nationCode, String date) {

        List<Companion> content = queryFactory
            .selectFrom(companion).distinct()
            .join(companion.member, member).fetchJoin()
            .join(companion.nation, nation).fetchJoin()
            .join(companion.companionTags, companionTag)
            .join(companionTag.tag, tag)
            .where(
                dateEq(date),
                nationCodeEq(nationCode),
                keywordContain(condition, keyword)
            )
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .fetch();

        JPAQuery<Long> countQuery = queryFactory
            .select(companion.count()).distinct()
            .from(companion)
            .join(companion.nation, nation)
            .join(companion.companionTags, companionTag)
            .join(companionTag.tag, tag)
            .where(
                dateEq(date),
                nationCodeEq(nationCode),
                keywordContain(condition, keyword)
            );

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }

    private BooleanExpression keywordContain(String condition, String keyword) {
        if (hasText(keyword)) {
            if (condition.equals("tags")) {
                return tag.name.contains(keyword);
            } else if (condition.equals("title")) {
                return companion.title.contains(keyword);
            } else if (condition.equals("content")) {
                return companion.content.contains(keyword);
            } else if (condition.equals("address")) {
                return companion.address.contains(keyword);
            } else {
                return companion.title.contains(keyword)
                    .or(companion.address.contains(keyword))
                    .or(companion.content.contains(keyword))
                    .or(tag.name.contains(keyword));
            }
        } else {
            return null;
        }
    }

    private BooleanExpression dateEq(String date) {
        return hasText(date) ? companion.date.eq(LocalDate.parse(date)) : null;
    }

    private BooleanExpression nationCodeEq(String nationCode) {
        return hasText(nationCode) ? nation.code.eq(nationCode) : null;
    }
}
