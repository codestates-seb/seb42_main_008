package partypeople.server.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member Not Found"),
    EMAIL_EXISTS(409, "Email Already Exists"),
    NICKNAME_EXIST(409, "Nickname Already Exists"),

    QUESTION_NOT_FOUND(404, "Question Not Found"),
    QUESTION_SORT_ERROR(500,"Question Sort Error"),
    ANSWER_NOT_FOUND(404, "Answer Not Found"),

    QUESTION_COMMENT_NOT_FOUND(404, "Question Comment Not Found"),
    ANSWER_COMMENT_NOT_FOUND(404, "Answer Comment Not Found"),

    QUESTION_BOOKMARK_EXISTS(409, "Question Bookmark Already Exists"),
    ANSWER_BOOKMARK_EXISTS(409, "Answer Bookmark Already Exists"),
    QUESTION_BOOKMARK_NOT_FOUND(404, "Question Bookmark Not Found"),
    ANSWER_BOOKMARK_NOT_FOUND(404, "Answer Bookmark Not Found"),

    QUESTION_VOTE_EXISTS(409, "Question Vote Already Exists"),
    ANSWER_VOTE_EXISTS(409, "Answer Vote Already Exists"),
    QUESTION_VOTE_NOT_FOUND(404, "Question Vote Not Found"),
    ANSWER_VOTE_NOT_FOUND(404,"Answer Vote Not Found"),

    MEMBER_NOT_MATCH(403,"Member Not Match");


    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}