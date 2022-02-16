package com.taekwon.myhome.web;

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

    @PostMapping("/sign")
    public SignResponseDto sign(@RequestBody SignRequestDto request) {
        return signService.getSingleResult(request);
    }

    @PostMapping("/join")
    public SignResponseDto join(@RequestBody JoinRequestDto request) {

        return signService.join(request);
    }
}
