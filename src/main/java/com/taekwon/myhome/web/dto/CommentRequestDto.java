package com.taekwon.myhome.web.dto;

import com.taekwon.myhome.domain.comment.Comment;
import com.taekwon.myhome.domain.feedBack.FeedBack;
import com.taekwon.myhome.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
@AllArgsConstructor
@Builder
public class CommentRequestDto {

    private Long feedBackId;
    private Long userId;
    private String content;

    public Comment toEntity(User user) {
        return Comment.builder()
                .user(user)
                .content(content)
                .build();

    }
}
