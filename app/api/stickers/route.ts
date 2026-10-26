import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { supporterName, templateId, imageBase64 } = body

    if (!supporterName || !templateId || !imageBase64) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Process base64 string
    // Format usually is "data:image/png;base64,iVBORw0KGgo..."
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')

    // Generate unique filename
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.png`

    // 1. Upload to Supabase Storage
    const { data: storageData, error: storageError } = await supabase.storage
      .from('stickers_assets')
      .upload(filename, buffer, {
        contentType: 'image/png',
        cacheControl: '3600',
        upsert: false
      })

    if (storageError) {
      console.error('Supabase Storage Error:', storageError)
      return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
    }

    // 2. Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('stickers_assets')
      .getPublicUrl(filename)

    const imageUrl = publicUrlData.publicUrl

    // 3. Save record to Database
    const { data: dbData, error: dbError } = await supabase
      .from('stickers')
      .insert([
        {
          supporter_name: supporterName,
          template_id: templateId,
          image_url: imageUrl,
        }
      ])
      .select('id')
      .single()

    if (dbError) {
      console.error('Supabase DB Error:', dbError)
      // Even if DB fails, the user can still download their image, but analytics tracking fails
      return NextResponse.json({ error: 'Failed to save sticker record' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      id: dbData.id,
      imageUrl: imageUrl
    })

  } catch (error) {
    console.error('Sticker API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
