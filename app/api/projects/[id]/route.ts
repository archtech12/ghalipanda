import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Project from '@/server/models/Project'

export const dynamic = 'force-dynamic'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    try {
      if (!process.env.MONGODB_URI) throw new Error("No Mongo URI");
      await connectDB()
      
      const resolvedParams = await params
      const { id } = resolvedParams
      const body = await req.json()
      
      const updatedProject = await Project.findByIdAndUpdate(
        id,
        {
          title: body.title,
          titleHA: body.titleHA,
          description: body.description,
          category: body.category,
          imageUrl: body.imageUrl,
          images: body.images || [],
          videoEmbedLink: body.videoEmbedLink,
          status: body.status || 'Planned',
          year: body.year,
          priority: body.priority || 0,
          date: body.year || new Date().getFullYear().toString()
        },
        { new: true, runValidators: true }
      )

      if (!updatedProject) {
        return NextResponse.json({ message: 'Project not found' }, { status: 404 })
      }

      return NextResponse.json(updatedProject, { status: 200 })
    } catch (dbError: any) {
      console.error("Database update failed:", dbError);
      return NextResponse.json({ message: 'Failed to update project', error: dbError.message }, { status: 500 })
    }
  } catch (error: any) {
    console.error('Error updating project:', error)
    return NextResponse.json({ message: 'Server error', details: error.message }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    try {
      if (!process.env.MONGODB_URI) throw new Error("No Mongo URI");
      await connectDB()
      
      const resolvedParams = await params
      const { id } = resolvedParams
      const deletedProject = await Project.findByIdAndDelete(id)

      if (!deletedProject) {
        return NextResponse.json({ message: 'Project not found' }, { status: 404 })
      }

      return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 })
    } catch (dbError: any) {
      console.error("Database deletion failed:", dbError);
      return NextResponse.json({ message: 'Failed to delete project', error: dbError.message }, { status: 500 })
    }
  } catch (error: any) {
    console.error('Error deleting project:', error)
    return NextResponse.json({ message: 'Server error', details: error.message }, { status: 500 })
  }
}
