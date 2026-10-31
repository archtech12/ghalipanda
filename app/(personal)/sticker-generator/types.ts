export type TemplateId = 'classic' | 'modern' | 'youth' | 'print' | 'minimal' | 'badge' | 'type' | 'geometric' | 'classicV2' | 'badgeV2' | 'geometricV2' | 'classicPremium' | 'modernPremium' | 'printPremium' | 'badgePremium' | 'pledge'
export type AspectRatio = 'square'

export interface StickerData {
  supporterName: string
  supporterPhoto: string | null
  candidatePhoto: string
  customMessage: string
  templateId: TemplateId
  aspectRatio: AspectRatio
  showWatermark: boolean
  colorTheme: 'green' | 'red' | 'blue' | 'gold'
}

export interface TemplateProps {
  data: StickerData
  isExporting?: boolean
}
