package com.valglobal.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

/**
 * Represents a product category offered by VAL Global.
 * Maps to the `products` table in val_global_db.
 */
@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Product name is required")
    @Size(max = 150)
    @Column(name = "name", nullable = false, length = 150)
    private String name;

    @NotBlank(message = "Category is required")
    @Size(max = 100)
    @Column(name = "category", nullable = false, length = 100)
    private String category;

    // e.g. "agri", "healthy", "masala", "lifestyle"
    @Column(name = "category_key", length = 50)
    private String categoryKey;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    // Comma-separated list of items in this category
    @Column(name = "items", columnDefinition = "TEXT")
    private String items;

    // Comma-separated tags e.g. "Farm Direct,Export Grade,Bulk Supply"
    @Column(name = "tags", length = 300)
    private String tags;

    @Column(name = "image_path", length = 300)
    private String imagePath;

    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;

    @Column(name = "created_at", updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
