import express, { type Request, type Response } from 'express'
import { connectDatabase } from './config/database.js'
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(express.json())

app.get('/api', async (_request: Request, response: Response) => {
  const counts = {
    users: await User.countDocuments(),
    teams: await Team.countDocuments(),
    activities: await Activity.countDocuments(),
    leaderboard: await LeaderboardEntry.countDocuments(),
    workouts: await Workout.countDocuments()
  }

  response.json({
    message: 'OctoFit Tracker API',
    baseUrl: apiBaseUrl,
    counts,
    endpoints: ['/api/health', '/api/users', '/api/teams', '/api/activities', '/api/leaderboard', '/api/workouts']
  })
})

app.get('/api/health', (_request: Request, response: Response) => {
  response.json({ status: 'ok', baseUrl: apiBaseUrl })
})

app.get('/api/users', async (_request: Request, response: Response) => {
  const users = await User.find().lean()
  response.json({ count: users.length, results: users })
})

app.get('/api/users/:id', async (request: Request, response: Response) => {
  const item = await User.findById(request.params.id)
  if (!item) {
    response.status(404).json({ message: 'User not found' })
    return
  }

  response.json(item)
})

app.post('/api/users', async (request: Request, response: Response) => {
  const user = request.body as Partial<typeof request.body>
  const newUser = await User.create({
    name: user.name ?? 'New User',
    email: user.email ?? 'user@example.com',
    team: user.team ?? 'Unassigned',
    level: user.level ?? 'Beginner'
  })

  response.status(201).json(newUser)
})

app.put('/api/users/:id', async (request: Request, response: Response) => {
  const user = await User.findByIdAndUpdate(request.params.id, request.body, { new: true })
  if (!user) {
    response.status(404).json({ message: 'User not found' })
    return
  }

  response.json(user)
})

app.delete('/api/users/:id', async (request: Request, response: Response) => {
  const user = await User.findByIdAndDelete(request.params.id)
  if (!user) {
    response.status(404).json({ message: 'User not found' })
    return
  }

  response.json({ deleted: user })
})

app.get('/api/teams', async (_request: Request, response: Response) => {
  const teams = await Team.find().lean()
  response.json({ count: teams.length, results: teams })
})

app.get('/api/teams/:id', async (request: Request, response: Response) => {
  const item = await Team.findById(request.params.id)
  if (!item) {
    response.status(404).json({ message: 'Team not found' })
    return
  }

  response.json(item)
})

app.post('/api/teams', async (request: Request, response: Response) => {
  const team = request.body as Partial<typeof request.body>
  const newTeam = await Team.create({
    name: team.name ?? 'New Team',
    captain: team.captain ?? 'Unassigned',
    points: team.points ?? 0
  })

  response.status(201).json(newTeam)
})

app.put('/api/teams/:id', async (request: Request, response: Response) => {
  const team = await Team.findByIdAndUpdate(request.params.id, request.body, { new: true })
  if (!team) {
    response.status(404).json({ message: 'Team not found' })
    return
  }

  response.json(team)
})

app.delete('/api/teams/:id', async (request: Request, response: Response) => {
  const team = await Team.findByIdAndDelete(request.params.id)
  if (!team) {
    response.status(404).json({ message: 'Team not found' })
    return
  }

  response.json({ deleted: team })
})

app.get('/api/activities', async (_request: Request, response: Response) => {
  const activities = await Activity.find().lean()
  response.json({ count: activities.length, results: activities })
})

app.get('/api/activities/:id', async (request: Request, response: Response) => {
  const item = await Activity.findById(request.params.id)
  if (!item) {
    response.status(404).json({ message: 'Activity not found' })
    return
  }

  response.json(item)
})

app.post('/api/activities', async (request: Request, response: Response) => {
  const activity = request.body as Partial<typeof request.body>
  const newActivity = await Activity.create({
    userId: activity.userId ?? 1,
    type: activity.type ?? 'Workout',
    durationMinutes: activity.durationMinutes ?? 30,
    calories: activity.calories ?? 0,
    date: activity.date ?? new Date().toISOString().slice(0, 10)
  })

  response.status(201).json(newActivity)
})

app.put('/api/activities/:id', async (request: Request, response: Response) => {
  const activity = await Activity.findByIdAndUpdate(request.params.id, request.body, { new: true })
  if (!activity) {
    response.status(404).json({ message: 'Activity not found' })
    return
  }

  response.json(activity)
})

app.delete('/api/activities/:id', async (request: Request, response: Response) => {
  const activity = await Activity.findByIdAndDelete(request.params.id)
  if (!activity) {
    response.status(404).json({ message: 'Activity not found' })
    return
  }

  response.json({ deleted: activity })
})

app.get('/api/leaderboard', async (_request: Request, response: Response) => {
  const leaderboard = await LeaderboardEntry.find().lean()
  response.json({ count: leaderboard.length, results: leaderboard })
})

app.get('/api/leaderboard/:id', async (request: Request, response: Response) => {
  const item = await LeaderboardEntry.findById(request.params.id)
  if (!item) {
    response.status(404).json({ message: 'Leaderboard entry not found' })
    return
  }

  response.json(item)
})

app.post('/api/leaderboard', async (request: Request, response: Response) => {
  const entry = request.body as Partial<typeof request.body>
  const newEntry = await LeaderboardEntry.create({
    name: entry.name ?? 'New Athlete',
    points: entry.points ?? 0,
    team: entry.team ?? 'Unassigned'
  })

  response.status(201).json(newEntry)
})

app.put('/api/leaderboard/:id', async (request: Request, response: Response) => {
  const entry = await LeaderboardEntry.findByIdAndUpdate(request.params.id, request.body, { new: true })
  if (!entry) {
    response.status(404).json({ message: 'Leaderboard entry not found' })
    return
  }

  response.json(entry)
})

app.delete('/api/leaderboard/:id', async (request: Request, response: Response) => {
  const entry = await LeaderboardEntry.findByIdAndDelete(request.params.id)
  if (!entry) {
    response.status(404).json({ message: 'Leaderboard entry not found' })
    return
  }

  response.json({ deleted: entry })
})

app.get('/api/workouts', async (_request: Request, response: Response) => {
  const workouts = await Workout.find().lean()
  response.json({ count: workouts.length, results: workouts })
})

app.get('/api/workouts/:id', async (request: Request, response: Response) => {
  const item = await Workout.findById(request.params.id)
  if (!item) {
    response.status(404).json({ message: 'Workout not found' })
    return
  }

  response.json(item)
})

app.post('/api/workouts', async (request: Request, response: Response) => {
  const workout = request.body as Partial<typeof request.body>
  const newWorkout = await Workout.create({
    title: workout.title ?? 'New Workout',
    focus: workout.focus ?? 'General',
    durationMinutes: workout.durationMinutes ?? 30,
    difficulty: workout.difficulty ?? 'Moderate'
  })

  response.status(201).json(newWorkout)
})

app.put('/api/workouts/:id', async (request: Request, response: Response) => {
  const workout = await Workout.findByIdAndUpdate(request.params.id, request.body, { new: true })
  if (!workout) {
    response.status(404).json({ message: 'Workout not found' })
    return
  }

  response.json(workout)
})

app.delete('/api/workouts/:id', async (request: Request, response: Response) => {
  const workout = await Workout.findByIdAndDelete(request.params.id)
  if (!workout) {
    response.status(404).json({ message: 'Workout not found' })
    return
  }

  response.json({ deleted: workout })
})

export const startServer = async () => {
  await connectDatabase()
  app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port}`)
    console.log(`API base URL: ${apiBaseUrl}`)
  })
}