package com.enigma.restservice.repositories.impl;

import com.enigma.restservice.entity.Stock;
import com.enigma.restservice.models.StockSummary;
import com.enigma.restservice.repositories.StockRepositorySummary;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

class StockRepositorySummaryImpl implements StockRepositorySummary {

    @Autowired
    private EntityManager entityManager;

    public List<StockSummary> listSummaryStock() {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<StockSummary> criteria = builder.createQuery(StockSummary.class);
        Root<Stock> root = criteria.from(Stock.class);

        criteria.multiselect(root.get("item").get("name"), builder.sum(root.get("quantity")), root.get("unit").get("description"))
                .groupBy(root.get("item"), root.get("unit"));
        return entityManager.createQuery(criteria).getResultList();
    }
}

