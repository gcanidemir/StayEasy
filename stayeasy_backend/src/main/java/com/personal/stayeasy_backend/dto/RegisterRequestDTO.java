package com.personal.stayeasy_backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterRequestDTO {

    @NotBlank(message = "Full name is required")
    String fullName;
    
    @NotBlank(message = "Email is required")
    String email;

    @NotBlank(message = "Password is required")
    String password;

    @NotBlank(message = "Role is required")
    String role;
}
