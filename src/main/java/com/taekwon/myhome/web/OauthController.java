package com.taekwon.myhome.web;

import com.taekwon.myhome.service.UserService;
import com.taekwon.myhome.web.dto.SignResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "http://localhost:8081/")
@RequiredArgsConstructor
public class OauthController {

    private final UserService userService;

    @Value("${spring.social.google.client_id}")
    private String googleClientId;
    @Value("${spring.social.google.url.login}")
    private String googleLoginUrl;
    @Value("${spring.social.google.redirect}")
    private String googleRedirect;
    @Value("${spring.social.google.url.scope}")
    private String googleScope;

    @GetMapping("/social/google")
    public String googleLogin() {
        return "redirect:" + googleLoginUrl + "?client_id=" + googleClientId +
                "&response_type=code&redirect_uri=" +googleRedirect + "&scope="+googleScope;
    }

    @GetMapping("/social/google/callback")
    @ResponseBody
    public SignResponseDto oauthLogin(String code) {
        return userService.oauthLogin(code);
    }
}

