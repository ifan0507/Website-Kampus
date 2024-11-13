package com.doyatama.university.payload.department;
import org.springframework.web.multipart.MultipartFile;


public class DepartmentRequest {
    private String name;
    private String description;
    private String kompetensi;
    private String peluang;
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
    public String getKompetensi() {
        return kompetensi;
    }

    public void setKompetensi(String kompetensi) {
        this.kompetensi = kompetensi;
    }
    public String getPeluang() {
        return peluang;
    }

    public void setPeluang(String peluang) {
        this.peluang = peluang;
    }
    public void setFile(MultipartFile file){
        this.file = file;
    }
}