package com.taekwon.myhome.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class SignResponseDto {

    private boolean success;
    private int code;
    private String msg;
    private String accessToken;
    private Long id;
    private String uid;
    private String name;
    private String picture;
    private List<String> roles;

    @Builder
    public SignResponseDto(boolean success, int code, String msg, String accessToken, Long id, String uid, String name, String picture, List<String> roles) {
        this.success = success;
        this.code = code;
        this.msg = msg;
        this.accessToken = accessToken;
        this.id = id;
        this.uid = uid;
        this.name = name;
        this.picture = picture;
        this.roles = roles;
    }
}
