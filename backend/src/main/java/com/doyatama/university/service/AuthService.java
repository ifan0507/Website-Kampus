package com.doyatama.university.service;

import com.doyatama.university.exception.AppException;
import com.doyatama.university.model.Role;
import com.doyatama.university.model.enumeration.RoleName;
import com.doyatama.university.model.User;
import com.doyatama.university.payload.SignUpRequest;
import com.doyatama.university.repository.RoleRepository;
import com.doyatama.university.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.UUID;

@Service
public class AuthService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    private final String FOLDER_PATH = "D:/uploads";

    public User signUp(SignUpRequest signUpRequest, MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        // Generate a random name for the image
        String randomName = UUID.randomUUID().toString() + "." + StringUtils.getFilenameExtension(originalFilename);
        String filePath = FOLDER_PATH + randomName;
        File destFile = new File(FOLDER_PATH, randomName);
        User user = new User(signUpRequest.getName(), signUpRequest.getUsername(),
                signUpRequest.getEmail(), signUpRequest.getPassword(), filePath);
        file.transferTo(destFile);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role userRole = roleRepository.findByName(RoleName.ROLE_STUDENT)
                .orElseThrow(() -> new AppException("User Role not set."));

        user.setRoles(Collections.singleton(userRole));

        return userRepository.save(user);
    }
}
