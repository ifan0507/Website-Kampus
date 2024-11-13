package com.doyatama.university.repository;

import com.doyatama.university.model.Pendaftaran;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PendaftaranRepository extends JpaRepository<Pendaftaran, Long> {
    Optional<Pendaftaran> findById(Long id);
}