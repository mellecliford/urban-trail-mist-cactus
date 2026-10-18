alter table desk_posts add column if not exists score integer not null default 0;
alter table desk_posts add column if not exists has_audio boolean not null default false;
alter table desk_posts add column if not exists audio_mime text not null default '';
alter table desk_posts add column if not exists audio bytea;
alter table desk_replies add column if not exists score integer not null default 1;

create table if not exists desk_votes (
  voter text not null,
  target text not null,
  direction smallint not null check (direction in (-1, 1)),
  primary key (voter, target)
);

update desk_posts set score = 14 where id = 'what-we-do' and score = 0;
update desk_posts set score = 9 where id = 'unity-or-dev' and score = 0;
update desk_posts set score = 6 where id = 'both' and score = 0;
update desk_posts set score = 4 where id = 'shweng-q' and score = 0;
