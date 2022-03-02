package com.taekwon.myhome.web;

import com.taekwon.myhome.exception.UploadFileException;
import com.taekwon.myhome.web.dto.ResponseErrorDto;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ErrorPageController {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseErrorDto illegalArgumentExceptionAdvice(IllegalArgumentException e) {
        return ResponseErrorDto.builder()
                .message(e.getMessage())
                .error(e.toString())
                .build();
    }

    @ExceptionHandler(UploadFileException.class)
    public ResponseErrorDto uploadFileExceptionAdvice(UploadFileException e) {
        return ResponseErrorDto.builder()
                .error(e.toString())
                .message(e.getMessage())
                .build();
    }
}
