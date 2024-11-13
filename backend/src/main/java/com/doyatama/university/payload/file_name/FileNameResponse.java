package com.doyatama.university.payload.file_name;

import com.doyatama.university.model.GaleryBaru;

public class FileNameResponse {
    private String fileName;
    private GaleryBaru galeryBaru;
    private byte[] data;

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setGaleryBaru(GaleryBaru galeryBaru) {
        this.galeryBaru = galeryBaru;
    }

    public GaleryBaru getGaleryBaru() {
        return galeryBaru;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public byte[] getData() {
        return data;
    }
}
