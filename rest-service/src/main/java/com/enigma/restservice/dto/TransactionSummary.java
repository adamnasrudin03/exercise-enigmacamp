package com.enigma.restservice.dto;

import com.enigma.restservice.entity.TypeTransactionEnum;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

public class TransactionSummary {

    private long amount;

    @Enumerated(EnumType.STRING)
    private TypeTransactionEnum type;

    private long count;

    public TransactionSummary(TypeTransactionEnum type, long amount, long count) {
        this.amount = amount;
        this.type = type;
        this.count = count;
    }

    public long getAmount() {
        return amount;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }

    public TypeTransactionEnum getType() {
        return type;
    }

    public void setType(TypeTransactionEnum type) {
        this.type = type;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }
}
