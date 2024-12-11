package com.doyatama.university.payload.alumni;

import java.sql.Date;

import org.springframework.web.multipart.MultipartFile;

public class AlumniRequest {
    private String nim;
    private String name;
    private String email;
    private String no_hp;
    private String program_studi;
    private String judul_ta;
    private Date tgl_lulus;
    private MultipartFile file;

    public void setNim(String nim) {
        this.nim = nim;
    }

    public String getNim() {
        return nim;
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

    public void setJudul_ta(String judul_ta) {
        this.judul_ta = judul_ta;
    }

    public String getJudul_ta() {
        return judul_ta;
    }

    public void setTgl_lulus(Date tgl_lulus) {
        this.tgl_lulus = tgl_lulus;
    }

    public Date getTgl_lulus() {
        return tgl_lulus;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}