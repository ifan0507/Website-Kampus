package com.doyatama.university.controller;

import com.doyatama.university.model.Organisasi;
import com.doyatama.university.payload.ApiResponse;
import com.doyatama.university.payload.organisasi.OrganisasiUploadRequest;
import com.doyatama.university.payload.organisasi.OrganisasiUploadResponse;
import com.doyatama.university.payload.PagedResponse;
import com.doyatama.university.repository.OrganisasiRepository;
import com.doyatama.university.repository.UserRepository;
import com.doyatama.university.security.CurrentUser;
import com.doyatama.university.security.UserPrincipal;
import com.doyatama.university.service.OrganisasiService;
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
@RequestMapping("/api/organisasi")
public class OrganisasiController {
    @Autowired
    private OrganisasiRepository organisasiRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrganisasiService organisasiService;
    private static final Logger logger = LoggerFactory.getLogger(OrganisasiController.class);

    @GetMapping
//    @Secured("ROLE_ADMINISTRATOR")
    public PagedResponse<OrganisasiUploadResponse> getOrganisasi(@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                       @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return organisasiService.getAllOrganisasi(page, size);
    }

    @PostMapping
//    @Secured("ROLE_ADMINISTRATOR")
    public ResponseEntity<?> createOrganisasi(@CurrentUser UserPrincipal currentUser, @Valid @ModelAttribute OrganisasiUploadRequest organisasiUploadRequest, @RequestParam("file") MultipartFile file) throws IOException {
//        MultipartFile file = departmentRequest.getFile();
        Organisasi organisasi = organisasiService.createOrganisasi(currentUser, organisasiUploadRequest, file);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(organisasi.getId().toString())
                .toUriString();
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{organisasiId}")
                .buildAndExpand(organisasi.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Organisasi Created Successfully"));
    }

    @PostMapping("/{organisasiId}")
//    @Secured("ROLE_ADMINISTRATOR")
    public ResponseEntity<?> updateOrganisasiById(@CurrentUser UserPrincipal currentUser, @PathVariable(value = "organisasiId") Long organisasiId, @Valid OrganisasiUploadRequest organisasiUploadRequest, @RequestParam("file") MultipartFile file) throws IOException {
        Organisasi organisasi = organisasiService.updateOrganisasi(organisasiUploadRequest, organisasiId, currentUser, file);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{organisasiId}")
                .buildAndExpand(organisasi.getId()).toUri();
        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Organisasi Updated Successfully"));
    }

    @GetMapping("/organisasiId}")
//    @Secured("ROLE_ADMINISTRATOR")
    public OrganisasiUploadResponse getOrganisasiById(@PathVariable Long organisasiId) {
        return organisasiService.getOrganisasiById(organisasiId);
    }

    @DeleteMapping("/{organisasiId}")
//    @Secured("ROLE_ADMINISTRATOR")
    public HttpStatus deleteOrganisasi(@PathVariable (value = "organisasiId") Long organisasiId){
        organisasiService.deleteOrganisasiById(organisasiId);
        return HttpStatus.FORBIDDEN;
    }
}