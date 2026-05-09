import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const MOBILE_REVEAL_QUERY = "(max-width: 768px)";

function useIsMobileRevealTarget() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(MOBILE_REVEAL_QUERY).matches
      : false,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia(MOBILE_REVEAL_QUERY);
    const handleChange = (event) => setIsMobile(event.matches);

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}

// Build a srcSet from the base image path by appending width suffixes that
// match the responsive variants generated under public/images.
// e.g. "/images/vegetables.webp" -> "/images/vegetables-480.webp 480w, ..."
const buildSrcSet = (path) => {
  const dot = path.lastIndexOf(".");
  if (dot === -1) return undefined;
  const base = path.slice(0, dot);
  const ext = path.slice(dot);
  return [480, 768, 1200].map((w) => `${base}-${w}${ext} ${w}w`).join(", ");
};

const PRODUCTS = [
  {
    cat: "agri",
    icon: "🥕",
    title: "Fruits & Vegetables",
    catLabel: "Agriculture",
    items: "Onion (Bellary & Small Onion), Garlic, Potato, Green Chilli",
    tags: ["Farm Direct", "Export Grade", "Bulk Supply"],
    img: "/images/vegetables.webp",
  },
  {
    cat: "agri",
    icon: "🍚",
    title: "Rice Varieties",
    catLabel: "Rice",
    items:
      "Ponni, Idly Rice, Seeraga Samba, Karuppu Kavuni, Mapillai Samba, Poongar",
    tags: ["Low GI", "Traditional", "Easy Digestion"],
    img: "/images/rice.webp",
  },
  {
    cat: "masala",
    icon: "🌶",
    title: "Spices",
    catLabel: "Spices",
    items:
      "Red Chilli, Turmeric, Black Pepper, Cardamom, Cumin, Coriander, Nutmeg & Mace",
    tags: ["GI Origin", "Chemical-Free", "Premium"],
    img: "/images/spices.webp",
  },
  {
    cat: "masala",
    icon: "🫙",
    title: "Masala Blends",
    catLabel: "Masala",
    items:
      "Chicken Masala, Mutton Masala, Fish Masala, Sambar Powder, Rasam Powder, Idly Podi",
    tags: ["100% Pure", "No Adulteration", "Authentic"],
    img: "/images/masala.webp",
  },
  {
    cat: "poultry",
    icon: "🥚",
    title: "Poultry Products",
    catLabel: "Poultry",
    items:
      "White Eggs, Brown Country Eggs. Future Expansion: Frozen Chicken & Poultry Products",
    tags: ["Farm Sourced", "Grade A", "Bulk Orders"],
    img: "/images/eggs.webp",
  },
  {
    cat: "oils",
    icon: "🫙",
    title: "Cooking Oils",
    catLabel: "Oils",
    items:
      "Refined & Edible Cooking Oils, Chekku / Cold-Pressed Oils, Spray Can Cooking Oils (Private Label)",
    tags: ["Bulk & Retail", "Private Label", "Global"],
    img: "/images/oil.webp",
  },
  {
    cat: "coconut",
    icon: "🥥",
    title: "Coconut-Based Products",
    catLabel: "Coconut",
    items: "Fresh Coconut, Copra, Desiccated Coconut, Cold-Pressed Coconut Oil",
    tags: ["Bulk & Trade", "Export Pack", "Wholesale"],
    img: "/images/coconut.webp",
  },
  {
    cat: "agri",
    icon: "🌾",
    title: "Nutri-Cereals",
    catLabel: "Nutri-Cereals",
    items:
      "All Millet Varieties & Millet Flakes — Foxtail, Pearl, Finger, Kodo, Little, Barnyard",
    tags: ["High Fiber", "Chemical-Free", "Nutrient-Rich"],
    img: "/images/grains.webp",
  },
  {
    cat: "healthy",
    icon: "🍯",
    title: "Natural Sweeteners",
    catLabel: "Sweeteners",
    items: "Palm Sugar, Palm Karupatti, Coconut Sugar",
    tags: ["Low GI", "No Chemicals", "Natural"],
    img: "/images/jaggery.webp",
  },
  {
    cat: "healthy",
    icon: "🌿",
    title: "Healthy Products",
    catLabel: "Healthy",
    items:
      "Moringa Powder (organic, residue-free), Wild Honey — Javvathu Hills, women SHG processed",
    tags: ["Organic", "Women SHG", "Wild-Sourced"],
    img: "/images/honey.webp",
  },
  {
    cat: "beverage",
    icon: "🍵",
    title: "Tea & Coffee",
    catLabel: "Beverages",
    items:
      "Premium Nilgiris / Assam Tea (estate-direct), Coorg Coffee Beans (high-grade, rich aroma)",
    tags: ["Estate-Direct", "Bulk Export", "Retail Ready"],
    img: "/images/tea-coffee.webp",
  },
  {
    cat: "lifestyle",
    icon: "🧺",
    title: "Lifestyle Products",
    catLabel: "Lifestyle",
    items:
      "Bedspreads, Handmade Bags, Pouches, Curtains, Pillow Covers, Baskets, Travel Bags",
    tags: ["Handmade", "Artisan", "Eco-Friendly"],
    img: "/images/lifestyle.webp",
  },
];

const FILTERS = [
  { key: "all", label: "All" },
  { key: "agri", label: "Agriculture" },
  { key: "masala", label: "Masala" },
  { key: "poultry", label: "Poultry" },
  { key: "oils", label: "Oils" },
  { key: "coconut", label: "Coconut" },
  { key: "healthy", label: "Healthy" },
  { key: "beverage", label: "Beverages" },
  { key: "lifestyle", label: "Lifestyle" },
];

export default function Products() {
  const [active, setActive] = useState("all");
  const isMobileReveal = useIsMobileRevealTarget();

  const sectionReveal = useMemo(
    () =>
      isMobileReveal
        ? {
            initial: { opacity: 0, y: 18 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.06, margin: "0px 0px 120px 0px" },
            transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] },
          }
        : {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.12 },
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          },
    [isMobileReveal],
  );

  const filtered = useMemo(
    () =>
      active === "all"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.cat.split(" ").includes(active)),
    [active],
  );

  return (
    <>
      <style>{`
        .products-section {
          padding: 90px 6.5%;
          background: #F5F3EF;
          position: relative;
        }
        .products-eyebrow {
          display: inline-flex; align-items: center; gap: 12px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.74rem; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #f59f00; margin-bottom: 1.1rem;
        }
        .products-eyebrow::before {
          content: ''; width: 28px; height: 1.5px;
          background: #E8531A; display: block;
        }
        .products-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(2.2rem, 4vw, 2.5rem);
          font-weight: 800; color: #1a1a1a;
          letter-spacing: -0.03em; line-height: 1.05;
          margin: 0 0 2.2rem;
          color:#3b3b3b;
        }
        .filter-bar {
          display: flex; gap: 0.55rem; flex-wrap: wrap;
          margin-bottom: 3rem;
        }
        .filter-btn {
          padding: 9px 20px; cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.74rem; font-weight: 700;
          border: 1.5px solid #d8d3cb;
          color: #777; background: transparent;
          letter-spacing: 0.12em; text-transform: uppercase;
          transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
          border-radius: 2px;
        }
        .filter-btn:hover:not(.on) {
          border-color: #1F4D3B; color: #1F4D3B;
        }
        .filter-btn.on {
          background: #1F4D3B; color: #fff; border-color: #1F4D3B;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .prod-card {
          background: #fff;
          display: flex;
          flex-direction: column;
          border-radius: 2px;
          overflow: hidden;
          box-shadow: 0 1px 2px rgba(31,77,59,0.04), 0 8px 24px rgba(31,77,59,0.05);
          will-change: transform;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .prod-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 8px rgba(31,77,59,0.06), 0 18px 38px rgba(31,77,59,0.1);
        }
        .prod-img {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #ece8e1;
          overflow: hidden;
          flex-shrink: 0;
        }
        .prod-img img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform 0.35s ease;
        }
        .prod-card:hover .prod-img img { transform: scale(1.06); }
        .prod-cat-badge {
          position: absolute; top: 12px; left: 12px;
          background: #1F4D3B; color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.66rem; font-weight: 700;
          letter-spacing: 0.06em;
          padding: 5px 12px; border-radius: 2px;
        }
        .prod-body {
          padding: 1.1rem 1.3rem 0.1rem;
          display: flex; flex-direction: column;
          flex: 1;
        }
        .prod-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1rem; font-weight: 800;
          color: #1F4D3B; margin: 0 0 0.1rem;
          letter-spacing: -0.01em;
          line-height: 1.3;
          display: flex; align-items: flex-start; gap: 8px;
          min-height: 1.6em;
        }
        .prod-title .ico { font-size: 1.05rem; line-height: 1.1; }
        .prod-items {
          font-size: 0.83rem; color: #6b6b6b;
          line-height: 1.55;
          margin: 10px 0.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: calc(0.85rem * 1.65 * 3);
        }
        .prod-tags {
          display: flex; flex-wrap: wrap;
          row-gap: 6px; column-gap: 6px;
          margin-top: auto;
          align-items: flex-start;
          align-content: flex-start;
          min-height: calc((0.66rem + 10px) * 2);
        }
        .prod-tag {
          background: #F5F3EF;
          color: #8B5E3C;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.62rem; font-weight: 600;
          letter-spacing: 0.04em;
          line-height: 1;
          padding: 6px 10px;
          border-radius: 2px;
          white-space: nowrap;
        }
        @media (max-width: 1200px) {
          .products-section { padding: 100px 5%; }
          .products-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 860px) {
          .products-section { padding: 80px 5%; }
          .products-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
          .filter-bar { margin-bottom: 2rem; }
        }
        @media (max-width: 520px) {
          .products-section { padding: 60px 6%; }
          .products-grid { grid-template-columns: 1fr; gap: 0.9rem; }
          .filter-btn { padding: 7px 12px; font-size: 0.8rem; letter-spacing: 0.06em; }
          .filter-bar { gap: 0.6rem; margin-bottom: 1.5rem; }

          /* Mobile: compact card with 50/50 image / body split. */
          .prod-card {
            display: grid;
            grid-template-rows: 1fr 1fr;
            aspect-ratio: 6 / 6;
            border-radius: 5px;
          }
          .prod-img {
            aspect-ratio: auto;
            width: 100%;
            height: 100%;
          }
          .prod-cat-badge {
            top: 10px; left: 10px;
            font-size: 0.6rem;
            padding: 4px 9px;
            border-radius: 2px;
          }
          .prod-body {
            padding: 0.85rem 0.95rem 1rem;
            gap: 0.4rem;
            overflow: hidden;
            min-height: 0;
          }
          .prod-title {
            font-size: 1.2rem;
            min-height: 0;
            gap: 6px;
          }
          .prod-title .ico { font-size: 0.95rem; margin-top: 3px; }
          .prod-items {
            font-size: 0.95rem;
            line-height: 1.45;
            -webkit-line-clamp: 2;
            min-height: 0;
          }
          .prod-tags { min-height: 0; row-gap: 5px; column-gap: 5px; padding-top: 0; }
          .prod-tag {
            font-size: 0.7rem;
            padding: 5px 8px;
            border-radius: 3px;
          }
        }
      `}</style>

      <motion.section
        className="products-section"
        id="products"
        style={{ willChange: "transform, opacity" }}
        {...sectionReveal}
      >
        <div className="products-eyebrow">What We Offer</div>
        <h2 className="products-title">Our Product Categories</h2>

        <div
          className="filter-bar"
          role="tablist"
          aria-label="Product categories"
        >
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={active === f.key}
              className={`filter-btn${active === f.key ? " on" : ""}`}
              onClick={() => setActive(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filtered.map((p, i) => {
            // First 2 cards are above the fold on most viewports — load eagerly.
            // The very first card gets fetchpriority="high" to avoid LCP stutter.
            const isPrimary = i === 0;
            const isAboveFold = i < 2;
            return (
              <article key={p.title} className="prod-card">
                <div className="prod-img">
                  <img
                    src={p.img}
                    srcSet={buildSrcSet(p.img)}
                    /* sizes mirrors the grid: 1col mobile, 2col tablet,
                       3col medium, 4col desktop — lets the browser pick the
                       smallest variant that still looks crisp. */
                    sizes="(max-width: 520px) 92vw,
                           (max-width: 860px) 46vw,
                           (max-width: 1200px) 30vw,
                           22vw"
                    alt={p.title}
                    loading={isAboveFold ? "eager" : "lazy"}
                    decoding="async"
                    fetchpriority={isPrimary ? "high" : "auto"}
                  />
                  <span className="prod-cat-badge">{p.catLabel}</span>
                </div>
                <div className="prod-body">
                  <h3 className="prod-title">
                    <span className="ico" aria-hidden="true">
                      {p.icon}
                    </span>
                    {p.title}
                  </h3>
                  <p className="prod-items">{p.items}</p>
                  <div className="prod-tags">
                    {p.tags.map((t) => (
                      <span key={t} className="prod-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </motion.section>
    </>
  );
}
