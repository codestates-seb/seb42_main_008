package partypeople.server.util;

import org.springframework.restdocs.operation.preprocess.OperationRequestPreprocessor;
import org.springframework.restdocs.operation.preprocess.OperationResponsePreprocessor;

import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;

public interface ApiDocumentUtils {
    static OperationRequestPreprocessor getRequestPreProcessor() {
        return preprocessRequest(
                modifyUris()
                        .scheme("http")
                        .host("party-people.com")
                        .removePort(),
                prettyPrint());
    }

    static OperationResponsePreprocessor getResponsePreProcessor() {
        return preprocessResponse(prettyPrint());
    }
}
