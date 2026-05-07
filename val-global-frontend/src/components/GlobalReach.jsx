import SectionReveal, { StaggerReveal } from './SectionReveal'
import LogoWatermark from './LogoWatermark'

const markets = [
  { flag:'🇲🇾', name:'Malaysia', desc:'Spices, Rice, Millets & Lifestyle Products', detail:'Active market — strong retail & wholesale network' },
  { flag:'🇦🇪', name:'United Arab Emirates', desc:'Vegetables, Spices, Natural Sweeteners & Masalas', detail:'Growing demand for authentic Indian products' },
  { flag:'🌍', name:'Europe', desc:'Organic Products, Healthy Range & Traditional Varieties', detail:'Premium organic segment with health-conscious buyers' },
]

export default function GlobalReach() {
  return (
    <>
      <style>{`
        .reach-section { padding:100px 7%; background:#F5F3EF; position:relative; overflow:hidden; }
        .reach-grid { display:grid; grid-template-columns:1fr 1fr; gap:6rem; align-items:center; position:relative; z-index:2; }
        .reach-left-bar { width:3px; height:40px; background:linear-gradient(to bottom,#E8531A,#F5A800); margin-bottom:1.5rem; }
        .reach-vision { background:#1F4D3B; padding:2rem; margin-top:2rem; }
        .reach-vision-label { font-size:0.68rem; font-weight:700; color:#F5A800; text-transform:uppercase; letter-spacing:0.15em; margin-bottom:0.6rem; }
        .reach-vision-text { font-size:0.92rem; color:rgba(255,255,255,0.68); line-height:1.8; }
        .reach-market-list { display:flex; flex-direction:column; gap:0; }
        .reach-market { display:flex; align-items:flex-start; gap:1.5rem; padding:1.8rem 0; border-bottom:1px solid #e0dbd4; transition:background 0.2s, padding-left 0.3s; cursor:default; }
        .reach-market:last-child { border-bottom:none; }
        .reach-market:hover { padding-left:8px; }
        .reach-flag {
          font-size: 3rem; /* bigger flag */
          flex-shrink: 0;
          margin-top: 2px;
          transition: transform 0.3s;
        }
        
        .reach-market-name {
          font-family:'Plus Jakarta Sans',sans-serif;
          font-size: 1.35rem;   /* bigger title */
          font-weight: 800;
          color:#1F4D3B;
          margin-bottom: 6px;
        }
        
        .reach-market-products {
          font-size: 1rem;      /* description bigger */
          color:#555;
          margin-bottom: 6px;
          line-height: 1.6;
        }
        
        .reach-market-detail {
          font-size: 0.9rem;    /* subtitle clearer */
          color:#888;
          font-style: italic;
        }
        @media(max-width:1024px){ .reach-grid{grid-template-columns:1fr;gap:3.5rem;} }
      `}</style>

      <section className="reach-section" id="reach">
        <LogoWatermark theme="light" />

        <div className="reach-grid">
          <SectionReveal className="reveal-left">
            <div className="reach-left-bar"></div>
            <div className="eyebrow">Global Reach</div>
            <h2 className="stitle">Where We Deliver</h2>
            <div className="divider"></div>
            <p className="sdesc">VAL Global Commodities — India-based — serves buyers across three major markets, with growing demand for authentic Indian produce worldwide.</p>
            <div className="reach-vision">
              <div className="reach-vision-label">Our Vision</div>
              <p className="reach-vision-text">To become a globally trusted sourcing partner for Indian agricultural and traditional products — connecting authentic farm produce to discerning buyers across the world.</p>
            </div>
          </SectionReveal>

          <StaggerReveal tag="div" className="reach-market-list stagger">
            {markets.map((m,i) => (
              <div key={i} className="reach-market reveal">
                <div className="reach-flag">{m.flag}</div>
                <div>
                  <div className="reach-market-name">{m.name}</div>
                  <div className="reach-market-products">{m.desc}</div>
                  <div className="reach-market-detail">{m.detail}</div>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>
    </>
  )
}
