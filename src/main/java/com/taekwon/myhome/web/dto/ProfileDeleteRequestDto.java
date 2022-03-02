package com.taekwon.myhome.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class ProfileDeleteRequestDto {
    private String deletePath;
}
