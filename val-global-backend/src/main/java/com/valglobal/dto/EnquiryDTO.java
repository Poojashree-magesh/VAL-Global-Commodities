package com.valglobal.dto;

import jakarta.validation.constraints.*;
import lombok.*;

/**
 * DTO received from the React Contact form.
 * Validated before being saved as an Enquiry entity.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnquiryDTO {

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email")
    private String email;

    @NotBlank(message = "Phone number is required")
    private String phone;

    @NotBlank(message = "Company is required")
    private String company;

    @NotBlank(message = "Country is required")
    private String country;

    @NotBlank(message = "Product interest is required")
    private String productInterest;

    @NotBlank(message = "Message is required")
    private String message;

    @Builder.Default
    private Boolean catalogueRequested = Boolean.FALSE;
}
