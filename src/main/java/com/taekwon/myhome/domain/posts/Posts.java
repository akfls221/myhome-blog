package com.taekwon.myhome.domain.posts;

import com.taekwon.myhome.domain.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Getter
@RequiredArgsConstructor
@Entity
public class Posts extends BaseTimeEntity {

    @Id
    @GeneratedValue
    @Column(name = "posts_id")
    private Long id;

    @Column(length = 500, nullable = false)
    private String title;

    @Column(columnDefinition = "MEDIUMTEXT", nullable = false)
    private String content;

    private String author;

    private String type;

    @Column(name = "hit_count", columnDefinition = "integer default 0", nullable = false)
    private int hitCount;

    @Builder
    public Posts(Long id, String title, String content, String author, String type) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.type = type;
    }

    public void update(String title, String content, String author, String type) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.type = type;
    }
}
