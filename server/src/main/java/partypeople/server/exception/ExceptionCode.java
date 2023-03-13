package partypeople.server.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member Not Found"),
    EMAIL_EXISTS(409, "Email Already Exists"),
    NICKNAME_EXIST(409, "Nickname Already Exists"),
    PASSWORD_NOT_MATCH(403,"Password Not Match"),

    BLACK_LIST_TOKEN(401, "만료된 토큰 입니다."),

    SIGNATURE_ERROR(401, "Token Signature Error"),
    EXPIRED_ERROR(401, "Token Expired Error"),
    ACCESS_TOKEN_ERROR(401, "AccessToken Error"),
    FOLLOW_ERROR(400,"Follower - Following SAME ERROR"),

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