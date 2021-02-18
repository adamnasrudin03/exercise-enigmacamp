package com.enigma.restservice.services.impl;

import com.enigma.restservice.dto.TransactionSummary;
import com.enigma.restservice.entity.Transaction;
import com.enigma.restservice.entity.Unit;
import com.enigma.restservice.exceptions.EntityNotFondException;
import com.enigma.restservice.repositories.TransactionRepository;
import com.enigma.restservice.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.Month;
import java.time.Year;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

@Transactional
@Service
public class TransactionServiceImpl extends CommonServiceImpl<Transaction, Integer> implements TransactionService {

    @Autowired
    private TransactionRepository repository;

    @Override
    protected JpaRepository<Transaction, Integer> getRepository() {
        return repository;
    }

//
//    @Override
//    public Transaction save(Transaction entity) {
//        return repository.save(entity);
//    }
//
//    @Override
//    public Transaction removeById(Integer id) {
//        Transaction entity = findById(id);
//        repository.delete(entity);
//        return entity;
//    }
//
//    @Override
//    public Transaction findById(Integer id) {
//        return repository.findById(id).orElseThrow(() -> {
//            return new EntityNotFondException();
//        });
//    }
//
//    @Override
//    public Page<Transaction> findAll(Transaction entity, int page, int size, Sort.Direction direction) {
//        Sort sort = Sort.Direction.DESC.equals(direction) ? Sort.by(direction, "id").descending() : Sort.by("id");
//
//        ExampleMatcher matcher = ExampleMatcher.matchingAny()
//                .withIgnoreCase()
//                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);
//        return repository.findAll(Example.of(entity, matcher), PageRequest.of(page, size, sort));
//    }

    @Override
    public List<TransactionSummary> summary(Year year, Month month, Integer date) {
        LocalDate from = LocalDate.of(year.getValue(), 1, 1);
        LocalDate to = LocalDate.of(year.getValue(), 12, 1);

        if (month != null) {
            from = from.withMonth(month.getValue());
            to = to.withMonth(month.getValue());
        }

        if (date != null) {
            from = from.withDayOfMonth(1);
            to = to.withDayOfMonth(date);
        } else {
            from = from.withDayOfMonth(1);
            to = to.with(TemporalAdjusters.lastDayOfMonth());
        }
        List<TransactionSummary> summary = repository.summary(from, to);

        return summary;
    }

}
