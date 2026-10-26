import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, action } = body

    if (!id || !['download', 'share'].includes(action)) {
      return NextResponse.json({ error: 'Invalid tracking request' }, { status: 400 })
    }

    // Fetch current counts (In a production environment, you might use RPC for atomic increments)
    const { data: sticker, error: fetchError } = await supabase
      .from('stickers')
      .select('downloads, shares')
      .eq('id', id)
      .single()

    if (fetchError || !sticker) {
      return NextResponse.json({ error: 'Sticker not found' }, { status: 404 })
    }

    // Determine what to increment
    const updates = action === 'download' 
      ? { downloads: (sticker.downloads || 0) + 1 }
      : { shares: (sticker.shares || 0) + 1 }

    const { error: updateError } = await supabase
      .from('stickers')
      .update(updates)
      .eq('id', id)

    if (updateError) {
      console.error('Tracking Update Error:', updateError)
      return NextResponse.json({ error: 'Failed to update tracking' }, { status: 500 })
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Tracking API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
