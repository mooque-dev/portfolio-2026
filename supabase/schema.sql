-- Allen Kang Portfolio — Gateway Schema
-- Run this in your Supabase SQL Editor

-- ── Visitor responses to daily questions ──────────────────────────────────────

create table if not exists gateway_responses (
  id           uuid default gen_random_uuid() primary key,
  question_id  text not null,
  answer       text not null check (char_length(answer) <= 500),
  display_name text check (char_length(display_name) <= 80),
  created_at   timestamptz default now() not null
);

create index if not exists gateway_responses_question_id_idx
  on gateway_responses (question_id, created_at desc);

alter table gateway_responses enable row level security;

create policy "responses are readable by everyone"
  on gateway_responses for select using (true);

create policy "anyone can leave a response"
  on gateway_responses for insert
  with check (char_length(answer) > 0 and char_length(answer) <= 500);


-- ── Visitor questions for Allen ────────────────────────────────────────────────
-- Allen reviews these in the Supabase dashboard and replies personally.

create table if not exists visitor_questions (
  id                  uuid default gen_random_uuid() primary key,
  question            text not null check (char_length(question) <= 1000),
  contact             text check (char_length(contact) <= 200),
  context_question_id text,   -- which gateway question prompted this
  is_anonymous        boolean default true,
  replied             boolean default false,
  created_at          timestamptz default now() not null
);

create index if not exists visitor_questions_created_idx
  on visitor_questions (created_at desc);

-- Only Allen can read questions (use service role key in a private admin route)
-- Visitors can only insert
alter table visitor_questions enable row level security;

create policy "only service role can read questions"
  on visitor_questions for select using (false);

create policy "anyone can ask a question"
  on visitor_questions for insert
  with check (char_length(question) > 0 and char_length(question) <= 1000);
