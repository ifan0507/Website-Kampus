package com.doyatama.university.payload.user;

import java.util.Set;

import javax.persistence.Lob;

import com.doyatama.university.model.Role;

public class UserResponse {

    private Long id;
    private String name;
    private String username;
    private String email;
    private String photo;
    private Set<Role> roles;
    @Lob
    private byte[] data;

    public UserResponse() {
    }

    public UserResponse(Long id, String name, String username, String email, String photo, Set<Role> roles,
            byte[] data) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.photo = photo;
        this.roles = roles;
        this.data = data;
    }

    // Getter dan Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public byte[] getData() {
        return data;
    }
}
