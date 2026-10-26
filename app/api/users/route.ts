import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

let isConnected = false

async function connectDB() {
  if (isConnected) return
  try {
    await mongoose.connect(process.env.MONGODB_URI || '', {
      serverSelectionTimeoutMS: 10000,
    })
    isConnected = true
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now },
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

// Get all users
export async function GET() {
  try {
    await connectDB()
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json([], { status: 200 })
  }
}

// Create new user
export async function POST(request: Request) {
  try {
    await connectDB()
    const { name, email, password, role } = await request.json()

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'admin',
    })

    await user.save()

    // Return user without password
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    }

    return NextResponse.json(userResponse, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}
