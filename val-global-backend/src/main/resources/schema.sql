-- ============================================================
-- VAL Global Commodities — MySQL Database Schema
-- Run this entire file in MySQL Workbench
-- ============================================================

-- 1. Create and select the database
CREATE DATABASE IF NOT EXISTS val_global_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE val_global_db;

-- ============================================================
-- 2. TABLE: products
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(150)  NOT NULL,
    category      VARCHAR(100)  NOT NULL,
    category_key  VARCHAR(50),
    description   TEXT,
    items         TEXT,
    tags          VARCHAR(300),
    image_path    VARCHAR(300),
    is_active     TINYINT(1)    DEFAULT 1,
    created_at    DATETIME      DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 3. TABLE: export_markets
-- ============================================================
CREATE TABLE IF NOT EXISTS export_markets (
    id                 BIGINT AUTO_INCREMENT PRIMARY KEY,
    name               VARCHAR(100) NOT NULL,
    flag_emoji         VARCHAR(10),
    products_exported  VARCHAR(500),
    is_active          TINYINT(1)   DEFAULT 1,
    created_at         DATETIME     DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 4. TABLE: enquiries
-- ============================================================
CREATE TABLE IF NOT EXISTS enquiries (
    id               BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name       VARCHAR(100)  NOT NULL,
    last_name        VARCHAR(100)  NOT NULL,
    email            VARCHAR(150)  NOT NULL,
    phone            VARCHAR(20),
    company          VARCHAR(200),
    country          VARCHAR(100),
    product_interest VARCHAR(200),
    message          TEXT,
    catalogue_requested TINYINT(1) NOT NULL DEFAULT 0,
    status           ENUM('NEW','IN_PROGRESS','REPLIED','CLOSED') DEFAULT 'NEW',
    created_at       DATETIME      DEFAULT CURRENT_TIMESTAMP,
    updated_at       DATETIME      DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_email   (email),
    INDEX idx_status  (status),
    INDEX idx_country (country)
);

-- ============================================================
-- 5. SEED DATA: products
-- ============================================================
INSERT INTO products (name, category, category_key, description, items, tags, image_path) VALUES
(
  'Fruits & Vegetables', 'Agriculture', 'agri',
  'Farm-direct sourcing of fresh vegetables, export-grade quality, consistent bulk supply.',
  'Onion (Bellary & Small Onion), Garlic, Potato, Green Chilli',
  'Farm Direct,Export Grade,Bulk Supply',
  '/images/vegetables.jpg'
),
(
  'Rice Varieties', 'Rice', 'agri',
  'Traditional and modern rice varieties including heritage GI rice types.',
  'Ponni, Idly Rice, Seeraga Samba, Karuppu Kavuni, Mapillai Samba, Poongar',
  'Low GI,Traditional,Easy Digestion',
  '/images/rice.jpg'
),
(
  'Spices', 'Spices', 'agri',
  'GI-origin spices sourced chemical-free from cooperative spice growers.',
  'Red Chilli, Turmeric, Black Pepper, Cardamom, Cumin, Coriander, Nutmeg & Mace',
  'GI Origin,Chemical-Free,Premium',
  '/images/spices.jpg'
),
(
  'Masala Blends', 'Masala', 'masala',
  '100% pure masala blends with no adulteration, authentic regional recipes.',
  'Chicken Masala, Mutton Masala, Fish Masala, Sambar Powder, Rasam Powder, Idly Podi',
  '100% Pure,No Adulteration,Authentic',
  '/images/masala.jpg'
),
(
  'Poultry Products',
  'Poultry',
  'poultry',
  'Fresh, high-quality eggs with scalable supply sourced from reliable poultry farms. Clean handling, quality grading, bulk supply for wholesale markets.',
  'White Eggs, Brown Country Eggs. Future Expansion: Frozen Chicken & Poultry Products',
  'Farm Sourced,Quality Graded,Bulk Supply',
  '/images/eggs.jpg'
),
(
  'Cooking Oils',
  'Oils',
  'oils',
  'Versatile, high-quality oils for global markets. Multiple sourcing options from refined to natural, bulk & retail supply, private labeling capability, export-compliant packaging.',
  'Refined & Edible Cooking Oils (All Types Available), Chekku / Cold-Pressed Oils (Natural & Organic), Spray Can Cooking Oils (Private Label / Custom Branding)',
  'Bulk & Retail,Private Label,Export-Ready',
  '/images/oil.jpg'
),
(
  'Coconut & Coconut-Based Products',
  'Coconut',
  'coconut',
  'Available in bulk supply and customized export packaging. Suitable for wholesale distribution and retail markets.',
  'Fresh Coconut, Copra, Desiccated Coconut, Cold-Pressed Coconut Oil',
  'Bulk Supply,Export Packaging,Wholesale & Retail',
  '/images/coconut.jpg'
);
(
  'Nutri-Cereals', 'Nutri-Cereals', 'agri',
  'High fiber, nutrient-rich millet varieties sourced directly from millet cultivators.',
  'Foxtail Millet, Pearl Millet, Finger Millet, Kodo Millet, Little Millet, Barnyard Millet, Millet Flakes',
  'High Fiber,Chemical-Free,Nutrient-Rich',
  '/images/grains.jpg'
),
(
  'Natural Sweeteners', 'Sweeteners', 'healthy',
  'Low GI natural sweeteners with no chemical processing.',
  'Palm Sugar, Palm Karupatti, Coconut Sugar',
  'Low GI,No Chemicals,Natural',
  '/images/jaggery.jpg'
),
(
  'Healthy Products', 'Healthy', 'healthy',
  'Organic moringa and wild honey processed by women SHG groups.',
  'Moringa Powder (organic, residue-free), Wild Honey (Javvathu Hills, women SHG processed)',
  'Organic,Women SHG,Wild-Sourced',
  '/images/honey.jpg'
),
(
  'Tea & Coffee',
  'Beverages',
  'beverage',
  'Estate-sourced premium beverages. Fresh sourcing, consistent quality, suitable for bulk export and retail. Directly sourced from tea and coffee estates.',
  'Premium Nilgiris / Assam Tea (directly sourced from tea estates, first-quality leaves), Coorg Coffee Beans (estate-direct sourcing, high-grade beans with rich aroma)',
  'Estate-Direct,Bulk Export,Retail Ready',
  '/images/tea-coffee.jpg'
),
(
  'Lifestyle Products', 'Lifestyle', 'lifestyle',
  'Handmade artisan products crafted by local artisans and women groups.',
  'Bedspreads, Handmade Bags, Pouches, Curtains, Pillow Covers, Baskets, Travel Bags, Baby Hammocks',
  'Handmade,Artisan,Eco-Friendly',
  '/images/lifestyle.jpg'
);


-- ============================================================
-- 6. SEED DATA: export_markets
-- ============================================================
INSERT INTO export_markets (name, flag_emoji, products_exported) VALUES
('Malaysia',              '🇲🇾', 'Spices, Rice, Millets & Lifestyle Products'),
('United Arab Emirates',  '🇦🇪', 'Vegetables, Spices, Natural Sweeteners & Masalas'),
('Europe',                '🌍', 'Organic Products, Healthy Range & Traditional Varieties');

-- ============================================================
-- 7. SEED DATA: sample enquiries (for testing)
-- ============================================================
INSERT INTO enquiries (first_name, last_name, email, phone, company, country, product_interest, message, catalogue_requested, status) VALUES
('Ahmed',   'Hassan',  'ahmed@example.com',  '+971501234567', 'Al Baraka Trading',   'UAE',          'Spices',        'We are interested in bulk spice imports. Please share catalogue.', 1, 'NEW'),
('Lee',     'Wei',     'lee@example.com',    '+601112345678', 'Global Foods Sdn Bhd','Malaysia',     'Rice Varieties','Looking for Seeraga Samba and Ponni rice. What is the MOQ?',        0, 'IN_PROGRESS'),
('Sophie',  'Müller',  'sophie@example.com', '+49301234567',  'Naturkost GmbH',      'Germany',      'Healthy Products','Interested in Moringa Powder. Do you have organic certification?',  1, 'REPLIED');

-- ============================================================
-- 8. VERIFY — quick check
-- ============================================================
SELECT 'products' AS table_name, COUNT(*) AS total_rows FROM products
UNION ALL
SELECT 'export_markets', COUNT(*) FROM export_markets;
