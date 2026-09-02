import ResourceTable from './ResourceTable.jsx'

const activitiesUrl = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities` : 'http://localhost:8000/api/activities'

export default function Activities() { return <ResourceTable endpoint={activitiesUrl} eyebrow="Training log" title="Activities" countLabel="records" columns={[{ label: 'Activity', value: (item) => item.type }, { label: 'Duration', value: (item) => `${item.durationMinutes} min` }, { label: 'Calories', value: (item) => item.calories }, { label: 'Date', value: (item) => item.date }]} /> }