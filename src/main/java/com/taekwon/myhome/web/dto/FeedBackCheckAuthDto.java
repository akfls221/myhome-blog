package com.taekwon.myhome.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class FeedBackCheckAuthDto {

    private Long boardId;
    private Long userId;
    private String password;
}
