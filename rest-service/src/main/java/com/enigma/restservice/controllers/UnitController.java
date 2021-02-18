package com.enigma.restservice.controllers;

import com.enigma.restservice.entity.Unit;
import com.enigma.restservice.models.UnitModel;
import com.enigma.restservice.models.PageableList;
import com.enigma.restservice.models.ResponseMessage;
import com.enigma.restservice.services.UnitService;
import io.swagger.annotations.Api;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.lang.reflect.Type;
import java.util.List;

@RequestMapping("/units")
@RestController
@Validated
@Api(value = "Controller for unit", tags = {"UNIT"})
public class UnitController {

    @Autowired
    private UnitService service;

    @PostMapping
    public ResponseMessage<UnitModel> add(@RequestBody @Valid UnitModel model) {
        Unit entity = service.save(new Unit(model.getName(), model.getDescription()));

        ModelMapper modelMapper = new ModelMapper();
        UnitModel data = modelMapper.map(entity, UnitModel.class);
        return ResponseMessage.succsesSaved(data);
    }

    @PutMapping("/{id}")
    public ResponseMessage<UnitModel> edit(@PathVariable Integer id, @RequestBody
    @Valid UnitModel model) {

        ModelMapper modelMapper = new ModelMapper();
        model.setId(id);
        Unit entity = service.findById(id);
        modelMapper.map(model, entity);
        entity = service.save(entity);
        UnitModel data = modelMapper.map(entity, UnitModel.class);

        return ResponseMessage.succsesEdited(data);
    }

    @DeleteMapping("/{id}")
    public ResponseMessage<UnitModel> removeById(@PathVariable Integer id) {
        Unit entity = service.removeById(id);

        ModelMapper modelMapper = new ModelMapper();
        UnitModel data = modelMapper.map(entity, UnitModel.class);
        return ResponseMessage.succsesDeleted(data);
    }

    @GetMapping("/{id}")
    public ResponseMessage<UnitModel> findById(@PathVariable Integer id) {
        Unit entity = service.findById(id);

        ModelMapper modelMapper = new ModelMapper();
        UnitModel data = modelMapper.map(entity, UnitModel.class);
        return ResponseMessage.succses(data);
    }

    @GetMapping()
    public ResponseMessage<PageableList<UnitModel>> findAll(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String description,
            @RequestParam(defaultValue = "asc") String sort,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10", required = false) int size
    ) {
        if (size > 100) {
            size = 100;
        }
        Unit entity = new Unit(name, description);
        Sort.Direction direction = Sort.Direction
                .fromOptionalString(sort.toUpperCase())
                .orElse(Sort.Direction.ASC);
        Page<Unit> pageItems = service.findAll(entity, page, size, direction);
        List<Unit> items = pageItems.toList();

        ModelMapper modelMapper = new ModelMapper();
        Type type = new TypeToken<List<UnitModel>>() {
        }.getType();
        List<UnitModel> itemModels = modelMapper.map(items, type);

        PageableList<UnitModel> data = new PageableList(itemModels,
                pageItems.getNumber(), pageItems.getSize(), pageItems.getTotalElements());
        return ResponseMessage.succses(data);
    }
}
