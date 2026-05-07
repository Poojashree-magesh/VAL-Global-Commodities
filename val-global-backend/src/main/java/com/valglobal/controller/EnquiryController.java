package com.valglobal.controller;

import com.valglobal.dto.ApiResponse;
import com.valglobal.dto.EnquiryDTO;
import com.valglobal.model.Enquiry;
import com.valglobal.model.Enquiry.EnquiryStatus;
import com.valglobal.service.EnquiryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/enquiries")
@RequiredArgsConstructor
@Slf4j
public class EnquiryController {

    private final EnquiryService enquiryService;

    /**
     * POST /api/enquiries
     * Called by React Contact form when user submits enquiry.
     */
    @PostMapping
    public ResponseEntity<ApiResponse<Enquiry>> submitEnquiry(
            @Valid @RequestBody EnquiryDTO dto) {

        Enquiry saved = enquiryService.submitEnquiry(dto);
        String successMessage = Boolean.TRUE.equals(dto.getCatalogueRequested())
                ? "Catalogue requested successfully."
                : "Enquiry submitted successfully. We will contact you within 24 hours.";
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(successMessage, saved));
    }

    /**
     * GET /api/enquiries
     * Returns all enquiries — for admin dashboard.
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<Enquiry>>> getAllEnquiries() {
        List<Enquiry> list = enquiryService.getAllEnquiries();
        return ResponseEntity.ok(ApiResponse.success("Enquiries fetched", list));
    }

    /**
     * GET /api/enquiries/{id}
     * Get single enquiry by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Enquiry>> getById(@PathVariable Long id) {
        return enquiryService.getEnquiryById(id)
                .map(e -> ResponseEntity.ok(ApiResponse.success("Enquiry found", e)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("Enquiry not found with ID: " + id)));
    }

    /**
     * GET /api/enquiries/status/{status}
     * Filter enquiries by status: NEW | IN_PROGRESS | REPLIED | CLOSED
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<ApiResponse<List<Enquiry>>> getByStatus(
            @PathVariable EnquiryStatus status) {
        List<Enquiry> list = enquiryService.getEnquiriesByStatus(status);
        return ResponseEntity.ok(ApiResponse.success("Filtered enquiries", list));
    }

    /**
     * PUT /api/enquiries/{id}/status
     * Update enquiry status — admin action.
     * Body: { "status": "REPLIED" }
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Enquiry>> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        EnquiryStatus newStatus = EnquiryStatus.valueOf(body.get("status").toUpperCase());
        return enquiryService.updateStatus(id, newStatus)
                .map(e -> ResponseEntity.ok(ApiResponse.success("Status updated to " + newStatus, e)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("Enquiry not found")));
    }

    /**
     * DELETE /api/enquiries/{id}
     * Delete an enquiry.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEnquiry(@PathVariable Long id) {
        if (enquiryService.deleteEnquiry(id)) {
            return ResponseEntity.ok(ApiResponse.success("Enquiry deleted", null));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error("Enquiry not found"));
    }

    /**
     * GET /api/enquiries/stats
     * Returns dashboard summary counts.
     */
    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getStats() {
        Map<String, Long> stats = Map.of(
                "total", enquiryService.countTotal(),
                "newEnquiries", enquiryService.countNewEnquiries()
        );
        return ResponseEntity.ok(ApiResponse.success("Stats fetched", stats));
    }
}
