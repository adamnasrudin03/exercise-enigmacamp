package com.enigma.restservice.repositories.impl;

import com.enigma.restservice.dto.TransactionSummary;
import com.enigma.restservice.entity.Transaction;
import com.enigma.restservice.repositories.TransactionRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

public class TransactionRepositoryCustomImpl implements TransactionRepositoryCustom {

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<TransactionSummary> transactionList(LocalDate from, LocalDate to) {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<TransactionSummary> query = builder.createQuery(
                TransactionSummary.class
        );
        Root<Transaction> root = query.from(Transaction.class);
        query
                .multiselect(
                        root.get("type"),
                        builder.sum(root.get("amount")),
                        builder.count(root)
                )
                .where(
                        builder.between(
                                builder.function(
                                        "DATE",
                                        Date.class,
                                        root.get("createdDate")
                                ),
                                Date.valueOf(from),
                                Date.valueOf(to)
                        )
                )
                .groupBy(root.get("type"));

        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public List<TransactionSummary> summary(LocalDate from, LocalDate to) {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<TransactionSummary> query = builder.createQuery(
                TransactionSummary.class
        );
        Root<Transaction> root = query.from(Transaction.class);
        query
                .multiselect(
                        root.get("type"),
                        builder.sum(root.get("amount")),
                        builder.count(root)
                )
                .where(
                        builder.between(
                                builder.function(
                                        "DATE",
                                        Date.class,
                                        root.get("createdDate")
                                ),
                                Date.valueOf(from),
                                Date.valueOf(to)
                        )
                )
                .groupBy(root.get("type"));

        return entityManager.createQuery(query).getResultList();
    }
    }

