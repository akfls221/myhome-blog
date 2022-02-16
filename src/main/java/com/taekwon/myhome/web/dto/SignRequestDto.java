package com.taekwon.myhome.web.dto;

import com.taekwon.myhome.domain.user.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class SignRequestDto {

    private String uid;
    private String password;

    public User toEntity() {
        return User.builder()
                .uid(uid)
                .password(password)
                .build();
    }
}
