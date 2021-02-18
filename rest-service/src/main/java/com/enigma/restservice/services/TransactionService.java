package com.enigma.restservice.services;

import com.enigma.restservice.dto.TransactionSummary;
import com.enigma.restservice.entity.Stock;
import com.enigma.restservice.entity.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

import java.time.Month;
import java.time.Year;
import java.util.List;


public interface TransactionService  extends CommonService<Transaction, Integer>  {

//    public Transaction save(Transaction entity);
//
//    public Transaction removeById(Integer id);
//
//    public Transaction findById(Integer id);
//
//    public Page<Transaction> findAll(Transaction entity, int page, int size, Sort.Direction direction);

    public List<TransactionSummary> summary(Year year, Month month, Integer date);
}
