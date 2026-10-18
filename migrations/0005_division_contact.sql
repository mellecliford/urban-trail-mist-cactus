alter table site_settings add column if not exists unity_hours text not null default '';
alter table site_settings add column if not exists edevops_hours text not null default '';
alter table site_settings add column if not exists unity_notify text not null default '';
alter table site_settings add column if not exists edevops_notify text not null default '';
