import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

// MongoDB connection
let isConnected = false

async function connectDB() {
  if (isConnected) return

  try {
    await mongoose.connect(process.env.MONGODB_URI || '', {
      serverSelectionTimeoutMS: 10000,
    })
    isConnected = true
    console.log('✅ MongoDB connected')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    throw error
  }
}

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@ghalipanda.gov.ng' })

    if (existingAdmin) {
      return NextResponse.json({
        message: 'Admin user already exists',
        success: false,
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('Admin123!', 10)

    // Create admin user
    const admin = new User({
      name: 'Administrator',
      email: 'admin@ghalipanda.gov.ng',
      password: hashedPassword,
      role: 'admin',
    })

    await admin.save()

    return NextResponse.json({
      message: 'Admin user created successfully!',
      success: true,
      user: {
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    })
  } catch (error: any) {
    console.error('Setup error:', error)
    return NextResponse.json(
      {
        message: 'Setup failed',
        error: error.message,
        success: false,
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await connectDB()

    const userCount = await User.countDocuments()
    const adminExists = await User.findOne({ email: 'admin@ghalipanda.gov.ng' })

    return NextResponse.json({
      connected: mongoose.connection.readyState === 1,
      userCount,
      adminExists: !!adminExists,
      databaseName: mongoose.connection.name,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        connected: false,
        error: error.message
      },
      { status: 500 }
    )
  }
}
