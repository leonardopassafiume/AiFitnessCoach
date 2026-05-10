create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz default now()
);

create table if not exists strava_connections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  strava_athlete_id bigint not null,
  access_token text not null,
  refresh_token text not null,
  expires_at timestamptz not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id),
  unique(strava_athlete_id)
);

create table if not exists activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  strava_activity_id bigint not null,
  name text,
  sport_type text,
  start_date timestamptz,
  distance_m double precision,
  moving_time_s integer,
  elapsed_time_s integer,
  total_elevation_gain_m double precision,
  average_speed_mps double precision,
  max_speed_mps double precision,
  average_heartrate double precision,
  max_heartrate double precision,
  calories double precision,
  raw jsonb,
  created_at timestamptz default now(),
  unique(user_id, strava_activity_id)
);

create table if not exists workout_briefs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  activity_id uuid references activities(id) on delete cascade not null,
  summary text,
  intensity_score integer,
  fatigue_score integer,
  recovery_advice text,
  next_workout_suggestion jsonb,
  raw_ai_response jsonb,
  created_at timestamptz default now()
);

create table if not exists meals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  meal_type text,
  input_type text,
  input_text text,
  media_url text,
  eaten_at timestamptz default now(),
  estimated_calories double precision,
  protein_g double precision,
  carbs_g double precision,
  fat_g double precision,
  confidence double precision,
  raw_ai_response jsonb,
  created_at timestamptz default now()
);

create table if not exists meal_items (
  id uuid primary key default gen_random_uuid(),
  meal_id uuid references meals(id) on delete cascade not null,
  name text not null,
  quantity_text text,
  estimated_calories double precision,
  protein_g double precision,
  carbs_g double precision,
  fat_g double precision,
  confidence double precision,
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table strava_connections enable row level security;
alter table activities enable row level security;
alter table workout_briefs enable row level security;
alter table meals enable row level security;
alter table meal_items enable row level security;

create policy "Users can read own profile" on profiles for select using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can delete own profile" on profiles for delete using (auth.uid() = id);

create policy "Users can read own strava connection" on strava_connections for select using (auth.uid() = user_id);
create policy "Users can insert own strava connection" on strava_connections for insert with check (auth.uid() = user_id);
create policy "Users can update own strava connection" on strava_connections for update using (auth.uid() = user_id);
create policy "Users can delete own strava connection" on strava_connections for delete using (auth.uid() = user_id);

create policy "Users can read own activities" on activities for select using (auth.uid() = user_id);
create policy "Users can insert own activities" on activities for insert with check (auth.uid() = user_id);
create policy "Users can update own activities" on activities for update using (auth.uid() = user_id);
create policy "Users can delete own activities" on activities for delete using (auth.uid() = user_id);

create policy "Users can read own workout briefs" on workout_briefs for select using (auth.uid() = user_id);
create policy "Users can insert own workout briefs" on workout_briefs for insert with check (auth.uid() = user_id);
create policy "Users can update own workout briefs" on workout_briefs for update using (auth.uid() = user_id);
create policy "Users can delete own workout briefs" on workout_briefs for delete using (auth.uid() = user_id);

create policy "Users can read own meals" on meals for select using (auth.uid() = user_id);
create policy "Users can insert own meals" on meals for insert with check (auth.uid() = user_id);
create policy "Users can update own meals" on meals for update using (auth.uid() = user_id);
create policy "Users can delete own meals" on meals for delete using (auth.uid() = user_id);

create policy "Users can read own meal items"
on meal_items for select
using (exists (select 1 from meals where meals.id = meal_items.meal_id and meals.user_id = auth.uid()));

create policy "Users can insert own meal items"
on meal_items for insert
with check (exists (select 1 from meals where meals.id = meal_items.meal_id and meals.user_id = auth.uid()));

create policy "Users can update own meal items"
on meal_items for update
using (exists (select 1 from meals where meals.id = meal_items.meal_id and meals.user_id = auth.uid()));

create policy "Users can delete own meal items"
on meal_items for delete
using (exists (select 1 from meals where meals.id = meal_items.meal_id and meals.user_id = auth.uid()));
