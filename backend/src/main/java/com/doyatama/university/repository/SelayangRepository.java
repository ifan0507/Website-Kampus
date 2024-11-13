package com.doyatama.university.repository;

import com.doyatama.university.model.Selayang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SelayangRepository extends JpaRepository<Selayang, Long> {
    Optional<Selayang> findById(Long id);
}
