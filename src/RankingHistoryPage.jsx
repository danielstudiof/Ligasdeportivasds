import React from 'react'
import { Activity, BarChart3, CalendarDays } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Cell, LabelList, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { formatPoints } from './data.js'

const chartColors = ['#24b8c7', '#d34077', '#8455b6', '#397ac0', '#ef684f', '#a4518c']

function formatSnapshotDate(snapshot) {
  if (!snapshot.date) return snapshot.label || `Temporada ${snapshot.season}`
  return new Date(snapshot.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
}

function PageIntro({ eyebrow, title, copy }) {
  return <header className="page-intro"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{copy}</p></header>
}

export default function RankingHistoryPage({ state }) {
  const players = state.players
  const snapshots = [...(state.rankingHistory || [])].sort((a, b) => {
    const seasonDifference = Number(a.season || 0) - Number(b.season || 0)
    if (seasonDifference) return seasonDifference
    return new Date(a.date || 0) - new Date(b.date || 0)
  })
  const chartData = snapshots.map((snapshot) => {
    const points = Object.fromEntries((snapshot.ranking || []).map((entry) => [entry.playerId, Number(entry.points) || 0]))
    return { label: snapshot.label || formatSnapshotDate(snapshot), ...Object.fromEntries(players.map((player) => [player.id, points[player.id] ?? null])) }
  })
  const currentRows = [...state.ranking].sort((a, b) => b.points - a.points).map((entry) => ({
    name: players.find((player) => player.id === entry.playerId)?.name || entry.playerId,
    points: entry.points,
    color: chartColors[players.findIndex((player) => player.id === entry.playerId) % chartColors.length],
  }))
  const leaders = snapshots.map((snapshot) => ({ ...snapshot, leader: [...(snapshot.ranking || [])].sort((a, b) => b.points - a.points)[0] })).reverse()
  const latest = leaders[0]
  const latestPlayer = players.find((player) => player.id === latest?.leader?.playerId)

  return <>
    <PageIntro eyebrow="PUNTOS · TEMPORADAS 6–8" title="Evolución del ranking" copy="Compara cada jugador entre cierres de temporada y guarda automáticamente cada nuevo ranking." />
    <div className="ranking-history-summary">
      <div><span>ÚLTIMO REGISTRO</span><strong>{latest ? formatSnapshotDate(latest) : '—'}</strong></div>
      <div><span>LÍDER ACTUAL</span><strong>{latestPlayer?.name || '—'}</strong></div>
      <div><span>PUNTOS REGISTRADOS</span><strong>{latest?.leader ? formatPoints(latest.leader.points) : '—'}</strong></div>
      <div><span>REGISTROS</span><strong>{snapshots.length}</strong></div>
    </div>
    <div className="content-grid ranking-charts">
      <section className="panel ranking-chart-panel"><div className="section-heading"><div><span className="eyebrow">COMPARATIVA POR JUGADOR</span><h2>Trayectoria de puntos</h2></div><Activity size={18} /></div>{chartData.length ? <div className="ranking-chart-frame"><ResponsiveContainer width="100%" height="100%"><LineChart data={chartData} margin={{ top: 8, right: 18, bottom: 8, left: 4 }}><CartesianGrid stroke="#eaddec" strokeDasharray="4 5" vertical={false} /><XAxis dataKey="label" tick={{ fill: '#81758b', fontSize: 10 }} axisLine={{ stroke: '#eaddec' }} tickLine={false} /><YAxis tickFormatter={formatPoints} tick={{ fill: '#81758b', fontSize: 10 }} axisLine={false} tickLine={false} width={58} /><Tooltip formatter={(value, name) => [`${formatPoints(value)} pts`, name]} contentStyle={{ border: '1px solid #eaddec', borderRadius: 4, fontFamily: 'Poppins', fontSize: 11 }} /><Legend wrapperStyle={{ fontSize: 10, paddingTop: 9 }} />{players.map((player, index) => <Line key={player.id} type="monotone" dataKey={player.id} name={player.name} stroke={chartColors[index % chartColors.length]} strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} connectNulls />)}</LineChart></ResponsiveContainer></div> : <EmptyState icon={BarChart3} title="Todavía no hay registros">Al cambiar los puntos del ranking se guardará la primera comparación.</EmptyState>}</section>
      <section className="panel ranking-chart-panel"><div className="section-heading"><div><span className="eyebrow">CLASIFICACIÓN VIGENTE</span><h2>Puntos actuales</h2></div><BarChart3 size={18} /></div><div className="ranking-chart-frame ranking-bar-frame"><ResponsiveContainer width="100%" height="100%"><BarChart data={currentRows} layout="vertical" margin={{ top: 8, right: 56, bottom: 8, left: 0 }}><CartesianGrid stroke="#eaddec" strokeDasharray="4 5" horizontal={false} /><XAxis type="number" domain={[0, 'dataMax + 1000']} tickFormatter={formatPoints} tick={{ fill: '#81758b', fontSize: 10 }} axisLine={false} tickLine={false} /><YAxis type="category" dataKey="name" width={72} tick={{ fill: '#51445d', fontSize: 10 }} axisLine={false} tickLine={false} /><Tooltip formatter={(value) => [`${formatPoints(value)} pts`, 'Ranking']} contentStyle={{ border: '1px solid #eaddec', borderRadius: 4, fontFamily: 'Poppins', fontSize: 11 }} /><Bar dataKey="points" name="Puntos" radius={[0, 4, 4, 0]}><LabelList dataKey="points" position="right" formatter={formatPoints} fill="#51445d" fontSize={10} />{currentRows.map((row) => <Cell key={row.name} fill={row.color} />)}</Bar></BarChart></ResponsiveContainer></div></section>
    </div>
    <section className="panel ranking-snapshot-panel"><div className="section-heading"><div><span className="eyebrow">REGISTRO COMPLETO</span><h2>Rankings guardados</h2></div></div>{leaders.length ? <div className="table-wrap"><table className="standings-table"><thead><tr><th>Fecha</th><th>Temporada</th><th>Líder</th><th className="numeric">Puntos</th><th className="numeric">Jugadores</th></tr></thead><tbody>{leaders.map((snapshot) => <tr key={snapshot.id}><td>{formatSnapshotDate(snapshot)}</td><td>T{snapshot.season}</td><td>{players.find((player) => player.id === snapshot.leader?.playerId)?.name || '—'}</td><td className="numeric points-cell">{formatPoints(snapshot.leader?.points)}</td><td className="numeric">{snapshot.ranking?.length || 0}</td></tr>)}</tbody></table></div> : <EmptyState icon={CalendarDays} title="Sin rankings guardados">El primer ranking se registrará al aplicar los puntos de T8.</EmptyState>}</section>
  </>
}

function EmptyState({ icon: Icon, title, children }) {
  return <div className="empty-state"><span className="empty-icon"><Icon size={20} /></span><strong>{title}</strong><p>{children}</p></div>
}