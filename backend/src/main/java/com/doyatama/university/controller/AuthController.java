package com.doyatama.university.controller;

import com.doyatama.university.model.User;
import com.doyatama.university.payload.ApiResponse;
import com.doyatama.university.payload.JwtAuthenticationResponse;
import com.doyatama.university.payload.LoginRequest;
import com.doyatama.university.payload.SignUpRequest;
import com.doyatama.university.security.JwtTokenProvider;
import com.doyatama.university.service.AuthService;
import com.doyatama.university.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

        @Autowired
        AuthenticationManager authenticationManager;

        @Autowired
        UserRepository userRepository;

        @Autowired
        JwtTokenProvider tokenProvider;

        @Autowired
        private AuthService authService;

        @PostMapping("/signin")
        public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

                Authentication authentication = authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                loginRequest.getUsernameOrEmail(),
                                                loginRequest.getPassword()));

                SecurityContextHolder.getContext().setAuthentication(authentication);

                String jwt = tokenProvider.generateToken(authentication);
                return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
        }

        @PostMapping("/signup")
        public ResponseEntity<?> registerUser(@RequestParam("name") String name,
                        @RequestParam("username") String username,
                        @RequestParam("email") String email,
                        @RequestParam("password") String password,
                        @RequestParam("photo") MultipartFile file) throws IOException {
                SignUpRequest signUpRequest = new SignUpRequest(name, username, email, password);
                if (userRepository.existsByUsername(signUpRequest.getUsername())) {
                        return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                                        HttpStatus.BAD_REQUEST);
                }

                if (userRepository.existsByEmail(signUpRequest.getEmail())) {
                        return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                                        HttpStatus.BAD_REQUEST);
                }

                User result = authService.signUp(signUpRequest, file);

                URI location = ServletUriComponentsBuilder
                                .fromCurrentContextPath().path("/users/{username}")
                                .buildAndExpand(result.getUsername()).toUri();

                return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
        }
}
