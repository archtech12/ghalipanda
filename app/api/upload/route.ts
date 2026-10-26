import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('image') as File
    
    if (!file) {
      return NextResponse.json({ message: 'No image file provided' }, { status: 400 })
    }

    // Check if media bucket exists, if not create it
    const { data: buckets } = await supabase.storage.listBuckets()
    const mediaBucketExists = buckets?.some(b => b.name === 'media')
    
    if (!mediaBucketExists) {
      await supabase.storage.createBucket('media', { public: true })
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
    const filePath = `uploads/${fileName}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('media')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      console.error('Supabase upload error:', error)
      return NextResponse.json({ message: 'Failed to upload image to storage', error: error.message }, { status: 500 })
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('media')
      .getPublicUrl(filePath)

    return NextResponse.json({ 
      imageUrl: publicUrlData.publicUrl,
      filePath: publicUrlData.publicUrl // Provide both to satisfy different parts of the app
    }, { status: 201 })
    
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json({ message: 'Server error during upload', details: error.message }, { status: 500 })
  }
}
