import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Media from '@/server/models/Media'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json([], { status: 200 })
    }
    await connectDB()
    const media = await Media.find().sort({ createdAt: -1 })
    return NextResponse.json(media)
  } catch (error) {
    console.error('Error fetching media:', error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ message: 'Database URI not configured' }, { status: 500 })
    }
    await connectDB()
    const body = await request.json()
    const media = new Media({
      title: body.title,
      description: body.description,
      url: body.url,
      type: body.type || 'image',
      category: body.category || 'Other',
      tags: body.tags || [],
    })
    await media.save()
    return NextResponse.json(media, { status: 201 })
  } catch (error: any) {
    console.error('Error creating media:', error)
    return NextResponse.json({ message: 'Failed to create media', details: error.message }, { status: 500 })
  }
}

