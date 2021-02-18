package com.enigma.restservice.services;

import com.enigma.restservice.entity.Item;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;


public interface ItemImageService {

    public Path save(Item entity, MultipartFile file) throws IOException;

    public List<Path> list(Item entity) throws IOException;

    public Resource load(Item entity, String filename) throws IOException;

    public void delete(Item entity, String filename) throws IOException;
}
