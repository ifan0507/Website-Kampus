package com.doyatama.university.controller;

import com.doyatama.university.exception.BadRequestException;
import com.doyatama.university.exception.ResourceNotFoundException;
import com.doyatama.university.model.Berita;
import com.doyatama.university.model.User;
import com.doyatama.university.payload.*;
import com.doyatama.university.payload.berita.BeritaResponse;
import com.doyatama.university.payload.user.UserRequest;
import com.doyatama.university.payload.user.UserResponse;
import com.doyatama.university.security.CurrentUser;
import com.doyatama.university.security.UserPrincipal;
import com.doyatama.university.service.AuthService;
import com.doyatama.university.service.DepartmentService;
import com.doyatama.university.service.UserService;
import com.doyatama.university.util.AppConstants;
import com.doyatama.university.repository.UserRepository;
import org.slf4j.Logger; 


import java.io.IOException;
import java.net.URI;

import javax.validation.Valid;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private DepartmentService pollService;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/users")
    public PagedResponse<UserResponse> getUser(
            @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return userService.getAllUser(page, size);
    }

    @GetMapping("/user/me")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        String roles = currentUser.getAuthorities().toString();
        String role = roles.replaceAll("[\\[\\]]", "");
        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getName(),
                role, "", currentUser.getPhoto());
        return userSummary;
    }

    @GetMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/users/{username}")
    public UserProfile getUserProfile(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
        UserProfile userProfile = new UserProfile(user.getId(), user.getUsername(), user.getName(),
                user.getCreatedAt());
        return userProfile;
    }

    @PostMapping("/users")
    public ResponseEntity<?> createUser(@CurrentUser UserPrincipal currentUser,
            @ModelAttribute @Valid UserRequest request,
            @RequestParam("roles") String roles, // Mendapatkan roles dalam format string
            @RequestParam("file") MultipartFile file) throws IOException { // Mendapatkan file foto

        try {
            User user = userService.createUser(currentUser, request, file, roles);

            URI location = ServletUriComponentsBuilder
                    .fromCurrentRequest().path("/{beritaId}")
                    .buildAndExpand(user.getId()).toUri();

            return ResponseEntity.created(location)
                    .body(new ApiResponse(true, "User Created Successfully"));
        } catch (Exception e) {
            System.out.println("Error processing request: " + e.getMessage());
            return new ResponseEntity<>(new ApiResponse(false, "Failed to create user"),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/users/{userId}")
    public ResponseEntity<?> updateUser(
            @CurrentUser UserPrincipal currentUser,
            @PathVariable(value = "userId") Long userId,
            @Valid UserRequest request,
            @RequestParam(required = false) String oldPassword,
            @RequestParam(required = false) MultipartFile photoFile,
            @RequestParam(required = false) String roles) throws IOException {

        User user = userService.updateUser(request, userId, currentUser, photoFile, oldPassword, roles);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{userId}")
                .buildAndExpand(user.getId()).toUri();
        return ResponseEntity.ok(new ApiResponse(true, "User Updated Successfully"));
    }

    @DeleteMapping("/users/{userId}")
    // @Secured("ROLE_ADMINISTRATOR")
    public HttpStatus deleteUser(@PathVariable(value = "userId") Long userId) {
        userService.deleteUserById(userId);
        return HttpStatus.FORBIDDEN;
    }

}
