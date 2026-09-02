import ResourceTable from './ResourceTable.jsx'

const leaderboardUrl = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard` : 'http://localhost:8000/api/leaderboard'

export default function Leaderboard() { return <ResourceTable endpoint={leaderboardUrl} eyebrow="Season standings" title="Leaderboard" countLabel="athletes" columns={[{ label: 'Rank', value: (_item, index) => index + 1 }, { label: 'Athlete', value: (item) => item.name }, { label: 'Team', value: (item) => item.team }, { label: 'Points', value: (item) => item.points }]} /> }