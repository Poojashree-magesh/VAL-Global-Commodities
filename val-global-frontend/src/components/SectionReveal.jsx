import { useEffect, useRef } from "react";

/**
 * <SectionReveal> — wraps children and adds scroll-reveal.
 *
 * Props:
 *   className: string  — 'reveal' | 'reveal-left' | 'reveal-right' | 'reveal-scale'
 *   delay:     string  — e.g. '0.1s' extra transition-delay
 *   tag:       string  — wrapper element, default 'div'
 *   style:     object  — inline styles
 *   threshold: number  — IntersectionObserver threshold (default 0.1)
 */
export default function SectionReveal({
  children,
  className = "reveal",
  delay = "0s",
  tag: Tag = "div",
  style = {},
  threshold = 0.1,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set extra delay via inline style if provided
    if (delay && delay !== "0s") {
      const existing = el.style.transitionDelay;
      el.style.transitionDelay = delay;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <Tag ref={ref} className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * <StaggerReveal> — parent container whose direct children stagger-reveal
 * Wrap with stagger class; each child needs its own reveal class.
 */
export function StaggerReveal({
  children,
  className = "",
  tag: Tag = "div",
  style = {},
  threshold = 0.08,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add visible to each child sequentially
          Array.from(el.children).forEach((child, i) => {
            setTimeout(() => child.classList.add("visible"), i * 90);
          });
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag ref={ref} className={`stagger ${className}`} style={style} {...rest}>
      {children}
    </Tag>
  );
}
