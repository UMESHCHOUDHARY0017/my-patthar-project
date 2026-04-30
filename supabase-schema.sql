-- Run this in Supabase SQL Editor (Database → SQL).
-- Creates tables for PattharHub lead capture.

create table if not exists public.godown_registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  owner_name text not null,
  phone text not null,
  city text not null,
  address text not null,
  size text not null,
  speciality text not null,
  photos text not null default '',
  whatsapp text not null
);

create table if not exists public.buyer_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  stone text not null,
  budget text not null,
  city text not null
);

alter table public.godown_registrations enable row level security;
alter table public.buyer_inquiries enable row level security;

-- Allow anonymous inserts (lead capture).
do $$ begin
  create policy "anon_insert_godown_registrations"
  on public.godown_registrations
  for insert
  to anon
  with check (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "anon_insert_buyer_inquiries"
  on public.buyer_inquiries
  for insert
  to anon
  with check (true);
exception when duplicate_object then null; end $$;
