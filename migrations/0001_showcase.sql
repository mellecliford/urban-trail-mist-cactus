create table if not exists showcase_items (
  id text primary key,
  division text not null check (division in ('unity', 'edevops')),
  name text not null,
  slug text not null unique,
  category text not null default '',
  status text not null default '',
  summary text not null default '',
  summary_fr text not null default '',
  href text not null default '',
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into showcase_items (
  id, division, name, slug, category, status, summary, summary_fr, href, published, sort_order
)
select
  'shweng',
  'edevops',
  'Shweng',
  'shweng',
  'Cross-network exchange',
  'In development',
  'A cross-network value exchange application currently being developed by eveDev Ops.',
  'Une application d’échange de valeur inter-réseaux actuellement développée par eveDev Ops.',
  '/products/shweng',
  true,
  1
where not exists (select 1 from showcase_items where slug = 'shweng');
