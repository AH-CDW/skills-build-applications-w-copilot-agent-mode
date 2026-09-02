import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    team: { type: String, required: true },
    level: { type: String, required: true }
  },
  { timestamps: true }
)

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    captain: { type: String, required: true },
    points: { type: Number, default: 0 }
  },
  { timestamps: true }
)

const activitySchema = new mongoose.Schema(
  {
    userId: { type: Number, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    calories: { type: Number, required: true },
    date: { type: String, required: true }
  },
  { timestamps: true }
)

const leaderboardEntrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    points: { type: Number, required: true },
    team: { type: String, required: true }
  },
  { timestamps: true }
)

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    focus: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)
const Team = mongoose.model('Team', teamSchema)
const Activity = mongoose.model('Activity', activitySchema)
const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardEntrySchema)
const Workout = mongoose.model('Workout', workoutSchema)

export { Activity, LeaderboardEntry, Team, User, Workout }
