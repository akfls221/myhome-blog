package com.taekwon.myhome.util;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@AllArgsConstructor
@Getter
public class OAuthToken {

    private String access_token;
    private String expires_in;
    private String refresh_token;
    private String scope;
    private String token_type;

}
