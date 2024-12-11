package com.doyatama.university.controller;

import com.doyatama.university.model.Dosen;
import com.doyatama.university.model.Profil;
import com.doyatama.university.payload.ApiResponse;
import com.doyatama.university.payload.PagedResponse;
import com.doyatama.university.payload.dosen.DosenRequest;
import com.doyatama.university.payload.dosen.DosenResponse;
import com.doyatama.university.payload.profil.ProfilRequest;
import com.doyatama.university.payload.profil.ProfilResponse;
import com.doyatama.university.repository.DosenRepository;
import com.doyatama.university.repository.ProfilRepository;
import com.doyatama.university.repository.UserRepository;
import com.doyatama.university.security.CurrentUser;
import com.doyatama.university.security.UserPrincipal;
import com.doyatama.university.service.DosenService;
import com.doyatama.university.service.ProfilService;
import com.doyatama.university.util.AppConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;

@RestController
@RequestMapping("/api/dosen")
public class DosenController {
    @Autowired
    private DosenRepository dosenRepository;

    @Autowired
    private DosenService dosenService;

    private static final Logger logger = LoggerFactory.getLogger(ProfilController.class);

    @GetMapping
    // @Secured("ROLE_ADMINISTRATOR")
    public PagedResponse<DosenResponse> getDosen(
            @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return dosenService.getAllDosen(page, size);
    }

    @PostMapping
    // @Secured("ROLE_ADMINISTRATOR")
    public ResponseEntity<?> createDosen(@CurrentUser UserPrincipal currentUser,
            @Valid @ModelAttribute DosenRequest dosenRequest, @RequestParam("file") MultipartFile file)
            throws IOException {
        // MultipartFile file = departmentRequest.getFile();
        Dosen dosen = dosenService.createDosen(currentUser, dosenRequest, file);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(dosen.getId().toString())
                .toUriString();
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{dosenId}")
                .buildAndExpand(dosen.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Dosen Created Successfully"));
    }

    @PutMapping("/{dosenId}")
    // @Secured("ROLE_ADMINISTRATOR")
    public ResponseEntity<?> updateDosenById(@CurrentUser UserPrincipal currentUser,
            @PathVariable(value = "dosenId") Long dosenId, @Valid DosenRequest dosenRequest,
            @RequestParam("file") MultipartFile file) throws IOException {
        Dosen dosen = dosenService.updateDosen(dosenRequest, dosenId, currentUser, file);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{dosenId}")
                .buildAndExpand(dosen.getId()).toUri();
        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "dosen Updated Successfully"));
    }

    @GetMapping("/{dosenId}")
    // @Secured("ROLE_ADMINISTRATOR")
    public DosenResponse getDosenById(@PathVariable Long dosenId) {
        return dosenService.getDosenById(dosenId);
    }

    @DeleteMapping("/{dosenId}")
    // @Secured("ROLE_ADMINISTRATOR")
    public HttpStatus deleteDosen(@PathVariable(value = "dosenId") Long dosenId) {
        dosenService.deleteDosenById(dosenId);
        return HttpStatus.FORBIDDEN;
    }
}