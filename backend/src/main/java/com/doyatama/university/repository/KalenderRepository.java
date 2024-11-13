package com.doyatama.university.repository;
import com.doyatama.university.model.Kalender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KalenderRepository extends JpaRepository<Kalender, Long> {
    Optional<Kalender> findById(Long id);
}
