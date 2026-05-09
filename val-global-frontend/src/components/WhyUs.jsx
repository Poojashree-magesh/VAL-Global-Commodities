import SectionReveal, { StaggerReveal } from "./SectionReveal";

const reasons = [
  {
    icon: "🌍",
    num: "01",
    title: "Worldwide Sourcing Network",
    desc: "Multi-state sourcing flexibility with seasonal crop planning. Strong procurement network across the globe with year-round availability.",
  },
  {
    icon: "🚢",
    num: "02",
    title: "Export Capacity & Markets",
    desc: "4–5 Metric Tons per category per month. Scalable container shipments, long-term supply contracts, global ports clearance.",
  },
  {
    icon: "🌱",
    num: "03",
    title: "Direct Farmer Sourcing",
    desc: "No middlemen — direct from certified farms. Full traceability from field to export port, with on-time container shipments.",
  },
  {
    icon: "🏅",
    num: "04",
    title: "Farm-to-Export Model",
    desc: "Structured farm-to-export with certification-ready processes and scalable supply capacity ensuring uncompromised quality.",
  },
  {
    icon: "🤝",
    num: "05",
    title: "Transparent & Reliable",
    desc: "We deliver reliability, not just products. Honest pricing, scalable contract-based supply execution, long-term partnerships.",
  },
  {
    icon: "💚",
    num: "06",
    title: "Ethical & Clean Products",
    desc: "100% chemical-free products. We support women-led SHGs and traditional farming communities at every step.",
  },
];
const stats = [
  { value: "4–5 MT", label: "Per Category/Month" },
  { value: "3+", label: "Global Markets" },
  { value: "8", label: "Product Categories" },
  { value: "100%", label: "Chemical-Free" },
];

export default function WhyUs() {
  return (
    <>
      <style>{`
        .why-section { padding:100px 7%; background:var(--green-dark); color:#fff; position:relative; overflow:hidden; }
        .why-bg-text { position:absolute; bottom:-2rem; right:-2rem; font-size:22vw; font-weight:900; line-height:0.8; letter-spacing:-0.05em; color:transparent; -webkit-text-stroke:1px rgba(255,255,255,0.04); pointer-events:none; user-select:none; z-index:0; font-family:'Plus Jakarta Sans',sans-serif; }
        .why-inner { position:relative; z-index:2; }
        .why-top { display:flex; justify-content:space-between; align-items:flex-end; gap:3rem; flex-wrap:wrap; margin-bottom:4rem; }
        .why-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:0; border:1px solid rgba(255,255,255,0.08); margin-bottom:4rem; }
        .why-stat { padding:2.2rem 1.5rem; text-align:center; border-right:1px solid rgba(255,255,255,0.08); transition:background 0.1s; }
        .why-stat:last-child { border-right:none; }
        .why-stat:hover { background:rgba(255,255,255,0.03); }
        .why-stat-val { font-family:'Plus Jakarta Sans',sans-serif; font-size:2.6rem; font-weight:900; letter-spacing:-0.04em; line-height:1; background:linear-gradient(135deg,#E8531A,#F5A800); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .why-stat-label { font-size:0.78rem; color:rgba(255,255,255,0.42); text-transform:uppercase; letter-spacing:0.12em; margin-top:9px; font-weight:700; }
        .why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:rgba(255,255,255,0.06); }
        .why-card { background:var(--green-dark); padding:2.4rem 2rem; transition:background 0.1s,transform 0.3s; }
        .why-card:hover { background:rgba(255,255,255,0.05); transform:translateY(-1px); }
        .why-num { font-size:0.75rem; font-weight:700; letter-spacing:0.2em; color:rgba(245,168,0,0.5); margin-bottom:1.2rem; text-transform:uppercase; }
        /* BIGGER icons */
        .why-icon-wrap { font-size:2.8rem; margin-bottom:1.3rem; line-height:1; transition:transform 0.3s; }
        .why-card:hover .why-icon-wrap { transform:scale(1.07); }
        .why-card-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:1.08rem; font-weight:800; color:#fff; margin-bottom:0.75rem; }
        .why-card-desc { font-size:0.95rem; color:rgba(255,255,255,0.55); line-height:1.82; }
        .why-bullets { display:flex; flex-wrap:wrap; gap:0; border:1px solid rgba(255,255,255,0.08); margin-top:1px; }
        .why-bullet { display:flex; align-items:center; gap:12px; padding:1.2rem 1.8rem; border-right:1px solid rgba(255,255,255,0.06); flex:1; min-width:200px; transition:background 0.2s; }
        .why-bullet:last-child { border-right:none; }
        .why-bullet:hover { background:rgba(255,255,255,0.04); }
        .why-bullet-arrow { color:#E8531A; font-size:0.78rem; }
        .why-bullet-text { font-family:'Plus Jakarta Sans',sans-serif; font-size:0.88rem; font-weight:600; color:rgba(255,255,255,0.72); }
        @media(max-width:900px){ .why-grid{grid-template-columns:repeat(2,1fr);} .why-stats{grid-template-columns:repeat(2,1fr);} }
        @media(max-width:560px){
          .why-section { padding:70px 5%; }
          .why-top { gap:1.2rem; margin-bottom:2rem; }
          .why-stats { grid-template-columns:1fr; margin-bottom:2rem; }
          .why-stat { padding:1.2rem 1rem; border-right:none; border-bottom:1px solid rgba(255,255,255,0.08); }
          .why-stat:last-child { border-bottom:none; }
          .why-stat-val { font-size:2rem; }
          .why-grid{grid-template-columns:1fr;}
          .why-card { padding:1.4rem 1rem; }
          .why-card-title { font-size:0.96rem; }
          .why-card-desc { font-size:0.84rem; line-height:1.6; }
          .why-bullets{flex-direction:column;}
          .why-bullet{border-right:none;border-bottom:1px solid rgba(255,255,255,0.06); min-width:0; padding:0.9rem 1rem;}
          .why-bullet-text { font-size:0.8rem; }
        }
      `}</style>

      <section className="why-section" id="why">
        {/* NO WATERMARK in Why Choose Us */}
        <div className="why-bg-text" aria-hidden="true">
          VAL
        </div>

        <div className="why-inner">
          <div className="why-top">
            <SectionReveal className="reveal-left">
              <div className="eyebrow">Why Choose Us</div>
              <h2 className="stitle" style={{ maxWidth: 520 }}>
                Worldwide Sourcing &amp; Delivery Network
              </h2>
            </SectionReveal>
            <SectionReveal className="reveal-right" delay="0.1s">
              <p className="sdesc" style={{ maxWidth: 380 }}>
                VAL Global Commodities maintains a strong procurement network
                across the globe. We don't just supply products — we deliver
                reliability.
              </p>
            </SectionReveal>
          </div>

          <StaggerReveal tag="div" className="why-stats stagger">
            {stats.map((s, i) => (
              <div key={i} className="why-stat reveal">
                <div className="why-stat-val">{s.value}</div>
                <div className="why-stat-label">{s.label}</div>
              </div>
            ))}
          </StaggerReveal>

          <StaggerReveal tag="div" className="why-grid stagger">
            {reasons.map((r, i) => (
              <div key={i} className="why-card reveal">
                <div className="why-num">{r.num}</div>
                <div className="why-icon-wrap">{r.icon}</div>
                <h3 className="why-card-title">{r.title}</h3>
                <p className="why-card-desc">{r.desc}</p>
              </div>
            ))}
          </StaggerReveal>

          <SectionReveal className="reveal" delay="0.15s">
            <div className="why-bullets">
              {[
                "Multi-State Sourcing Flexibility",
                "Seasonal Crop Planning",
                "Year-Round Availability",
                "Efficient Port Coordination",
                "On-Time Container Shipments",
                "Scalable Contract Supply",
              ].map((b, i) => (
                <div key={i} className="why-bullet">
                  <span className="why-bullet-arrow">▶</span>
                  <span className="why-bullet-text">{b}</span>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
