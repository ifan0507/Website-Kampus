package com.doyatama.university.payload.kegiatan;
import org.springframework.web.multipart.MultipartFile;

public class KegiatanRequest {
    private String name;
    private String description;
    private String selengkapnya;
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
    public String getSelengkapnya() {
        return selengkapnya;
    }

    public void setSelengkapnya(String selengkapnya) {
        this.selengkapnya = selengkapnya;
    }
    
    public MultipartFile getFile(){
        return file;
    }
    public void setFile(MultipartFile file){
        this.file = file;
    }
}
