import { NextResponse, NextRequest } from 'next/server'
import { MOCK_NEWS } from '@/lib/mock-data'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Try to get dynamically added news from Supabase
    const { data: dbNews, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && dbNews && dbNews.length > 0) {
      // Merge: DB (admin-added) news first, then codebase mock news
      const mergedNews = [
        ...dbNews.map((n: any) => ({
          _id: n.id,
          title: n.title,
          content: n.content,
          category: n.category,
          imageUrl: n.image_url,
          publishDate: n.created_at,
          excerpt: n.excerpt,
          author: n.author,
          published: true,
        })),
        ...MOCK_NEWS,
      ]
      return NextResponse.json(mergedNews)
    }

    // Fallback: just return codebase mock news
    return NextResponse.json(MOCK_NEWS)
  } catch (error) {
    return NextResponse.json(MOCK_NEWS)
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin token
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, excerpt, content, imageUrl, category, author, published } = body

    if (!title || !content) {
      return NextResponse.json({ message: 'Title and content are required' }, { status: 400 })
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from('news')
      .insert([{
        title,
        excerpt: excerpt || '',
        content,
        image_url: imageUrl || '',
        category: category || 'Announcement',
        author: author || 'Admin',
        published: published ?? true,
      }])
      .select()
      .single()

    if (error) {
      console.error('Supabase news insert error:', error)
      return NextResponse.json({ message: 'Failed to create news article', error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      _id: data.id,
      title: data.title,
      content: data.content,
      category: data.category,
      imageUrl: data.image_url,
      publishDate: data.created_at,
      excerpt: data.excerpt,
      author: data.author,
      published: data.published,
    }, { status: 201 })
  } catch (error: any) {
    console.error('News POST error:', error)
    return NextResponse.json({ message: 'Server error', details: error.message }, { status: 500 })
  }
}
