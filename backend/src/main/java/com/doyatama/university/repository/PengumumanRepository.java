package com.doyatama.university.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.doyatama.university.model.Pengumuman;

public interface PengumumanRepository extends JpaRepository<Pengumuman, Long> {
    Optional<Pengumuman> findById(Long id);
}
