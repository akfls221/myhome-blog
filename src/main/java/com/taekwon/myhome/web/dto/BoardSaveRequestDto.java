package com.taekwon.myhome.web.dto;

import com.taekwon.myhome.domain.board.Board;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class BoardSaveRequestDto {

    private String title;
    private String sub;
    private String content;
    private String author;

    @Builder
    public BoardSaveRequestDto(String title, String sub, String content, String author) {
        this.title = title;
        this.sub = sub;
        this.content = content;
        this.author = author;
    }

    public Board toEntity() {
        return Board.builder()
                .title(title)
                .sub(sub)
                .content(content)
                .author(author)
                .build();
    }

}
