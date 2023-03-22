package partypeople.server.auth.utils;

import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import partypeople.server.response.ErrorResponse;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ErrorResponder {
    public static void sendErrorResponse(HttpServletResponse response, HttpStatus status, Exception exception) throws IOException {
        Gson gson = new Gson();
        ErrorResponse errorResponse;
        if (exception == null) {
            errorResponse = ErrorResponse.of(status);
        } else {
            errorResponse = ErrorResponse.of(status, exception.getMessage());
        }
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(status.value());
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));


    }
}
