package com.doyatama.university.controller;
import com.doyatama.university.model.Kalender;
import com.doyatama.university.payload.ApiResponse;
import com.doyatama.university.payload.PagedResponse;
import com.doyatama.university.payload.File.KalenderUploadRequest;
import com.doyatama.university.payload.File.KalenderUploadResponse;
import com.doyatama.university.payload.storage.UploadFileResponse;
import com.doyatama.university.repository.KalenderRepository;
import com.doyatama.university.repository.UserRepository;
import com.doyatama.university.security.CurrentUser;
import com.doyatama.university.security.UserPrincipal;
import com.doyatama.university.service.KalenderService;
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
@RequestMapping("/api/kalender")
public class KalenderController {
    @Autowired
    private KalenderRepository kalenderRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private KalenderService kalenderService;
    private static final Logger logger = LoggerFactory.getLogger(KalenderController.class);

    @GetMapping
//    @Secured("ROLE_ADMINISTRATOR")
    public PagedResponse<KalenderUploadResponse> getKalender(@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                       @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return kalenderService.getAllKalender(page, size);
    }

    @PostMapping
//    @Secured("ROLE_ADMINISTRATOR")
    public ResponseEntity<?> createKalender(@CurrentUser UserPrincipal currentUser, @Valid @ModelAttribute KalenderUploadRequest kalenderUploadRequest, @RequestParam("file") MultipartFile file) throws IOException {
//        MultipartFile file = departmentRequest.getFile();
        Kalender kalender = kalenderService.createKalender(currentUser, kalenderUploadRequest, file);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(kalender.getId().toString())
                .toUriString();
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{kalenderId}")
                .buildAndExpand(kalender.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Kalender Created Successfully"));
    }

    @PostMapping("/{kalenderId}")
//    @Secured("ROLE_ADMINISTRATOR")
    public ResponseEntity<?> updateKalenderById(@CurrentUser UserPrincipal currentUser, @PathVariable(value = "kalenderId") Long kalenderId, @Valid KalenderUploadRequest kalenderUploadRequest, @RequestParam("file") MultipartFile file) throws IOException {
        Kalender kalender = kalenderService.updateKalender(kalenderUploadRequest, kalenderId, currentUser, file);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{kalenderId}")
                .buildAndExpand(kalender.getId()).toUri();
        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Kalender Updated Successfully"));
    }

    @GetMapping("/{kalenderId}")
//    @Secured("ROLE_ADMINISTRATOR")
    public KalenderUploadResponse getKalenderById(@PathVariable Long kalenderId) {
        return kalenderService.getKalenderById(kalenderId);
    }

    @DeleteMapping("/{kalenderId}")
//    @Secured("ROLE_ADMINISTRATOR")
    public HttpStatus deleteKalender(@PathVariable (value = "kalenderId") Long kalenderId){
        kalenderService.deleteKalenderById(kalenderId);
        return HttpStatus.FORBIDDEN;
    }
}