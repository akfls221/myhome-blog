package com.taekwon.myhome.exception;

public class CEmailSignFailedException extends RuntimeException{

    public CEmailSignFailedException(String msg, Throwable t) {
        super(msg, t);
    }

    public CEmailSignFailedException(String msg) {
        super(msg);
    }

    public CEmailSignFailedException() {
        super();
    }
}
