create table if not exists public.app_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  added_at timestamptz not null default now()
);

create table if not exists public.competition_state (
  id text primary key check (id = 'main'),
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.app_admins enable row level security;
alter table public.competition_state enable row level security;

create or replace function public.is_competition_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.app_admins where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_competition_admin() from public;
grant execute on function public.is_competition_admin() to authenticated;

drop policy if exists "Anyone can read competition data" on public.competition_state;
create policy "Anyone can read competition data"
  on public.competition_state for select
  using (true);

drop policy if exists "Admins can create competition data" on public.competition_state;
create policy "Admins can create competition data"
  on public.competition_state for insert to authenticated
  with check (public.is_competition_admin());

drop policy if exists "Admins can update competition data" on public.competition_state;
create policy "Admins can update competition data"
  on public.competition_state for update to authenticated
  using (public.is_competition_admin())
  with check (public.is_competition_admin());

drop policy if exists "Admins can read admin list" on public.app_admins;
create policy "Admins can read admin list"
  on public.app_admins for select to authenticated
  using (user_id = (select auth.uid()));

grant select on public.competition_state to anon, authenticated;
grant insert, update on public.competition_state to authenticated;
grant select on public.app_admins to authenticated;