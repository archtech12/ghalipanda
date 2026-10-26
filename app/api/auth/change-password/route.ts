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
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export async function POST(request: Request) {
  try {
    await connectDB()
    const { email, currentPassword, newPassword } = await request.json()

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.password)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 401 }
      )
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update password
    user.password = hashedPassword
    await user.save()

    return NextResponse.json({ message: 'Password changed successfully' })
  } catch (error) {
    console.error('Error changing password:', error)
    return NextResponse.json(
      { error: 'Failed to change password' },
      { status: 500 }
    )
  }
}
