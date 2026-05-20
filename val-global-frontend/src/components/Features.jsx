import { StaggerReveal } from './SectionReveal'

const features = [
  { icon:'🌱', title:'Farm Direct Sourcing', desc:'No intermediaries, Ethical sourcing' },
  { icon:'✅', title:'Export-Grade Quality', desc:'Meets international standards' },
  { icon:'🌿', title:'Chemical-Free Products', desc:'Traditional & natural farming' },
  { icon:'📦', title:'Reliable Bulk Supply', desc:'Consistent & scalable delivery' },
]

export default function Features() {
  return (
    <>
      <style>{`
        .trust-strip { background:var(--green-dark); display:grid; grid-template-columns:repeat(4,1fr); border-top:1px solid rgba(245,168,0,0.1); }
        .trust-item { display:flex; align-items:center; gap:18px; padding:2.2rem 2.5rem; border-right:1px solid rgba(255,255,255,0.06); transition:background 0.25s; }
        .trust-item:last-child { border-right:none; }
        .trust-item:hover { background:rgba(255,255,255,0.04); }
        /* Bigger icons */
        .trust-ico { width:62px; height:62px; flex-shrink:0; background:rgba(232,83,26,0.12); border:1.5px solid rgba(245,168,0,0.22); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:28px; transition:transform 0.3s,border-color 0.3s,box-shadow 0.3s; }
        .trust-item:hover .trust-ico { transform:scale(1.12); border-color:rgba(245,168,0,0.55); box-shadow:0 0 20px rgba(245,168,0,0.12); }
        .trust-title { display:block; font-size:0.95rem; font-weight:800; color:#fff; margin-bottom:4px; font-family:'Plus Jakarta Sans',sans-serif; }
        .trust-sub { font-size:0.8rem; color:rgba(255,255,255,0.46); }
        @media(max-width:860px){ .trust-strip{grid-template-columns:1fr 1fr;} .trust-item{border-bottom:1px solid rgba(255,255,255,0.06);} }
        @media(max-width:500px){
          .trust-strip{grid-template-columns:1fr;}
          .trust-item { padding:1.2rem 1rem; gap:12px; }
          .trust-ico { width:50px; height:50px; font-size:22px; }
          .trust-title { font-size:0.86rem; }
          .trust-sub { font-size:0.74rem; }
        }
      `}</style>
      <StaggerReveal tag="div" className="trust-strip stagger">
        {features.map((f, i) => (
          <div key={i} className="trust-item reveal">
            <div className="trust-ico">{f.icon}</div>
            <div>
              <strong className="trust-title">{f.title}</strong>
              <span className="trust-sub">{f.desc}</span>
            </div>
          </div>
        ))}
      </StaggerReveal>
    </>
  )
}
