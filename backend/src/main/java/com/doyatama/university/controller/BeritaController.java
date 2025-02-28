package com.doyatama.university.controller;

import com.doyatama.university.model.Berita;
import com.doyatama.university.payload.ApiResponse;
import com.doyatama.university.payload.PagedResponse;
import com.doyatama.university.payload.berita.BeritaRequest;
import com.doyatama.university.payload.berita.BeritaResponse;
import com.doyatama.university.repository.BeritaRepository;
import com.doyatama.university.repository.UserRepository;
import com.doyatama.university.security.CurrentUser;
import com.doyatama.university.security.UserPrincipal;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.doyatama.university.service.BeritaService;
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

@RestController
@RequestMapping("/api/berita")
public class BeritaController {
        @Autowired
        private BeritaRepository beritaRepository;

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private BeritaService beritaService;

        private static final Logger logger = LoggerFactory.getLogger(BeritaController.class);

        @GetMapping
        // @Secured("ROLE_ADMINISTRATOR")
        public PagedResponse<BeritaResponse> getBerita(
                        @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                        @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
                return beritaService.getAllBerita(page, size);
        }

        @PostMapping
        public ResponseEntity<?> createBerita(@CurrentUser UserPrincipal currentUser,
                        @Valid @ModelAttribute BeritaRequest beritaRequest, @RequestParam("file") MultipartFile file)
                        throws IOException {

                if (currentUser == null) {
                        System.out.println("currentUser is null!");
                } else {
                        System.out.println("Current user: " + currentUser.getId());
                }

                // Proses Berita
                try {
                        Berita berita = beritaService.createBerita(currentUser, beritaRequest, file);

                        URI location = ServletUriComponentsBuilder
                                        .fromCurrentRequest().path("/{beritaId}")
                                        .buildAndExpand(berita.getId()).toUri();

                        return ResponseEntity.created(location)
                                        .body(new ApiResponse(true, "Berita Created Successfully"));
                } catch (Exception e) {
                        System.out.println("Error processing request: " + e.getMessage());
                        return new ResponseEntity<>(new ApiResponse(false, "Failed to create berita"),
                                        HttpStatus.INTERNAL_SERVER_ERROR);
                }
        }

        @PutMapping("/{beritaId}")
        // @Secured("ROLE_ADMINISTRATOR")
        public ResponseEntity<?> updateBeritaById(@CurrentUser UserPrincipal currentUser,
                        @PathVariable(value = "beritaId") Long beritaId,
                        @Valid BeritaRequest beritaRequest, @RequestParam("file") MultipartFile file)
                        throws IOException {
                Berita berita = beritaService.updateBerita(beritaRequest, beritaId, currentUser, file);
                URI location = ServletUriComponentsBuilder
                                .fromCurrentRequest().path("/{beritaId}")
                                .buildAndExpand(berita.getId()).toUri();
                return ResponseEntity.created(location)
                                .body(new ApiResponse(true, "Berita Updated Successfully"));
        }

        @GetMapping("/{beritaId}")
        // @Secured("ROLE_ADMINISTRATOR")
        public BeritaResponse getBeritaById(@PathVariable Long beritaId) {
                return beritaService.getBeritaById(beritaId);
        }

        @DeleteMapping("/{beritaId}")
        // @Secured("ROLE_ADMINISTRATOR")
        public HttpStatus deleteBerita(@PathVariable(value = "beritaId") Long beritaId) {
                beritaService.deleteBeritaById(beritaId);
                return HttpStatus.FORBIDDEN;
        }
}