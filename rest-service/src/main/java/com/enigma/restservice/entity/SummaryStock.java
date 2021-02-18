package com.enigma.restservice.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Table(name = "stock")
@Entity
public class SummaryStock extends AbstractEntity {

    @ManyToOne
    @JoinColumn(nullable = false)
    private Item item;

    private Integer quantity;

    public SummaryStock() {
        super(null);
    }

    public SummaryStock(Item item, Integer quantity) {
        super(null);
        this.item = item;
        this.quantity = quantity;
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


    @Override
    public String toString() {
        return "Stock " +
                " id : " + getId() +
                "\t" + item +
                ",\t\tquantity : " + quantity ;
    }
}
