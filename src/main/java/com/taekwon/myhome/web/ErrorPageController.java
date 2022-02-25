package com.taekwon.myhome.web;

import com.taekwon.myhome.web.dto.ResponseErrorDto;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ErrorPageController {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseErrorDto illegalArgumentExceptionAdvice(IllegalArgumentException e) {
        ResponseErrorDto response = ResponseErrorDto.builder()
                .message(e.getMessage())
                .error(e.toString())
                .build();
        return response;
    }
}
