import ResourceTable from './ResourceTable.jsx'

const workoutsUrl = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts` : 'http://localhost:8000/api/workouts'

export default function Workouts() { return <ResourceTable endpoint={workoutsUrl} eyebrow="Suggested training" title="Workouts" countLabel="workouts" columns={[{ label: 'Workout', value: (item) => item.title }, { label: 'Focus', value: (item) => item.focus }, { label: 'Duration', value: (item) => `${item.durationMinutes} min` }, { label: 'Difficulty', value: (item) => item.difficulty }]} /> }