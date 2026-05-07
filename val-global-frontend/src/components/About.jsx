import { useState } from 'react'
import SectionReveal, { StaggerReveal } from './SectionReveal'

const tabs = [
  { id:'who', label:'Who We Are', content:`At VAL Global Commodities, we believe great products begin at the source. We connect global markets directly with honest, high-quality Indian products — without unnecessary intermediaries. Our journey began with a vision to create a sourcing system where quality is consistent, pricing is fair, and every product is traceable from farm to shipment.`, points:['India-based export company with direct farmer networks','Strong connections with cooperatives, spice growers & millet cultivators','Women-led SHG groups for honey and lifestyle product processing'] },
  { id:'approach', label:'Our Approach', content:`We follow a transparent sourcing model ensuring product integrity, ethical cultivation, and export-grade quality from farm to shipment. Our approach eliminates unnecessary intermediaries, ensuring you get the best quality at fair prices with full traceability at every step.`, points:['Direct sourcing from verified farms and cooperatives','Rigorous quality checks at source and before export','Transparent documentation and fair pricing'] },
  { id:'commit', label:'Our Commitment', content:`We are committed to reliability, clear communication, and delivering exactly what we promise — every time. We build long-term partnerships based on trust, consistency, and transparency with both our farming communities and global buyers.`, points:['100% chemical-free, clean-label products','Long-term buyer-farmer relationship building','Consistent quality across every shipment'] },
]
const stats = [{ n:'8', l:'Product Categories' },{ n:'3+', l:'Export Markets' },{ n:'0', l:'Intermediaries' },{ n:'100%', l:'Chemical-Free' }]

export default function About() {
  const [activeTab, setActiveTab] = useState('who')
  const tab = tabs.find(t => t.id === activeTab)

  return (
    <>
      <style>{`
        .about-section { padding:100px 7%; background:#fff; position:relative; overflow:hidden; }
        .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:6rem; align-items:center; position:relative; z-index:2; }
        .about-img-wrap { position:relative; }
        .about-img { width:100%; height:540px; object-fit:cover; display:block; }
        .about-img-overlay { position:absolute; bottom:0; left:0; right:0; height:35%; background:linear-gradient(to top,#fff,transparent); pointer-events:none; }
        .about-badge { position:absolute; top:28px; left:-20px; z-index:3; background:linear-gradient(135deg,#E8531A,#F5A800); color:#fff; padding:20px 24px; text-align:center; box-shadow:0 12px 40px rgba(232,83,26,0.35); }
        .about-badge-n { display:block; font-size:2.5rem; font-weight:900; line-height:1; }
        .about-badge-l { font-size:0.78rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; opacity:0.9; }
        .about-corner { position:absolute; bottom:-16px; right:-16px; width:160px; height:160px; border:2px solid #F5A800; pointer-events:none; }
        .about-img-wrap { transition:transform 0.4s cubic-bezier(0.16,1,0.3,1); }
        .about-img-wrap:hover { transform:scale(1.015); }
        .tab-bar { display:flex; gap:0; border-bottom:1px solid #e0dbd4; margin-bottom:2rem; overflow-x:auto; }
        .tab-btn { padding:13px 22px; cursor:pointer; white-space:nowrap; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.9rem; font-weight:700; color:#999; border:none; background:none; border-bottom:2px solid transparent; margin-bottom:-1px; transition:color 0.2s,border-color 0.2s; letter-spacing:0.04em; text-transform:uppercase; }
        .tab-btn.active { color:#1F4D3B; border-bottom-color:#E8531A; }
        .tab-content { animation:tabFade 0.35s ease; }
        @keyframes tabFade { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:none} }
        .tab-text { font-size:1.05rem; color:#555; line-height:1.9; margin-bottom:1.2rem; }
        .about-points { list-style:none; display:flex; flex-direction:column; gap:0.9rem; margin-top:1rem; }
        .about-point { display:flex; align-items:flex-start; gap:14px; font-size:0.98rem; color:#444; }
        .point-icon { width:20px; height:20px; flex-shrink:0; margin-top:3px; background:linear-gradient(135deg,#E8531A,#F5A800); border-radius:50%; }
        .about-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; margin-top:2.5rem; background:#e0dbd4; border:1px solid #e0dbd4; }
        .stat-cell { background:#fff; padding:1.6rem 1rem; text-align:center; transition:background 0.2s; cursor:default; }
        .stat-cell:hover { background:#F5F3EF; }
        .stat-n { font-family:'Plus Jakarta Sans',sans-serif; font-size:2.2rem; font-weight:900; color:#1F4D3B; letter-spacing:-0.03em; }
        .stat-l { font-size:0.75rem; color:#999; text-transform:uppercase; letter-spacing:0.1em; margin-top:5px; font-weight:700; }
        @media(max-width:1024px){ .about-grid{grid-template-columns:1fr;gap:3.5rem;} .about-badge{left:10px;} }
        @media(max-width:600px){ .about-stats{grid-template-columns:repeat(2,1fr);} }
      `}</style>

      <section className="about-section" id="about">
        {/* NO WATERMARK in About section */}
        <div className="about-grid">
          <SectionReveal className="reveal-left">
            <div className="about-img-wrap">
              <div className="about-badge">
                <strong className="about-badge-n">10+</strong>
                <span className="about-badge-l">Years<br/>Farming</span>
              </div>
              <img src="/images/woman-farm.webp" alt="Farmers" className="about-img" />
              <div className="about-img-overlay"></div>
              <div className="about-corner"></div>
            </div>
          </SectionReveal>

          <SectionReveal className="reveal-right" delay="0.1s">
            <div className="eyebrow">About VAL Global</div>
            <h2 className="stitle">Built on Direct Sourcing &amp; Honest Trade</h2>
            <div className="divider"></div>
            <div className="tab-bar">
              {tabs.map(t => (
                <button key={t.id} className={`tab-btn${activeTab===t.id?' active':''}`} onClick={() => setActiveTab(t.id)}>{t.label}</button>
              ))}
            </div>
            <div className="tab-content" key={activeTab}>
              <p className="tab-text">{tab.content}</p>
              <ul className="about-points">
                {tab.points.map((p,i) => <li key={i} className="about-point"><div className="point-icon"></div>{p}</li>)}
              </ul>
            </div>
            <div className="about-stats">
              {stats.map(s => (
                <div key={s.l} className="stat-cell">
                  <div className="stat-n">{s.n}</div>
                  <div className="stat-l">{s.l}</div>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
