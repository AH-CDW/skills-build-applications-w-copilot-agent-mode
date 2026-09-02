import mongoose from 'mongoose'

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'
const db = mongoose.connection

const connectDatabase = async () => {
  try {
    await mongoose.connect(connectionString)
    console.log('Connected to octofit_db')
  } catch (error) {
    console.warn('MongoDB is not available. Continuing without the database connection.', error)
    throw error
  }
}

db.on('error', (error) => {
  console.error('MongoDB connection error:', error)
})

export { connectionString, connectDatabase }
export default db
