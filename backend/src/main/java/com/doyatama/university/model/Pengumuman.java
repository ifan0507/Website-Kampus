package com.doyatama.university.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.Size;
import org.springframework.lang.NonNull;

@Entity
@Table(name = "pengumumans")
public class Pengumuman {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Size(max = 255)
    private String name;

    private String fileType;

    @OneToMany(mappedBy = "pengumuman", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ImageFileName> pengumumanImages = new ArrayList<ImageFileName>();

    public Pengumuman() {

    }

    public Pengumuman(Long id, String name, String fileType, List<String> pengumumanImages) {
        this.id = id;
        this.name = name;
        this.fileType = fileType;
        this.pengumumanImages = new ArrayList<ImageFileName>();
    }

    public void setPengumumanImages(List<ImageFileName> pengumumanImages) {
        this.pengumumanImages = pengumumanImages;
    }

    public List<ImageFileName> getPengumumanImages() {
        return pengumumanImages;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getFileType() {
        return fileType;
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

}
