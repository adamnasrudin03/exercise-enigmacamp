package com.enigma.restservice.models;

public class StockSummary {

    private String name;

    private Long quantity;

    private String description;

    public StockSummary(String name, Long quantity, String description) {
        this.name = name;
        this.quantity = quantity;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}