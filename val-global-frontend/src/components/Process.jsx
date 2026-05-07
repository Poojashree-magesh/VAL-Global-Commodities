import SectionReveal, { StaggerReveal } from './SectionReveal'

const steps = [
  { num:'01', icon:'🌾', title:'Farm Sourcing', desc:'Direct from certified farmers & cooperatives across India' },
  { num:'02', icon:'🔬', title:'Quality Inspection', desc:'Rigorous grading, testing & quality checks at source' },
  { num:'03', icon:'⚙️', title:'Processing', desc:'Clean, chemical-free processing & hygienic packaging' },
  { num:'04', icon:'📋', title:'Documentation', desc:'Full export compliance, certifications & paperwork' },
  { num:'05', icon:'🚢', title:'Global Delivery', desc:'Reliable shipment to Malaysia, UAE & Europe' },
]

export default function Process() {
  return (
    <>
      <style>{`
        .process-section { padding:100px 7%; background:#1F4D3B; position:relative; overflow:hidden; }
        .process-head { text-align:center; max-width:560px; margin:0 auto 5rem; position:relative; z-index:2; }
        .process-track { display:grid; grid-template-columns:repeat(5,1fr); gap:0; position:relative; z-index:2; }
        .process-track::before { content:''; position:absolute; top:64px; left:calc(10% + 20px); right:calc(10% + 20px); height:1px; background:rgba(245,168,0,0.25); z-index:0; }
        .process-step { text-align:center; padding:0 0.8rem; position:relative; z-index:1; cursor:default; }
        /* Bigger circles and icons */
        .process-circle { width:128px; height:128px; border-radius:50%; background:rgba(255,255,255,0.05); border:2px solid rgba(245,168,0,0.35); display:flex; align-items:center; justify-content:center; margin:0 auto 1.6rem; font-size:48px; line-height:1; transition:background 0.35s,border-color 0.35s,transform 0.35s,box-shadow 0.35s; }
        .process-step:hover .process-circle { background:rgba(232,83,26,0.18); border-color:#F5A800; transform:scale(1.1) translateY(-5px); box-shadow:0 24px 56px rgba(232,83,26,0.22); }
        .process-step-num { display:block; font-size:0.72rem; font-weight:700; color:rgba(245,168,0,0.65); letter-spacing:0.2em; text-transform:uppercase; margin-bottom:9px; }
        .process-step-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:1rem; font-weight:800; color:#fff; margin-bottom:0.55rem; }
        .process-step-desc { font-size:0.86rem; color:rgba(255,255,255,0.5); line-height:1.65; }
        @media(max-width:900px){ .process-track{grid-template-columns:repeat(3,1fr);gap:2.5rem;} .process-track::before{display:none;} }
        @media(max-width:560px){ .process-track{grid-template-columns:repeat(2,1fr);} }
      `}</style>

      <section className="process-section" id="process">
        {/* NO WATERMARK in Our Journey / Process */}

        <div className="process-head">
          <SectionReveal className="reveal">
            <div className="eyebrow" style={{justifyContent:'center'}}>Our Journey</div>
            <h2 className="stitle" style={{textAlign:'center', color:'#ffffff'}}>Farm to Global Market</h2>
            <div className="divider" style={{margin:'1rem auto 0'}}></div>
          </SectionReveal>
        </div>

        <StaggerReveal tag="div" className="process-track stagger">
          {steps.map((s,i) => (
            <div key={i} className="process-step reveal">
              <div className="process-circle">{s.icon}</div>
              <span className="process-step-num">Step {s.num}</span>
              <h4 className="process-step-title">{s.title}</h4>
              <p className="process-step-desc">{s.desc}</p>
            </div>
          ))}
        </StaggerReveal>
      </section>
    </>
  )
}
