package com.enigma.restservice.entity;

import javax.persistence.*;

@Table(name = "item")
@Entity
public class Item extends AbstractEntity {

    @Column(nullable = false)
    private String name;

    public Item(String name) {
        super();
        this.name = name;
    }

    public Item() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Item [" +
                " id : " + getId() +
                ", name : " + name + " ]";
    }
}
