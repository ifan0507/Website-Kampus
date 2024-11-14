package com.doyatama.university.repository;

import com.doyatama.university.model.Berita;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

@Repository
public interface BeritaRepository extends JpaRepository<Berita, Long> {

    @EntityGraph(attributePaths = { "categoryBerita", "gallery" })
    Page<Berita> findAll(Pageable pageable);

    Optional<Berita> findById(Long id);
}
