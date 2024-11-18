package com.doyatama.university.payload.pengumuman_file;

import com.doyatama.university.model.GaleryBaru;
import com.doyatama.university.model.Pengumuman;

public class PengumumanFileResponse {
    private String fileName;
    private Pengumuman pengumuman;
    private byte[] data;

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setPengumuman(Pengumuman pengumuman) {
        this.pengumuman = pengumuman;
    }

    public Pengumuman getPengumuman() {
        return pengumuman;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public byte[] getData() {
        return data;
    }
}
