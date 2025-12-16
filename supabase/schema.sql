-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. categories table
create table categories (
  id uuid default uuid_generate_v4() primary key,
  slug text not null unique,
  name_ta text not null, -- Tamil Name (e.g., "செய்திகள்")
  name_en text not null, -- English Name (e.g., "News")
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. authors table (profiles)
create table authors (
  id uuid references auth.users not null primary key,
  full_name text,
  avatar_url text,
  role text default 'editor' check (role in ('admin', 'editor', 'writer')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. articles table
create table articles (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  summary text, -- AI generated summary
  content text not null, -- HTML or Markdown content
  image_url text,
  
  -- Metadata
  category_id uuid references categories(id),
  author_id uuid references authors(id),
  
  -- SEO & AI Specifics
  is_published boolean default false,
  published_at timestamp with time zone,
  
  -- AI Fields
  tags text[], -- Array of strings
  ai_summary_ta text, -- Tamil AI Summary
  ai_short_audio_url text, -- URL to AI generated audio summary
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies (Row Level Security)
alter table articles enable row level security;
alter table categories enable row level security;
alter table authors enable row level security;

-- Public can read published articles
create policy "Public articles are viewable by everyone"
  on articles for select
  using ( is_published = true );

-- Editors can do everything
create policy "Editors can insert/update/delete articles"
  on articles for all
  using ( auth.uid() in (select id from authors where role in ('admin', 'editor')) );
