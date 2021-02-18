package com.enigma.restservice.controllers;

import com.enigma.restservice.dto.TransactionSummary;
import com.enigma.restservice.entity.Transaction;
import com.enigma.restservice.entity.TypeTransactionEnum;
import com.enigma.restservice.models.PageableList;
import com.enigma.restservice.models.ResponseMessage;
import com.enigma.restservice.models.TransactionModel;
import com.enigma.restservice.services.TransactionService;
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
import java.time.LocalDate;
import java.time.Month;
import java.time.Year;
import java.util.List;

@RequestMapping("/transactions")
@RestController
@Validated
@Api(value = "Controller for transaction", tags = {"TRANSACTION"})
public class TransactionController {

    @Autowired
    private TransactionService service;

    @PostMapping
    public ResponseMessage<TransactionModel> add(@RequestBody @Valid TransactionModel model) {
        Transaction entity = service.save(new Transaction(model.getAmount(), model.getType(), model.getDescription()));

        ModelMapper modelMapper = new ModelMapper();
        TransactionModel data = modelMapper.map(entity, TransactionModel.class);
        return ResponseMessage.succsesSaved(data);
    }

    @PutMapping("/{id}")
    public ResponseMessage<TransactionModel> edit(@PathVariable Integer id, @RequestBody
    @Valid TransactionModel model) {

        ModelMapper modelMapper = new ModelMapper();
        model.setId(id);
        Transaction entity = service.findById(id);
        modelMapper.map(model, entity);
        entity = service.save(entity);
        TransactionModel data = modelMapper.map(entity, TransactionModel.class);

        return ResponseMessage.succsesEdited(data);
    }

    @DeleteMapping("/{id}")
    public ResponseMessage<TransactionModel> removeById(@PathVariable Integer id) {
        Transaction entity = service.removeById(id);

        ModelMapper modelMapper = new ModelMapper();
        TransactionModel data = modelMapper.map(entity, TransactionModel.class);
        return ResponseMessage.succsesDeleted(data);
    }

    @GetMapping("/{id}")
    public ResponseMessage<TransactionModel> findById(@PathVariable Integer id) {
        Transaction entity = service.findById(id);

        ModelMapper modelMapper = new ModelMapper();
        TransactionModel data = modelMapper.map(entity, TransactionModel.class);
        return ResponseMessage.succses(data);
    }

    @GetMapping()
    public ResponseMessage<PageableList<TransactionModel>> findAll(
            @RequestParam(required = false) Long amount,
            @RequestParam(required = false) TypeTransactionEnum type,
            @RequestParam(required = false) String description,
            @RequestParam(defaultValue = "asc") String sort,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10", required = false) int size
    ) {
        if (size > 100) {
            size = 100;
        }
        Transaction entity = new Transaction(amount, type, description);
        Sort.Direction direction = Sort.Direction
                .fromOptionalString(sort.toUpperCase())
                .orElse(Sort.Direction.ASC);
        Page<Transaction> pageItems = service.findAll(entity, page, size, direction);
        List<Transaction> items = pageItems.toList();

        ModelMapper modelMapper = new ModelMapper();
        Type typeToken = new TypeToken<List<TransactionModel>>() {
        }.getType();
        List<TransactionModel> transactionModels = modelMapper.map(items, typeToken);

        PageableList<TransactionModel> data = new PageableList(transactionModels,
                pageItems.getNumber(), pageItems.getSize(), pageItems.getTotalElements());
        return ResponseMessage.succses(data);
    }

    @GetMapping(path = "/summary", produces = "application/json")
    public ResponseMessage<List<TransactionSummary>> summary(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) Integer date
    ) {
        List<TransactionSummary> transactions = service.summary(
                year != null ? Year.of(year) : Year.now(),
                month != null ? Month.of(month) : null,
                date != null ? date : null
        );

        return ResponseMessage.succses(transactions);
    }
}
