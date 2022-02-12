package com.taekwon.myhome.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Getter
@RequiredArgsConstructor
public class BoardUpdateRequestDto {

    private String title;
    private String sub;
    private String content;

    @Builder
    public BoardUpdateRequestDto(String title, String sub, String content) {
        this.title = title;
        this.sub = sub;
        this.content = content;
    }
}
