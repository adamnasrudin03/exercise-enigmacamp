package com.enigma.restservice.models;

import com.enigma.restservice.entity.Item;
import com.enigma.restservice.entity.Unit;

public class StockModel {

    private Integer id;

    private Item item;

    private Integer quantity;

    private Unit unit;

    public StockModel(Integer id, Item item, Integer quantity, Unit unit) {
        this.id = id;
        this.item = item;
        this.quantity = quantity;
        this.unit = unit;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Unit getUnit() {
        return unit;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }

    public StockModel() {
    }

}
