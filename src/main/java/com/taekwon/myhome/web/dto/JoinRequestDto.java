package com.taekwon.myhome.web.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class JoinRequestDto {

    private String uid;
    private String password;
    private String name;
    private String nickName;
    private String email;
}
