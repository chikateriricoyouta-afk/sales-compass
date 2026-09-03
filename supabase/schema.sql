-- Sales Compass テスト結果保存機能 用テーブル。
-- Supabaseの SQL Editor に貼り付けて実行してください。

create table if not exists public.test_results (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nickname text not null,
  industry text not null,
  sales_target text,
  sales_style text not null,
  meeting_method text not null,
  experience text not null,
  answers jsonb not null,
  ability_scores jsonb not null,
  main_type text not null,
  sub_type text not null,
  overall_score integer not null,
  top_strengths jsonb not null,
  top_growth jsonb not null,
  accuracy_rating integer not null,
  length_rating text not null,
  most_useful text not null default '',
  too_much_or_unnecessary text not null default '',
  free_comment text not null default '',
  recommend_colleague text not null,
  willingness_to_pay text not null,
  price_sentiment text not null default ''
);

-- Row Level Security を有効化し、ポリシーを一切作らない。
-- アプリはservice_role キー(RLSを無視できる特別な鍵)でのみアクセスするため、
-- 万一anonキーが漏れても、誰もこのテーブルを直接読み書きできない状態にする。
alter table public.test_results enable row level security;
