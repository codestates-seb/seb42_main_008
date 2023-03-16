package partypeople.server.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import partypeople.server.auth.AuthService;
import partypeople.server.auth.configure.SecurityConfiguration;
import partypeople.server.auth.filter.JwtAuthenticationFilter;
import partypeople.server.auth.filter.JwtAuthorizationFilter;
import partypeople.server.auth.handler.MemberAuthenticationEntryPoint;
import partypeople.server.auth.handler.MemberAuthenticationFailureHandler;
import partypeople.server.auth.handler.MemberAuthenticationSuccessHandler;
import partypeople.server.auth.jwt.JwtTokenizer;
import partypeople.server.auth.utils.CustomAuthorityUtils;

import static org.springframework.security.config.Customizer.withDefaults;

@TestConfiguration
//@Import({JwtAuthenticationFilter.class})
@EnableWebSecurity
public class SecurityConfigurationTest {

//    @Autowired
//    private JwtTokenizer jwtTokenizer;
//
//    @Autowired
//    private CustomAuthorityUtils authorityUtils;
//
//    @Autowired
//    private RedisTemplate<String, String> redisTemplate;
//    @Autowired
//    private AuthService authService;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .headers().frameOptions().sameOrigin()
            .and()
            .csrf().disable()
            .cors(withDefaults())
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .formLogin()
                .loginPage("/members/login")
                .and()
            .httpBasic().disable()  //UsernamePasswordAuthenticationFilter 필터 끊기?
            .exceptionHandling()
            .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
            .and()
//            .apply(new CustomFilterConfigurer())
//            .and()
//            .addFilterBefore(new JwtAuthenticationFilter().setFilterProcessesUrl("/members/login"), UsernamePasswordAuthenticationFilter.class)

            .authorizeHttpRequests(authorize -> authorize
                .anyRequest().permitAll()
            );

        return http.build();
    }

//    private class CustomFilterConfigurer extends AbstractHttpConfigurer<SecurityConfigurationTest.CustomFilterConfigurer, HttpSecurity> {
//        @Override
//        public void configure(HttpSecurity builder) {
//            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
//
//            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer,authService);
//            jwtAuthenticationFilter.setFilterProcessesUrl("/members/login");
//            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
//            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());
////            JwtAuthorizationFilter jwtAuthorizationFilter = new JwtAuthorizationFilter(jwtTokenizer, authorityUtils, redisTemplate);
//
//            builder
//                    .addFilter(jwtAuthenticationFilter);
////                    .addFilterAfter(jwtAuthorizationFilter, JwtAuthenticationFilter.class);
//        }
//    }
}
