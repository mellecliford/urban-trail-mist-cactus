create table if not exists admin_account (
  id text primary key,
  username text not null unique,
  password_hash text not null,
  updated_at timestamptz not null default now()
);
