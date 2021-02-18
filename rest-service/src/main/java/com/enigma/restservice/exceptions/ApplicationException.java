package com.enigma.restservice.exceptions;

public class ApplicationException extends RuntimeException {

    private final Integer code;


    public ApplicationException(Integer code,String message) {
        super(message);
        this.code = code;
    }

    public ApplicationException( Integer code, String message, Throwable cause) {
        super(message, cause);
        this.code = code;
    }

    public ApplicationException( Integer code, Throwable cause) {
        super(cause);
        this.code = code;
    }

    public Integer getCode() {
        return code;
    }











}

