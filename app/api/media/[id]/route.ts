import { NextResponse, NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb'
import Media from '@/server/models/Media'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!process.env.MONGODB_URI) throw new Error('No Mongo URI')
    await connectDB()

    const { id } = await params
    const media = await Media.findById(id)

    if (!media) {
      return NextResponse.json({ message: 'Media item not found' }, { status: 404 })
    }

    return NextResponse.json(media, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching media item:', error)
    return NextResponse.json(
      { message: 'Server error', details: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    if (!process.env.MONGODB_URI) throw new Error('No Mongo URI')
    await connectDB()

    const { id } = await params
    const body = await req.json()

    const updatedMedia = await Media.findByIdAndUpdate(
      id,
      {
        title: body.title,
        description: body.description,
        url: body.url,
        type: body.type || 'image',
        category: body.category || 'Other',
        tags: body.tags || [],
      },
      { new: true, runValidators: true }
    )

    if (!updatedMedia) {
      return NextResponse.json({ message: 'Media item not found' }, { status: 404 })
    }

    return NextResponse.json(updatedMedia, { status: 200 })
  } catch (error: any) {
    console.error('Error updating media:', error)
    return NextResponse.json(
      { message: 'Failed to update media item', details: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    if (!process.env.MONGODB_URI) throw new Error('No Mongo URI')
    await connectDB()

    const { id } = await params
    const deletedMedia = await Media.findByIdAndDelete(id)

    if (!deletedMedia) {
      return NextResponse.json({ message: 'Media item not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Media item deleted successfully' }, { status: 200 })
  } catch (error: any) {
    console.error('Error deleting media:', error)
    return NextResponse.json(
      { message: 'Failed to delete media item', details: error.message },
      { status: 500 }
    )
  }
}
