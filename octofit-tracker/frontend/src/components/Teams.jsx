import ResourceTable from './ResourceTable.jsx'

const teamsUrl = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams` : 'http://localhost:8000/api/teams'

export default function Teams() { return <ResourceTable endpoint={teamsUrl} eyebrow="Crew roster" title="Teams" countLabel="teams" columns={[{ label: 'Team', value: (item) => item.name }, { label: 'Captain', value: (item) => item.captain }, { label: 'Points', value: (item) => item.points }]} /> }