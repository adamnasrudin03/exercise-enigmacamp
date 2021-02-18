package com.enigma.restservice.controllers;

import com.enigma.restservice.entity.Item;
import com.enigma.restservice.models.ItemModel;
import com.enigma.restservice.models.PageableList;
import com.enigma.restservice.models.ResponseMessage;
import com.enigma.restservice.services.ItemService;
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

@RequestMapping("/items")
@RestController
@Validated
@Api(value = "Controller for item", tags = {"ITEM"})
public class ItemController {

    @Autowired
    private ItemService service;

    @PostMapping
    public ResponseMessage<ItemModel> add(@RequestBody @Valid ItemModel model) {
        Item entity = service.save(new Item(model.getName()));

        ModelMapper modelMapper = new ModelMapper();
        ItemModel data = modelMapper.map(entity, ItemModel.class);
        return ResponseMessage.succsesSaved(data);
    }

    @PutMapping("/{id}")
    public ResponseMessage<ItemModel> edit(@PathVariable Integer id, @RequestBody
    @Valid ItemModel model) {

        ModelMapper modelMapper = new ModelMapper();
        model.setId(id);
        Item entity = service.findById(id);
        modelMapper.map(model, entity);
        entity = service.save(entity);
        ItemModel data = modelMapper.map(entity, ItemModel.class);

        return ResponseMessage.succsesEdited(data);
    }

    @DeleteMapping("/{id}")
    public ResponseMessage<ItemModel> removeById(@PathVariable Integer id) {
        Item entity = service.removeById(id);

        ModelMapper modelMapper = new ModelMapper();
        ItemModel data = modelMapper.map(entity, ItemModel.class);
        return ResponseMessage.succsesDeleted(data);
    }

    @GetMapping("/{id}")
    public ResponseMessage<ItemModel> findById(@PathVariable Integer id) {
        Item entity = service.findById(id);

        ModelMapper modelMapper = new ModelMapper();
        ItemModel data = modelMapper.map(entity, ItemModel.class);
        return ResponseMessage.succses(data);
    }

    @GetMapping()
    public ResponseMessage<PageableList<ItemModel>> findAll(
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "asc") String sort,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10", required = false) int size
    ) {
        if (size > 100) {
            size = 100;
        }
        Item entity = new Item(name);
        Sort.Direction direction = Sort.Direction
                .fromOptionalString(sort.toUpperCase())
                .orElse(Sort.Direction.ASC);
        Page<Item> pageItems = service.findAll(entity, page, size, direction);
        List<Item> items = pageItems.toList();

        ModelMapper modelMapper = new ModelMapper();
        Type type = new TypeToken<List<ItemModel>>() {
        }.getType();
        List<ItemModel> itemModels = modelMapper.map(items, type);

        PageableList<ItemModel> data = new PageableList(itemModels,
                pageItems.getNumber(), pageItems.getSize(), pageItems.getTotalElements());
        return ResponseMessage.succses(data);
    }
}
