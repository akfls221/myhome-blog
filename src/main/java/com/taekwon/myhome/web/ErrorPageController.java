package com.taekwon.myhome.web;

import com.taekwon.myhome.exception.CEmailSignFailedException;
import com.taekwon.myhome.exception.CUserNotFoundException;
import com.taekwon.myhome.exception.PostsFailedException;
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

    @ExceptionHandler(CEmailSignFailedException.class)
    public ResponseErrorDto emailSignExceptionAdvice(CEmailSignFailedException e) {
        return ResponseErrorDto.builder()
                .error(e.toString())
                .message(e.getMessage())
                .build();
    }

    @ExceptionHandler(CUserNotFoundException.class)
    public ResponseErrorDto userNotFoundExceptionAdvice(CUserNotFoundException e) {
        return ResponseErrorDto.builder()
                .error(e.toString())
                .message(e.getMessage())
                .build();
    }

    @ExceptionHandler(PostsFailedException.class)
    public ResponseErrorDto postsFailedExceptionAdvice(PostsFailedException e) {
        return ResponseErrorDto.builder()
                .error(e.toString())
                .message(e.getMessage())
                .build();
    }
}
