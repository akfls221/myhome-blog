package com.taekwon.myhome.domain.board;

import com.taekwon.myhome.domain.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@Entity
@RequiredArgsConstructor
public class Board extends BaseTimeEntity {

    @Id
    @Column(name = "board_id")
    @GeneratedValue
    private Long id;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(length = 500, nullable = false)
    private String sub;

    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String content;

    private String author;

    @Builder
    public Board(Long id, String title, String sub, String content, String author) {
        this.id = id;
        this.title = title;
        this.sub = sub;
        this.content = content;
        this.author = author;
    }


    public void updateBoard(String title, String sub, String content) {
        this.title = title;
        this.sub = sub;
        this.content = content;
    }
}
