package com.enigma.restservice.entity;

import javax.persistence.*;


@Table(name = "unit")
@Entity
public class Unit extends AbstractEntity {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    public Unit() {

    }

    public Unit(String name) {
        super(null);
        this.name = name;
    }

    public Unit(String name, String description) {
        super(null);
        this.name = name;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Unit{" +
                " id : " + getId() +
                "name :'" + name + '\'' +
                ", description :'" + description + '\'' +
                '}';
    }
}


