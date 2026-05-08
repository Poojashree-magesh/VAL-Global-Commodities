import SectionReveal, { StaggerReveal } from "./SectionReveal";

const quickLinks = [
  { label: "About Us", href: "#about" },
  { label: "Our Products", href: "#products" },
  { label: "Why Choose Us", href: "#why" },
  { label: "Our Process", href: "#process" },
  { label: "Founder's Note", href: "#founder" },
  { label: "Contact Us", href: "#contact" },
];
const productLinks = [
  "Fruits & Vegetables",
  "Rice Varieties",
  "Spices",
  "Masala Blends",
  "Poultry Products",
  "Cooking Oils",
  " Coconut & Coconut-Based Products",
  "Nutri-Cereals",
  "Natural Sweeteners",
  "Healthy Products",
  "Tea & Coffee",
  "Lifestyle Products",
];
const contactDetails = [
  { icon: "📍", text: "India" },
  { icon: "✉️", text: "info@valglobalcommodities.com" },
  {
    icon: "🌐",
    text: "www.valglobalcommodities.com",
    href: "https://www.valglobalcommodities.com",
  },
  {
    icon: "ig",
    text: "@valglobalcommodities",
    href: "https://www.instagram.com/valglobalcommodities",
  },
  { icon: "🕐", text: "Mon – Sat: 9:00 AM – 6:00 PM IST" },
];

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-root {
          background: var(--green-dark); color: rgba(255,255,255,0.62);
          padding: 80px 7% 0; position: relative; overflow: hidden;
        }
       
        .footer-topbar {
          position: absolute; top:0; left:0; right:0; height:3px;
          background: linear-gradient(90deg,#E8531A,#F5A800,#E8531A);
          background-size: 200% 100%;
          animation: footerBarSlide 4s linear infinite;
        }
        @keyframes footerBarSlide {
          0%   { background-position:0% 0%; }
          100% { background-position:200% 0%; }
        }

        .footer-grid {
          display:grid; grid-template-columns:1.8fr 1fr 1fr 1fr;
          gap:4rem; padding-bottom:4rem;
          border-bottom:1px solid rgba(255,255,255,0.07);
          position:relative; z-index:2;
        }

        /* Brand column */
        .footer-logo-wrap { display:flex; align-items:center; gap:14px; margin-bottom:1.5rem; }
        .footer-logo-img {
          height:56px; width:56px; object-fit:contain;
          /* Use transparent PNG — no background */
          background: transparent; border:none; padding:0; border-radius:0;
          filter: drop-shadow(0 2px 12px rgba(0,0,0,0.5));
          transition:filter 0.3s;
        }
        .footer-logo-img:hover { filter: drop-shadow(0 4px 20px rgba(245,168,0,0.45)); }
        .footer-brand-name { font-family:'Plus Jakarta Sans',sans-serif; font-size:1.1rem; font-weight:800; color:#fff; line-height:1.2; }
        .footer-brand-sub { font-size:0.65rem; font-weight:600; color:rgba(245,168,0,0.75); letter-spacing:0.15em; text-transform:uppercase; margin-top:2px; }
        .footer-tagline { font-size:0.9rem; line-height:1.88; color:rgba(255,255,255,0.46); margin-bottom:1.2rem; }
        .footer-slogan { font-family:'Playfair Display',serif; font-style:italic; font-size:0.95rem; color:rgba(245,168,0,0.72); margin-bottom:1.6rem; }
        .footer-market-tags { display:flex; flex-wrap:wrap; gap:8px; }
        .footer-mtag { background:rgba(245,168,0,0.1); border:1px solid rgba(245,168,0,0.22); padding:6px 14px; font-size:0.72rem; font-weight:700; color:rgba(245,168,0,0.82); letter-spacing:0.08em; text-transform:uppercase; transition:background 0.2s,border-color 0.2s; cursor:default; }
        .footer-mtag:hover { background:rgba(245,168,0,0.18); border-color:rgba(245,168,0,0.45); }

        /* Column headings */
        .footer-col-head { font-size:0.72rem; font-weight:800; color:var(--gold); letter-spacing:0.2em; text-transform:uppercase; margin-bottom:1.7rem; position:relative; padding-bottom:0.85rem; }
        .footer-col-head::after { content:''; position:absolute; bottom:0; left:0; width:24px; height:1.5px; background:linear-gradient(90deg,var(--orange),var(--gold)); }

        /* Links */
        .footer-links { list-style:none; display:flex; flex-direction:column; gap:0; }
        .footer-links li { border-bottom:1px solid rgba(255,255,255,0.04); }
        .footer-link { display:block; padding:10px 0; font-size:0.88rem; color:rgba(255,255,255,0.48); transition:color 0.2s,padding-left 0.22s; position:relative; }
        .footer-link::before { content:'→'; position:absolute; left:-16px; opacity:0; color:var(--orange); font-size:0.72rem; transition:opacity 0.2s,left 0.2s; }
        .footer-link:hover { color:#fff; padding-left:5px; }
        .footer-link:hover::before { opacity:1; left:-12px; }

        /* Contact column */
        .footer-contact-list { display:flex; flex-direction:column; gap:1.1rem; }
        .footer-contact-item { display:flex; align-items:flex-start; gap:12px; font-size:0.86rem; color:rgba(255,255,255,0.46); transition:color 0.2s; }
        .footer-contact-item:hover { color:rgba(255,255,255,0.78); }
        .footer-contact-icon { font-size:16px; flex-shrink:0; margin-top:1px; }

        /* Marquee */
        .footer-marquee-wrap { border-top:1px solid rgba(255,255,255,0.06); border-bottom:1px solid rgba(255,255,255,0.06); padding:15px 0; overflow:hidden; background:rgba(255,255,255,0.02); position:relative; z-index:2; }
        .footer-marquee-track { display:flex; width:max-content; animation:footerMarquee 35s linear infinite; font-size:0.72rem; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.2); }
        @keyframes footerMarquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .footer-marquee-item { display:flex; align-items:center; gap:2.5rem; padding:0 1.5rem; white-space:nowrap; }
        .footer-marquee-dot { color:rgba(245,168,0,0.4); }

        /* Bottom bar */
        .footer-bottom { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem; padding:1.5rem 0; position:relative; z-index:2; }
        .footer-copyright { font-size:0.78rem; color:rgba(255,255,255,0.26); letter-spacing:0.03em; }
        .footer-made-with { display:flex; align-items:center; gap:8px; font-size:0.74rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.27); }
        .footer-heart { color:var(--orange); animation:footerHeartbeat 2s ease-in-out infinite; display:inline-block; }
        @keyframes footerHeartbeat { 0%,100%{transform:scale(1)} 15%,45%{transform:scale(1.3)} 30%{transform:scale(1)} }
        .footer-back-top { display:flex; align-items:center; gap:8px; font-size:0.74rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.3); cursor:pointer; border:none; background:none; transition:color 0.2s; }
        .footer-back-top:hover { color:var(--gold); }
        .footer-arrow-up { width:34px; height:34px; border:1px solid rgba(255,255,255,0.12); display:flex; align-items:center; justify-content:center; font-size:1rem; transition:border-color 0.2s,transform 0.3s; }
        .footer-back-top:hover .footer-arrow-up { border-color:rgba(245,168,0,0.4); transform:translateY(-3px); }

        @media(max-width:1024px){ .footer-grid{grid-template-columns:1fr 1fr;gap:3rem;} }
        @media(max-width:600px){
          .footer-grid{grid-template-columns:1fr;gap:2rem;}
          .footer-root{padding:60px 5% 0;}
          .footer-logo-wrap { align-items:flex-start; gap:10px; }
          .footer-logo-img { height:48px; width:48px; }
          .footer-brand-name { font-size:0.95rem; }
          .footer-tagline { font-size:0.82rem; line-height:1.65; }
          .footer-links li { border-bottom:none; }
          .footer-link { padding:8px 0; font-size:0.84rem; }
          .footer-contact-item { font-size:0.8rem; }
          .footer-marquee-wrap { padding:10px 0; }
          .footer-marquee-track { font-size:0.64rem; letter-spacing:0.14em; }
          .footer-bottom{flex-direction:column;align-items:flex-start;gap:1rem;}
          .footer-copyright,.footer-made-with,.footer-back-top { font-size:0.7rem; }
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-topbar" aria-hidden="true" />
        {/* NO WATERMARK in footer (Quick Links / Products pages) */}

        <div className="footer-grid">
          {/* Brand column */}
          <SectionReveal className="reveal-left">
            <div className="footer-logo-wrap">
              {/* Transparent PNG logo */}
              <img
                src="/images/logo.webp"
                alt="VAL Global"
                className="footer-logo-img"
              />
              <div>
                <div className="footer-brand-name">VAL Global Commodities</div>
                <div className="footer-brand-sub">Authentic Indian Exports</div>
              </div>
            </div>
            <p className="footer-tagline">
              An India based export company connecting global buyers with
              authentic Indian agricultural and lifestyle products through
              transparent, direct sourcing — no intermediaries, pure quality.
            </p>
            <div className="footer-slogan">"Local Roots. Global Reach."</div>
            <div className="footer-market-tags">
              <span className="footer-mtag">🇲🇾 Malaysia</span>
              <span className="footer-mtag">🇦🇪 UAE</span>
              <span className="footer-mtag">🌍 Europe</span>
            </div>
          </SectionReveal>

          {/* Quick Links */}
          <SectionReveal className="reveal" delay="0.1s">
            <div className="footer-col-head">Quick Links</div>
            <ul className="footer-links">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="footer-link">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </SectionReveal>

          {/* Products */}
          <SectionReveal className="reveal" delay="0.2s">
            <div className="footer-col-head">Products</div>
            <ul className="footer-links">
              {productLinks.map((p) => (
                <li key={p}>
                  <a href="#products" className="footer-link">
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </SectionReveal>

          {/* Contact */}
          <SectionReveal className="reveal-right" delay="0.1s">
            <div className="footer-col-head">Contact</div>
            <div className="footer-contact-list">
              {contactDetails.map((c, i) => (
                <div key={i} className="footer-contact-item">
                  <span className="footer-contact-icon">
                    {c.icon === "ig" ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ display: "block" }}
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                          stroke="rgba(255,255,255,0.62)"
                          strokeWidth="1.8"
                          fill="none"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="4.5"
                          stroke="rgba(255,255,255,0.62)"
                          strokeWidth="1.8"
                          fill="none"
                        />
                        <circle
                          cx="17.5"
                          cy="6.5"
                          r="1"
                          fill="rgba(255,255,255,0.62)"
                        />
                      </svg>
                    ) : (
                      c.icon
                    )}
                  </span>
                  {c.href ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {c.text}
                    </a>
                  ) : (
                    <span>{c.text}</span>
                  )}
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>

        {/* Marquee divider */}
        <div className="footer-marquee-wrap">
          <div className="footer-marquee-track">
            {[1, 2].map((k) => (
              <div key={k} className="footer-marquee-item">
                <span>Farm Direct</span>
                <span className="footer-marquee-dot">✦</span>
                <span>Export Grade Quality</span>
                <span className="footer-marquee-dot">✦</span>
                <span>Chemical-Free</span>
                <span className="footer-marquee-dot">✦</span>
                <span>India</span>
                <span className="footer-marquee-dot">✦</span>
                <span>Malaysia · UAE · Europe</span>
                <span className="footer-marquee-dot">✦</span>
                <span>Local Roots. Global Reach.</span>
                <span className="footer-marquee-dot">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2025 VAL Global Commodities. All rights reserved.
          </div>
          <div className="footer-made-with">
            Crafted with <span className="footer-heart">❤</span> from India
          </div>
          <button
            className="footer-back-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span>Back to Top</span>
            <div className="footer-arrow-up">↑</div>
          </button>
        </div>
      </footer>
    </>
  );
}
