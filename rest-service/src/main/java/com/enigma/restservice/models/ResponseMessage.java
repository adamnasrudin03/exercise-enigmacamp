package com.enigma.restservice.models;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class ResponseMessage<T> {
    private int code;
    private String message;
    private T data;

    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss.SSS")
    private LocalDateTime timesTime;


    private ResponseMessage(int code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
        this.timesTime = LocalDateTime.now();
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public static <T> ResponseMessage<T> succses(T data) {

        return new ResponseMessage(0, null, data);
    }

    public static <T> ResponseMessage<T> succsesSaved(T data) {

        return new ResponseMessage(0, "Data saved successfully", data);
    }

    public static <T> ResponseMessage<T> succsesDeleted(T data) {

        return new ResponseMessage(0, "Deleted data successfully", data);
    }

    public static <T> ResponseMessage<T> succsesEdited(T data) {

        return new ResponseMessage(0, "Edited data successfully", data);
    }

    public static ResponseMessage error(int code, String message) {

        return new ResponseMessage(code, message, null);
    }

    public static <T> ResponseMessage<T> error(int code, String message, T data) {
        return new ResponseMessage(code, message, data);
    }
}
