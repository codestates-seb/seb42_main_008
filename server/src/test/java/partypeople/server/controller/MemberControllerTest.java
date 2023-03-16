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

        return ResponseEntity.ok().build();
    }
}
