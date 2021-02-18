package com.enigma.restservice.services.impl;

import com.enigma.restservice.exceptions.EntityNotFondException;
import com.enigma.restservice.services.CommonService;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Transactional
@Service
public abstract class CommonServiceImpl<T, ID> implements CommonService<T, ID> {

    protected abstract JpaRepository<T, ID> getRepository();

    @Override
    public T save(T entity) {
        return getRepository().save(entity);
    }

    @Override
    public T removeById(ID id) {
        T entity = findById(id);
        getRepository().delete(entity);
        return entity;
    }

    @Override
    public T findById(ID id) {
        return getRepository().findById(id).orElseThrow(() -> {
            return new EntityNotFondException();
        });
    }

    @Override
    public Page<T> findAll(T entity, int page, int size, Sort.Direction direction) {
        Sort sort = Sort.Direction.DESC.equals(direction) ? Sort.by(direction, "id").descending() : Sort.by("id");

        ExampleMatcher matcher = ExampleMatcher.matchingAll()
                .withIgnoreCase()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);
        return getRepository().findAll(Example.of(entity, matcher), PageRequest.of(page, size, sort));
    }
}
