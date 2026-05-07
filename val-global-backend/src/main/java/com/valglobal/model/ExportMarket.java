package com.valglobal.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

/**
 * Represents an active export market (Malaysia, UAE, Europe).
 * Maps to the `export_markets` table in val_global_db.
 */
@Entity
@Table(name = "export_markets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExportMarket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Market name is required")
    @Size(max = 100)
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Size(max = 10)
    @Column(name = "flag_emoji", length = 10)
    private String flagEmoji;

    @Column(name = "products_exported", length = 500)
    private String productsExported;

    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;

    @Column(name = "created_at", updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
