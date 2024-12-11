package com.doyatama.university.model;

import java.sql.Date;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "alumnis")
public class Alumni {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Size(max = 100)
    private String nim;
    @Size(max = 100)
    private String name;
    @Size(max = 100)
    private String email;
    @Size(max = 50)
    private String no_hp;
    @Size(max = 100)
    private String program_studi;
    private String judul_ta;
    private Date tgl_lulus;
    private String fileType;
    private String fileName;
    @Lob
    private byte[] data;

    public Alumni() {
    }

    public Alumni(Long id) {
        this.id = id;
    }

    public Alumni(Long id, String nim, String name, String email, String no_hp, String program_studi,
            String judul_ta, Date tgl_lulus,
            String fileName, String fileType, byte[] data) {
        this.id = id;
        this.nim = nim;
        this.name = name;
        this.email = email;
        this.no_hp = no_hp;
        this.program_studi = program_studi;
        this.judul_ta = judul_ta;
        this.tgl_lulus = tgl_lulus;
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

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileName() {
        return fileName;
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