package com.doyatama.university.repository;

import com.doyatama.university.model.Kegiatan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KegiatanRepository extends JpaRepository<Kegiatan, Long> {
    Optional<Kegiatan> findById(Long id);
}
