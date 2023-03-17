package partypeople.server.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import partypeople.server.auth.jwt.JwtTokenizer;

import java.util.concurrent.TimeUnit;

@Service
@EnableAsync
@RequiredArgsConstructor
public class AuthService {
    private final JwtTokenizer jwtTokenizer;
    private final RedisTemplate<String, String> redisTemplate;
    @Async
    public void redisSetRefreshToken(Long refreshTokenExp,String refreshToken,String subject) {
        redisTemplate.opsForValue().set(subject, refreshToken, refreshTokenExp, TimeUnit.MILLISECONDS);
    }
}
