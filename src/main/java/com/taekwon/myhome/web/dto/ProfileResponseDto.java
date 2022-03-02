package com.taekwon.myhome.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class ProfileResponseDto {

    private String savePath;
    private String datePath;
    private String uuidFilename;
    private String extension;
    private String noExtension;
    private String requestPath;
}
