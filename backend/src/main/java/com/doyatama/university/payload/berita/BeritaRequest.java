package com.doyatama.university.payload.berita;

import javax.validation.constraints.NotNull;

import org.springframework.lang.Nullable;

import com.fasterxml.jackson.annotation.JsonProperty;

public class BeritaRequest {

    @JsonProperty("category_id")
    @NotNull(message = "CategoryId must not be null")
    private Long categoryId;

    @JsonProperty("galery_id")
    @Nullable
    private Long galeryId;

    private String name;

    private String description;

    private String selengkapnya;

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

    public void setGaleryId(Long galeryId) {
        this.galeryId = galeryId;
    }

    public Long getGaleryId() {
        return galeryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public Long getCategoryId() {
        return categoryId;
    }

}
