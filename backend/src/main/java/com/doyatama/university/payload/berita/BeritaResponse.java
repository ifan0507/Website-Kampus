package com.doyatama.university.payload.berita;

import com.doyatama.university.model.CategoryBerita;
import javax.persistence.Lob;

import java.time.Instant;

public class BeritaResponse {

    private Long id;
    private String name;
    private String fileType;
    private String fileNameJudul;

    private Long categoryId;

    @Lob
    private String description;

    @Lob
    private String selengkapnya;
    private Instant updatedAt;
    private Instant createdAt;
    private Long galeryId;
    private String categoryName; // Nama kategori
    private String galleryName; // Nama galeri

    @Lob
    private byte[] data;

    public BeritaResponse() {
    }

    public BeritaResponse(Long id, String name, String fileType, String fileNameJudul, String categoryName,
            String galleryName, String description,
            String selengkapnya, Instant updatedAt, Instant createdAt, Long galeryId, byte[] data) {
        this.id = id;
        this.name = name;
        this.fileType = fileType;
        this.fileNameJudul = fileNameJudul;
        this.categoryName = categoryName;
        this.galleryName = galleryName;
        this.description = description;
        this.selengkapnya = selengkapnya;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
        this.galeryId = galeryId;
        this.data = data;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setFileNameJudul(String fileNameJudul) {
        this.fileNameJudul = fileNameJudul;
    }

    public String getFileNameJudul() {
        return fileNameJudul;
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

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public void setGaleryId(Long galeryId) {
        this.galeryId = galeryId;
    }

    public Long getGaleryId() {
        return galeryId;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setGalleryName(String galleryName) {
        this.galleryName = galleryName;
    }

    public String getGalleryName() {
        return galleryName;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getFileType() {
        return fileType;
    }
}
