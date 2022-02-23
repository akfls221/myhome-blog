package com.taekwon.myhome.web;

import com.taekwon.myhome.service.EmailService;
import com.taekwon.myhome.service.SignService;
import com.taekwon.myhome.web.dto.JoinRequestDto;
import com.taekwon.myhome.web.dto.SignResponseDto;
import com.taekwon.myhome.web.dto.SignRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1")
@CrossOrigin(origins = "http://localhost:8081/")
public class SignApiController {

    private final SignService signService;
    private final EmailService emailService;

    @PostMapping("/sign")
    public SignResponseDto sign(@RequestBody SignRequestDto request) {
        return signService.getSingleResult(request);
    }

    @PostMapping("/idCheck")
    public Boolean isJoined(@RequestBody String uid) {
        return signService.isJoinedUser(uid);
    }


    @PostMapping("/join")
    public SignResponseDto join(@RequestBody JoinRequestDto request) {

        return signService.join(request);
    }

    @GetMapping("/email")
    public void emailCodeSend(String email) throws Exception {
        emailService.sendEmail(email);
    }

    @GetMapping("/emailCheck")
    public boolean emailCheck(String email, String code) {
        return emailService.checkEmail(email, code);
    }
    
}
