-- Create the 'news' table
create table if not exists news (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  summary text,
  content text,
  author text,
  date text,
  image_url text, -- mapped from imageUrl in code
  gallery text[], -- array of strings
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (optional but recommended)
alter table news enable row level security;

-- Create a policy that allows anyone to read
create policy "Public News are viewable by everyone" on news
  for select using (true);

-- Create a policy that allows authenticated users (or service role) to insert/update/delete
-- For dev/demo purposes, we might allow public insert if no auth is set up, 
-- but ideally this should be restricted. For now, we'll allow all for simplicity in this dev environment.
create policy "Enable all access for all users" on news
    for all using (true) with check (true);
