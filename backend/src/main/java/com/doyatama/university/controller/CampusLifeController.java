package com.doyatama.university.controller;

import com.doyatama.university.model.CampusLife;
import com.doyatama.university.payload.ApiResponse;
import com.doyatama.university.payload.PagedResponse;
import com.doyatama.university.payload.campus_life.CampusLifeRequest;
import com.doyatama.university.payload.campus_life.CampusLifeResponse;
import com.doyatama.university.repository.CampusLifeRepository;
import com.doyatama.university.repository.UserRepository;
import com.doyatama.university.security.CurrentUser;
import com.doyatama.university.security.UserPrincipal;
import com.doyatama.university.service.CampusLifeService;
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
@RequestMapping("/api/campus_life")
public class CampusLifeController {
    @Autowired
    private CampusLifeRepository campusLifeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CampusLifeService campusLifeService;

    private static final Logger logger = LoggerFactory.getLogger(CampusLifeController.class);

    @GetMapping
//    @Secured("ROLE_ADMINISTRATOR")
    public PagedResponse<CampusLifeResponse> getCampusLife(@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                           @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return campusLifeService.getAllCampusLife(page, size);
    }

    @PostMapping
//    @Secured("ROLE_ADMINISTRATOR")
    public ResponseEntity<?> createCampusLife(@CurrentUser UserPrincipal currentUser, @Valid @ModelAttribute CampusLifeRequest campusLifeRequest, @RequestParam("file") MultipartFile file) throws IOException {
//        MultipartFile file = departmentRequest.getFile();
        CampusLife campusLife = campusLifeService.createCampusLife(currentUser, campusLifeRequest, file);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(campusLife.getId().toString())
                .toUriString();
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{campusLifeId}")
                .buildAndExpand(campusLife.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Campus Life Created Successfully"));
    }


    @PostMapping("/{campusLifeId}")
//    @Secured("ROLE_ADMINISTRATOR")
    public ResponseEntity<?> updateCampusLifeById(@CurrentUser UserPrincipal currentUser, @PathVariable(value = "campusLifeId") Long campusLifeId, @Valid CampusLifeRequest campusLifeRequest, @RequestParam("file") MultipartFile file) throws IOException {
        CampusLife campusLife = campusLifeService.updateCampusLife(campusLifeRequest, campusLifeId, currentUser, file);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{campusLifeId}")
                .buildAndExpand(campusLife.getId()).toUri();
        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Campus Life Updated Successfully"));
    }

    @GetMapping("/{campusLifeId}")
//    @Secured("ROLE_ADMINISTRATOR")
    public CampusLifeResponse getCampusLifeById(@PathVariable Long campusLifeId) {
        return campusLifeService.getCampusLifeById(campusLifeId);
    }

    @DeleteMapping("/{campusLifeId}")
//    @Secured("ROLE_ADMINISTRATOR")
    public HttpStatus deleteCampusLife(@PathVariable (value = "campusLifeId") Long campusLifeId){
        campusLifeService.deleteCampusLifeById(campusLifeId);
        return HttpStatus.FORBIDDEN;
    }
}