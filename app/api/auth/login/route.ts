import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const dynamic = 'force-dynamic'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ghali-panda-dashboard'
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'

// Ensure User model is defined only once to avoid OverwriteModelError
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
}, { timestamps: true })

// Use existing model or create new one
const User = mongoose.models.User || mongoose.model('User', userSchema)

async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return
  }

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined')
  }

  try {
    console.log('Connecting to MongoDB...', MONGODB_URI)
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5s timeout
    })
    console.log('MongoDB connected successfully')
  } catch (err) {
    console.error('MongoDB connection failed:', err)
    throw err
  }
}

export async function POST(request: Request) {
  try {
    console.log('Login attempt started')

    // Parse request body
    const body = await request.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 })
    }

    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // --- DEMO BYPASS ---
    // Allow login with demo credentials without requiring MongoDB connection
    const normalizedEmail = email.toLowerCase().trim()
    
    if (normalizedEmail === 'admin@ghalipanda.gov.ng' && password === 'Admin123!') {
      console.log('Demo user authenticated via bypass');
      const token = jwt.sign(
        { userId: 'demo-admin-id', email: 'admin@ghalipanda.gov.ng', role: 'admin' },
        JWT_SECRET,
        { expiresIn: '7d' }
      );
      return NextResponse.json({
        token,
        user: { id: 'demo-admin-id', name: 'Demo Admin', email: 'admin@ghalipanda.gov.ng', role: 'admin' }
      });
    }

    // Connect to database
    await connectDB()

    console.log(`Searching for user: ${normalizedEmail}`)

    const user = await User.findOne({ email: normalizedEmail })
    console.log('User found in DB:', user ? user.email : 'No user found');

    if (!user) {
      console.log('User not found')
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    console.log('User found, verifying password...')

    // Verify password
    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      console.log('Password invalid')
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    console.log('Password verified, generating token...')

    // Generate token
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Return success
    return NextResponse.json({
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error: any) {
    console.error('Login Route Error:', error)
    return NextResponse.json(
      {
        message: 'Server error',
        details: error.message || String(error)
      },
      { status: 500 }
    )
  }
}
