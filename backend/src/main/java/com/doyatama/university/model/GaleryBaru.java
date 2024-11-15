package com.doyatama.university.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.Size;

import org.springframework.lang.NonNull;

import com.doyatama.university.payload.UserProfile;

@Entity
@Table(name = "galery_barus")

public class GaleryBaru {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Size(max = 100)
    private String name;

    @Lob
    private String description;

    private String fileType;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "gallery")
    private Berita berita;

    @OneToMany(mappedBy = "gallery", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GaleryFileName> fileNames = new ArrayList<GaleryFileName>();

    public GaleryBaru() {

    }

    public GaleryBaru(Long id, String name, String description, String fileType, List<String> fileNames) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.fileType = fileType;
        this.fileNames = new ArrayList<GaleryFileName>();
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void removeFileName(GaleryFileName fileName) {
        fileNames.remove(fileName);
        fileName.setGallery(null);
    }

    public void setFileNames(List<GaleryFileName> fileNames) {
        this.fileNames = fileNames;
    }

    public List<GaleryFileName> getFileNames() {
        return fileNames;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getFileType() {
        return fileType;
    }

    public void setBerita(Berita berita) {
        this.berita = berita;
    }

    public Berita getBerita() {
        return berita;
    }
}
