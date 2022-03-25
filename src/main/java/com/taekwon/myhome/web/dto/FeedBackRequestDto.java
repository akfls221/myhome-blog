package com.taekwon.myhome.web.dto;

import com.taekwon.myhome.domain.feedBack.FeedBack;
import com.taekwon.myhome.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class FeedBackRequestDto {

    private Long userId;
    private String title;
    private String feedBackType;
    private String password;
    private String content;

    public FeedBack toEntity(User user) {
        return FeedBack.builder()
                .user(user)
                .title(title)
                .feedBackType(feedBackType)
                .password(password)
                .content(content)
                .build();
    }

}
