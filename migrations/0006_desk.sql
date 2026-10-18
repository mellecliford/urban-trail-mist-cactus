create table if not exists desk_posts (
  id text primary key,
  kind text not null check (kind in ('essay', 'question')),
  slug text not null unique,
  title text not null,
  title_fr text not null default '',
  body text not null default '',
  body_fr text not null default '',
  author text not null default 'eveOps Group',
  topic text not null default 'Business',
  official boolean not null default false,
  published boolean not null default true,
  has_image boolean not null default false,
  image_mime text not null default '',
  image bytea,
  created_at timestamptz not null default now()
);

create table if not exists desk_replies (
  id text primary key,
  post_id text not null references desk_posts(id) on delete cascade,
  author text not null default 'Visitor',
  body text not null default '',
  official boolean not null default false,
  published boolean not null default true,
  has_audio boolean not null default false,
  audio_mime text not null default '',
  audio bytea,
  has_image boolean not null default false,
  image_mime text not null default '',
  image bytea,
  created_at timestamptz not null default now()
);

insert into desk_posts (id, kind, slug, title, title_fr, body, body_fr, author, topic, official, published)
select
  'what-we-do',
  'essay',
  'what-eveops-group-does',
  'What does eveOps Group actually do?',
  'Que fait vraiment eveOps Group ?',
  $desk$eveOps Group is a parent company with two practices. They are kept separate so you can hire the one that owns the problem.

Unity Integrated Solutions is the professional-services practice. Use it when the work is done by people: translation and transcription, AI data tasks, research, content operations, procurement support, or a team that needs to be staffed and managed. The result is defined human work, not a piece of software.

eveDev Ops is the software practice. Use it when something has to be built: a website, an application, an AI feature, an automation, cloud and security work, or a product. The result is software.

Choose Unity when you need capacity and expertise. Choose eveDev Ops when you need a system. Use both only when the system and the people who run it have to arrive together — for example a data operation that also needs a tool, or a product that needs an operating team. That second piece of work is explicit. It is not folded into one blended offer.

Shweng is a product in development inside eveDev Ops. It is not something you can buy or switch on yet.$desk$,
  $desk$eveOps Group est une société mère avec deux métiers. Ils restent séparés pour que vous puissiez engager celui qui porte le problème.

Unity Integrated Solutions est le métier des services professionnels. On s’y adresse quand le travail est fait par des personnes : traduction et transcription, tâches de données IA, recherche, opérations de contenu, soutien aux achats, ou une équipe à constituer et à encadrer. Le résultat est un travail humain défini, pas un logiciel.

eveDev Ops est le métier du logiciel. On s’y adresse quand il faut construire : un site, une application, une fonction d’IA, une automatisation, un travail cloud et sécurité, ou un produit. Le résultat est un logiciel.

Choisissez Unity pour de la capacité et de l’expertise. Choisissez eveDev Ops pour un système. Les deux ensemble seulement quand le système et les personnes qui le font tourner doivent arriver en même temps — par exemple une opération de données qui a aussi besoin d’un outil, ou un produit qui a besoin d’une équipe d’exploitation. Ce second travail est explicite. Il n’est pas fondu dans une offre unique.

Shweng est un produit en développement chez eveDev Ops. On ne peut pas encore l’acheter ni l’activer.$desk$,
  'eveOps Group',
  'Business',
  true,
  true
where not exists (select 1 from desk_posts where id = 'what-we-do');

insert into desk_posts (id, kind, slug, title, title_fr, body, body_fr, author, topic, official, published)
select 'unity-or-dev', 'question', 'unity-or-eveDev-ops',
  'When should I talk to Unity, and when to eveDev Ops?',
  'Quand parler à Unity, et quand à eveDev Ops ?',
  'A short way to choose the right door.',
  'Une façon courte de choisir la bonne porte.',
  'eveOps Group', 'Business', true, true
where not exists (select 1 from desk_posts where id = 'unity-or-dev');

insert into desk_replies (id, post_id, author, body, official, published)
select 'unity-or-dev-a', 'unity-or-dev', 'eveOps Group',
  'Talk to Unity Integrated Solutions if people have to do the work: language, transcription, AI data, research, content, procurement, or staffing. Talk to eveDev Ops if software has to be designed and built. If you are unsure, describe the outcome you need, not the tool you think you want.',
  true, true
where not exists (select 1 from desk_replies where id = 'unity-or-dev-a');

insert into desk_posts (id, kind, slug, title, title_fr, body, body_fr, author, topic, official, published)
select 'both', 'question', 'using-both-divisions',
  'Can one project use both divisions?',
  'Un projet peut-il utiliser les deux divisions ?',
  'Yes, when the work is actually two pieces.',
  'Oui, quand le travail est vraiment en deux parties.',
  'eveOps Group', 'Business', true, true
where not exists (select 1 from desk_posts where id = 'both');

insert into desk_replies (id, post_id, author, body, official, published)
select 'both-a', 'both', 'eveOps Group',
  'Yes. A data operation may need both a team from Unity and a tool from eveDev Ops. A product may need software from eveDev Ops and an operating team from Unity. Each part is scoped on its own, so you can see what you are buying.',
  true, true
where not exists (select 1 from desk_replies where id = 'both-a');

insert into desk_posts (id, kind, slug, title, title_fr, body, body_fr, author, topic, official, published)
select 'shweng-q', 'question', 'is-shweng-available',
  'Is Shweng available?',
  'Shweng est-il disponible ?',
  'What the product page is, and is not, promising.',
  'Ce que la page produit promet, et ce qu’elle ne promet pas.',
  'eveOps Group', 'Technology', true, true
where not exists (select 1 from desk_posts where id = 'shweng-q');

insert into desk_replies (id, post_id, author, body, official, published)
select 'shweng-a', 'shweng-q', 'eveOps Group',
  'No. Shweng is a cross-network exchange application still being built by eveDev Ops. The public note stays general until there is a product to use. It is not a launched service.',
  true, true
where not exists (select 1 from desk_replies where id = 'shweng-a');
