package com.doyatama.university.controller;

import com.doyatama.university.model.Pendaftaran;
import com.doyatama.university.payload.ApiResponse;
import com.doyatama.university.payload.PagedResponse;
import com.doyatama.university.payload.pendaftaran.PendaftaranRequest;
import com.doyatama.university.payload.pendaftaran.PendaftaranResponse;
import com.doyatama.university.repository.PendaftaranRepository;
import com.doyatama.university.repository.UserRepository;
import com.doyatama.university.security.CurrentUser;
import com.doyatama.university.security.UserPrincipal;
import com.doyatama.university.service.PendaftaranService;
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
@RequestMapping("/api/pendaftaran")
public class PendaftaranController {
    @Autowired
    private PendaftaranRepository pendaftaranRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PendaftaranService pendaftaranService;

    private static final Logger logger = LoggerFactory.getLogger(PendaftaranController.class);

    @GetMapping
//    @Secured("ROLE_ADMINISTRATOR")
    public PagedResponse<PendaftaranResponse> getPendaftaran(@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                           @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return pendaftaranService.getAllPendaftaran(page, size);
    }

    @PostMapping
//    @Secured("ROLE_ADMINISTRATOR")
    public ResponseEntity<?> createPendaftaran(@CurrentUser UserPrincipal currentUser, @Valid @ModelAttribute PendaftaranRequest pendaftaranRequest, @RequestParam("file") MultipartFile file) throws IOException {
//        MultipartFile file = departmentRequest.getFile();
        Pendaftaran pendaftaran = pendaftaranService.createPendaftaran(currentUser, pendaftaranRequest, file);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(pendaftaran.getId().toString())
                .toUriString();
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{pendaftaranId}")
                .buildAndExpand(pendaftaran.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Pendaftaran Created Successfully"));
    }


    @PostMapping("/{pendaftaranId}")
//    @Secured("ROLE_ADMINISTRATOR")
    public ResponseEntity<?> updatePendaftaranById(@CurrentUser UserPrincipal currentUser, @PathVariable(value = "pendaftaranId") Long pendaftaranId, @Valid PendaftaranRequest pendaftaranRequest, @RequestParam("file") MultipartFile file) throws IOException {
        Pendaftaran pendaftaran = pendaftaranService.updatePendaftaran(pendaftaranRequest, pendaftaranId, currentUser, file);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{pendaftaranId}")
                .buildAndExpand(pendaftaran.getId()).toUri();
        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Pendaftaran Updated Successfully"));
    }

    @GetMapping("/{pendaftaranId}")
//    @Secured("ROLE_ADMINISTRATOR")
    public PendaftaranResponse getPendaftaranById(@PathVariable Long pendaftaranId) {
        return pendaftaranService.getPendaftaranById(pendaftaranId);
    }

    @DeleteMapping("/{pendaftaranId}")
//    @Secured("ROLE_ADMINISTRATOR")
    public HttpStatus deletePendaftaran(@PathVariable (value = "pendaftaranId") Long pendaftaranId){
        pendaftaranService.deletePendaftaranById(pendaftaranId);
        return HttpStatus.FORBIDDEN;
    }
}