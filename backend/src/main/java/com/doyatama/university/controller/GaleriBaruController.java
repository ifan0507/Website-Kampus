package com.doyatama.university.controller;

import com.doyatama.university.exception.ResourceNotFoundException;
import com.doyatama.university.model.GaleryBaru;
import com.doyatama.university.model.ErrorResponse;
import com.doyatama.university.payload.ApiResponse;
import com.doyatama.university.payload.PagedResponse;
import com.doyatama.university.payload.galery_baru.GaleryBaruRequest;
import com.doyatama.university.payload.galery_baru.GaleryBaruResponse;
import com.doyatama.university.repository.GaleryBaruReposytory;
import com.doyatama.university.security.CurrentUser;
import com.doyatama.university.security.UserPrincipal;
import com.doyatama.university.service.GaleryBaruService;
import com.doyatama.university.util.AppConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/galeri-berita")
public class GaleriBaruController {

    @Autowired
    private GaleryBaruService galeryBaruService;

    @Autowired
    private GaleryBaruReposytory galeryBaruReposytory;

    private static final Logger logger = LoggerFactory.getLogger(GaleriBaruController.class);

    @GetMapping
    public PagedResponse<GaleryBaruResponse> getGaleryBaru(
            @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return galeryBaruService.getAllGaleryBaru(page, size);
    }

    @PostMapping
    public ResponseEntity<?> createGaleryBaru(
            @CurrentUser UserPrincipal currentUser,
            @Valid @ModelAttribute GaleryBaruRequest galeryBaruRequest,
            @RequestParam("files") List<MultipartFile> files) throws IOException {
        GaleryBaru galeryBaru = galeryBaruService.createGaleryBaru(currentUser, galeryBaruRequest, files);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(galeryBaru.getId().toString())
                .toUriString();
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{galeryId}")
                .buildAndExpand(galeryBaru.getId()).toUri();
        return ResponseEntity.created(location).body(new ApiResponse(true, "Galery Baru Created Successfully"));
    }

    @GetMapping("/{galeryId}")
    public ResponseEntity<GaleryBaruResponse> getGaleryBaruById(@PathVariable Long galeryId) {
        GaleryBaruResponse response = galeryBaruService.getGaleryBaruById(galeryId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{galeryId}")
    public ResponseEntity<?> updateGaleryBaru(
            @CurrentUser UserPrincipal currentUser,
            @PathVariable Long galeryId,
            @Valid @ModelAttribute GaleryBaruRequest galeryBaruRequest,
            @RequestParam("files") List<MultipartFile> files) throws IOException {
        try {
            GaleryBaru updatedGalery = galeryBaruService.updateGaleryBaru(galeryBaruRequest, galeryId, currentUser,
                    files);
            URI location = ServletUriComponentsBuilder
                    .fromCurrentRequest().path("/{galeryId}")
                    .buildAndExpand(updatedGalery.getId()).toUri();

            return ResponseEntity.created(location).body(new ApiResponse(true, "Galery Baru Updated Successfully"));

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Terjadi kesalahan saat mengupdate galery.", e.getMessage(),
                            e.getStackTrace()[0].toString()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Terjadi kesalahan yang tidak terduga.", e.getMessage(),
                            e.getStackTrace()[0].toString()));
        }

    }

    @DeleteMapping("/{galeryId}")
    public HttpStatus deleteGaleryBaru(@PathVariable Long galeryId) {
        galeryBaruService.deleteGaleryBaruById(galeryId);
        return HttpStatus.NO_CONTENT;
    }

}
