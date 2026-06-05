-- Allen Kang Portfolio — Gateway Responses Schema
-- Run this in your Supabase SQL Editor

create table if not exists gateway_responses (
  id          uuid default gen_random_uuid() primary key,
  question_id text not null,
  answer      text not null check (char_length(answer) <= 500),
  display_name text check (char_length(display_name) <= 80),
  created_at  timestamptz default now() not null
);

-- Index for fast lookup by question
create index if not exists gateway_responses_question_id_idx
  on gateway_responses (question_id, created_at desc);

-- Row Level Security: anyone can read + insert, nobody can update/delete
alter table gateway_responses enable row level security;

create policy "responses are readable by everyone"
  on gateway_responses for select
  using (true);

create policy "anyone can leave a response"
  on gateway_responses for insert
  with check (
    char_length(answer) > 0
    and char_length(answer) <= 500
  );
