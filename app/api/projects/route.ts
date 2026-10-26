import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Project from '@/server/models/Project'
import { MOCK_PROJECTS } from '@/lib/mock-data'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Attempt DB connection
    try {
      if (!process.env.MONGODB_URI) throw new Error("No Mongo URI");
      await connectDB()
      const projects = await Project.find({}).sort({ priority: -1, createdAt: -1 })
      return NextResponse.json(projects)
    } catch (dbError) {
      console.warn("Database connection failed or missing URI, serving MOCK DATA:", dbError);
      return NextResponse.json(MOCK_PROJECTS)
    }
  } catch (error) {
    console.error('Error fetching projects:', error)
    // Final fallback to mock data even if something else broke
    return NextResponse.json(MOCK_PROJECTS)
  }
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    try {
      if (!process.env.MONGODB_URI) throw new Error("No Mongo URI");
      await connectDB()
      
      const body = await req.json()
      
      const newProject = new Project({
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
      })

      const savedProject = await newProject.save()
      return NextResponse.json(savedProject, { status: 201 })
    } catch (dbError: any) {
      console.error("Database connection or save failed:", dbError);
      return NextResponse.json({ message: 'Failed to save project', error: dbError.message }, { status: 500 })
    }
  } catch (error: any) {
    console.error('Error creating project:', error)
    return NextResponse.json({ message: 'Server error', details: error.message }, { status: 500 })
  }
}
