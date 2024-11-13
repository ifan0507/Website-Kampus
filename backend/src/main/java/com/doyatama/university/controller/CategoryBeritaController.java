/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.doyatama.university.controller;

import com.doyatama.university.model.CategoryBerita;
import com.doyatama.university.payload.ApiResponse;
import com.doyatama.university.payload.PagedResponse;
import com.doyatama.university.payload.category_berita.CategoryRequest;
import com.doyatama.university.payload.category_berita.CategoryResponse;
import com.doyatama.university.repository.CategoryRepository;
import com.doyatama.university.security.CurrentUser;
import com.doyatama.university.security.UserPrincipal;
import com.doyatama.university.service.CategoryBeritaService;
import com.doyatama.university.util.AppConstants;
import java.io.IOException;
import java.net.URI;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("api/category-berita")
public class CategoryBeritaController {

    // @Autowired
    // private CategoryBerita categoryBerita;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryBeritaService categoryService;

    @GetMapping
    public PagedResponse<CategoryResponse> getCategory(
            @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return categoryService.getAllCategory(page, size);
    }

    @PostMapping
    public ResponseEntity<?> createCategory(@CurrentUser UserPrincipal currentUser,
            @Valid @ModelAttribute CategoryRequest categoryRequest) throws IOException {
        CategoryBerita categoryBerita = categoryService.createCategory(currentUser, categoryRequest);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{categoryId}")
                .buildAndExpand(categoryBerita.getId()).toUri();
        return ResponseEntity.created(location).body(new ApiResponse(true, "Category Berita Created Successfully"));
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<?> updateCategoryById(@CurrentUser UserPrincipal currentUser,
            @PathVariable(value = "categoryId") Long categoryId, @Valid CategoryRequest categoryRequest)
            throws IOException {
        CategoryBerita categoryBerita = categoryService.updateCategory(categoryRequest, categoryId, currentUser);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{categoryId}")
                .buildAndExpand(categoryBerita.getId()).toUri();
        return ResponseEntity.created(location).body(new ApiResponse(true, "Category Berita Update Successfully"));
    }

    @GetMapping("/{categoryId}")
    public CategoryResponse getCategoryById(@PathVariable Long categoryId) {
        return categoryService.getCategoryById(categoryId);
    }

    @DeleteMapping("/{categoryId}")
    public HttpStatus deleteCategory(@PathVariable(value = "categoryId") Long categoryId) {
        categoryService.deleteCategoryBeritaById(categoryId);
        return HttpStatus.FORBIDDEN;
    }
}
