package com.doyatama.university.model;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "dosens")
public class Dosen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Size(max = 100)
    private String nip;
    @Size(max = 100)
    private String name;
    @Size(max = 100)
    private String email;
    @Size(max = 100)
    private String no_hp;
    @Size(max = 100)
    private String program_studi;
    @Size(max = 100)
    private String bidang_minat;
    private String fileType;
    private String fileName;
    @Lob
    private byte[] data;

    public Dosen() {
    }

    public Dosen(Long id) {
        this.id = id;
    }

    public Dosen(Long id, String nip, String name, String email, String no_hp, String program_studi,
            String bidang_minat,
            String fileName, String fileType, byte[] data) {
        this.id = id;
        this.nip = nip;
        this.name = name;
        this.email = email;
        this.no_hp = no_hp;
        this.program_studi = program_studi;
        this.bidang_minat = bidang_minat;
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