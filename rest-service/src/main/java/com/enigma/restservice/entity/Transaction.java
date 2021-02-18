package com.enigma.restservice.entity;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

@Table(name = "transaction")
@Entity
public class Transaction extends AbstractEntity {

    private Long amount;

    @Enumerated(EnumType.STRING)
    private TypeTransactionEnum type;

    private String description;

    public Transaction() {
        super(null);
    }

    public Transaction(Long amount, TypeTransactionEnum type, String description) {
        this.amount = amount;
        this.type = type;
        this.description = description;
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

    @Override
    public String toString() {
        return "Transaction{" +
                "amount = " + amount +
                ", type = " + type +
                ", description = '" + description + '\'' +
                '}';
    }
}
