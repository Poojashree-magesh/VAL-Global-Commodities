import { useState } from "react";
import SectionReveal from "./SectionReveal";
import { submitEnquiry } from "../services/api";

const contactInfo = [
  { icon: "📍", label: "Location", value: "India" },
  { icon: "✉️", label: "Email", value: "info@valglobalcommodities.com" },
  { icon: "🌍", label: "Export Markets", value: "Malaysia · UAE · Europe" },
  {
    icon: "🏭",
    label: "Products",
    value: "8 Categories · 40+ Products",
    href: "#products",
  },
];
const productOptions = [
  "Fruits & Vegetables",
  "Rice Varieties",
  "Spices",
  "Masala Blends",
  "Poultry Products",
  "Cooking Oils",
  " Coconut & Coconut-Based Products",
  "Nutri-Cereals / Millets",
  "Natural Sweeteners",
  "Healthy Products",
  "Tea & Coffee",
  "Lifestyle Products",
  "Multiple Categories",
];
const countryOptions = [
  "Malaysia",
  "UAE",
  "United Kingdom",
  "Germany",
  "France",
  "Other Europe",
  "Other",
];
const phoneCodes = [
  { code: "+91", label: "India (+91)", length: 10 },
  { code: "+971", label: "UAE (+971)", length: 9 },
  { code: "+60", label: "Malaysia (+60)", length: 9 },
  { code: "+44", label: "UK (+44)", length: 10 },
  { code: "+49", label: "Germany (+49)", length: 10 },
];
const INIT = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  phoneCode: "+91",
  company: "",
  country: "",
  product: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(INIT);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [errMsg, setErrMsg] = useState("");
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!/^[A-Z][a-zA-Z]*$/.test(form.firstName)) {
      newErrors.firstName = "First letter must be uppercase";
    }

    if (!/^[A-Z][a-zA-Z]*$/.test(form.lastName)) {
      newErrors.lastName = "First letter must be uppercase";
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email address";
    }

    const selectedCode = phoneCodes.find((c) => c.code === form.phoneCode);
    if (selectedCode && form.phone.length !== selectedCode.length) {
      newErrors.phone = `Must be ${selectedCode.length} digits`;
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setStatus("loading");
    setErrMsg("");

    try {
      const result = await submitEnquiry({
        ...form,
        phone: form.phoneCode + " " + form.phone,
        productInterest: form.product,
      });

      if (result.success) {
        setStatus("success");
        setForm(INIT);
      } else {
        setStatus("error");
        setErrMsg(result.message || "Submission failed.");
      }
    } catch {
      setStatus("error");
      setErrMsg("Could not connect to server. Please try again.");
    }
  };

  return (
    <>
      <style>{`
        /* CTA Banner — NO WATERMARK */
        .cta-banner { position:relative; overflow:hidden; background:linear-gradient(135deg,#0a1e14 0%,#1F4D3B 55%,#8B5E3C 100%); padding:100px 7%; text-align:center; }
        .cta-banner::before { content:''; position:absolute; inset:0; background-image:radial-gradient(circle,rgba(245,168,0,0.05) 1px,transparent 1px); background-size:40px 40px; pointer-events:none; }
        .cta-inner { position:relative; z-index:2; }
        .cta-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(2.3rem,4.2vw,3.6rem); font-weight:900; letter-spacing:-0.03em; color:#fff; margin-bottom:1rem; line-height:1.05; }
        .cta-desc { color:rgba(255,255,255,0.62); font-size:1.1rem; margin-bottom:2.5rem; max-width:500px; margin-left:auto; margin-right:auto; line-height:1.85; }
        .cta-btns { display:flex; justify-content:center; gap:1rem; flex-wrap:wrap; }
        /* Contact section — NO WATERMARK */
        .contact-brand { display: flex; align-items: center; justify-content: flex-start; gap: 24px; margin-top: 40px; min-height: 260px; }
        .contact-logo { width: 560px; max-width: 100%; }
        .contact-text { display: flex; flex-direction: column; }
        .contact-brand-title { font-size: 1.2rem; font-weight: 700; color: #1F4D3B; margin-bottom: 5px; }
        .contact-brand-tagline { font-size: 2.2rem; color: #555; line-height: 1.4; font-weight: 300; font-family: 'Playfair Display', serif; font-style: italic; letter-spacing: -0.01em; }
        .contact-section { padding:100px 7%; background:#fff; position:relative; overflow:hidden; }
        .contact-head { text-align:center; max-width:540px; margin:0 auto 4rem; position:relative; z-index:2; }
        .contact-grid { display:grid; grid-template-columns:1.2fr 1.2fr; gap:5rem; align-items:start; position:relative; z-index:2; }
        .contact-info-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:1.5rem; font-weight:800; color:#1F4D3B; margin-bottom:1rem; letter-spacing:-0.02em; }
        .contact-info-text { font-size:1rem; color:#555; line-height:1.9; margin-bottom:2rem; }
        .contact-brand { margin-bottom: 0; }
        .contact-logo { width: 320px; }
        .contact-brand-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.3rem; font-weight: 800; color: #1F4D3B; margin-bottom: 0.4rem; }
        .contact-brand-tagline { font-size: 2rem; color: #888; line-height: 1.45; font-family: 'Playfair Display', serif; font-style: italic; }
        .info-items { display:flex; flex-direction:column; gap:1.3rem; }
        .info-item { display:flex; align-items:flex-start; gap:16px; transition:transform 0.2s; }
        .info-item:hover { transform:translateX(5px); }
        .info-item-link { text-decoration:none; color:inherit; cursor:pointer; }
        .info-item-link .info-lbl { color:#E8531A; transition:color 0.2s; }
        .info-item-link:hover .info-lbl { color:#F5A800; }
        .info-item-link .info-val { color:#E8531A; opacity:0.8; transition:color 0.2s; }
        .info-item-link:hover .info-val { color:#E8531A; opacity:1; }
        .info-ico { width:46px; height:46px; flex-shrink:0; background:rgba(232,83,26,0.07); display:flex; align-items:center; justify-content:center; font-size:20px; }
        .info-lbl { font-family:'Plus Jakarta Sans',sans-serif; font-size:0.76rem; font-weight:800; color:#1F4D3B; margin-bottom:3px; text-transform:uppercase; letter-spacing:0.1em; }
        .info-val { font-size:0.92rem; color:#555; margin:0; }
        .form-wrap { background:#F5F3EF; padding:3rem; }
        .form-head { font-family:'Plus Jakarta Sans',sans-serif; font-size:1.05rem; font-weight:800; color:#1F4D3B; margin-bottom:2rem; padding-bottom:1.1rem; border-bottom:1px solid #e0dbd4; }
        .form-row-grid { display:grid; grid-template-columns:1fr; gap:1rem; }
        .name-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;}
        @media(max-width:600px){ .name-row { grid-template-columns: 1fr; }}
        .fgroup { display:flex; flex-direction:column; gap:7px; margin-bottom:1.1rem; }
        .flabel { font-family:'Plus Jakarta Sans',sans-serif; font-size:0.75rem; font-weight:800; color:#2a2a2a; letter-spacing:0.1em; text-transform:uppercase; }
        .finput { padding:13px 15px; border:1.5px solid #d5d0c9; background:#fff; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.95rem; color:#2a2a2a; outline:none; transition:border-color 0.2s,box-shadow 0.2s; width:100%; }
        .finput:focus { border-color:#E8531A; box-shadow:0 0 0 3px rgba(232,83,26,0.08); }
        .fsubmit { width:100%; padding:16px; background:linear-gradient(135deg,#E8531A,#F5A800); color:#fff; border:none; cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.92rem; font-weight:800; letter-spacing:0.1em; text-transform:uppercase; margin-top:0.6rem; box-shadow:0 4px 20px rgba(232,83,26,0.3); transition:opacity 0.2s,transform 0.2s; }
        .fsubmit:hover { opacity:0.88; transform:translateY(-1px); }
        .fsubmit:disabled { opacity:0.6; cursor:not-allowed; transform:none; }
        .msg-success { background:#e8f5e9; border-left:3px solid #2e7d32; padding:15px 17px; margin-bottom:1.5rem; font-size:0.95rem; color:#2e7d32; font-weight:600; }
        .msg-error { background:#fdecea; border-left:3px solid #c62828; padding:15px 17px; margin-bottom:1.5rem; font-size:0.95rem; color:#c62828; font-weight:600; }
        .finput::placeholder { color: #aaa; font-weight: 400; }
        @media(max-width:1024px){ .contact-grid{grid-template-columns:1fr;gap:3rem;} }
        @media(max-width:600px){ .form-row-grid{grid-template-columns:1fr;} .cta-title{font-size:clamp(1.9rem,7vw,2.6rem);} .form-wrap{padding:2rem;} }
        @media(max-width:600px){ .name-row { grid-template-columns: 1fr; }}
      `}</style>

      {/* CTA Banner — NO WATERMARK */}
      <section className="cta-banner">
        <div className="cta-inner">
          <SectionReveal className="reveal">
            <h2 className="cta-title">
              Let's Build a Reliable
              <br />
              Supply Partnership
            </h2>
            <p className="cta-desc">
              Ready to support distributors, wholesalers, and retail brands with
              consistent supply and export-grade quality — every time.
            </p>
            <div className="cta-btns">
              <a href="#contact" className="btn-gold">
                Request Product Catalogue
              </a>
              <a href="#contact" className="btn-outline">
                Get In Touch
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Contact Form — NO WATERMARK */}
      <section className="contact-section" id="contact">
        <div className="contact-head">
          <SectionReveal className="reveal">
            <div className="eyebrow" style={{ justifyContent: "center" }}>
              Contact Us
            </div>
            <h2 className="stitle" style={{ textAlign: "center" }}>
              Start a Conversation
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                color: "#666",
                lineHeight: 1.85,
                textAlign: "center",
                marginTop: "0.5rem",
              }}
            >
              Fill in your details and our team will reach out within 24 hours.
            </p>
          </SectionReveal>
        </div>

        <div className="contact-grid">
          <SectionReveal className="reveal-left">
            <h3 className="contact-info-title">
              Ready to Source Authentic Indian Products?
            </h3>
            <p className="contact-info-text">
              We support distributors, wholesalers, and retail brands with
              consistent, export-grade supply. Long-term partnerships are our
              priority.
            </p>
            <div className="info-items">
              {contactInfo.map((c, i) => {
                const inner = (
                  <>
                    <div className="info-ico">{c.icon}</div>
                    <div>
                      <div className="info-lbl">{c.label}</div>
                      <p className="info-val">{c.value}</p>
                    </div>
                  </>
                );
                return c.href ? (
                  <a key={i} href={c.href} className="info-item info-item-link">
                    {inner}
                  </a>
                ) : (
                  <div key={i} className="info-item">
                    {inner}
                  </div>
                );
              })}
              <div className="contact-brand">
                <img
                  src="/images/logo-transparent.webp"
                  className="contact-logo"
                />

                <div className="contact-text">
                  <p className="contact-brand-tagline">
                    Local Roots.
                    <br />
                    Global Reach.
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>
          <SectionReveal className="reveal-right" delay="0.1s">
            <form onSubmit={handleSubmit} className="form-wrap">
              <div className="form-head">📩 Send an Enquiry</div>
              {status === "success" && (
                <div className="msg-success">
                  ✅ Thank you! Your enquiry has been received. We'll reach out
                  within 24 hours.
                </div>
              )}
              {status === "error" && (
                <div className="msg-error">⚠️ {errMsg}</div>
              )}
              {/* NAME ROW */}
              <div className="name-row">
                <Field
                  label="First Name"
                  name="firstName"
                  placeholder="John"
                  value={form.firstName}
                  onChange={handle}
                  error={errors.firstName}
                  required
                />

                <Field
                  label="Last Name"
                  name="lastName"
                  placeholder="Smith"
                  value={form.lastName}
                  onChange={handle}
                  error={errors.lastName}
                  required
                />
              </div>

              {/* EMAIL ROW (SEPARATE) */}
              <div className="form-row-grid">
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handle}
                  error={errors.email}
                  required
                />
              </div>
              <div className="form-row-grid">
                <div className="fgroup">
                  <label className="flabel">Phone</label>

                  <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                    <select
                      name="phoneCode"
                      value={form.phoneCode}
                      onChange={handle}
                      className="finput"
                      style={{ minWidth: "140px" }}
                    >
                      {phoneCodes.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.label}
                        </option>
                      ))}
                    </select>

                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handle}
                      placeholder="Phone number"
                      className="finput"
                      style={{ width: "100%" }}
                    />
                  </div>

                  {errors.phone && (
                    <span style={{ color: "red", fontSize: "0.8rem" }}>
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>
              <Field
                label="Company / Organisation"
                name="company"
                placeholder="Your company name"
                value={form.company}
                onChange={handle}
              />
              <div className="form-row-grid">
                <SelectField
                  label="Country"
                  name="country"
                  options={countryOptions}
                  value={form.country}
                  onChange={handle}
                />
                <SelectField
                  label="Product Interest"
                  name="product"
                  options={productOptions}
                  value={form.product}
                  onChange={handle}
                />
              </div>
              <div className="fgroup">
                <label className="flabel">Message</label>
                <textarea
                  name="message"
                  placeholder="Tell us about your requirements — quantities, frequency, packaging..."
                  value={form.message}
                  onChange={handle}
                  className="finput"
                  style={{ minHeight: 110, resize: "vertical" }}
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="fsubmit"
              >
                {status === "loading" ? "Submitting..." : "Submit Enquiry →"}
              </button>
            </form>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  error,
}) {
  return (
    <div className="fgroup">
      <label className="flabel">
        {label}
        {required && <span style={{ color: "#E8531A" }}> *</span>}
      </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="finput"
      />

      {error && (
        <span style={{ color: "red", fontSize: "0.8rem" }}>{error}</span>
      )}
    </div>
  );
}
function SelectField({ label, name, options, value, onChange }) {
  return (
    <div className="fgroup">
      <label className="flabel">{label}</label>
      <select name={name} value={value} onChange={onChange} className="finput">
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
