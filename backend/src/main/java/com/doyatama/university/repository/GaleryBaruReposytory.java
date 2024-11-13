package com.doyatama.university.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.doyatama.university.model.GaleryBaru;

public interface GaleryBaruReposytory extends JpaRepository<GaleryBaru, Long> {
    Optional<GaleryBaru> findById(Long id);

}
