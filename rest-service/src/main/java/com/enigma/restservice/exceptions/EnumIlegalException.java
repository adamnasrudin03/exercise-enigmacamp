package com.enigma.restservice.exceptions;

public class EnumIlegalException extends ApplicationException{
    public EnumIlegalException() {
        super(ErrorCodes.ENUM_NOT_VALID, "exception.enum.illegal");
    }

}
