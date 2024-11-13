/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.doyatama.university.service;

import com.doyatama.university.exception.BadRequestException;
import com.doyatama.university.exception.ResourceNotFoundException;
import com.doyatama.university.model.CategoryBerita;
import com.doyatama.university.payload.PagedResponse;
import com.doyatama.university.payload.category_berita.CategoryRequest;
import com.doyatama.university.payload.category_berita.CategoryResponse;
import com.doyatama.university.repository.CategoryRepository;
import com.doyatama.university.security.UserPrincipal;
import com.doyatama.university.util.AppConstants;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class CategoryBeritaService {

    @Autowired
    private CategoryRepository categoryRepository;

    public PagedResponse<CategoryResponse> getAllCategory(int page, int size) {
        validatePageNumberAndSize(page, size);

        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "id");
        Page<CategoryBerita> categorys = categoryRepository.findAll(pageable);
        if (categorys.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), categorys.getNumber(),
                    categorys.getSize(), categorys.getTotalElements(), categorys.getTotalPages(), categorys.isLast(),
                    200);
        }

        List<CategoryResponse> categoryResponses = categorys.map(asResponse -> {
            CategoryResponse categoryResponse = new CategoryResponse();
            categoryResponse.setId(asResponse.getId());
            categoryResponse.setName(asResponse.getName());
            categoryResponse.setDescription(asResponse.getDescription());

            return categoryResponse;
        }).getContent();

        return new PagedResponse<>(categoryResponses, categorys.getNumber(),
                categorys.getSize(), categorys.getNumberOfElements(), categorys.getTotalPages(), categorys.isLast(),
                200);
    }

    public CategoryBerita createCategory(UserPrincipal currentUser, @Valid CategoryRequest categoryRequest)
            throws IOException {

        CategoryBerita categoryBerita = new CategoryBerita();
        categoryBerita.setName(categoryRequest.getName());
        categoryBerita.setDescription(categoryRequest.getDescription());

        return categoryRepository.save(categoryBerita);
    }

    public CategoryResponse getCategoryById(Long categoryId) {
        CategoryBerita categoryBerita = categoryRepository.findById(categoryId).orElseThrow(
                () -> new ResourceNotFoundException("Category", "id", categoryId));
        CategoryResponse categoryResponse = new CategoryResponse();
        categoryResponse.setId(categoryBerita.getId());
        return categoryResponse;
    }

    private void validatePageNumberAndSize(int page, int size) {
        if (page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }
        if (size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }

    public CategoryBerita updateCategory(@Valid CategoryRequest categoryRequest, Long id, UserPrincipal currentUser)
            throws IOException {
        return categoryRepository.findById(id).map(categorys -> {
            categorys.setName(categoryRequest.getName());
            categorys.setDescription(categoryRequest.getDescription());

            return categoryRepository.save(categorys);
        }).orElseThrow(() -> new ResourceNotFoundException("Category Berita", "id", id));
    }

    public void deleteCategoryBeritaById(Long id) {
        Optional<CategoryBerita> category = categoryRepository.findById(id);
        if (category.isPresent()) {
            categoryRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("Berita", "id", id);
        }
    }

}
