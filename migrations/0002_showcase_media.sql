alter table showcase_items add column if not exists has_media boolean not null default false;

create table if not exists showcase_media (
  item_id text primary key references showcase_items(id) on delete cascade,
  mime text not null,
  bytes bytea not null
);
