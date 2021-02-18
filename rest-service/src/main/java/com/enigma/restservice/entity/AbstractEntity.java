package com.enigma.restservice.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@MappedSuperclass
public abstract class AbstractEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "created_date")
    private LocalDateTime createdDate;


    @Column(name = "modifed_date")
    private LocalDateTime modifedDate;

    public AbstractEntity(Integer id) {
        this.id = id;
    }

    public AbstractEntity() {

    }

    public Integer getId(){
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getModifedDate() {
        return modifedDate;
    }

    public void setModifedDate(LocalDateTime modifedDate) {
        this.modifedDate = modifedDate;
    }

    @PrePersist
    public void prePersist() {
        createdDate = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        modifedDate = LocalDateTime.now();
    }


}
