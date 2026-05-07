import { useState } from "react";
import SectionReveal, { StaggerReveal } from "./SectionReveal";
import LogoWatermark from "./LogoWatermark";

const products = [
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
    cat: "agri healthy",
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
    tags: ["Farm Sourced", "Quality Graded", "Bulk Supply"],
    img: "/images/eggs.webp",
  },
  {
    cat: "oils",
    icon: "🫙",
    title: "Cooking Oils",
    catLabel: "Oils",
    items:
      "Refined & Edible Cooking Oils (All Types), Chekku / Cold-Pressed Oils (Natural & Organic), Spray Can Cooking Oils (Private Label)",
    tags: ["Bulk & Retail", "Private Label", "Export-Ready"],
    img: "/images/oil.webp",
  },
  {
    cat: "coconut",
    icon: "🥥",
    title: "Coconut & Coconut-Based Products",
    catLabel: "Coconut",
    items: "Fresh Coconut, Copra, Desiccated Coconut, Cold-Pressed Coconut Oil",
    tags: ["Bulk Supply", "Export Packaging", "Wholesale & Retail"],
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
      "Bedspreads, Handmade Bags, Pouches, Curtains, Pillow Covers, Baskets, Travel Bags, Baby Hammocks",
    tags: ["Handmade", "Artisan", "Eco-Friendly"],
    img: "/images/lifestyle.webp",
  },
];

const filters = [
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

  // ✅ CLEAN FILTER LOGIC =
  const filtered = products.filter((p) => {
    if (active === "all") return true;

    if (active === "agri") {
      return (
        p.title === "Fruits & Vegetables" ||
        p.title === "Nutri-Cereals" ||
        p.title === "Rice Varieties"
      );
    }
    if (active === "masala") {
      return p.title === "Spices" || p.title === "Masala Blends";
    }
    if (active === "poultry") {
      return p.title === "Poultry Products";
    }
    if (active === "oils") {
      return p.title === "Cooking Oils";
    }
    if (active === "coconut") {
      return p.title === "Coconut & Coconut-Based Products";
    }

    if (active === "healthy") {
      return (
        p.title === "Nutri-Cereals" ||
        p.title === "Healthy Products" ||
        p.title === "Natural Sweeteners"
      );
    }
    if (active === "beverage") {
      return p.title === "Tea & Coffee";
    }
    if (active === "lifestyle") {
      return p.title === "Lifestyle Products";
    }

    return false;
  });

  return (
    <>
      <style>{`
         .products-section { padding:100px 7%; background:#F5F3EF; position:relative; overflow:hidden; }
         .products-header { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:3.5rem; flex-wrap:wrap; gap:1.5rem; position:relative; z-index:2; }
         .filter-bar { display:flex; gap:0.5rem; flex-wrap:wrap; }
         .filter-btn { padding:8px 18px; cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.76rem; font-weight:600; border:1.5px solid #d5d0c9; color:#777; background:transparent; transition:all 0.2s; letter-spacing:0.06em; text-transform:uppercase; }
         .filter-btn.on { background:#1F4D3B; color:#fff; border-color:#1F4D3B; }
         .filter-btn:hover:not(.on) { border-color:#E8531A; color:#E8531A; }
         /* 4-col for 8 cards, 3-col when more cards are shown */
         .products-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1.5rem; position:relative; z-index:2; }
         .prod-card { background:#fff; overflow:hidden; transition:transform 0.35s, box-shadow 0.35s; cursor:pointer; display:flex; flex-direction:column; height:100%; }
         .prod-card:hover { transform:translateY(-8px); box-shadow:0 28px 64px rgba(31,77,59,0.13); }
         .prod-img { height:190px; overflow:hidden; position:relative; background:#eae6e0; }
         .prod-img img { width:100%; height:100%; object-fit:cover; transition:transform 0.7s; }
         .prod-card:hover .prod-img img { transform:scale(1.08); }
         .prod-cat-badge { position:absolute; top:12px; left:12px; background:#1F4D3B; color:#fff; font-size:0.6rem; font-weight:700; padding:4px 10px; }
         /* New badge colour for the 3 new categories */
         .prod-cat-badge.badge-poultry  { background:#8B5E3C; }
         .prod-cat-badge.badge-oils     { background:#2a6b52; }
         .prod-cat-badge.badge-beverage { background:#153628; }
         .prod-cat-badge.badge-coconut  { background:#5a7a2e; }
         .prod-body { padding:1.4rem; display:flex; flex-direction:column; flex:1; }
         .prod-title { font-size:0.95rem; font-weight:800; color:#1F4D3B; margin-bottom:0.5rem; }
         .prod-items { font-size:0.82rem; color:#666; margin-bottom:1rem; min-height:60px; }
         .prod-tags { display:flex; gap:6px; flex-wrap:wrap; margin-top:auto; }
         .prod-tag { background:#F5F3EF; color:#8B5E3C; font-size:0.64rem; padding:3px 10px; }
         @media(max-width:1100px){ .products-grid{ grid-template-columns:repeat(3,1fr); } }
         @media(max-width:768px) { .products-grid{ grid-template-columns:repeat(2,1fr); } }
         @media(max-width:480px) { .products-grid{ grid-template-columns:1fr; } }
      `}</style>

      <section className="products-section" id="products">
        <LogoWatermark theme="light" />

        <div className="products-header">
          <SectionReveal className="reveal-left">
            <div className="eyebrow">What We Offer</div>
            <h2 className="stitle">Our Product Categories</h2>
          </SectionReveal>

          <SectionReveal className="reveal-right">
            <div className="filter-bar">
              {filters.map((f) => (
                <button
                  key={f.key}
                  className={`filter-btn ${active === f.key ? "on" : ""}`}
                  onClick={() => setActive(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </SectionReveal>
        </div>

        <StaggerReveal tag="div" className="products-grid">
          {filtered.map((p, i) => (
            <div key={i} className="prod-card">
              <div className="prod-img">
                <img src={p.img} alt={p.title} />
                <span className="prod-cat-badge">{p.catLabel}</span>
              </div>

              <div className="prod-body">
                <h3 className="prod-title">
                  {p.icon} {p.title}
                </h3>
                <div className="prod-items">{p.items}</div>
                <div className="prod-tags">
                  {p.tags.map((tag) => (
                    <span key={tag} className="prod-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </StaggerReveal>
      </section>
    </>
  );
}
