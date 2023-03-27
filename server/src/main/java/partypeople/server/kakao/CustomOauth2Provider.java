package partypeople.server.kakao;

import org.springframework.boot.autoconfigure.security.oauth2.client.OAuth2ClientProperties;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;

public enum CustomOauth2Provider {
    KAKAO {
        @Override
        public ClientRegistration.Builder getBuilder(String registrationId,
                                                    OAuth2ClientProperties.Provider provider) {
            ClientRegistration.Builder builder = getBuilder(registrationId,
                    ClientAuthenticationMethod.CLIENT_SECRET_POST, DEFAULT_LOGIN_REDIRECT_URL);
            builder.scope("profile_nickname", "profile_image", "account_email", "gender");
            builder.authorizationUri(provider.getAuthorizationUri());
            builder.tokenUri(provider.getTokenUri());
            builder.userInfoUri(provider.getUserInfoUri());
            builder.userNameAttributeName(provider.getUserNameAttribute());
            builder.clientName(registrationId);
            return builder;
        }
    };

    private static final String DEFAULT_LOGIN_REDIRECT_URL = "{baseUrl}/login/oauth2/code/{registrationId}";
    protected final ClientRegistration.Builder getBuilder(String registrationId,
                                                          ClientAuthenticationMethod method, String redirectUri) {
        ClientRegistration.Builder builder = ClientRegistration.withRegistrationId(registrationId);
        builder.clientAuthenticationMethod(method);
        builder.authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE);
        builder.redirectUri(redirectUri);
        return builder;
    }

    public abstract ClientRegistration.Builder getBuilder(String registrationId, OAuth2ClientProperties.Provider provider);

}
