package com.doyatama.university.model;

import javax.persistence.*;

@Entity
@Table(name = "pengumuman_image_files")
public class ImageFileName {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pengumuman_id", nullable = false)
    private Pengumuman pengumuman;

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

    public void setPengumuman(Pengumuman pengumuman) {
        this.pengumuman = pengumuman;
    }

    public Pengumuman getPengumuman() {
        return pengumuman;
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
