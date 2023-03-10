package partypeople.server.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member Not Found"),
    EMAIL_EXISTS(409, "Email Already Exists"),
    NICKNAME_EXIST(409, "Nickname Already Exists"),
    PASSWORD_NOT_MATCH(403,"Password Not Match"),
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