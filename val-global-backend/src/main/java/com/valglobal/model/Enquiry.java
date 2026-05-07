package com.valglobal.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

/**
 * Represents a buyer enquiry submitted via the Contact form.
 * Maps to the `enquiries` table in val_global_db.
 */
@Entity
@Table(name = "enquiries")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Enquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "First name is required")
    @Size(max = 100)
    @Column(name = "first_name", nullable = false, length = 100)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 100)
    @Column(name = "last_name", nullable = false, length = 100)
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Column(name = "email", nullable = false, length = 150)
    private String email;

    @Size(max = 20)
    @Column(name = "phone", length = 20)
    private String phone;

    @Size(max = 200)
    @Column(name = "company", length = 200)
    private String company;

    @Size(max = 100)
    @Column(name = "country", length = 100)
    private String country;

    @Column(name = "product_interest", length = 200)
    private String productInterest;

    @Column(name = "message", columnDefinition = "TEXT")
    private String message;

    @Column(name = "catalogue_requested", nullable = false)
    @Builder.Default
    private Boolean catalogueRequested = Boolean.FALSE;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 20)
    @Builder.Default
    private EnquiryStatus status = EnquiryStatus.NEW;

    @Column(name = "created_at", updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public enum EnquiryStatus {
        NEW, IN_PROGRESS, REPLIED, CLOSED
    }
}
