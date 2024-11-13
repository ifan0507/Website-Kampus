package com.doyatama.university.repository;

import com.doyatama.university.model.CampusLife;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CampusLifeRepository extends JpaRepository<CampusLife, Long> {
    Optional<CampusLife> findById(Long id);
}
