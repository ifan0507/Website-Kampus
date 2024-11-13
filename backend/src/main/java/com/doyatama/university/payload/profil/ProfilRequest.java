package com.doyatama.university.payload.profil;
import org.springframework.web.multipart.MultipartFile;


public class ProfilRequest {
    private String name;
    private String description;
    private MultipartFile file;


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
    public MultipartFile getFile(){
        return file;
    }
    public void setFile(MultipartFile file){
        this.file = file;
    }
}