package com.taekwon.myhome.web.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
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
    private String socialType;
    private String nickName;
}
