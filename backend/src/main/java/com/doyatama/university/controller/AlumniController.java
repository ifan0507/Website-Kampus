package com.doyatama.university.controller;

import com.doyatama.university.model.Alumni;
import com.doyatama.university.model.Dosen;
import com.doyatama.university.model.Profil;
import com.doyatama.university.payload.ApiResponse;
import com.doyatama.university.payload.PagedResponse;
import com.doyatama.university.payload.alumni.AlumniRequest;
import com.doyatama.university.payload.alumni.AlumniResponse;
import com.doyatama.university.payload.dosen.DosenRequest;
import com.doyatama.university.payload.dosen.DosenResponse;
import com.doyatama.university.payload.profil.ProfilRequest;
import com.doyatama.university.payload.profil.ProfilResponse;
import com.doyatama.university.repository.AlumniRepository;
import com.doyatama.university.repository.DosenRepository;
import com.doyatama.university.repository.ProfilRepository;
import com.doyatama.university.repository.UserRepository;
import com.doyatama.university.security.CurrentUser;
import com.doyatama.university.security.UserPrincipal;
import com.doyatama.university.service.AlumniService;
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
@RequestMapping("/api/alumni")
public class AlumniController {
        @Autowired
        private AlumniRepository alumniRepository;

        @Autowired
        private AlumniService alumniService;

        private static final Logger logger = LoggerFactory.getLogger(ProfilController.class);

        @GetMapping
        // @Secured("ROLE_ADMINISTRATOR")
        public PagedResponse<AlumniResponse> getAlumni(
                        @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                        @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
                return alumniService.getAllAlumni(page, size);
        }

        @PostMapping
        // @Secured("ROLE_ADMINISTRATOR")
        public ResponseEntity<?> createAlumni(@CurrentUser UserPrincipal currentUser,
                        @Valid @ModelAttribute AlumniRequest alumniRequest, @RequestParam("file") MultipartFile file)
                        throws IOException {
                // MultipartFile file = departmentRequest.getFile();
                Alumni alumni = alumniService.createAlumni(currentUser, alumniRequest, file);
                String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                                .path("/downloadFile/")
                                .path(alumni.getId().toString())
                                .toUriString();
                URI location = ServletUriComponentsBuilder
                                .fromCurrentRequest().path("/{alumniId}")
                                .buildAndExpand(alumni.getId()).toUri();

                return ResponseEntity.created(location)
                                .body(new ApiResponse(true, "alumni Created Successfully"));
        }

        @PutMapping("/{alumniId}")
        // @Secured("ROLE_ADMINISTRATOR")
        public ResponseEntity<?> updateAlumniById(@CurrentUser UserPrincipal currentUser,
                        @PathVariable(value = "alumniId") Long alumniId, @Valid AlumniRequest alumniRequest,
                        @RequestParam("file") MultipartFile file) throws IOException {
                Alumni alumni = alumniService.updateAlumni(alumniRequest, alumniId, currentUser, file);
                URI location = ServletUriComponentsBuilder
                                .fromCurrentRequest().path("/{alumniId}")
                                .buildAndExpand(alumni.getId()).toUri();
                return ResponseEntity.created(location)
                                .body(new ApiResponse(true, "alumni Updated Successfully"));
        }

        @GetMapping("/{alumniId}")
        // @Secured("ROLE_ADMINISTRATOR")
        public AlumniResponse getAlumniById(@PathVariable Long alumniId) {
                return alumniService.getAlumniById(alumniId);
        }

        @DeleteMapping("/{alumniId}")
        // @Secured("ROLE_ADMINISTRATOR")
        public HttpStatus deletealumni(@PathVariable(value = "alumniId") Long alumniId) {
                alumniService.deleteAlumniById(alumniId);
                return HttpStatus.FORBIDDEN;
        }
}