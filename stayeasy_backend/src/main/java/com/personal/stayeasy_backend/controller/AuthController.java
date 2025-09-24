package com.personal.stayeasy_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.personal.stayeasy_backend.dto.AuthenticationResponseDTO;
import com.personal.stayeasy_backend.dto.LoginRequestDTO;
import com.personal.stayeasy_backend.dto.RegisterRequestDTO;
import com.personal.stayeasy_backend.service.AuthenticationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthenticationService authenticationService;

    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDTO> loginUser(@Valid @RequestBody LoginRequestDTO loginRequest) {
        return ResponseEntity.ok(authenticationService.login(loginRequest));
    }
 
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponseDTO> registerUser(@Valid @RequestBody RegisterRequestDTO registerRequest) {
        return ResponseEntity.ok(authenticationService.register(registerRequest));
    }
}