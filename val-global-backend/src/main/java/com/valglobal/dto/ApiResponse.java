package com.valglobal.dto;

import lombok.*;

/**
 * Standard API response wrapper used across all controllers.
 *
 * Example success:
 *   { "success": true, "message": "Enquiry submitted", "data": { ... } }
 *
 * Example error:
 *   { "success": false, "message": "Validation failed", "data": null }
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiResponse<T> {

    private boolean success;
    private String message;
    private T data;

    public static <T> ApiResponse<T> success(String message, T data) {
        return ApiResponse.<T>builder()
                .success(true)
                .message(message)
                .data(data)
                .build();
    }

    public static <T> ApiResponse<T> error(String message) {
        return ApiResponse.<T>builder()
                .success(false)
                .message(message)
                .data(null)
                .build();
    }
}
