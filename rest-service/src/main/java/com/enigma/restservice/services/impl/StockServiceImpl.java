package com.enigma.restservice.services.impl;

import com.enigma.restservice.entity.Stock;
import com.enigma.restservice.entity.Unit;
import com.enigma.restservice.exceptions.EntityNotFondException;
import com.enigma.restservice.models.StockSummary;
import com.enigma.restservice.repositories.StockRepositorySummary;
import com.enigma.restservice.services.StockService;
import com.enigma.restservice.repositories.StockRepository;
import com.enigma.restservice.services.UnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class StockServiceImpl extends CommonServiceImpl<Stock, Integer> implements StockService {

    @Autowired
    private StockRepository repository;

    @Override
    protected JpaRepository<Stock, Integer> getRepository() {
        return repository;
    }

    @Override
    public List<StockSummary> listSummaryStock() {
        return repository.listSummaryStock();
    }

//
//    @Override
//    public Stock save(Stock entity) {
//        return repository.save(entity);
//    }
//
//    @Override
//    public Stock removeById(Integer id) {
//        Stock entity = findById(id);
//        repository.delete(entity);
//        return entity;
//    }
//
//    @Override
//    public Stock findById(Integer id) {
//        return repository.findById(id).orElseThrow(() -> {
//            return new EntityNotFondException();
//        });
//    }
//
//    @Override
//    public Page<Stock> findAll(Stock entity, int page, int size, Sort.Direction direction) {
//        Sort sort = Sort.Direction.DESC.equals(direction) ? Sort.by(direction, "id").descending() : Sort.by("id");
//
//        ExampleMatcher matcher = ExampleMatcher.matchingAll()
//                .withIgnoreCase()
//                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);
//        return repository.findAll(Example.of(entity, matcher), PageRequest.of(page, size, sort));
//    }


}
