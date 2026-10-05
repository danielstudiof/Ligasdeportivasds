export const RANKING_POINTS = [1000, 650, 400, 200, 100, 50]
export const GRAND_SLAM_POINTS = { 1: 2000, 2: 1200, 3: 720, 4: 220 }

const RANKING_T6_BASE = [
  { playerId: 'cristina', points: 4000 },
  { playerId: 'antonia', points: 3580 },
  { playerId: 'sofia', points: 2900 },
  { playerId: 'daniel', points: 2750 },
  { playerId: 'carmen', points: 2050 },
  { playerId: 'david', points: 650 },
]

const RANKING_T8_INITIAL = [
  { playerId: 'cristina', points: 6000 },
  { playerId: 'sofia', points: 5900 },
  { playerId: 'antonia', points: 5660 },
  { playerId: 'daniel', points: 4500 },
  { playerId: 'carmen', points: 3900 },
  { playerId: 'david', points: 1100 },
]

const INITIAL_RANKING_HISTORY = [
  { id: 'season-6-close', season: 6, label: 'T6 · Cierre', ranking: RANKING_T6_BASE },
  { id: 'season-7-close', season: 7, label: 'T7 · Cierre', ranking: RANKING_T8_INITIAL },
  { id: 'season-8-initial', season: 8, label: 'T8 · Inicial', date: '2026-10-05T12:00:00.000Z', ranking: RANKING_T8_INITIAL },
]

const T6_HISTORY = {
  number: 6,
  rankingInitial: RANKING_T6_BASE,
  rankingFinal: RANKING_T6_BASE,
  leagues: [
    { name: 'ALTO EL LAPIZ', positions: [{ playerId: 'daniel', position: 3, points: 400 }, { playerId: 'cristina', position: 1, points: 1000 }, { playerId: 'antonia', position: 2, points: 650 }, { playerId: 'sofia', position: 6, points: 50 }, { playerId: 'carmen', position: 4, points: 200 }, { playerId: 'david', position: 5, points: 100 }] },
    { name: 'BINGO', winnerIds: ['daniel', 'antonia'] },
    { name: 'UNO', winnerIds: ['cristina', 'david'] },
    { name: 'LINCE', winnerIds: ['cristina', 'david'] },
    { name: 'DARDOS', winnerIds: ['daniel', 'antonia', 'cristina', 'david', 'sofia', 'carmen'] },
    { name: 'BOLOS', winnerIds: ['daniel', 'antonia'] },
    { name: 'CUATROLA', winnerIds: ['daniel', 'antonia'] },
  ],
  slams: [],
}

const T7_HISTORY = {
  number: 7,
  rankingInitial: RANKING_T6_BASE,
  rankingFinal: RANKING_T8_INITIAL,
  leagues: [
    { name: 'ALTO EL LAPIZ', positions: [{ playerId: 'daniel', position: 4, points: 200 }, { playerId: 'cristina', position: 3, points: 400 }, { playerId: 'antonia', position: 1, points: 1000 }, { playerId: 'sofia', position: 2, points: 650 }, { playerId: 'carmen', position: 5, points: 100 }, { playerId: 'david', position: 5, points: 100 }] },
    { name: 'DIF+1', positions: [{ playerId: 'daniel', position: 6, points: 0 }, { playerId: 'cristina', position: 1, points: 800 }, { playerId: 'antonia', position: 5, points: 80 }, { playerId: 'sofia', position: 2, points: 300 }, { playerId: 'carmen', position: 3, points: 200 }, { playerId: 'david', position: 3, points: 200 }] },
    { name: 'DARDOS', winnerIds: ['daniel', 'antonia', 'sofia', 'carmen'] },
    { name: 'LINCE', winnerIds: ['cristina', 'david'] },
    { name: 'CUATROLA', winnerIds: ['cristina', 'david', 'daniel', 'antonia', 'sofia', 'carmen'] },
    { name: 'BOLOS', winnerIds: ['daniel', 'antonia'] },
    { name: 'IMPOSTOR', positions: [{ playerId: 'daniel', position: 3, points: 400 }, { playerId: 'cristina', position: 1, points: 1000 }, { playerId: 'antonia', position: 4, points: 200 }, { playerId: 'sofia', position: 2, points: 650 }, { playerId: 'carmen', position: 5, points: 100 }, { playerId: 'david', position: 6, points: 50 }] },
    { name: 'OCA', positions: [{ playerId: 'daniel', position: 5, points: 100 }, { playerId: 'cristina', position: 1, points: 1000 }, { playerId: 'antonia', position: 2, points: 650 }, { playerId: 'sofia', position: 4, points: 200 }, { playerId: 'carmen', position: 6, points: 50 }, { playerId: 'david', position: 3, points: 400 }] },
    { name: 'MONOPOLY', positions: [{ playerId: 'daniel', position: 1, points: 1000 }, { playerId: 'cristina', position: 5, points: 0 }, { playerId: 'antonia', position: 1, points: 1000 }, { playerId: 'sofia', position: 3, points: 650 }, { playerId: 'carmen', position: 4, points: 400 }, { playerId: 'david', position: 5, points: 0 }] },
    { name: 'VIRUS', positions: [{ playerId: 'daniel', position: 2, points: 650 }, { playerId: 'cristina', position: 5, points: 0 }, { playerId: 'antonia', position: 5, points: 0 }, { playerId: 'sofia', position: 3, points: 400 }, { playerId: 'carmen', position: 1, points: 1000 }, { playerId: 'david', position: 5, points: 0 }] },
  ],
  slams: [],
}

export const INITIAL_STATE = {
  season: 8,
  players: [
    { id: 'cristina', name: 'Cristina', teamId: 'kellogs', bio: '', image: '', practiceLinks: [] },
    { id: 'antonia', name: 'Antonia', teamId: 'pepsi', bio: '', image: '', practiceLinks: [] },
    { id: 'sofia', name: 'Sofía', teamId: 'apple', bio: '', image: '', practiceLinks: [] },
    { id: 'daniel', name: 'Daniel', teamId: 'pepsi', bio: '', image: '', practiceLinks: [] },
    { id: 'carmen', name: 'Carmen', teamId: 'apple', bio: '', image: '', practiceLinks: [] },
    { id: 'david', name: 'David', teamId: 'kellogs', bio: '', image: '', practiceLinks: [] },
  ],
  teams: [
    { id: 'pepsi', name: 'Team Pepsi', color: '#1769aa', logo: '', background: '' },
    { id: 'apple', name: 'Apple team', color: '#d94738', logo: '', background: '' },
    { id: 'kellogs', name: 'Kellogs Bitter Kas', color: '#e4a521', logo: '', background: '' },
  ],
  ranking: RANKING_T8_INITIAL,
  leagues: [],
  sessions: [],
  slams: [],
  history: [T6_HISTORY, T7_HISTORY],
  rankingHistory: INITIAL_RANKING_HISTORY,
  weeksNo1: {},
  rankingNote: '',
}

export function appendRankingSnapshot(next, previous, snapshotDate = new Date()) {
  const previousPoints = new Map((previous.ranking || []).map((entry) => [entry.playerId, Number(entry.points) || 0]))
  const rankingChanged = next.ranking.length !== previous.ranking.length || next.ranking.some((entry) => previousPoints.get(entry.playerId) !== (Number(entry.points) || 0))
  if (!rankingChanged) return next
  const snapshot = {
    id: globalThis.crypto?.randomUUID?.() || `${snapshotDate.getTime()}-${Math.random().toString(16).slice(2)}`,
    date: snapshotDate.toISOString(),
    label: `T${next.season} · ${snapshotDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}`,
    season: next.season,
    ranking: next.ranking.map((entry) => ({ ...entry })),
  }
  return { ...next, rankingHistory: [...(next.rankingHistory || previous.rankingHistory || []), snapshot] }
}

export function scoreForResult(league, value) {
  const parsed = Number(value) || 0
  if (league?.scoringType !== 'result') return parsed
  return league.values?.[value] ?? 0
}

export function getLeagueTable(state, leagueId, extraSession) {
  const scores = Object.fromEntries(state.players.map((player) => [player.id, 0]))
  const league = state.leagues.find((item) => item.id === leagueId)
  for (const session of state.sessions) {
    if (session.leagueId !== leagueId || (!session.published && session.id !== extraSession?.id)) continue
    for (const [playerId, value] of Object.entries(session.scores || {})) {
      scores[playerId] = (scores[playerId] || 0) + (session.id === extraSession?.id ? scoreForResult(league, value) : Number(value) || 0)
    }
  }
  return state.players
    .map((player) => ({ ...player, score: scores[player.id] || 0 }))
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name, 'es'))
}

export function getSeasonRace(state) {
  const totals = Object.fromEntries(state.players.map((player) => [player.id, 0]))
  for (const session of state.sessions) {
    if (!session.published) continue
    const league = state.leagues.find((item) => item.id === session.leagueId)
    for (const [playerId, value] of Object.entries(session.scores || {})) {
      totals[playerId] = (totals[playerId] || 0) + scoreForResult(league || {}, value)
    }
  }
  for (const slam of state.slams) {
    if (!slam.published) continue
    for (const [playerId, points] of Object.entries(slam.awards || {})) totals[playerId] = (totals[playerId] || 0) + points
  }
  return state.players
    .map((player) => ({ ...player, points: totals[player.id] || 0 }))
    .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name, 'es'))
}

export function rankingPreview(state, league, session) {
  const after = getLeagueTable(state, league.id, session)
  const priorSeason = state.history.find((season) => Number(season.number) === Number(state.season) - 1)
  const historicalLeague = priorSeason?.leagues?.find((item) => item.name.trim().toLowerCase() === league.name.trim().toLowerCase())
  const defendedByPlayer = Object.fromEntries((historicalLeague?.positions || []).map((item) => [item.playerId, item.points ?? RANKING_POINTS[(item.position || 6) - 1] ?? 0]))
  const previousChampionIds = historicalLeague?.winnerIds || []
  const oldContribution = league.rankingApplied || {}
  const championTeam = after[0] ? state.teams.find((team) => team.id === after[0].teamId) : null
  const championIds = league.championType === 'individual'
    ? after[0] ? [after[0].id] : []
    : championTeam ? state.players.filter((player) => player.teamId === championTeam.id).map((player) => player.id) : after[0] ? [after[0].id] : []
  return after.map((player, index) => {
    const earned = RANKING_POINTS[index] || 50
    const defended = defendedByPlayer[player.id] || 0
    const bonus = championIds.includes(player.id) ? 200 : 0
    const defendedBonus = previousChampionIds.includes(player.id) ? 200 : 0
    const contribution = earned + bonus - defended - defendedBonus
    const old = Number(oldContribution[player.id] || 0)
    return { ...player, position: index + 1, earned, defended, bonus, defendedBonus, contribution, delta: contribution - old, oldPoints: state.ranking.find((entry) => entry.playerId === player.id)?.points || 0 }
  })
}

export function getTeamTitleCount(state, teamId) {
  const memberIds = new Set(state.players.filter((player) => player.teamId === teamId).map((player) => player.id))
  const isTeamTitle = (league) => league.championType !== 'individual' && (
    league.winnerTeamId === teamId ||
    league.championTeamId === teamId ||
    (league.winnerIds || league.championIds || []).some((playerId) => memberIds.has(playerId))
  )
  const historicalTitles = state.history.reduce((total, season) => total + (season.leagues || []).filter(isTeamTitle).length, 0)
  return historicalTitles + state.leagues.filter(isTeamTitle).length
}

export function formatPoints(value) {
  return new Intl.NumberFormat('es-ES').format(Number(value) || 0)
}

export function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
}