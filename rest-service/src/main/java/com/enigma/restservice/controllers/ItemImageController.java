package com.enigma.restservice.controllers;

import com.enigma.restservice.entity.Item;
import com.enigma.restservice.models.ItemImageModel;
import com.enigma.restservice.models.ResponseMessage;
import com.enigma.restservice.services.ItemImageService;
import com.enigma.restservice.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLConnection;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

@RequestMapping("/items/{id}/images")
@RestController
public class ItemImageController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private ItemImageService service;

    @PostMapping
    public ResponseMessage<ItemImageModel> upload(@PathVariable Integer id,
                                                  @RequestParam MultipartFile file) throws IOException {
        Item entity = itemService.findById(id);
        Path path = service.save(entity, file);
        ItemImageModel model = ItemImageModel.from(id, path);

        return ResponseMessage.succses(model);
    }

    @GetMapping("/{filename}")
    public ResponseEntity<Resource> download(@PathVariable Integer id,
                                             @PathVariable String filename) throws IOException {
        Item entity = itemService.findById(id);
        Resource resource = service.load(entity, filename);

        String mediaType = URLConnection.guessContentTypeFromName(resource.getFilename());
        System.out.println(MediaType.parseMediaType(mediaType));
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(mediaType))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attement: filename=/" + resource.getFilename() + "/")
                .body(resource);
    }

    @DeleteMapping("/{filename}")
    public ResponseMessage<Boolean> delete(@PathVariable Integer id,
                                           @PathVariable String filename) throws IOException {
        Item entity = itemService.findById(id);
        service.delete(entity, filename);
        return ResponseMessage.succses(Boolean.TRUE);
    }

    @GetMapping
    public ResponseMessage<List<ItemImageModel>> list(@PathVariable Integer id) throws IOException {

        Item entity = itemService.findById(id);
        List<Path> paths = service.list(entity);

        List<ItemImageModel> models = new ArrayList<>();

        for (Path path : paths) {
            ItemImageModel model = ItemImageModel.from(id, path);
            models.add(model);
        }
        return ResponseMessage.succses(models);
    }

}
