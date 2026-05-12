/**
 * VAL Global Commodities — API Service
 * Connects React frontend to Spring Boot backend at localhost:8080
 */

const BASE_URL = "https://val-global-commodities-production.up.railway.app/api";

// ─── Enquiries ─────────────────────────────────────────────

/**
 * Submit contact form enquiry.
 * Called from Contact.jsx on form submission.
 */
export const submitEnquiry = async (formData) => {
  const response = await fetch(`${BASE_URL}/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to submit enquiry");
  }
  return response.json();
};

/**
 * Get all enquiries — admin use.
 */
export const getAllEnquiries = async () => {
  const response = await fetch(`${BASE_URL}/enquiries`);
  return response.json();
};

/**
 * Update enquiry status.
 * @param {number} id - Enquiry ID
 * @param {string} status - 'NEW' | 'IN_PROGRESS' | 'REPLIED' | 'CLOSED'
 */
export const updateEnquiryStatus = async (id, status) => {
  const response = await fetch(`${BASE_URL}/enquiries/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return response.json();
};

/**
 * Get enquiry stats for dashboard.
 */
export const getEnquiryStats = async () => {
  const response = await fetch(`${BASE_URL}/enquiries/stats`);
  return response.json();
};

// ─── Products ──────────────────────────────────────────────

/**
 * Get all active products.
 */
export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  return response.json();
};

/**
 * Get products filtered by category key.
 * @param {string} categoryKey - 'agri' | 'healthy' | 'masala' | 'lifestyle'
 */
export const getProductsByCategory = async (categoryKey) => {
  const response = await fetch(`${BASE_URL}/products/category/${categoryKey}`);
  return response.json();
};
