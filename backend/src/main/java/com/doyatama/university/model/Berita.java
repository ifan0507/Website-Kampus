package com.doyatama.university.model;

//import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "beritas")
public class Berita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Size(max = 100)
    private String name;
    private String description;
    private String selengkapnya;

    // private String fileType;
    // private String fileName;
    @Lob
    private byte[] data;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "galery_id", nullable = false)
    private GaleryBaru gallery;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("category_id")

    private CategoryBerita categoryBerita;

    public Berita() {
    }

    public Berita(Long id) {
        this.id = id;
    }

    public Berita(Long id, String name, CategoryBerita categoryBerita, String description, String selengkapnya,
            GaleryBaru galeryBaru, byte[] data) {
        this.id = id;
        this.name = name;
        this.categoryBerita = categoryBerita;
        this.description = description;
        this.selengkapnya = selengkapnya;
        this.gallery = galeryBaru;
        // this.fileName = fileName;
        // this.fileType = fileType;
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

    public String getSelengkapnya() {
        return selengkapnya;
    }

    public void setSelengkapnya(String selengkapnya) {
        this.selengkapnya = selengkapnya;
    }

    public void setGallery(GaleryBaru gallery) {
        this.gallery = gallery;
    }

    public GaleryBaru getGallery() {
        return gallery;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public CategoryBerita getCategoryBerita() {
        return categoryBerita;
    }

    public void setCategoryBerita(CategoryBerita categoryBerita) {
        this.categoryBerita = categoryBerita;
    }
}
