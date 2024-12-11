package com.doyatama.university.payload.alumni;

import javax.persistence.Lob;

import java.sql.Date;
import java.time.Instant;

public class AlumniResponse {
    private Long id;
    private String nim;
    private String name;
    private String email;
    private String no_hp;
    private String program_studi;
    private String judul_ta;
    private Date tgl_lulus;
    private Instant updatedAt;
    private Instant createdAt;
    private String fileName;
    private String fileType;
    @Lob
    private byte[] data;

    public AlumniResponse() {
    }

    public AlumniResponse(Long id, String nim, String name, String email, String no_hp, String program_studi,
            String judul_ta, Date tgl_lulus, Instant updatedAt, Instant createdAt,
            String fileName, String fileType, byte[] data) {
        this.id = id;
        this.nim = nim;
        this.name = name;
        this.email = email;
        this.no_hp = no_hp;
        this.program_studi = program_studi;
        this.judul_ta = judul_ta;
        this.tgl_lulus = tgl_lulus;
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

    public void setNim(String nim) {
        this.nim = nim;
    }

    public String getNim() {
        return nim;
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

    public void setJudul_ta(String judul_ta) {
        this.judul_ta = judul_ta;
    }

    public String getJudul_ta() {
        return judul_ta;
    }

    public void setTgl_lulus(Date tgl_lulus) {
        this.tgl_lulus = tgl_lulus;
    }

    public Date getTgl_lulus() {
        return tgl_lulus;
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