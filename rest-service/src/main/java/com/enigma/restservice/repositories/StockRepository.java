package com.enigma.restservice.repositories;


import com.enigma.restservice.entity.Stock;
import com.enigma.restservice.entity.Unit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, Integer> , StockRepositorySummary {

}
