package com.taekwon.myhome.web.dto;

import com.taekwon.myhome.domain.posts.Posts;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Getter
@RequiredArgsConstructor
public class PostsResponseDto {

    private Long id;
    private String title;
    private String content;
    private String author;
    private String type;
    private LocalDateTime modifiedDate;
    private int hitCount;

    public PostsResponseDto(Posts entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.author = entity.getAuthor();
        this.type = entity.getType();
        this.modifiedDate = entity.getModifiedDate();
        this.hitCount = entity.getHitCount();
    }
}
