package com.doyatama.university.repository;

import com.doyatama.university.model.Alumni;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AlumniRepository extends JpaRepository<Alumni, Long> {
    Optional<Alumni> findById(Long id);
}
