package com.taekwon.myhome.web.dto;

import com.taekwon.myhome.domain.posts.Posts;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.jni.Local;

import java.time.LocalDateTime;

@Getter
@RequiredArgsConstructor
public class PostsListResponseDto {

    private Long id;
    private String title;
    private String content;
    private String author;
    private LocalDateTime modifiedDate;

    public PostsListResponseDto(Posts entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.author = entity.getAuthor();
        this.modifiedDate = entity.getModifiedDate();
    }
}
