package partypeople.server.auth.configure;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import partypeople.server.auth.AuthService;
import partypeople.server.auth.filter.JwtAuthenticationFilter;
import partypeople.server.auth.filter.JwtAuthorizationFilter;
import partypeople.server.auth.handler.MemberAuthenticationEntryPoint;
import partypeople.server.auth.handler.MemberAuthenticationFailureHandler;
import partypeople.server.auth.handler.MemberAuthenticationSuccessHandler;
import partypeople.server.auth.jwt.JwtTokenizer;
import partypeople.server.auth.utils.CustomAuthorityUtils;
import partypeople.server.member.service.MemberService;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
//@EnableWebSecurity(debug = true)
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final RedisTemplate<String, String> redisTemplate;
    private final AuthService authService;
//    private final MemberService memberService;

//    @Value("${spring.security.oauth2.client.registration.google.clientId}")
//    private String clientId;
//
//    @Value("${spring.security.oauth2.client.registration.google.clientSecret}")
//    private String clientSecret;

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
//            .logout()
//            .logoutUrl("/members/logout")
//            .logoutSuccessUrl("/members/login")
//            .and()
            .exceptionHandling()
            .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
            .and()
            .apply(new CustomFilterConfigurer())
            .and()
            .authorizeHttpRequests(authorize -> authorize
                .antMatchers(HttpMethod.PATCH, "/members/*").hasRole("USER")
                .anyRequest().permitAll()
            );
//            .oauth2Login(oAuth2 -> oAuth2
//                .authorizationEndpoint()
//                .baseUri("/members/login")
//                .and()
//                .successHandler(new OAuth2MemberSuccessHandler(jwtTokenizer, authorityUtils, memberService))
//                .failureHandler(new MemberAuthenticationFailureHandler())
//            );

        return http.build();
    }

//    @Bean
//    public ClientRegistrationRepository clientRegistrationRepository() {
//        var clientRegistration = clientRegistration();
//
//        return new InMemoryClientRegistrationRepository(clientRegistration);
//    }

//    private ClientRegistration clientRegistration() {
//        return CommonOAuth2Provider
//            .GOOGLE
//            .getBuilder("google")
//            .clientId(clientId)
//            .clientSecret(clientSecret)
////            .redirectUri()
//            .build();
//    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.addExposedHeader("*");
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE", "OPTIONS"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    private class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer,authService);
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
