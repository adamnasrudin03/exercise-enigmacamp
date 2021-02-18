package com.enigma.restservice.models;


import com.enigma.restservice.validations.annotations.MinLength;
import javax.validation.constraints.NotBlank;

public class UnitModel {

    private Integer id;

    @NotBlank(message = "{name.notblank}")
    private String name;

    @MinLength(3)
    @NotBlank(message = "{name.notblank}")
    private String description;

    public UnitModel(Integer id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public UnitModel() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

}
