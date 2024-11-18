package com.doyatama.university.payload.Pengumuman;

import java.util.List;
import java.util.ArrayList;
import com.doyatama.university.model.ImageFileName;
import com.doyatama.university.payload.pengumuman_file.PengumumanFileResponse;

public class PengumumanResponse {
    private Long id;
    private String name;
    private List<PengumumanFileResponse> fileNames = new ArrayList<PengumumanFileResponse>();
    private String fileType;

    public PengumumanResponse() {

    }

    public PengumumanResponse(Long id, String name, List<String> fileNames, String fileType) {
        this.id = id;
        this.name = name;
        this.fileNames = new ArrayList<PengumumanFileResponse>();
        this.fileType = fileType;
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

    public void setFileNames(List<PengumumanFileResponse> fileNames) {
        this.fileNames = fileNames;
    }

    public List<PengumumanFileResponse> getFileNames() {
        return fileNames;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getFileType() {
        return fileType;
    }
}
