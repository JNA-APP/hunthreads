-- ============================================================
-- HUNTHREADS — Supabase Schema
-- Paste this into: Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- Singleton: Hero
CREATE TABLE IF NOT EXISTS hero (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  eyebrow TEXT NOT NULL DEFAULT 'EST. 2024',
  tagline TEXT NOT NULL DEFAULT 'TATTOO × BARBER × MERCH',
  mascot_src TEXT NOT NULL DEFAULT '/mascot.png',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Singleton: Services
CREATE TABLE IF NOT EXISTS services (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  tattoo_title TEXT NOT NULL DEFAULT 'Tattoo',
  tattoo_desc TEXT NOT NULL DEFAULT '',
  tattoo_list TEXT[] NOT NULL DEFAULT '{}',
  tattoo_link_label TEXT NOT NULL DEFAULT '',
  tattoo_link_href TEXT NOT NULL DEFAULT '',
  barber_title TEXT NOT NULL DEFAULT 'Barber',
  barber_desc TEXT NOT NULL DEFAULT '',
  barber_list TEXT[] NOT NULL DEFAULT '{}',
  barber_link_label TEXT NOT NULL DEFAULT '',
  barber_link_href TEXT NOT NULL DEFAULT '',
  merch_title TEXT NOT NULL DEFAULT 'Merch',
  merch_desc TEXT NOT NULL DEFAULT '',
  merch_list TEXT[] NOT NULL DEFAULT '{}',
  merch_link_label TEXT NOT NULL DEFAULT '',
  merch_link_href TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Singleton: About
CREATE TABLE IF NOT EXISTS about (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  stat1_num TEXT NOT NULL DEFAULT '',
  stat1_label TEXT NOT NULL DEFAULT '',
  stat2_num TEXT NOT NULL DEFAULT '',
  stat2_label TEXT NOT NULL DEFAULT '',
  stat3_num TEXT NOT NULL DEFAULT '',
  stat3_label TEXT NOT NULL DEFAULT '',
  story_p1 TEXT NOT NULL DEFAULT '',
  story_p2 TEXT NOT NULL DEFAULT '',
  value1_heading TEXT NOT NULL DEFAULT '',
  value1_body TEXT NOT NULL DEFAULT '',
  value2_heading TEXT NOT NULL DEFAULT '',
  value2_body TEXT NOT NULL DEFAULT '',
  value3_heading TEXT NOT NULL DEFAULT '',
  value3_body TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Singleton: Shop Page
CREATE TABLE IF NOT EXISTS shop_page (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  eyebrow TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  sub TEXT NOT NULL DEFAULT '',
  footer_note TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Collection: Products
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL,
  badge TEXT NOT NULL DEFAULT '',
  badge_mod TEXT NOT NULL DEFAULT '',
  image_src TEXT NOT NULL DEFAULT '',
  display_order INT NOT NULL DEFAULT 99,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Collection: Gallery
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  label TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 99,
  category TEXT NOT NULL CHECK (category IN ('tattoo', 'barber')),
  image_src TEXT NOT NULL DEFAULT '',
  placeholder_style TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Collection: BTS
CREATE TABLE IF NOT EXISTS bts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  label TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 99,
  image_src TEXT NOT NULL DEFAULT '',
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY — public read, service_role writes
-- ============================================================
ALTER TABLE hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_page ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE bts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read" ON hero FOR SELECT USING (true);
CREATE POLICY "public_read" ON services FOR SELECT USING (true);
CREATE POLICY "public_read" ON about FOR SELECT USING (true);
CREATE POLICY "public_read" ON shop_page FOR SELECT USING (true);
CREATE POLICY "public_read" ON products FOR SELECT USING (true);
CREATE POLICY "public_read" ON gallery FOR SELECT USING (true);
CREATE POLICY "public_read" ON bts FOR SELECT USING (true);

-- ============================================================
-- STORAGE — for image uploads via admin panel
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('cms-images', 'cms-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'cms-images');

CREATE POLICY "auth_upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'cms-images' AND auth.role() = 'authenticated');

CREATE POLICY "auth_delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'cms-images' AND auth.role() = 'authenticated');
