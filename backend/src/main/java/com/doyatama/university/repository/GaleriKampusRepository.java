package com.doyatama.university.repository;
import com.doyatama.university.model.GaleriKampus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GaleriKampusRepository extends JpaRepository<GaleriKampus, Long> {
    Optional<GaleriKampus> findById(Long id);
}
