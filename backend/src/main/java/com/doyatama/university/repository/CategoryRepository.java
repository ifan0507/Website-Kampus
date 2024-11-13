/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.doyatama.university.repository;

import com.doyatama.university.model.CategoryBerita;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Muhammad Ifan
 */
public interface CategoryRepository extends JpaRepository<CategoryBerita, Long>{
    Optional<CategoryBerita> findById(Long  id);
}
