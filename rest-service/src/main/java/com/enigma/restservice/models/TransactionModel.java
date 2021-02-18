package com.enigma.restservice.models;

import com.enigma.restservice.entity.TypeTransactionEnum;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class TransactionModel {

    private Integer id;

    private LocalDateTime createdDate;

    private Long amount;

    private TypeTransactionEnum type;

    @NotBlank(message = "{name.notblank}")
    private String description;

    public TransactionModel() {
    }

    public TransactionModel(Integer id, LocalDateTime createdDate, Long amount, TypeTransactionEnum type, @NotBlank(message = "{name.notblank}") String description) {
        this.id = id;
        this.createdDate = createdDate;
        this.amount = amount;
        this.type = type;
        this.description = description;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public TypeTransactionEnum getType() {
        return type;
    }

    public void setType(TypeTransactionEnum type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
