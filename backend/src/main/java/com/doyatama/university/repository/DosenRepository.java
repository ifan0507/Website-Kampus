package com.doyatama.university.repository;

import com.doyatama.university.model.Dosen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DosenRepository extends JpaRepository<Dosen, Long> {
    Optional<Dosen> findById(Long id);
}
