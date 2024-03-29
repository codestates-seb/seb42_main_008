package partypeople.server.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member Not Found"),
    EMAIL_EXISTS(409, "Email Already Exists"),
    NICKNAME_EXIST(409, "Nickname Already Exists"),
    PASSWORD_NOT_MATCH(403,"Password Not Match"),
    WITHDRAWAL_MEMBER(404, "탈퇴한 회원입니다."),
    REFRESH_TOKEN_ERROR(401, "유효한 토큰이 아닙니다."),
    SIGNATURE_ERROR(401, "Token Signature Error"),
    EXPIRED_ERROR(401, "Token Expired Error"),

    AT_EXPIRED_ERROR(401, "Access Token Expired Error"),
    ACCESS_TOKEN_ERROR(401, "AccessToken Error"),
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