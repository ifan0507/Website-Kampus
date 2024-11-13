package com.doyatama.university.payload.galery_baru;

import org.springframework.web.multipart.MultipartFile;

public class GaleryBaruRequest {
    private String name;
    private String description;
    private MultipartFile file;

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    public MultipartFile getFile() {
        return file;
    }
}
