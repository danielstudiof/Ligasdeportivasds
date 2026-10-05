with imported_seasons as (
  select $$
    {
      "number": 6,
      "rankingInitial": [{"playerId":"cristina","points":4000},{"playerId":"antonia","points":3580},{"playerId":"sofia","points":2900},{"playerId":"daniel","points":2750},{"playerId":"carmen","points":2050},{"playerId":"david","points":650}],
      "rankingFinal": [{"playerId":"cristina","points":4000},{"playerId":"antonia","points":3580},{"playerId":"sofia","points":2900},{"playerId":"daniel","points":2750},{"playerId":"carmen","points":2050},{"playerId":"david","points":650}],
      "leagues": [
        {"name":"ALTO EL LAPIZ","positions":[{"playerId":"daniel","position":3,"points":400},{"playerId":"cristina","position":1,"points":1000},{"playerId":"antonia","position":2,"points":650},{"playerId":"sofia","position":6,"points":50},{"playerId":"carmen","position":4,"points":200},{"playerId":"david","position":5,"points":100}]},
        {"name":"BINGO","winnerIds":["daniel","antonia"]},
        {"name":"UNO","winnerIds":["cristina","david"]},
        {"name":"LINCE","winnerIds":["cristina","david"]},
        {"name":"DARDOS","winnerIds":["daniel","antonia","cristina","david","sofia","carmen"]},
        {"name":"BOLOS","winnerIds":["daniel","antonia"]},
        {"name":"CUATROLA","winnerIds":["daniel","antonia"]}
      ],
      "slams": []
    }
  $$::jsonb as season
  union all
  select $$
    {
      "number": 7,
      "rankingInitial": [{"playerId":"cristina","points":4000},{"playerId":"antonia","points":3580},{"playerId":"sofia","points":2900},{"playerId":"daniel","points":2750},{"playerId":"carmen","points":2050},{"playerId":"david","points":650}],
      "rankingFinal": [{"playerId":"cristina","points":6000},{"playerId":"sofia","points":5900},{"playerId":"antonia","points":5660},{"playerId":"daniel","points":4500},{"playerId":"carmen","points":3900},{"playerId":"david","points":1100}],
      "leagues": [
        {"name":"ALTO EL LAPIZ","positions":[{"playerId":"daniel","position":4,"points":200},{"playerId":"cristina","position":3,"points":400},{"playerId":"antonia","position":1,"points":1000},{"playerId":"sofia","position":2,"points":650},{"playerId":"carmen","position":5,"points":100},{"playerId":"david","position":5,"points":100}]},
        {"name":"DIF+1","positions":[{"playerId":"daniel","position":6,"points":0},{"playerId":"cristina","position":1,"points":800},{"playerId":"antonia","position":5,"points":80},{"playerId":"sofia","position":2,"points":300},{"playerId":"carmen","position":3,"points":200},{"playerId":"david","position":3,"points":200}]},
        {"name":"DARDOS","winnerIds":["daniel","antonia","sofia","carmen"]},
        {"name":"LINCE","winnerIds":["cristina","david"]},
        {"name":"CUATROLA","winnerIds":["cristina","david","daniel","antonia","sofia","carmen"]},
        {"name":"BOLOS","winnerIds":["daniel","antonia"]},
        {"name":"IMPOSTOR","positions":[{"playerId":"daniel","position":3,"points":400},{"playerId":"cristina","position":1,"points":1000},{"playerId":"antonia","position":4,"points":200},{"playerId":"sofia","position":2,"points":650},{"playerId":"carmen","position":5,"points":100},{"playerId":"david","position":6,"points":50}]},
        {"name":"OCA","positions":[{"playerId":"daniel","position":5,"points":100},{"playerId":"cristina","position":1,"points":1000},{"playerId":"antonia","position":2,"points":650},{"playerId":"sofia","position":4,"points":200},{"playerId":"carmen","position":6,"points":50},{"playerId":"david","position":3,"points":400}]},
        {"name":"MONOPOLY","positions":[{"playerId":"daniel","position":1,"points":1000},{"playerId":"cristina","position":5,"points":0},{"playerId":"antonia","position":1,"points":1000},{"playerId":"sofia","position":3,"points":650},{"playerId":"carmen","position":4,"points":400},{"playerId":"david","position":5,"points":0}]},
        {"name":"VIRUS","positions":[{"playerId":"daniel","position":2,"points":650},{"playerId":"cristina","position":5,"points":0},{"playerId":"antonia","position":5,"points":0},{"playerId":"sofia","position":3,"points":400},{"playerId":"carmen","position":1,"points":1000},{"playerId":"david","position":5,"points":0}]}
      ],
      "slams": []
    }
  $$::jsonb
), merged_history as (
  select coalesce(jsonb_agg(seasons.season order by (seasons.season->>'number')::integer), '[]'::jsonb) as history
  from (
    select existing.item as season
    from public.competition_state as state
    cross join lateral jsonb_array_elements(coalesce(state.data->'history', '[]'::jsonb)) as existing(item)
    where state.id = 'main'
      and existing.item->>'number' not in ('6', '7', '8')
    union all
    select season from imported_seasons
  ) as seasons
)
update public.competition_state as state
set data = state.data || jsonb_build_object(
  'ranking',
  '[{"playerId":"cristina","points":6000},{"playerId":"sofia","points":5900},{"playerId":"antonia","points":5660},{"playerId":"daniel","points":4500},{"playerId":"carmen","points":3900},{"playerId":"david","points":1100}]'::jsonb,
  'history',
  (select history from merged_history),
  'rankingHistory',
  '[{"id":"season-6-close","season":6,"label":"T6 · Cierre","ranking":[{"playerId":"cristina","points":4000},{"playerId":"antonia","points":3580},{"playerId":"sofia","points":2900},{"playerId":"daniel","points":2750},{"playerId":"carmen","points":2050},{"playerId":"david","points":650}]},{"id":"season-7-close","season":7,"label":"T7 · Cierre","ranking":[{"playerId":"cristina","points":6000},{"playerId":"sofia","points":5900},{"playerId":"antonia","points":5660},{"playerId":"daniel","points":4500},{"playerId":"carmen","points":3900},{"playerId":"david","points":1100}]},{"id":"season-8-initial","season":8,"label":"T8 · Inicial","date":"2026-10-05T12:00:00.000Z","ranking":[{"playerId":"cristina","points":6000},{"playerId":"sofia","points":5900},{"playerId":"antonia","points":5660},{"playerId":"daniel","points":4500},{"playerId":"carmen","points":3900},{"playerId":"david","points":1100}]}]'::jsonb,
  'rankingNote',
  '',
  'rankingChanges',
  '{}'::jsonb,
  'season',
  8
)
where state.id = 'main';