package com.doyatama.university.repository;
import com.doyatama.university.model.Organisasi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrganisasiRepository extends JpaRepository<Organisasi, Long> {
    Optional<Organisasi> findById(Long id);
}
