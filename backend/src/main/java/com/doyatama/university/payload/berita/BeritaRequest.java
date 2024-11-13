package com.doyatama.university.payload.berita;

import com.doyatama.university.model.CategoryBerita;
import org.springframework.web.multipart.MultipartFile;

public class BeritaRequest {

    private String name;
    private Long categoryId;
    private Long galeryId;
    private String description;
    private String selengkapnya;

    // private MultipartFile file;

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

    public String getSelengkapnya() {
        return selengkapnya;
    }

    public void setSelengkapnya(String selengkapnya) {
        this.selengkapnya = selengkapnya;
    }

    // public MultipartFile getFile() {
    // return file;
    // }

    // public void setFile(MultipartFile file) {
    // this.file = file;
    // }

    public void setGaleryId(Long galeryId) {
        this.galeryId = galeryId;
    }

    public Long getGaleryId() {
        return galeryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    // public CategoryBerita getCategoryBerita() {
    // return categoryBerita;
    // }

    // public void setCategoryBerita(CategoryBerita categoryBerita) {
    // this.categoryBerita = categoryBerita;
    // }
}
