package com.taekwon.myhome.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class ProfileEditRequestDto {
    private Long id;
    private String uid;
    private String password;
    private String name;
    private String nickName;
    private String email;
    private String profileImageUrl;
}
