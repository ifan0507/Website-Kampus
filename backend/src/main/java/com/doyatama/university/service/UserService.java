package com.doyatama.university.service;

import com.doyatama.university.exception.BadRequestException;
import com.doyatama.university.exception.ResourceNotFoundException;
import com.doyatama.university.model.Role;
import com.doyatama.university.model.User;
import com.doyatama.university.model.enumeration.RoleName;
import com.doyatama.university.payload.PagedResponse;
import com.doyatama.university.payload.user.UserRequest;
import com.doyatama.university.payload.user.UserResponse;
import com.doyatama.university.repository.RoleRepository;
import com.doyatama.university.repository.UserRepository;
import com.doyatama.university.security.UserPrincipal;
import com.doyatama.university.util.AppConstants;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public PagedResponse<UserResponse> getAllUser(int page, int size) {
        validatePageNumberAndSize(page, size);

        // Retrieve Polls
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "id");
        Page<User> users = userRepository.findAll(pageable);
        if (users.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), users.getNumber(),
                    users.getSize(), users.getTotalElements(), users.getTotalPages(), users.isLast(), 200);
        }

        List<UserResponse> userResponses = users.map(asResponse -> {
            UserResponse userResponse = new UserResponse();
            userResponse.setId(asResponse.getId());
            userResponse.setName(asResponse.getName());
            userResponse.setEmail(asResponse.getEmail());
            userResponse.setUsername(asResponse.getUsername());
            userResponse.setPhoto(asResponse.getPhoto());
            userResponse.setPhotoType(asResponse.getPhotoType());
            userResponse.setRoles(asResponse.getRoles());
            userResponse.setData(asResponse.getData());
            return userResponse;

        }).getContent();
        return new PagedResponse<>(userResponses, users.getNumber(),
                users.getSize(), users.getTotalElements(), users.getTotalPages(), users.isLast(), 200);
    }

    public User createUser(UserPrincipal currentUser, @Valid UserRequest request, MultipartFile file,
            String roles) throws IOException {
        // Validasi username dan email unik
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username is already taken!");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already in use!");
        }

        // Konversi roles dari String ke Role entity
        Set<Role> roleSet = Arrays.stream(roles.split(","))
                .map(roleName -> roleRepository.findByName(RoleName.valueOf(roleName))
                        .orElseThrow(() -> new EntityNotFoundException("Role not found: " + roleName)))
                .collect(Collectors.toSet());

        String photo = StringUtils.cleanPath(file.getOriginalFilename());

        User user = new User();
        user.setName(request.getName());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRoles(roleSet); // Menyimpan roles yang sudah diproses
        user.setPhoto(photo);
        user.setPhotoType(file.getContentType());
        user.setData(file.getBytes());

        return userRepository.save(user);
    }

    public User updateUser(@Valid UserRequest userRequest, Long id, UserPrincipal currentUser,
            MultipartFile file, String oldPassword, String roles) throws IOException {
        return userRepository.findById(id).map(user -> {
            // Update password jika diberikan
            if (userRequest.getPassword() != null && !userRequest.getPassword().isEmpty()) {
                if (oldPassword == null || oldPassword.isEmpty()) {
                    throw new IllegalArgumentException("Old password is required.");
                }

                if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
                    throw new IllegalArgumentException("Old password is incorrect.");
                }

                user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
            }

            // Update roles jika diberikan
            if (roles != null && !roles.isEmpty()) {
                Set<Role> roleSet = Arrays.stream(roles.split(","))
                        .map(roleName -> roleRepository.findByName(RoleName.valueOf(roleName))
                                .orElseThrow(() -> new EntityNotFoundException("Role not found: " + roleName)))
                        .collect(Collectors.toSet());
                user.setRoles(roleSet);
            }

            // Update photo jika diberikan
            if (file != null && !file.isEmpty()) {
                try {
                    user.setData(file.getBytes());
                    user.setPhoto(StringUtils.cleanPath(file.getOriginalFilename()));
                    user.setPhotoType(file.getContentType());
                } catch (IOException e) {
                    throw new RuntimeException("Failed to store photo", e);
                }
            } else {
                // log.info("No new photo uploaded, keeping the existing photo.");
            }

            // Update atribut lainnya
            user.setName(userRequest.getName());
            user.setUsername(userRequest.getUsername());
            user.setEmail(userRequest.getEmail());

            return userRepository.save(user);
        }).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    }

    public void deleteUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            userRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("user", "id", id);
        }
    }

    private void validatePageNumberAndSize(int page, int size) {
        if (page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }
        if (size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }
}
