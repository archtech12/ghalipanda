import { NextResponse, NextRequest } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { title, excerpt, content, imageUrl, category, author, published } = body

    const { data, error } = await supabase
      .from('news')
      .update({
        title,
        excerpt: excerpt || '',
        content,
        image_url: imageUrl || '',
        category: category || 'Announcement',
        author: author || 'Admin',
        published: published ?? true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase news update error:', error)
      return NextResponse.json({ message: 'Failed to update news article', error: error.message }, { status: 500 })
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
    })
  } catch (error: any) {
    console.error('News PUT error:', error)
    return NextResponse.json({ message: 'Server error', details: error.message }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase news delete error:', error)
      return NextResponse.json({ message: 'Failed to delete news article', error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'News article deleted successfully' })
  } catch (error: any) {
    console.error('News DELETE error:', error)
    return NextResponse.json({ message: 'Server error', details: error.message }, { status: 500 })
  }
}
