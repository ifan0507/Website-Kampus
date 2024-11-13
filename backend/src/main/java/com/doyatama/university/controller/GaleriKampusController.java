package com.doyatama.university.controller;
import com.doyatama.university.model.GaleriKampus;
import com.doyatama.university.payload.ApiResponse;
import com.doyatama.university.payload.PagedResponse;
import com.doyatama.university.payload.galeri_kampus.GaleriKampusRequest;
import com.doyatama.university.payload.galeri_kampus.GaleriKampusResponse;
import com.doyatama.university.payload.storage.UploadFileResponse;
import com.doyatama.university.repository.GaleriKampusRepository;
import com.doyatama.university.repository.UserRepository;
import com.doyatama.university.security.CurrentUser;
import com.doyatama.university.security.UserPrincipal;
import com.doyatama.university.service.GaleriKampusService;
import com.doyatama.university.util.AppConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
@RestController
@RequestMapping("/api/galeri-kampus")
public class GaleriKampusController {
    @Autowired
    private GaleriKampusRepository galeriKampusRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private GaleriKampusService galeriKampusService;
    private static final Logger logger = LoggerFactory.getLogger(GaleriKampusController.class);

    @GetMapping
//    @Secured("ROLE_ADMINISTRATOR")
    public PagedResponse<GaleriKampusResponse> getGaleriKampus(@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                             @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return galeriKampusService.getAllGaleriKampus(page, size);
    }

    @PostMapping
//    @Secured("ROLE_ADMINISTRATOR")
    public ResponseEntity<?> createGaleriKampus(@CurrentUser UserPrincipal currentUser, @Valid @ModelAttribute GaleriKampusRequest galeriKampusRequest, @RequestParam("file") MultipartFile file) throws IOException {
//        MultipartFile file = departmentRequest.getFile();
        GaleriKampus galeriKampus = galeriKampusService.createGaleriKampus(currentUser, galeriKampusRequest, file);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(galeriKampus.getId().toString())
                .toUriString();
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{galeriKampusId}")
                .buildAndExpand(galeriKampus.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Galeri Kampus Created Successfully"));
    }

    @PostMapping("/{galeriKampusId}")
//    @Secured("ROLE_ADMINISTRATOR")
    public ResponseEntity<?> updateGaleriKampusById(@CurrentUser UserPrincipal currentUser, @PathVariable(value = "galeriKampusId") Long galeriKampusId, @Valid GaleriKampusRequest galeriKampusRequest, @RequestParam("file") MultipartFile file) throws IOException {
        GaleriKampus galeriKampus= galeriKampusService.updateGaleriKampus(galeriKampusRequest, galeriKampusId, currentUser, file);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{galeriKampusId}")
                .buildAndExpand(galeriKampus.getId()).toUri();
        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Galeri Kampus Updated Successfully"));
    }

    @GetMapping("/{galeriKampusId}")
//    @Secured("ROLE_ADMINISTRATOR")
    public GaleriKampusResponse getGaleriKampusById(@PathVariable Long galeriKampusId) {
        return galeriKampusService.getGaleriKampusById(galeriKampusId);
    }

    @DeleteMapping("/{galeriKampusId}")
//    @Secured("ROLE_ADMINISTRATOR")
    public HttpStatus deleteGaleriKampus(@PathVariable (value = "galeriKampusId") Long galeriKampusId){
        galeriKampusService.deleteGaleriKampusById(galeriKampusId);
        return HttpStatus.FORBIDDEN;
    }
}