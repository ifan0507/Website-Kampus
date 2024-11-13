package com.doyatama.university.payload.organisasi;

import javax.persistence.Lob;
import java.time.Instant;

public class OrganisasiUploadResponse {
    //    private String message;
    private Long id;
    private Instant updatedAt;
    private Instant createdAt;
    private String name;
    private String fileName;
    private String fileType;
    @Lob
    private byte[] data;


    public OrganisasiUploadResponse() {
    }

    public OrganisasiUploadResponse(Long id, Instant updatedAt, Instant createdAt, String name, String fileName, String fileType, byte[] data) {
        this.id = id;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
        this.name = name;
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
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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