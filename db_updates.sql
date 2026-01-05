-- Add 'category' column to the 'books' table
ALTER TABLE books 
ADD COLUMN IF NOT EXISTS category text;

-- Add external_url column to shirts table
ALTER TABLE shirts ADD COLUMN IF NOT EXISTS external_url TEXT;

-- Add category column to shirts table
ALTER TABLE shirts ADD COLUMN IF NOT EXISTS category TEXT;

-- Add external_url column to books table
ALTER TABLE books ADD COLUMN IF NOT EXISTS external_url TEXT;
