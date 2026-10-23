alter table public.events
  add column if not exists flyer_url text not null default '';

grant select (
  id,
  created_at,
  status,
  title,
  club,
  event_date,
  start_time,
  end_time,
  place_name,
  place_detail,
  cost,
  free_food,
  summary,
  flyer_url
)
on table public.events
to anon, authenticated;

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'flyers',
  'flyers',
  true,
  5242880,
  array['image/jpeg', 'image/png']::text[]
)
on conflict (id) do update
set
  name = excluded.name,
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
