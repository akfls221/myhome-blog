package com.taekwon.myhome.web.dto;

import com.taekwon.myhome.domain.board.Board;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class BoardResponseDto {

    private Long id;
    private String title;
    private String sub;
    private String content;
    private String author;

    public BoardResponseDto(Board entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.sub = entity.getSub();
        this.content = entity.getContent();
        this.author = entity.getAuthor();
    }
}