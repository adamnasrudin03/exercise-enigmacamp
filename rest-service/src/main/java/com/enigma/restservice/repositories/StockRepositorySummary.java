package com.enigma.restservice.repositories;
import com.enigma.restservice.models.StockSummary;

import java.util.List;

public interface StockRepositorySummary {
    public List<StockSummary> listSummaryStock();
}