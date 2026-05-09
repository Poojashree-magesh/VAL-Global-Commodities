import { useState, useEffect } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Why Us", href: "#why" },
  { label: "Process", href: "#process" },
  { label: "Founder", href: "#founder" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .nav-root {
          position: fixed; top: 0; left: 0; right: 0; z-index: 999;
          height: 74px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 5%;
          transition: background 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s;
        }
        .nav-root.scrolled {
          background: rgba(10, 28, 20, 0.94);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(245, 168, 0, 0.12);
        }
        /* Logo: always transparent bg, no box */
        .nav-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; flex-shrink: 0;
        }
        .nav-logo-img {
          height: 48px; width: auto;
          object-fit: contain;
          /* No background at all — pure transparent PNG */
          background: transparent;
          border: none; padding: 0; border-radius: 0;
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.45));
          transition: filter 0.3s, transform 0.3s;
        }
        .nav-logo:hover .nav-logo-img {
          filter: drop-shadow(0 4px 16px rgba(245,168,0,0.5));
          transform: translateY(-1px);
        }
        .nav-brand-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.92rem; font-weight: 800;
          color: #fff; line-height: 1.2; letter-spacing: -0.01em;
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
        }
        .nav-brand-sub {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.6rem; font-weight: 600;
          color: rgba(245,168,0,0.85);
          letter-spacing: 0.16em; text-transform: uppercase; margin-top: 1px;
        }
        .nav-links { display: flex; gap: 2.2rem; list-style: none; }
        .nav-link {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.82rem; font-weight: 700;
          color: rgba(25,25,25,0.82);
          letter-spacing: 0.08em; text-transform: uppercase;
          transition: color 0.2s; text-decoration: none;
          position: relative; padding-bottom: 3px;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 1.5px; background: #F5A800;
          transform: scaleX(0); transition: transform 0.25s ease; transform-origin: left;
        }
        .nav-link:hover { color: #fff; }
        .nav-link:hover::after { transform: scaleX(1); }
        .nav-cta {
          background: linear-gradient(135deg, #E8531A, #F5A800);
          color: #fff; padding: 11px 24px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.78rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          text-decoration: none; white-space: nowrap;
          box-shadow: 0 4px 16px rgba(232,83,26,0.45);
          transition: opacity 0.2s, transform 0.15s;
          border: none; cursor: pointer;
        }
        .nav-cta:hover { opacity: 0.88; transform: translateY(-1px); }
        .ham-btn {
          display: none; flex-direction: column; gap: 5px;
          cursor: pointer; background: none; border: none; padding: 6px;
        }
        .ham-btn span {
          width: 24px; height: 1.5px; background: #fff;
          border-radius: 1px; display: block; transition: 0.3s;
        }
        .mobile-menu {
          position: fixed; top: 74px; left: 0; right: 0; z-index: 998;
          background: rgba(8,22,16,0.98); backdrop-filter: blur(20px);
          padding: 1.6rem 5%; display: flex; flex-direction: column; gap: 0;
          border-bottom: 1px solid rgba(245,168,0,0.1);
        }
        .mobile-link {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.05rem; font-weight: 600;
          color: rgba(255,255,255,0.82); text-decoration: none;
          padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .mobile-link:last-child { border-bottom: none; padding-top: 20px; color: #F5A800; }
        @media(max-width:860px){
          .nav-links { display: none; }
          .nav-cta { display: none; }
          .ham-btn { display: flex; }
        }
        @media(max-width:420px){
          .nav-root { height: 66px; padding: 0 4%; }
          .mobile-menu { top: 66px; padding: 1.2rem 4%; }
          .nav-logo-img { height: 50px; margin-top: 3.5px; }
          .nav-brand-name { font-size: 0.82rem; margin-top: 8px; }
          .nav-brand-sub { font-size: 0.62rem; letter-spacing: 0.12em; }
          .mobile-link { font-size: 0.96rem; padding: 12px 0; }
        }
      `}</style>

      <nav className={`nav-root${scrolled ? " scrolled" : ""}`}>
        <a href="#" className="nav-logo">
          {/* Transparent PNG — no background wrapper at all */}
          <img
            src="/images/logo.webp"
            alt="VAL Global Commodities"
            className="nav-logo-img"
          />
          <div>
            <div className="nav-brand-name">VAL Global Commodities</div>
            <div className="nav-brand-sub">India</div>
          </div>
        </a>

        <ul className="nav-links">
          {navLinks.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="nav-link">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="nav-cta">
          Request Catalogue
        </a>

        <button className="ham-btn" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            Request Catalogue →
          </a>
        </div>
      )}
    </>
  );
}
