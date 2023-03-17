package partypeople.server.controller;

import org.springframework.boot.test.context.TestComponent;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import partypeople.server.member.dto.MemberDto;

@TestComponent
@RestController
@RequestMapping("/members")
public class MemberControllerTest {
    @PostMapping("/login")
    public ResponseEntity loginMember(@RequestBody MemberDto.Login login) {


        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6WyJVU0VSIl0sIm1lbWJlclN0YXR1cyI6Ik1FTUJFUl9BQ1RJVkUiLCJlbWFpbCI6InppcGNrczEzODFAZ21haWwyLmNvbSIsIm1lbWJlcklkIjoyLCJzdWIiOiJ6aXBja3MxMzgxQGdtYWlsMi5jb20iLCJpYXQiOjE2NzkwMTU0NDcsImV4cCI6MTY3OTAxNjA0N30.2c_jkLcbh3MEVkWc4wGEUpVHKc0qyngL2_UahF7nri9UvxhwhawjYSul_4MuaV49");

        return ResponseEntity.ok().headers(headers).build();
    }
}
