revoke all privileges
on table public.events
from public, anon, authenticated, service_role;

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
  summary
)
on table public.events
to anon, authenticated;

grant select, insert, update, delete
on table public.events
to service_role;
