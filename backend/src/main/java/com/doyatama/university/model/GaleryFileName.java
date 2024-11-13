package com.doyatama.university.model;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "galery_barus_file_names")
public class GaleryFileName {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "gallery_baru_id", nullable = false)
    private GaleryBaru gallery;

    private String fileName;

    @Lob
    private byte[] data;

    // Getter dan Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public GaleryBaru getGallery() {
        return gallery;
    }

    public void setGallery(GaleryBaru gallery) {
        this.gallery = gallery;
    }

    public Long upGallery(Long id) {
        return id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public byte[] getData() {
        return data;
    }
}
