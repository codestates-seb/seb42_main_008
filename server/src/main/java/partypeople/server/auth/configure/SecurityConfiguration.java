package partypeople.server.auth.configure;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.oauth2.client.OAuth2ClientProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import partypeople.server.auth.filter.JwtAuthenticationFilter;
import partypeople.server.auth.filter.JwtAuthorizationFilter;
import partypeople.server.auth.handler.MemberAuthenticationEntryPoint;
import partypeople.server.auth.handler.MemberAuthenticationFailureHandler;
import partypeople.server.auth.handler.MemberAuthenticationSuccessHandler;
import partypeople.server.auth.handler.OAuth2MemberSuccessHandler;
import partypeople.server.auth.jwt.JwtTokenizer;
import partypeople.server.auth.utils.CustomAuthorityUtils;
import partypeople.server.kakao.CustomOauth2Provider;
import partypeople.server.member.service.MemberService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final RedisTemplate<String, String> redisTemplate;
    private final MemberService memberService;

    @Value("${spring.security.oauth2.client.registration.google.clientId}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.clientSecret}")
    private String clientSecret;

    @Value("${oauth2.kakao.clientId}")
    private String kakaoClientId;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .headers().frameOptions().sameOrigin()
            .and()
            .csrf().disable()
            .cors(withDefaults())
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .formLogin().disable()
            .httpBasic().disable()  //UsernamePasswordAuthenticationFilter 필터 끊기?
            .exceptionHandling()
            .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
            .and()
            .apply(new CustomFilterConfigurer())
            .and()
//        .authorizeHttpRequests(authorize -> authorize
//                .antMatchers(HttpMethod.POST, "/members/follows").hasRole("USER")
//                .antMatchers(HttpMethod.DELETE, "/members/*").hasRole("USER")
//                .antMatchers(HttpMethod.PATCH, "/members/*").hasRole("USER")
//                .antMatchers(HttpMethod.GET, "/members/**").hasRole("USER")
//                .antMatchers(HttpMethod.GET,
//                    "/companions/continents",
//                    "/companions/nations",
//                    "/companions/search",
//                    "/messages/not-read/*").permitAll()
//                .antMatchers(
//                    "/companions/**",
//                    "/messages/**",
//                    "/reviews/**").hasRole("USER")
//                .anyRequest().permitAll()
//            )
            .oauth2Login(oAuth2 -> oAuth2
                .authorizationEndpoint()
                .baseUri("/members/login")
                .and()
                .successHandler(new OAuth2MemberSuccessHandler(jwtTokenizer, authorityUtils, memberService))
                .failureHandler(new MemberAuthenticationFailureHandler())
            );

        return http.build();
    }

    @Bean
    public ClientRegistrationRepository clientRegistrationRepository(OAuth2ClientProperties oAuth2ClientProperties) {
        List<ClientRegistration> registrations = new ArrayList<>();
        registrations.add(clientRegistration());
        registrations.add(getProvider(oAuth2ClientProperties, kakaoClientId));

        return new InMemoryClientRegistrationRepository(registrations);
    }

    private ClientRegistration getProvider(OAuth2ClientProperties oAuth2ClientProperties, String clientId) {
        OAuth2ClientProperties.Provider provider =oAuth2ClientProperties.getProvider().get("kakao");
        return CustomOauth2Provider.KAKAO.getBuilder("kakao", provider)
                .clientId(clientId)
                .build();
    }

    private ClientRegistration clientRegistration() {
        return CommonOAuth2Provider
            .GOOGLE
            .getBuilder("google")
            .clientId(clientId)
            .clientSecret(clientSecret)
            .build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE", "OPTIONS"));
        configuration.addExposedHeader("Authorization");
        configuration.addExposedHeader("Refresh");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    private class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer,memberService);
            jwtAuthenticationFilter.setFilterProcessesUrl("/members/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());
            JwtAuthorizationFilter jwtAuthorizationFilter = new JwtAuthorizationFilter(jwtTokenizer, authorityUtils, redisTemplate);

            builder
                .addFilter(jwtAuthenticationFilter)
                .addFilterAfter(jwtAuthorizationFilter, JwtAuthenticationFilter.class);
        }
    }
}
