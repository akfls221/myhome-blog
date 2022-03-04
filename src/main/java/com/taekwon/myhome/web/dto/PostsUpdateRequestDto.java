package com.taekwon.myhome.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class PostsUpdateRequestDto {

    private String title;
    private String content;
    private String author;
    private String type;

    @Builder
    public PostsUpdateRequestDto(String title, String content, String author, String type) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.type = type;
    }
}
