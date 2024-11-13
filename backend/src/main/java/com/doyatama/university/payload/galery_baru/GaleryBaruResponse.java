package com.doyatama.university.payload.galery_baru;

import java.util.ArrayList;
import java.util.List;

import com.doyatama.university.model.GaleryFileName;
import com.doyatama.university.payload.file_name.FileNameResponse;

public class GaleryBaruResponse {
    private Long id;
    private String name;
    private String description;
    private List<FileNameResponse> fileNames = new ArrayList<FileNameResponse>();
    private String fileType;
    // private List<MediaItem> mediaItems;

    public GaleryBaruResponse() {

    }

    public GaleryBaruResponse(Long id, String name, String description, List<String> fileNames,
            String fileType) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.fileNames = new ArrayList<FileNameResponse>();
        this.fileType = fileType;
        // this.mediaItems = new ArrayList<MediaItem>();
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

    public void setFileNames(List<FileNameResponse> fileNames) {
        this.fileNames = fileNames;
    }

    public List<FileNameResponse> getFileNames() {
        return fileNames;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getFileType() {
        return fileType;
    }

    // public void setMediaItems(List<MediaItem> mediaItems) {
    // this.mediaItems = mediaItems;
    // }

    // public List<MediaItem> getMediaItems() {
    // return mediaItems;
    // }

}
