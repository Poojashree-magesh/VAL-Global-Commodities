/**
 * <LogoWatermark> — renders the VAL Global logo as a transparent
 * centered watermark behind section content.
 *
 * Props:
 *   theme: 'light' | 'dark'
 *     light → section bg is white/cream → uses warm orange filter
 *     dark  → section bg is green/black → uses bright ghost filter
 */
export default function LogoWatermark({ theme = 'light' }) {
  return (
    <div className={`logo-wm wm-${theme}`} aria-hidden="true">
      <img src="/images/logo-color.webp" alt="" />
    </div>
  )
}
