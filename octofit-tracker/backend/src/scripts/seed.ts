import mongoose from 'mongoose'
import { connectDatabase } from '../config/database.js'
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js'

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase()
    console.log('Seed the octofit_db database with test data')

    await User.deleteMany({})
    await Team.deleteMany({})
    await Activity.deleteMany({})
    await LeaderboardEntry.deleteMany({})
    await Workout.deleteMany({})

    const users = await User.insertMany([
      { name: 'Avery Chen', email: 'avery@example.com', team: 'Falcons', level: 'Intermediate' },
      { name: 'Jordan Lee', email: 'jordan@example.com', team: 'Sharks', level: 'Advanced' },
      { name: 'Maya Patel', email: 'maya@example.com', team: 'Falcons', level: 'Beginner' },
      { name: 'Sofia Nguyen', email: 'sofia@example.com', team: 'Eagles', level: 'Intermediate' }
    ])

    await Team.insertMany([
      { name: 'Falcons', captain: users[0].name, points: 1280 },
      { name: 'Sharks', captain: users[1].name, points: 1425 },
      { name: 'Eagles', captain: users[3].name, points: 1105 }
    ])

    await Activity.insertMany([
      { userId: 1, type: 'Running', durationMinutes: 35, calories: 420, date: '2026-09-02' },
      { userId: 2, type: 'Strength', durationMinutes: 45, calories: 510, date: '2026-09-01' },
      { userId: 3, type: 'Walking', durationMinutes: 25, calories: 180, date: '2026-08-31' },
      { userId: 4, type: 'Cycling', durationMinutes: 40, calories: 370, date: '2026-09-03' }
    ])

    await LeaderboardEntry.insertMany([
      { name: users[1].name, points: 1425, team: 'Sharks' },
      { name: users[0].name, points: 1280, team: 'Falcons' },
      { name: users[2].name, points: 1190, team: 'Falcons' },
      { name: users[3].name, points: 1160, team: 'Eagles' }
    ])

    await Workout.insertMany([
      { title: 'Cardio Blast', focus: 'Endurance', durationMinutes: 30, difficulty: 'Moderate' },
      { title: 'Core Circuit', focus: 'Core', durationMinutes: 20, difficulty: 'Beginner' },
      { title: 'Power Lift', focus: 'Strength', durationMinutes: 40, difficulty: 'Advanced' },
      { title: 'Mobility Flow', focus: 'Recovery', durationMinutes: 25, difficulty: 'Beginner' }
    ])

    console.log('Database seeding complete')
    await mongoose.disconnect()
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
