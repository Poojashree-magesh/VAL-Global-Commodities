/**
 * CinematicFooter — adapted from motion-footer.tsx for Vite + React (no Next.js)
 * Uses GSAP + ScrollTrigger for scroll-driven animations
 */
import { useEffect, useRef } from 'react'

// ─── CSS styles injected once ─────────────────────────────────────────────
const FOOTER_STYLES = `
@keyframes val-breathe {
  0% { transform: translate(-50%,-50%) scale(1); opacity:0.5; }
  100% { transform: translate(-50%,-50%) scale(1.12); opacity:1; }
}
@keyframes val-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes val-heartbeat {
  0%,100% { transform:scale(1); }
  15%,45% { transform:scale(1.25); }
  30% { transform:scale(1); }
}
@keyframes val-arrowBounce {
  0%,100% { transform:translateY(0); }
  50% { transform:translateY(-5px); }
}

.val-footer-wrap { font-family:'Plus Jakarta Sans',sans-serif; -webkit-font-smoothing:antialiased; }

.val-footer-grid-bg {
  background-size:60px 60px;
  background-image:
    linear-gradient(to right,rgba(255,255,255,0.03) 1px,transparent 1px),
    linear-gradient(to bottom,rgba(255,255,255,0.03) 1px,transparent 1px);
  mask-image:linear-gradient(to bottom,transparent,black 30%,black 70%,transparent);
  -webkit-mask-image:linear-gradient(to bottom,transparent,black 30%,black 70%,transparent);
}

.val-footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(232,83,26,0.12) 0%,
    rgba(31,77,59,0.1) 40%,
    transparent 70%
  );
  animation: val-breathe 9s ease-in-out infinite alternate;
}

/* Glass pill */
.val-pill {
  background: linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
  cursor: pointer;
  color: rgba(255,255,255,0.65);
  display: inline-flex; align-items: center; gap: 10px;
  text-decoration: none;
}
.val-pill:hover {
  background: linear-gradient(145deg, rgba(255,255,255,0.09), rgba(255,255,255,0.03));
  border-color: rgba(245,168,0,0.3);
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5), inset 0 1px 1px rgba(245,168,0,0.15);
  color: #fff;
}

/* Giant bg text */
.val-bg-text {
  font-size:24vw; line-height:0.8; font-weight:900; letter-spacing:-0.05em;
  color:transparent;
  -webkit-text-stroke:1px rgba(255,255,255,0.04);
  background:linear-gradient(180deg,rgba(255,255,255,0.06) 0%,transparent 60%);
  -webkit-background-clip:text; background-clip:text;
  user-select:none; pointer-events:none;
  font-family:'Plus Jakarta Sans',sans-serif;
}

/* Heading gradient */
.val-footer-heading {
  background:linear-gradient(180deg,#fff 0%,rgba(255,255,255,0.45) 100%);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  filter:drop-shadow(0 0 20px rgba(255,255,255,0.1));
}

/* Marquee */
.val-marquee-track { animation: val-marquee 38s linear infinite; display:flex; width:max-content; }
.val-heartbeat { animation: val-heartbeat 2s cubic-bezier(0.25,1,0.5,1) infinite; display:inline-block; }
.val-arrow-bounce { animation: val-arrowBounce 1.8s ease-in-out infinite; display:inline-block; }
`

// ─── Marquee row content ──────────────────────────────────────────────────
function MarqueeItem() {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'3rem', padding:'0 1.5rem', whiteSpace:'nowrap' }}>
      <span>Farm Direct Sourcing</span>
      <span style={{ color:'rgba(245,168,0,0.5)' }}>✦</span>
      <span>Export Grade Quality</span>
      <span style={{ color:'rgba(232,83,26,0.5)' }}>✦</span>
      <span>Chemical-Free Products</span>
      <span style={{ color:'rgba(245,168,0,0.5)' }}>✦</span>
      <span>Global Delivery</span>
      <span style={{ color:'rgba(232,83,26,0.5)' }}>✦</span>
      <span>Reliable Supply</span>
      <span style={{ color:'rgba(245,168,0,0.5)' }}>✦</span>
      <span>Local Roots. Global Reach.</span>
      <span style={{ color:'rgba(232,83,26,0.5)' }}>✦</span>
    </div>
  )
}

// ─── Magnetic effect (pure JS, no gsap dependency) ───────────────────────
function MagneticPill({ as: Tag = 'button', href, onClick, className, style, children }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - r.left - r.width / 2
      const y = e.clientY - r.top - r.height / 2
      el.style.transform = `translate(${x*0.28}px, ${y*0.28}px) scale(1.04)`
    }
    const onLeave = () => {
      el.style.transform = ''
      el.style.transition = 'transform 0.7s cubic-bezier(0.34,1.56,0.64,1), background 0.35s, border-color 0.35s, box-shadow 0.35s'
    }
    const onEnter = () => { el.style.transition = 'transform 0.2s ease, background 0.35s, border-color 0.35s, box-shadow 0.35s' }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    el.addEventListener('mouseenter', onEnter)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); el.removeEventListener('mouseenter', onEnter) }
  }, [])

  const props = { ref, onClick, className: `val-pill ${className||''}`, style }
  if (Tag === 'a') props.href = href

  return <Tag {...props}>{children}</Tag>
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────
export function CinematicFooter() {
  const wrapperRef = useRef(null)
  const bgTextRef = useRef(null)
  const headingRef = useRef(null)
  const pillsRef = useRef(null)

  useEffect(() => {
    // Try to use GSAP if available (optional)
    let gsapLoaded = false
    try {
      import('gsap').then(({ gsap }) => {
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger)
          gsapLoaded = true
          if (!wrapperRef.current) return

          const ctx = gsap.context(() => {
            if (bgTextRef.current) {
              gsap.fromTo(bgTextRef.current,
                { y:'8vh', scale:0.85, opacity:0 },
                { y:'0vh', scale:1, opacity:1, ease:'power1.out',
                  scrollTrigger: { trigger:wrapperRef.current, start:'top 80%', end:'bottom bottom', scrub:1 } }
              )
            }
            const targets = [headingRef.current, pillsRef.current].filter(Boolean)
            if (targets.length) {
              gsap.fromTo(targets,
                { y:40, opacity:0 },
                { y:0, opacity:1, stagger:0.15, ease:'power3.out',
                  scrollTrigger: { trigger:wrapperRef.current, start:'top 45%', end:'bottom bottom', scrub:1 } }
              )
            }
          }, wrapperRef)

          return () => ctx.revert()
        }).catch(() => {})
      }).catch(() => {})
    } catch {}
  }, [])

  const scrollToTop = () => window.scrollTo({ top:0, behavior:'smooth' })

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FOOTER_STYLES }} />

      {/* Curtain wrapper — clips the fixed footer to this section */}
      <div ref={wrapperRef} className="val-footer-wrap" style={{ position:'relative', height:'100vh', width:'100%', clipPath:'polygon(0 0,100% 0,100% 100%,0 100%)' }}>

        <footer style={{
          position:'fixed', bottom:0, left:0, width:'100%', height:'100vh',
          background:'linear-gradient(160deg,#0a1e14 0%,#0f2820 50%,#0a1a10 100%)',
          display:'flex', flexDirection:'column', justifyContent:'space-between',
          overflow:'hidden', color:'#fff',
        }}>
          {/* Ambient glow */}
          <div className="val-footer-aurora" style={{ position:'absolute', left:'50%', top:'50%', width:'80vw', height:'60vh', borderRadius:'50%', blur:'80px', filter:'blur(80px)', zIndex:0, pointerEvents:'none' }} />
          {/* Grid bg */}
          <div className="val-footer-grid-bg" style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none' }} />

          {/* Giant text */}
          <div ref={bgTextRef} className="val-bg-text" style={{ position:'absolute', bottom:'-4vh', left:'50%', transform:'translateX(-50%)', whiteSpace:'nowrap', zIndex:0, pointerEvents:'none' }}>
            VAL GLOBAL
          </div>

          {/* ── Marquee strip ── */}
          <div style={{ position:'relative', zIndex:10, marginTop:'3rem', borderTop:'1px solid rgba(255,255,255,0.06)', borderBottom:'1px solid rgba(255,255,255,0.06)', background:'rgba(0,0,0,0.3)', backdropFilter:'blur(12px)', padding:'14px 0', transform:'rotate(-1.5deg) scale(1.08)', overflow:'hidden' }}>
            <div className="val-marquee-track" style={{ fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.35)' }}>
              <MarqueeItem /><MarqueeItem />
            </div>
          </div>

          {/* ── Main center content ── */}
          <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 6%', position:'relative', zIndex:5 }}>
            <h2 ref={headingRef} className="val-footer-heading" style={{ fontSize:'clamp(3rem,7vw,7rem)', fontWeight:900, letterSpacing:'-0.04em', marginBottom:'2.5rem', textAlign:'center', lineHeight:0.95, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
              Ready to begin?
            </h2>

            <div ref={pillsRef} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem', width:'100%' }}>
              {/* Primary actions */}
              <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'1rem' }}>
                <MagneticPill as="a" href="#contact" style={{ padding:'16px 40px', borderRadius:'100px', fontWeight:700, fontSize:'0.9rem' }}>
                  <span>📩</span> Send an Enquiry
                </MagneticPill>
                <MagneticPill as="a" href="#products" style={{ padding:'16px 40px', borderRadius:'100px', fontWeight:700, fontSize:'0.9rem' }}>
                  <span>🌾</span> View Products
                </MagneticPill>
              </div>
              {/* Secondary links */}
              <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'0.8rem', marginTop:'0.5rem' }}>
                {['About Us','Our Process','Why Choose Us','Global Reach'].map(lbl => (
                  <MagneticPill key={lbl} as="a" href={`#${lbl.toLowerCase().replace(/ /g,'-')}`} style={{ padding:'10px 22px', borderRadius:'100px', fontSize:'0.76rem', fontWeight:600 }}>
                    {lbl}
                  </MagneticPill>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div style={{ position:'relative', zIndex:20, padding:'1.5rem 6%', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:'1rem', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
            {/* Left: brand */}
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <img src="/images/logo-color.webp" alt="VAL" style={{ height:38, width:38, objectFit:'contain', borderRadius:4, filter:'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }} />
              <div>
                <div style={{ fontWeight:800, fontSize:'0.88rem', color:'#fff' }}>VAL Global Commodities</div>
                <div style={{ fontSize:'0.6rem', color:'rgba(245,168,0,0.7)', letterSpacing:'0.15em', textTransform:'uppercase' }}>info@valglobalcommodities.com</div>
              </div>
            </div>

            {/* Center: made with love */}
            <div className="val-pill" style={{ padding:'8px 20px', borderRadius:'100px', fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', cursor:'default' }}>
              Crafted with <span className="val-heartbeat" style={{ color:'#E8531A', margin:'0 4px' }}>❤</span> from India
            </div>

            {/* Right: back to top */}
            <MagneticPill onClick={scrollToTop} style={{ width:44, height:44, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', padding:0 }}>
              <span className="val-arrow-bounce" style={{ fontSize:'1rem' }}>↑</span>
            </MagneticPill>
          </div>

        </footer>
      </div>
    </>
  )
}
