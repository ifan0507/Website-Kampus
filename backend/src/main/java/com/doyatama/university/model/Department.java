package com.doyatama.university.model;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "departments")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Size(max = 100)
    private String name;
    private String description;
    private String kompetensi;
    private String peluang;
    private String fileType;
    private String fileName;
    @Lob
    private byte[] data;


    public Department() {
    }

    public Department(Long id) {
        this.id = id;
    }

    public Department(Long id, String name, String description, String kompetensi, String peluang, String fileName, String fileType, byte[] data) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.kompetensi = kompetensi;
        this.peluang = peluang;
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
    public String getKompetensi() {
        return kompetensi;
    }

    public void setKompetensi(String kompetensi) {
        this.kompetensi = kompetensi;
    }
    public String getPeluang() {
        return peluang;
    }

    public void setPeluang(String peluang) {
        this.peluang = peluang;
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