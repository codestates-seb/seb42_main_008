package partypeople.server.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member Not Found"),
    EMAIL_EXISTS(409, "Email Already Exists"),
    NICKNAME_EXIST(409, "Nickname Already Exists"),
    PASSWORD_NOT_MATCH(403,"Password Not Match"),

    FOLLOW_ERROR(400,"Follower - Following SAME ERROR"),
    COMPANION_NOT_FOUND(404, "Companion Not Found"),

    SUBSCRIBER_EXIST(409, "Member Already Subscribed"),
    PARTICIPANT_EXIST(409, "Member Already Participated"),
    SUBSCRIBER_NOT_FOUND(404, "Member Not Subscribed"),
    PARTICIPANT_NOT_FOUND(404, "Member Not Participated"),

    MESSAGE_NOT_FOUND(404, "Message Not Found");



    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}