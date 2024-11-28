package com.doyatama.university.controller;

import java.io.IOException;
import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.doyatama.university.model.ErrorResponse;
import com.doyatama.university.model.Pengumuman;
import com.doyatama.university.payload.ApiResponse;
import com.doyatama.university.payload.PagedResponse;
import com.doyatama.university.payload.Pengumuman.PengumumanRequest;
import com.doyatama.university.payload.Pengumuman.PengumumanResponse;
import com.doyatama.university.repository.PengumumanRepository;
import com.doyatama.university.security.CurrentUser;
import com.doyatama.university.security.UserPrincipal;
import com.doyatama.university.service.PengumumanService;
import com.doyatama.university.util.AppConstants;

@RestController
@RequestMapping("/api/pengumuman")
public class PengumumanController {

    @Autowired
    private PengumumanService pengumumanService;
    @Autowired
    private PengumumanRepository pengumumanRepository;
    private static final Logger logger = LoggerFactory.getLogger(PengumumanController.class);

    @GetMapping
    public PagedResponse<PengumumanResponse> getPengumuman(
            @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return pengumumanService.getAllPengumuman(page, size);
    }

    @PostMapping
    public ResponseEntity<?> createPengumuman(
            @CurrentUser UserPrincipal currentUser,
            @Valid @ModelAttribute PengumumanRequest pengumumanRequest,
            @RequestParam("files") List<MultipartFile> files) throws IOException {
        Pengumuman pengumuman = pengumumanService.createPengumuman(currentUser, pengumumanRequest, files);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(pengumuman.getId().toString())
                .toUriString();
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{pengumumanId}")
                .buildAndExpand(pengumuman.getId()).toUri();
        return ResponseEntity.created(location).body(new ApiResponse(true, "Pengumuman Created Successfully"));
    }

    @GetMapping("/{pengumumanId}")
    public ResponseEntity<PengumumanResponse> getPengumumanById(@PathVariable Long pengumumanId) {
        PengumumanResponse response = pengumumanService.getPengumumanById(pengumumanId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{pengumumanId}")
    public ResponseEntity<?> updatePengumuman(
            @CurrentUser UserPrincipal currentUser,
            @PathVariable Long pengumumanId,
            @Valid @ModelAttribute PengumumanRequest pengumumanRequest,
            @RequestParam("files") List<MultipartFile> files) throws IOException {
        try {
            Pengumuman updatedPengumuman = pengumumanService.updatePengumuman(pengumumanRequest, pengumumanId,
                    currentUser,
                    files);
            URI location = ServletUriComponentsBuilder
                    .fromCurrentRequest().path("/{pengumumanId}")
                    .buildAndExpand(updatedPengumuman.getId()).toUri();

            return ResponseEntity.created(location).body(new ApiResponse(true, "Pengumuman Updated Successfully"));

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Terjadi kesalahan saat mengupdate pengumuman.", e.getMessage(),
                            e.getStackTrace()[0].toString()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Terjadi kesalahan yang tidak terduga.", e.getMessage(),
                            e.getStackTrace()[0].toString()));
        }

    }

    @DeleteMapping("/{pengumumanId}")
    public HttpStatus deletePengumuman(@PathVariable Long pengumumanId) {
        pengumumanService.deletePengumumanById(pengumumanId);
        return HttpStatus.NO_CONTENT;
    }

}
