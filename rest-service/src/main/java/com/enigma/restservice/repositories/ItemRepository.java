package com.enigma.restservice.repositories;


import com.enigma.restservice.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Integer>,  ItemRepositoryCustom {
    //<tipe entity, tipe primary key>

    public List<Item> findByNameContainingIgnoreCase(String name);

}
