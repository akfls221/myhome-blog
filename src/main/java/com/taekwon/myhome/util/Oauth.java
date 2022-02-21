package com.taekwon.myhome.util;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Getter
@RequiredArgsConstructor
@Component
public class Oauth {

    private String grant = "authorization_code";

    @Value("${spring.social.google.client_id}")
    private String googleClientId;
    @Value("${spring.social.google.client_secret}")
    private String googleClientSecret;
    @Value("${spring.social.google.url.login}")
    private String googleLoginUrl;
    @Value("${spring.social.google.redirect}")
    private String googleRedirect;
    @Value("${spring.social.google.url.scope}")
    private String googleScope;

    @Value("${spring.social.kakao.client_id}")
    private String kakaoClientId;
    @Value("${spring.social.kakao.client_secret}")
    private String kakaoClientSecret;
    @Value("${spring.social.kakao.url.login}")
    private String kakaoLoginUrl;
    @Value("${spring.social.kakao.url.logout}")
    private String kakaoLogOutUrl;
    @Value("${spring.social.kakao.redirect}")
    private String kakaoRedirect;
    @Value("${spring.social.kakao.logout_redirect}")
    private String kakaoLogOutRedirect;
    @Value("${spring.social.kakao.url.scope}")
    private String kakaoScope;

    public HttpEntity<MultiValueMap<String, String>> makePostRequest(String code, String social) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        switch (social) {
            case "google":
                params.add("code", code);
                params.add("client_id", googleClientId);
                params.add("client_secret", googleClientSecret);
                params.add("redirect_uri", googleRedirect);
                params.add("grant_type", grant);
                break;

            case "kakao":
                params.add("code", code);
                params.add("client_id", kakaoClientId);
                params.add("client_secret", kakaoClientSecret);
                params.add("redirect_uri", kakaoRedirect);
                params.add("grant_type", grant);
                break;
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded");

        HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(params, headers);

        return httpEntity;
    }

    public String makeTokenUrl(String socialType) {
        String url = "";
        if (socialType.equals("google")) {
            url = "https://oauth2.googleapis.com/token";
        } else if (socialType.equals("kakao")){
            url =  "https://kauth.kakao.com/oauth/token";
        } else if (socialType == "naver") {
            url = "https://oauth2.googleapis.com/token";
        }
        return url;
    }

    public String makeUserInfoUrl(String socialType) {
        String url = "";
        if (socialType.equals("google")) {
            url = "https://www.googleapis.com/oauth2/v1/userinfo";
        } else if (socialType.equals("kakao")){
            url =  "https://kapi.kakao.com/v2/user/me";
        } else if (socialType == "naver") {
            url = "https://oauth2.googleapis.com/token";
        }
        return url;
    }

}



