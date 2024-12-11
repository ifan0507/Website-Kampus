package com.doyatama.university.payload.dosen;

import org.springframework.web.multipart.MultipartFile;

public class DosenRequest {
    private String nip;
    private String name;
    private String email;
    private String no_hp;
    private String program_studi;
    private String bidang_minat;
    private MultipartFile file;

    public void setNip(String nip) {
        this.nip = nip;
    }

    public String getNip() {
        return nip;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setNo_hp(String no_hp) {
        this.no_hp = no_hp;
    }

    public String getNo_hp() {
        return no_hp;
    }

    public void setProgram_studi(String program_studi) {
        this.program_studi = program_studi;
    }

    public String getProgram_studi() {
        return program_studi;
    }

    public void setBidang_minat(String bidang_minat) {
        this.bidang_minat = bidang_minat;
    }

    public String getBidang_minat() {
        return bidang_minat;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}