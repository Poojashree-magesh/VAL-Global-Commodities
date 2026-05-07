import { useEffect, useRef } from "react";

export default function Hero() {
  const tagRef = useRef(null);
  const headRef = useRef(null);
  const subRef = useRef(null);
  const btnsRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const items = [
      { el: tagRef.current, delay: 100 },
      { el: headRef.current, delay: 260 },
      { el: subRef.current, delay: 420 },
      { el: btnsRef.current, delay: 560 },
      { el: logoRef.current, delay: 200, fromRight: true },
    ];
    items.forEach(({ el, delay, fromRight }) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = fromRight
        ? "translateX(40px) scale(0.92)"
        : "translateY(32px)";
      setTimeout(() => {
        el.style.transition =
          "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)";
        el.style.opacity = "1";
        el.style.transform = "none";
      }, delay);
    });
  }, []);

  return (
    <>
      <style>{`
        .hero-root {
          position: relative; min-height: 100vh;
          display: flex; align-items: center;
          overflow: hidden; padding-top: 74px; padding-bottom: 60px;
        }
        .hero-bg {
          position: absolute; inset: 0;
          background: url('/images/harvest.webp') center/cover no-repeat;
          z-index: 0;
        }
        .hero-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(
            110deg,
            rgba(6,18,12,0.92) 0%,
            rgba(10,28,20,0.85) 35%,
            rgba(10,28,20,0.55) 65%,
            rgba(10,28,20,0.3) 100%
          );
        }
        .hero-noise {
          position: absolute; inset: 0; z-index: 2; opacity: 0.022;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px; pointer-events: none;
        }

        /* Two-column hero layout */
        .hero-inner {
          position: relative; z-index: 4;
          width: 100%; padding: 0 7%;
          display: flex; align-items: center;
          justify-content: space-between; gap: 3rem;
        }

        /* Left: text content */
        .hero-left { flex: 1; max-width: 620px; }

        .hero-sup {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.75rem; font-weight: 700; letter-spacing: 0.26em;
          text-transform: uppercase; color: #F5A800; margin-bottom: 2rem;
        }
        .hero-sup-dot {
          width: 7px; height: 7px; background: #F5A800;
          border-radius: 50%; flex-shrink: 0;
          animation: heroPulse 2.2s ease-in-out infinite;
        }
        @keyframes heroPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.45; transform:scale(0.65); }
        }

        .hero-h1 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(3rem, 6.5vw, 5.6rem);
          font-weight: 900; line-height: 0.96;
          letter-spacing: -0.04em; color: #fff;
          margin-bottom: 1.8rem;
        }
        .hero-h1 .accent {
          font-style: italic; font-weight: 400;
          font-family: 'Playfair Display', serif;
          color: #F5A800;
        }

        .hero-desc {
          font-size: clamp(0.95rem, 1.5vw, 1.08rem);
          color: rgba(255,255,255,0.62); line-height: 1.9;
          max-width: 440px; margin-bottom: 2.6rem; font-weight: 400;
        }

        .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 3rem; }

        .hero-markets { display: flex; align-items: center; flex-wrap: wrap; }
        .hero-mkt {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.82rem; font-weight: 600;
          color: rgba(255,255,255,0.52); letter-spacing: 0.05em;
          padding: 0 18px; border-right: 1px solid rgba(255,255,255,0.1);
        }
        .hero-mkt:first-child { padding-left: 0; }
        .hero-mkt:last-child  { border-right: none; }

        /* Right: VAL logo — large, transparent */
        .hero-logo-right {
          flex-shrink: 0;
          width: clamp(220px, 28vw, 380px);
          display: flex; align-items: center; justify-content: center;
        }
        .hero-logo-right img {
          width: 100%; height: auto;
          object-fit: contain;
          /* Transparent PNG — just drop-shadow for depth */
          filter: drop-shadow(0 8px 40px rgba(232,83,26,0.18))
                  drop-shadow(0 2px 12px rgba(0,0,0,0.4));
          transition: filter 0.5s ease, transform 0.5s ease;
          animation: heroLogoFloat 6s ease-in-out infinite;
        }
        @keyframes heroLogoFloat {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-12px); }
        }
        .hero-logo-right:hover img {
          filter: drop-shadow(0 12px 60px rgba(245,168,0,0.35))
                  drop-shadow(0 4px 20px rgba(0,0,0,0.5));
        }

        /* Scroll indicator */
        .hero-scroll {
          position: absolute; right: 7%; bottom: 5vh; z-index: 5;
          display: flex; flex-direction: column; align-items: center; gap: 10px;
        }
        .hero-scroll span {
          writing-mode: vertical-rl;
          font-size: 0.62rem; letter-spacing: 0.22em;
          text-transform: uppercase; color: rgba(255,255,255,0.3);
        }
        .hero-scroll-line {
          width: 1px; height: 56px;
          background: linear-gradient(to bottom, rgba(245,168,0,0.7), transparent);
          animation: heroScrollAnim 2.2s ease-in-out infinite;
        }
        @keyframes heroScrollAnim {
          0%,100% { transform:scaleY(1); opacity:1; }
          50%      { transform:scaleY(0.4); opacity:0.3; }
        }

        /* Bottom info bar */
        .hero-infobar {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 5;
          background: rgba(0,0,0,0.38); backdrop-filter: blur(12px);
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: center;
          gap: 2rem; flex-wrap: wrap; padding: 13px 7%;
        }
        .hero-infobar-item {
          font-size: 0.76rem; color: rgba(255,255,255,0.48);
          font-weight: 500; letter-spacing: 0.03em;
        }
        .hero-infobar-sep { color: rgba(245,168,0,0.35); }

        @media(max-width:900px){
          .hero-inner { flex-direction: column; align-items: flex-start; gap: 2rem; }
          .hero-logo-right { width: clamp(160px, 50vw, 260px); order: -1; align-self: flex-end; }
          .hero-h1 { font-size: clamp(2.4rem, 9vw, 3.8rem); }
          .hero-scroll { display: none; }
        }
        @media(max-width:600px){
          .hero-logo-right { width: 160px; }
          .hero-infobar { flex-direction: column; gap: 0.4rem; padding: 12px 5%; }
        }
      `}</style>

      <section className="hero-root">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-noise"></div>

        <div className="hero-inner">
          {/* ─── LEFT: Text content ─── */}
          <div className="hero-left">
            <div ref={tagRef} className="hero-sup">
              <span className="hero-sup-dot"></span>
              India · Premium Agri Exports
            </div>

            <h1 ref={headRef} className="hero-h1">
              Authentic
              <br />
              Indian <span className="accent">Sourcing.</span>
              <br />
              Global Quality.
            </h1>

            <p ref={subRef} className="hero-desc">
              From farm-grown essentials to health-focused superfoods — VAL
              Global Commodities delivers purity, consistency, and trust to
              global markets.
            </p>

            <div ref={btnsRef} className="hero-btns">
              <a href="#contact" className="btn-gold">
                Request Catalogue
              </a>
              <a href="#products" className="btn-outline">
                Explore Products
              </a>
            </div>

            <div className="hero-markets">
              {[
                ["🇲🇾", "Malaysia"],
                ["🇦🇪", "UAE"],
                ["🌍", "Europe"],
              ].map(([f, n]) => (
                <div key={n} className="hero-mkt">
                  <span>{f}</span>
                  {n}
                </div>
              ))}
            </div>
          </div>

          {/* ─── RIGHT: Transparent VAL logo (like the screenshot) ─── */}
          <div className="hero-logo-right" ref={logoRef}>
            <img src="/images/logo.webp" alt="VAL Global Commodities" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll">
          <div className="hero-scroll-line"></div>
          <span>Scroll</span>
        </div>

        {/* Info bar */}
        <div className="hero-infobar">
          <span className="hero-infobar-item">
            ✉️ info@valglobalcommodities.com
          </span>
          <span className="hero-infobar-sep">·</span>
          <span className="hero-infobar-item">
            <a
              href="https://www.valglobalcommodities.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              🌐 www.valglobalcommodities.com
            </a>
          </span>
          <span className="hero-infobar-sep">·</span>
          <span
            className="hero-infobar-item"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            <a
              href="https://www.instagram.com/valglobalcommodities"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "inherit",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: "block", flexShrink: 0 }}
              >
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="5"
                  ry="5"
                  stroke="rgba(255,255,255,0.48)"
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4.5"
                  stroke="rgba(255,255,255,0.48)"
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1.1"
                  fill="rgba(255,255,255,0.48)"
                />
              </svg>
              @valglobalcommodities
            </a>
          </span>
          <span className="hero-infobar-sep">·</span>
          <span className="hero-infobar-item">📍 India</span>
        </div>
      </section>
    </>
  );
}
