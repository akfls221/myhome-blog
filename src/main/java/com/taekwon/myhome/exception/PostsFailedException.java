package com.taekwon.myhome.exception;

public class PostsFailedException extends RuntimeException {
    public PostsFailedException() {
        super();
    }

    public PostsFailedException(String message) {
        super(message);
    }

    public PostsFailedException(String message, Throwable cause) {
        super(message, cause);
    }
}
