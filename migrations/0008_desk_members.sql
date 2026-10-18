create table if not exists desk_users (
  id text primary key,
  username text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now()
);

alter table desk_posts add column if not exists user_id text not null default '';
alter table desk_replies add column if not exists user_id text not null default '';
alter table desk_replies add column if not exists parent_id text not null default '';
