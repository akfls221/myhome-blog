package com.taekwon.myhome.util;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@RequiredArgsConstructor
@Component
public class Oauth {

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
    private String googleGrant = "authorization_code";

}
