package com.enigma.restservice.repositories;


import com.enigma.restservice.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> , TransactionRepositoryCustom{

}
