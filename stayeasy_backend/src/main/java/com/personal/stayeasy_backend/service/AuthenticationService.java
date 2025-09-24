package com.personal.stayeasy_backend.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.personal.stayeasy_backend.Enums.UserRole;
import com.personal.stayeasy_backend.dto.AuthenticationResponseDTO;
import com.personal.stayeasy_backend.dto.LoginRequestDTO;
import com.personal.stayeasy_backend.dto.RegisterRequestDTO;
import com.personal.stayeasy_backend.entity.User;
import com.personal.stayeasy_backend.repository.UserRepository;
import com.personal.stayeasy_backend.security.DefaultUserDetails;
import com.personal.stayeasy_backend.security.DefaultUserDetailsService;
import com.personal.stayeasy_backend.security.JwtService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final DefaultUserDetailsService defaultUserDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public AuthenticationService(AuthenticationManager authenticationManager, JwtService jwtService, DefaultUserDetailsService defaultUserDetailsService, PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.defaultUserDetailsService = defaultUserDetailsService;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public AuthenticationResponseDTO login(LoginRequestDTO loginRequest) {
        UserDetails userDetails = authenticate(loginRequest.getEmail(), loginRequest.getPassword());


        AuthenticationResponseDTO authenticationResponse = AuthenticationResponseDTO.builder()
                .token(jwtService.generateToken(userDetails.getUsername()))
                .build();

        if (userDetails instanceof DefaultUserDetails) {
            DefaultUserDetails defaultUserDetails = (DefaultUserDetails) userDetails;
            authenticationResponse.setFullName(defaultUserDetails.getFullName());
            authenticationResponse.setUserId(defaultUserDetails.getId());
            authenticationResponse.setRole(defaultUserDetails.getRole().name());
        }

        log.info("\nLogged User Info:\nToken: {}\nID: {}\nName: {}\nRole: {}", authenticationResponse.getToken(), authenticationResponse.getUserId(), authenticationResponse.getFullName(), authenticationResponse.getRole());

         return authenticationResponse;
    }

    public AuthenticationResponseDTO register (RegisterRequestDTO registerRequest) {
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new IllegalArgumentException("User with this email already exists");
        }

        User user = User.builder()
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .fullName(registerRequest.getFullName())
                .role(UserRole.valueOf(registerRequest.getRole()))
                .build();

        userRepository.save(user);

        UserDetails userDetails = new DefaultUserDetails(user);

        AuthenticationResponseDTO authenticationResponse = AuthenticationResponseDTO.builder()
                .token(jwtService.generateToken(userDetails.getUsername()))
                .build();

        if (userDetails instanceof DefaultUserDetails) {
            DefaultUserDetails defaultUserDetails = (DefaultUserDetails) userDetails;
            authenticationResponse.setFullName(defaultUserDetails.getFullName());
            authenticationResponse.setUserId(defaultUserDetails.getId());
            authenticationResponse.setRole(defaultUserDetails.getRole().name());
        }

        log.info("\nRegistered User Info:\nToken: {}\nID: {}\nName: {}\nRole: {}", authenticationResponse.getToken(), authenticationResponse.getUserId(), authenticationResponse.getFullName(), authenticationResponse.getRole());

        return authenticationResponse;
    }

    public UserDetails authenticate(String email, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password)); // Throws AuthenticationException if authentication fails
        return defaultUserDetailsService.loadUserByUsername(email);
    }

    public UserDetails validate(String token) {
        String email = jwtService.extractUsername(token);
        return defaultUserDetailsService.loadUserByUsername(email);
    }

}