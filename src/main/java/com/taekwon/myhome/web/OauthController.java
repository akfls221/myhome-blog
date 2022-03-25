package com.taekwon.myhome.web;

import com.taekwon.myhome.service.UserService;
import com.taekwon.myhome.util.Oauth;
import com.taekwon.myhome.web.dto.SignResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "http://localhost:80/")
@RequiredArgsConstructor
public class OauthController {

    private final UserService userService;
    private final Oauth oauth;

    @GetMapping("/social/google")
    public String googleLogin() {
        return "redirect:" + oauth.getGoogleLoginUrl() +
                "?client_id=" + oauth.getGoogleClientId() +
                "&response_type=code" +
                "&redirect_uri=" + oauth.getGoogleRedirect() +
                "&scope=" + oauth.getGoogleScope();
    }

    @GetMapping("/social/kakao")
    public String kakaoLogin() {
        return "redirect:" + oauth.getKakaoLoginUrl() +
                "?client_id=" + oauth.getKakaoClientId() +
                "&response_type=code" +
                "&redirect_uri=" + oauth.getKakaoRedirect();
    }

    @GetMapping("/social/kakao/logout")
    public String kakaoLogOut() {
        return "redirect:" + oauth.getKakaoLogOutUrl() +
                "?client_id=" + oauth.getKakaoClientId() +
                "&logout_redirect_uri=" + oauth.getKakaoLogOutRedirect();
    }

    @GetMapping("/social/google/callback")
    @ResponseBody
    public SignResponseDto oauthLogin(String code, String socialType) {
        return userService.oauthLogin(code, socialType);
    }
}

