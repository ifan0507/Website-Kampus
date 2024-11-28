package com.doyatama.university.payload.Pengumuman;

import org.springframework.web.multipart.MultipartFile;

public class PengumumanRequest {
    private String name;
    private MultipartFile file;

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

}
