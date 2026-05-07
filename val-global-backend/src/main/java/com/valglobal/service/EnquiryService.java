package com.valglobal.service;

import com.valglobal.dto.EnquiryDTO;
import com.valglobal.model.Enquiry;
import com.valglobal.model.Enquiry.EnquiryStatus;
import com.valglobal.repository.EnquiryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;

import jakarta.mail.internet.MimeMessage;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class EnquiryService {

    private final EnquiryRepository enquiryRepository;
    private final JavaMailSender mailSender;

    @Value("${app.mail.to:info@valglobalcommodities.com}")
    private String notificationEmail;

    @Value("${app.mail.enabled:false}")
    private boolean mailEnabled;

    @Value("${app.mail.from:}")
    private String mailFrom;

    /**
     * Save a new enquiry and send email notification
     */
    public Enquiry submitEnquiry(EnquiryDTO dto) {
        log.info("New enquiry received from: {} {}", dto.getFirstName(), dto.getEmail());

        Enquiry enquiry = Enquiry.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .company(dto.getCompany())
                .country(dto.getCountry())
                .productInterest(dto.getProductInterest())
                .message(dto.getMessage())
                .catalogueRequested(Boolean.TRUE.equals(dto.getCatalogueRequested()))
                .status(EnquiryStatus.NEW)
                .build();

        Enquiry saved = enquiryRepository.save(enquiry);
        log.info("Enquiry saved with ID: {}", saved.getId());

        if (!mailEnabled) {
            log.info("Email notifications are disabled. Skipping SMTP send for enquiry ID {}", saved.getId());
            return saved;
        }

        if (!StringUtils.hasText(mailFrom) || !StringUtils.hasText(notificationEmail)) {
            log.warn("Email notifications are enabled, but mail addresses are incomplete. from='{}', to='{}'", mailFrom, notificationEmail);
            return saved;
        }

        // ================= EMAIL SENDING =================
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();

            // true = multipart (safer for HTML emails)
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            // ✅ MUST match your Titan SMTP username
            helper.setFrom(mailFrom);

            // ✅ Admin inbox (Titan mailbox)
            helper.setTo(notificationEmail);

            // ✅ Reply goes to customer
            helper.setReplyTo(saved.getEmail());

            String enquiryType = Boolean.TRUE.equals(saved.getCatalogueRequested())
                    ? "Catalogue Request"
                    : "General Enquiry";
            helper.setSubject(enquiryType + " - " + saved.getFirstName() + " " + saved.getLastName());

            String content =
                    "<h2>New Enquiry Received</h2>" +
                    "<p><b>Request Type:</b> " + enquiryType + "</p>" +
                    "<p><b>Name:</b> " + saved.getFirstName() + " " + saved.getLastName() + "</p>" +
                    "<p><b>Email:</b> " + saved.getEmail() + "</p>" +
                    "<p><b>Phone:</b> " + saved.getPhone() + "</p>" +
                    "<p><b>Company:</b> " + saved.getCompany() + "</p>" +
                    "<p><b>Country:</b> " + saved.getCountry() + "</p>" +
                    "<p><b>Product Interest:</b> " + saved.getProductInterest() + "</p>" +
                    "<p><b>Message:</b><br/>" + saved.getMessage() + "</p>";

            helper.setText(content, true); // HTML email

            mailSender.send(mimeMessage);

            log.info("Email sent successfully to {}", notificationEmail);

        } catch (Exception e) {
            log.error("Error sending email", e);
        }
        // =================================================

        return saved;
    }

    public List<Enquiry> getAllEnquiries() {
        return enquiryRepository.findAllByOrderByCreatedAtDesc();
    }

    public Optional<Enquiry> getEnquiryById(Long id) {
        return enquiryRepository.findById(id);
    }

    public List<Enquiry> getEnquiriesByStatus(EnquiryStatus status) {
        return enquiryRepository.findByStatusOrderByCreatedAtDesc(status);
    }

    public Optional<Enquiry> updateStatus(Long id, EnquiryStatus newStatus) {
        return enquiryRepository.findById(id).map(enquiry -> {
            enquiry.setStatus(newStatus);
            return enquiryRepository.save(enquiry);
        });
    }

    public boolean deleteEnquiry(Long id) {
        if (enquiryRepository.existsById(id)) {
            enquiryRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public long countNewEnquiries() {
        return enquiryRepository.countByStatus(EnquiryStatus.NEW);
    }

    public long countTotal() {
        return enquiryRepository.count();
    }
}
