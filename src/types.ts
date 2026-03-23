export type Format = 'svg' | 'png' | 'webp'

export interface IconMeta {
  base: Format
  aliases: string[]
  categories: string[]
  update: {
    timestamp: string
    author: { id: number; name: string }
  }
  // variant filenames (without extension): dark = dark backgrounds, light = light backgrounds
  colors: {
    dark: string
    light?: string
  }
}

export interface IconVariantUrls {
  dark: string
  light?: string
}

export interface IconInfo {
  name: string
  base: Format
  categories: string[]
  aliases: string[]
  updatedAt: string
  urls: {
    svg: IconVariantUrls
    png: IconVariantUrls
    webp: IconVariantUrls
  }
}
