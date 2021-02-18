package com.enigma.restservice.entity;

import javax.persistence.*;

@Table(name = "stock")
@Entity
public class Stock extends AbstractEntity {

    @ManyToOne
    @JoinColumn(nullable = false)
    private Item item;

    private Integer quantity;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Unit unit;

    public Stock() {
        super(null);
    }

    public Stock(Item item, Integer quantity, Unit unit) {
        super(null);
        this.item = item;
        this.quantity = quantity;
        this.unit = unit;
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

    @Override
    public String toString() {
        return "Stock " +
                " id : " + getId() +
                "\t" + item +
                ",\t\tquantity : " + quantity +
                "\t" + unit ;
    }
}
