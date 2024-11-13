package com.doyatama.university.payload.galeri_kampus;

import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Lob;
import java.time.Instant;

public class GaleriKampusResponse {
    //    private String message;
    private Long id;
    private Instant updatedAt;
    private Instant createdAt;
    private String fileName;
    private String fileType;
    @Lob
    private byte[] data;


    public GaleriKampusResponse() {
    }

    public GaleriKampusResponse(Long id, Instant updatedAt, Instant createdAt,String fileName, String fileType,byte[] data) {
        this.id = id;
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