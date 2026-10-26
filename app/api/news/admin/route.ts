import { NextResponse } from 'next/server'
import { MOCK_NEWS } from '@/lib/mock-data'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Try to get DB news if MongoDB is configured
    if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('your_mongodb')) {
      try {
        const mongoose = await import('mongoose')
        if (mongoose.default.connection.readyState < 1) {
          await mongoose.default.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 3000 })
        }
        const News = mongoose.default.models.News || mongoose.default.model('News', new mongoose.default.Schema({
          title: String, excerpt: String, content: String, category: String,
          imageUrl: String, status: { type: String, default: 'published' },
          author: String, published: Boolean,
          createdAt: { type: Date, default: Date.now },
        }))
        const news = await News.find().sort({ createdAt: -1 })
        // Merge DB news with mock news (DB news appears first as "dynamic additions")
        return NextResponse.json([...news, ...MOCK_NEWS])
      } catch (dbErr) {
        console.warn('DB unavailable, serving mock news for admin')
      }
    }
    // Return mock news as default (all codebase news)
    return NextResponse.json(MOCK_NEWS)
  } catch (error) {
    return NextResponse.json(MOCK_NEWS)
  }
}
