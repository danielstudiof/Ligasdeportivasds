export const RANKING_POINTS = [1000, 650, 400, 200, 100, 50]
export const GRAND_SLAM_POINTS = { 1: 2000, 2: 1200, 3: 720, 4: 220 }

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
  ranking: [
    { playerId: 'cristina', points: 4000 },
    { playerId: 'antonia', points: 3580 },
    { playerId: 'sofia', points: 2900 },
    { playerId: 'daniel', points: 2750 },
    { playerId: 'carmen', points: 2050 },
    { playerId: 'david', points: 650 },
  ],
  leagues: [],
  sessions: [],
  slams: [],
  history: [],
  weeksNo1: {},
  rankingNote: 'Base provisional: puntos indicados por la organización. Pendiente de revisar con los resultados de las temporadas 6 y 7 y los títulos.',
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
  const defendedByPlayer = Object.fromEntries((historicalLeague?.positions || []).map((item) => [item.playerId, RANKING_POINTS[(item.position || 6) - 1] || 0]))
  const previousChampionIds = historicalLeague?.winnerIds || []
  const oldContribution = league.rankingApplied || {}
  const championTeam = after[0] ? state.teams.find((team) => team.id === after[0].teamId) : null
  const championIds = championTeam ? state.players.filter((player) => player.teamId === championTeam.id).map((player) => player.id) : [after[0]?.id]
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

export function formatPoints(value) {
  return new Intl.NumberFormat('es-ES').format(Number(value) || 0)
}

export function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
}