package com.valglobal.repository;

import com.valglobal.model.Enquiry;
import com.valglobal.model.Enquiry.EnquiryStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {

    // Find enquiries by status
    List<Enquiry> findByStatusOrderByCreatedAtDesc(EnquiryStatus status);

    // Find enquiries by country
    List<Enquiry> findByCountryOrderByCreatedAtDesc(String country);

    // Find enquiries by product interest
    List<Enquiry> findByProductInterestContainingIgnoreCase(String productInterest);

    // Find enquiries submitted within a date range
    List<Enquiry> findByCreatedAtBetween(LocalDateTime from, LocalDateTime to);

    // Count by status — useful for admin dashboard
    long countByStatus(EnquiryStatus status);

    // Get all enquiries sorted by newest first
    List<Enquiry> findAllByOrderByCreatedAtDesc();

    // Check if an email has already submitted an enquiry
    boolean existsByEmail(String email);

    // Count total enquiries by country
    @Query("SELECT e.country, COUNT(e) FROM Enquiry e GROUP BY e.country")
    List<Object[]> countByCountry();
}
