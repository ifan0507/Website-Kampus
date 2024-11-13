package com.doyatama.university.payload.campus_life;
import javax.persistence.Lob;

import java.time.Instant;

public class CampusLifeResponse {
    private Long id;
    private String name;
    private String description;
    private String kompetensi;
    private String peluang;
    private Instant updatedAt;
    private Instant createdAt;
    private String fileName;
    private String fileType;
    @Lob
    private byte[] data;

    public CampusLifeResponse() {
    }

    public CampusLifeResponse(Long id, String name, String description, Instant updatedAt, Instant createdAt, String fileName, String fileType, byte[] data) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
        this.fileName = fileName;
        this.fileType = fileType;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public byte[] getData() {
        return data;
    }
    public void setData(byte[] data) {
        this.data = data;
    }
}