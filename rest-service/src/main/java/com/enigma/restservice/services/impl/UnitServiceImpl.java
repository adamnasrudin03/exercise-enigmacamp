package com.enigma.restservice.services.impl;

import com.enigma.restservice.entity.Unit;
import com.enigma.restservice.exceptions.EntityNotFondException;
import com.enigma.restservice.repositories.UnitRepository;
import com.enigma.restservice.services.CommonService;
import com.enigma.restservice.services.UnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Transactional
@Service
public class UnitServiceImpl extends CommonServiceImpl<Unit, Integer> implements UnitService {

    @Autowired
    private UnitRepository repository;

    @Override
    protected JpaRepository<Unit, Integer> getRepository() {
        return repository;
    }
}
