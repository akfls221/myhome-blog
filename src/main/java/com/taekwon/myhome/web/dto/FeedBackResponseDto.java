package com.taekwon.myhome.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class FeedBackResponseDto {

    private Long id;
    private String title;
    private String auth;
    private String feedbackType;
    private String content;
    private List<CommentResponseDto> comments = new ArrayList<>();
    private LocalDateTime modifyDate;

}
