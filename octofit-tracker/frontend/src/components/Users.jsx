import ResourceTable from './ResourceTable.jsx'

const usersUrl = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users` : 'http://localhost:8000/api/users'

export default function Users() { return <ResourceTable endpoint={usersUrl} eyebrow="OctoFit community" title="Athletes" countLabel="athletes" columns={[{ label: 'Name', value: (item) => item.name }, { label: 'Email', value: (item) => item.email }, { label: 'Team', value: (item) => item.team }, { label: 'Level', value: (item) => item.level }]} /> }