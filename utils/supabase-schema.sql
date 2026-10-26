-- SQL Script to create the database schema and storage bucket for Sticker Generator

-- 1. Create the stickers table
CREATE TABLE IF NOT EXISTS stickers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  supporter_name TEXT NOT NULL,
  template_id TEXT NOT NULL,
  image_url TEXT NOT NULL,
  downloads INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) to fix the security warning
ALTER TABLE stickers ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (anyone can generate a sticker)
CREATE POLICY "Allow public inserts on stickers" 
ON stickers FOR INSERT 
WITH CHECK (true);

-- Allow public viewing (anyone can see stickers)
CREATE POLICY "Allow public select on stickers" 
ON stickers FOR SELECT 
USING (true);

-- Allow public updates (for incrementing downloads and shares)
CREATE POLICY "Allow public updates on stickers" 
ON stickers FOR UPDATE 
USING (true)
WITH CHECK (true);

-- 2. Create the stickers_assets storage bucket (if not already exists)
-- Note: Supabase Dashboard UI might be easier for this step, but here is the SQL
INSERT INTO storage.buckets (id, name, public) 
VALUES ('stickers_assets', 'stickers_assets', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Set up Storage Policies (Allow public read, authenticated/anon upload)
-- Allow public viewing of files in the bucket
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'stickers_assets' );

-- Allow inserts (You might want to restrict this later based on auth)
CREATE POLICY "Allow public uploads" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'stickers_assets' );

-- 4. Create the news table
CREATE TABLE IF NOT EXISTS news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'Announcement',
  image_url TEXT,
  status TEXT DEFAULT 'published',
  author TEXT DEFAULT 'Admin',
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) for news table
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Allow public viewing of published news
CREATE POLICY "Allow public select on published news" 
ON news FOR SELECT 
USING (published = true);

-- Allow authenticated users to manage news
CREATE POLICY "Allow authenticated full access on news" 
ON news FOR ALL 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');
