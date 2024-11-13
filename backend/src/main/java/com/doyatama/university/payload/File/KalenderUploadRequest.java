package com.doyatama.university.payload.File;
import org.springframework.web.multipart.MultipartFile;

public class KalenderUploadRequest {
    private MultipartFile file;

    public MultipartFile getFile(){
        return file;
    }
    public void setFile(MultipartFile file){
        this.file = file;
    }
}
