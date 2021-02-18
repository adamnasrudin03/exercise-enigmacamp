package com.enigma.restservice.repositories;

import com.enigma.restservice.dto.TransactionSummary;

import java.time.LocalDate;
import java.util.List;

public interface TransactionRepositoryCustom {
    //Ade dayat

    List<TransactionSummary> transactionList(LocalDate from, LocalDate to);

    public List<TransactionSummary> summary(LocalDate from, LocalDate to);
}
