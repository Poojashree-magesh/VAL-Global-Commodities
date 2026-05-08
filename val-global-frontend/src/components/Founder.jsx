import SectionReveal from "./SectionReveal";

export default function Founder() {
  return (
    <>
      <style>{`
        .founder-section { padding:100px 7%; background:#fff; position:relative; overflow:hidden; }
        .founder-grid { display:grid; grid-template-columns:1fr 1fr; gap:0; position:relative; z-index:2; }
        .founder-img-col { position:relative; min-height:580px; overflow:hidden; }
        .founder-img-col img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .founder-img-col:hover img { transform:scale(1.04); }
        .founder-img-overlay { position:absolute; inset:0; background:linear-gradient(to right,transparent 60%,#fff 100%); }
        .founder-accent-bar { position:absolute; top:0; left:0; right:0; height:4px; background:linear-gradient(90deg,#E8531A,#F5A800); z-index:2; }
        .founder-info-card { position:absolute; bottom:30px; left:30px; background:linear-gradient(135deg,#0f2820,#1F4D3B); padding:2rem 2.2rem; min-width:250px; z-index:2; }
        .founder-initial { width:60px; height:60px; background:linear-gradient(135deg,#E8531A,#F5A800); display:flex; align-items:center; justify-content:center; font-family:'Playfair Display',serif; font-size:1.7rem; font-weight:700; color:#fff; margin-bottom:1rem; }
        .founder-name { font-family:'Plus Jakarta Sans',sans-serif; font-size:1rem; font-weight:800; color:#fff; margin-bottom:4px; }
        .founder-role { font-size:0.76rem; color:rgba(255,255,255,0.52); letter-spacing:0.06em; text-transform:uppercase; margin-bottom:1.2rem; }
        .founder-contact { font-size:0.8rem; color:rgba(255,255,255,0.62); margin-bottom:4px; }
        .founder-text-col { padding:0 0 0 6rem; display:flex; flex-direction:column; justify-content:center; }
        .founder-quote { font-family:'Playfair Display',serif; font-size:1.35rem; font-style:italic; line-height:1.65; color:#1F4D3B; margin-bottom:2rem; padding-left:1.8rem; border-left:3px solid #E8531A; }
        .founder-para { font-size:1rem; color:#555; line-height:1.9; margin-bottom:1rem; }
        .founder-cta-box { background:#F5F3EF; padding:1.6rem; margin-top:2rem; border-left:3px solid #E8531A; }
        .founder-cta-label { font-family:'Plus Jakarta Sans',sans-serif; font-size:0.75rem; font-weight:700; color:#1F4D3B; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:0.8rem; }
        .founder-cta-link { font-size:0.92rem; color:#E8531A; text-decoration:none; display:block; margin-bottom:0.5rem; transition:letter-spacing 0.2s; }
        .founder-cta-link:hover { letter-spacing:0.02em; }
        .founder-sig { font-family:'Playfair Display',serif; font-style:italic; font-size:1.05rem; color:#8B5E3C; display:flex; align-items:center; gap:12px; margin-top:2rem; }
        .founder-sig-line { width:28px; height:1px; background:#8B5E3C; }
        @media(max-width:1024px){ .founder-grid{grid-template-columns:1fr;} .founder-img-col{min-height:400px;} .founder-img-overlay{background:linear-gradient(to bottom,transparent 60%,#fff 100%);} .founder-info-card{left:20px;bottom:20px;} .founder-text-col{padding:3rem 0 0;} }
        @media(max-width:600px){
          .founder-section { padding:70px 5%; }
          .founder-img-col { min-height:320px; }
          .founder-info-card { left:12px; right:12px; bottom:12px; min-width:0; padding:1.1rem 1rem; }
          .founder-initial { width:44px; height:44px; font-size:1.25rem; margin-bottom:0.6rem; }
          .founder-name { font-size:0.88rem; }
          .founder-role, .founder-contact { font-size:0.7rem; }
          .founder-quote { font-size:1.05rem; padding-left:1rem; line-height:1.55; }
          .founder-para { font-size:0.92rem; line-height:1.75; }
          .founder-cta-box { padding:1rem; margin-top:1.3rem; }
          .founder-sig { font-size:0.9rem; margin-top:1.3rem; }
        }
      `}</style>

      <section className="founder-section" id="founder">
        {/* NO WATERMARK in Founder's Note */}

        <div className="founder-grid">
          <SectionReveal className="reveal-left">
            <div className="founder-img-col">
              <div className="founder-accent-bar"></div>
              <img src="/images/woman-farm.webp" alt="VAL Global Team" />
              <div className="founder-img-overlay"></div>
              <div className="founder-info-card">
                <div className="founder-initial">V</div>
                <div className="founder-name">Founder &amp; Director</div>
                <div className="founder-role">VAL Global Commodities</div>
                <div className="founder-contact">
                  ✉️ info@valglobalcommodities.com
                </div>
                <div className="founder-contact">📍 India</div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal className="reveal-right" delay="0.12s">
            <div className="founder-text-col">
              <div className="eyebrow">Founder's Note</div>
              <h2 className="stitle">
                A Vision Born from
                <br />
                the Heart of the Farm
              </h2>
              <div className="divider"></div>
              <blockquote className="founder-quote">
                "We built VAL Global Commodities to bridge the gap between farms
                and global buyers — with trust, consistency, and authenticity at
                the centre of everything we do."
              </blockquote>
              <p className="founder-para">
                VAL Global Commodities was built from a deep understanding of
                the gap between farm production and global market expectations.
                We saw first-hand how quality produce struggled to reach the
                right buyers at fair prices — and we set out to change that.
              </p>
              <p className="founder-para">
                We created a system where products move directly from trusted
                sources to buyers without compromising on quality, traceability,
                or integrity.
              </p>
              <div className="founder-cta-box">
                <div className="founder-cta-label">Get in Touch Directly</div>
                <a
                  href="mailto:info@valglobalcommodities.com"
                  className="founder-cta-link"
                >
                  ✉️ info@valglobalcommodities.com
                </a>
                <a
                  href="#contact"
                  className="btn-gold"
                  style={{
                    marginTop: "0.9rem",
                    width: "fit-content",
                    fontSize: "0.8rem",
                    padding: "13px 26px",
                  }}
                >
                  Request a Catalogue →
                </a>
              </div>
              <div className="founder-sig">
                <span className="founder-sig-line"></span>Founder, VAL Global
                Commodities
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
