package com.doyatama.university.controller;

import com.doyatama.university.model.Kegiatan;
import com.doyatama.university.payload.ApiResponse;
import com.doyatama.university.payload.PagedResponse;
import com.doyatama.university.payload.kegiatan.KegiatanRequest;
import com.doyatama.university.payload.kegiatan.KegiatanResponse;
import com.doyatama.university.repository.KegiatanRepository;
import com.doyatama.university.repository.UserRepository;
import com.doyatama.university.security.CurrentUser;
import com.doyatama.university.security.UserPrincipal;
import com.doyatama.university.service.KegiatanService;
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
@RequestMapping("/api/kegiatan")
public class KegiatanController {
    @Autowired
    private KegiatanRepository kegiatanRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private KegiatanService kegiatanService;

    private static final Logger logger = LoggerFactory.getLogger(KegiatanController.class);

    @GetMapping
    // @Secured("ROLE_ADMINISTRATOR")
    public PagedResponse<KegiatanResponse> getKegiatan(@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                   @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return kegiatanService.getAllKegiatan(page, size);
    }

    @PostMapping
//    @Secured("ROLE_ADMINISTRATOR")
    public ResponseEntity<?> createKegiatan(@CurrentUser UserPrincipal currentUser, @Valid @ModelAttribute KegiatanRequest kegiatanRequest, @RequestParam("file") MultipartFile file) throws IOException {
//        MultipartFile file = departmentRequest.getFile();
        Kegiatan kegiatan = kegiatanService.createKegiatan(currentUser, kegiatanRequest, file);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(kegiatan.getId().toString())
                .toUriString();
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{profilId}")
                .buildAndExpand(kegiatan.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Kegiatan Created Successfully"));
    }


    @PostMapping("/{kegiatanId}")
//    @Secured("ROLE_ADMINISTRATOR")
    public ResponseEntity<?> updateKegiatanById(@CurrentUser UserPrincipal currentUser, @PathVariable(value = "kegiatanId") Long kegiatanId, @Valid KegiatanRequest kegiatanRequest, @RequestParam("file") MultipartFile file) throws IOException {
        Kegiatan kegiatan = kegiatanService.updateKegiatan(kegiatanRequest, kegiatanId, currentUser, file);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{kegiatanId}")
                .buildAndExpand(kegiatan.getId()).toUri();
        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Kegiatan Updated Successfully"));
    }

    @GetMapping("/{kegiatanId}")
//    @Secured("ROLE_ADMINISTRATOR")
    public KegiatanResponse getKegiatanById(@PathVariable Long kegiatanId) {
        return kegiatanService.getKegiatanById(kegiatanId);
    }

    @DeleteMapping("/{kegiatanId}")
//    @Secured("ROLE_ADMINISTRATOR")
    public HttpStatus deleteKegiatan(@PathVariable (value = "kegiatanId") Long kegiatanId){
        kegiatanService.deleteKegiatanById(kegiatanId);
        return HttpStatus.FORBIDDEN;
    }
}
