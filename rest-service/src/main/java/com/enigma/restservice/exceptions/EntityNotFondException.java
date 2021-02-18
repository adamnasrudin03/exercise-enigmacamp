package com.enigma.restservice.exceptions;

public class EntityNotFondException extends ApplicationException{
    public EntityNotFondException() {

        super(ErrorCodes.ENTITY_NOT_FOUND, "exception.entity.not.found");
    }

}
