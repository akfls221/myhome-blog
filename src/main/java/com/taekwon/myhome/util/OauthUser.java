package com.taekwon.myhome.util;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class OauthUser {

    public String id;
    public String email;
    public String name;
    public String picture;
    public String socialType;
    public String nickName;
}
