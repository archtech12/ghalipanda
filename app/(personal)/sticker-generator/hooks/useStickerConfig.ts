import { useState } from 'react'
import { StickerData, TemplateId, AspectRatio } from '../types'

const DEFAULT_DATA: StickerData = {
    supporterName: '',
    supporterPhoto: null,
    customMessage: 'Together We Rise',
    templateId: 'classic',
    aspectRatio: 'square',
    showWatermark: true,
    colorTheme: 'green',
}

export function useStickerConfig() {
    const [data, setData] = useState<StickerData>(DEFAULT_DATA)

    const updateField = <K extends keyof StickerData>(field: K, value: StickerData[K]) => {
        setData((prev) => ({ ...prev, [field]: value }))
    }

    const reset = () => setData(DEFAULT_DATA)

    return {
        data,
        updateField,
        reset,
        setData,
    }
}
