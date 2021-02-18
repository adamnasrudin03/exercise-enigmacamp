package com.enigma.restservice.exceptions;

public class PathNotFondException extends ApplicationException {

    public PathNotFondException() {
        super(ErrorCodes.PATH_NOT_FOUND, "exception.path.not.found");
    }

}
