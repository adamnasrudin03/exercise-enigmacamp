package com.enigma.restservice.repositories;

import com.enigma.restservice.entity.Item;

import java.util.List;

public interface ItemRepositoryCustom {
    public List<Item> findByNameLike(String name);

}
