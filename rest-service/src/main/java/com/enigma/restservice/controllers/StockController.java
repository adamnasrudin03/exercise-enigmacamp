package com.enigma.restservice.controllers;

import com.enigma.restservice.entity.Item;
import com.enigma.restservice.entity.Stock;
import com.enigma.restservice.entity.SummaryStock;
import com.enigma.restservice.entity.Unit;
import com.enigma.restservice.models.*;
import com.enigma.restservice.services.ItemService;
import com.enigma.restservice.services.StockService;
import com.enigma.restservice.services.UnitService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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

@RequestMapping("/stocks")
@RestController
@Validated
@Api(value = "Controller for stock", tags = {"STOCK"})
public class StockController {

    @Autowired
    private StockService service;

    @Autowired
    private ItemService itemService;

    @Autowired
    private UnitService unitService;

    @PostMapping
    public ResponseMessage<StockModels> add(@RequestBody @Valid StockModels model) {

        Item item = itemService.findById(model.getItem().getId());
        Unit unit = unitService.findById(model.getUnit().getId());
        Stock entity = service.save(new Stock(item, model.getQuantity(), unit));

        ModelMapper modelMapper = new ModelMapper();
        StockModels data = modelMapper.map(entity, StockModels.class);
        return ResponseMessage.succsesSaved(data);
    }

    @PutMapping("/{id}")
    public ResponseMessage<Boolean> edit(@PathVariable Integer id, @RequestBody
    @Valid StockModel model) {

        ModelMapper modelMapper = new ModelMapper();
        model.setId(id);

        Stock entity = service.findById(id);

        modelMapper.map(model, entity);
        entity = service.save(entity);
        modelMapper.map(entity, StockModels.class);

        return ResponseMessage.succsesEdited(Boolean.TRUE);
    }

    @DeleteMapping("/{id}")
    public ResponseMessage<StockModels> removeById(@PathVariable Integer id) {

        Stock entity = service.removeById(id);

        ModelMapper modelMapper = new ModelMapper();
        StockModels data = modelMapper.map(entity, StockModels.class);
        return ResponseMessage.succsesDeleted(data);
    }

    @GetMapping("/{id}")
    public ResponseMessage<StockModels> findById(@PathVariable Integer id) {

        Stock entity = service.findById(id);

        ModelMapper modelMapper = new ModelMapper();
        StockModels data = modelMapper.map(entity, StockModels.class);
        return ResponseMessage.succses(data);
    }

    @GetMapping()
    public ResponseMessage<PageableList<StockModels>> findAll(
            @RequestParam(required = false) Item item,
            @RequestParam(required = false) Integer quantity,
            @RequestParam(required = false) Unit unit,
            @RequestParam(defaultValue = "asc") String sort,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10", required = false) int size
    ) {

        if (size > 100) {
            size = 100;
        }

        Stock entity = new Stock(item, quantity, unit);
        Sort.Direction direction = Sort.Direction
                .fromOptionalString(sort.toUpperCase())
                .orElse(Sort.Direction.ASC);
        Page<Stock> pageItems = service.findAll(entity, page, size, direction);
        List<Stock> items = pageItems.toList();

        ModelMapper modelMapper = new ModelMapper();
        Type type = new TypeToken<List<StockModels>>() {
        }.getType();
        List<StockModels> itemModels = modelMapper.map(items, type);

        PageableList<StockModels> data = new PageableList(itemModels,
                pageItems.getNumber(), pageItems.getSize(), pageItems.getTotalElements());
        return ResponseMessage.succses(data);
    }

    @GetMapping(path = "/summary")
    public ResponseMessage<List<StockSummary>>listSummary() {
        List<StockSummary> stockSummaries = service.listSummaryStock();

        return ResponseMessage.succses(stockSummaries);
    }
}


