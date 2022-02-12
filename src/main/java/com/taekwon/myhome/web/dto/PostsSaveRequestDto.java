package com.taekwon.myhome.web.dto;

import com.taekwon.myhome.domain.posts.Posts;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class PostsSaveRequestDto {

    private String title;
    private String content;
    private String author;
    private String type;

    @Builder
    public PostsSaveRequestDto(String title, String content, String author, String type) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.type = type;
    }

    public Posts toEntity() {
        return Posts.builder()
                .title(title)
                .content(content)
                .author(author)
                .type(type)
                .build();
    }
}
