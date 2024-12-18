package com.doyatama.university.payload.dosen;

import javax.persistence.Lob;

import java.time.Instant;

public class DosenResponse {
    private Long id;
    private String nip;
    private String name;
    private String email;
    private String no_hp;
    private String program_studi;
    private String bidang_minat;
    private Instant updatedAt;
    private Instant createdAt;
    private String fileName;
    private String fileType;
    @Lob
    private byte[] data;

    public DosenResponse() {
    }

    public DosenResponse(Long id, String nip, String name, String email, String no_hp, String program_studi,
            String bidang_minat, Instant updatedAt, Instant createdAt,
            String fileName, String fileType, byte[] data) {
        this.id = id;
        this.nip = nip;
        this.name = name;
        this.email = email;
        this.no_hp = no_hp;
        this.program_studi = program_studi;
        this.bidang_minat = bidang_minat;
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

    public void setNip(String nip) {
        this.nip = nip;
    }

    public String getNip() {
        return nip;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setNo_hp(String no_hp) {
        this.no_hp = no_hp;
    }

    public String getNo_hp() {
        return no_hp;
    }

    public void setProgram_studi(String program_studi) {
        this.program_studi = program_studi;
    }

    public String getProgram_studi() {
        return program_studi;
    }

    public void setBidang_minat(String bidang_minat) {
        this.bidang_minat = bidang_minat;
    }

    public String getBidang_minat() {
        return bidang_minat;
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