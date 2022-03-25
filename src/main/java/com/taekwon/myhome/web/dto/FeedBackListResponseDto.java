package com.taekwon.myhome.web.dto;

import com.taekwon.myhome.domain.feedBack.FeedBack;
import com.taekwon.myhome.domain.posts.Posts;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Getter
@RequiredArgsConstructor
public class FeedBackListResponseDto {

    private Long id;
    private String title;
    private String content;
    private String author;
    private LocalDateTime modifiedDate;
    private String type;

    public FeedBackListResponseDto(FeedBack entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.author = entity.getUser().getName();
        this.modifiedDate = entity.getModifiedDate();
        this.type = entity.getFeedBackType();
    }
}
