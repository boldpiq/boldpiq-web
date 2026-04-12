import { describe, it, expect } from 'vitest'
import { generateMeta } from '@/lib/metadata'

const base = {
  title: 'BoldPiq — Test Page',
  description: 'Test description for SEO.',
  url: 'https://www.boldpiq.com/test',
  siteName: 'BoldPiq',
}

describe('generateMeta', () => {
  describe('core fields', () => {
    it('sets title', () => {
      expect(generateMeta(base).title).toBe(base.title)
    })

    it('sets description', () => {
      expect(generateMeta(base).description).toBe(base.description)
    })

    it('sets metadataBase to the provided url', () => {
      const meta = generateMeta(base)
      expect((meta.metadataBase as URL).origin).toBe('https://www.boldpiq.com')
    })

    it('sets canonical alternate', () => {
      const meta = generateMeta(base)
      expect((meta.alternates as { canonical: string }).canonical).toBe(base.url)
    })
  })

  describe('OpenGraph', () => {
    it('sets og:title', () => {
      const og = generateMeta(base).openGraph as Record<string, unknown>
      expect(og.title).toBe(base.title)
    })

    it('sets og:description', () => {
      const og = generateMeta(base).openGraph as Record<string, unknown>
      expect(og.description).toBe(base.description)
    })

    it('defaults og:type to website', () => {
      const og = generateMeta(base).openGraph as Record<string, unknown>
      expect(og.type).toBe('website')
    })

    it('accepts article type', () => {
      const og = generateMeta({ ...base, type: 'article' }).openGraph as Record<string, unknown>
      expect(og.type).toBe('article')
    })

    it('includes OG image when provided', () => {
      const meta = generateMeta({ ...base, image: 'https://www.boldpiq.com/og.png' })
      const og = meta.openGraph as { images?: Array<{ url: string; width: number; height: number; alt: string }> }
      expect(og.images?.[0].url).toBe('https://www.boldpiq.com/og.png')
      expect(og.images?.[0].width).toBe(1200)
      expect(og.images?.[0].height).toBe(630)
      expect(og.images?.[0].alt).toBe(base.title)
    })

    it('omits OG image when not provided', () => {
      const og = generateMeta(base).openGraph as { images?: unknown }
      expect(og.images).toBeUndefined()
    })
  })

  describe('Twitter card', () => {
    it('uses summary_large_image when image is provided', () => {
      const tw = generateMeta({ ...base, image: 'https://www.boldpiq.com/og.png' }).twitter as Record<string, unknown>
      expect(tw.card).toBe('summary_large_image')
    })

    it('falls back to summary when no image', () => {
      const tw = generateMeta(base).twitter as Record<string, unknown>
      expect(tw.card).toBe('summary')
    })

    it('sets twitter title and description', () => {
      const tw = generateMeta(base).twitter as Record<string, unknown>
      expect(tw.title).toBe(base.title)
      expect(tw.description).toBe(base.description)
    })
  })

  describe('robots', () => {
    it('indexes by default', () => {
      const robots = generateMeta(base).robots as Record<string, unknown>
      expect(robots.index).toBe(true)
      expect(robots.follow).toBe(true)
    })

    it('sets noindex when noIndex is true', () => {
      const robots = generateMeta({ ...base, noIndex: true }).robots as Record<string, unknown>
      expect(robots.index).toBe(false)
      expect(robots.follow).toBe(false)
    })

    it('does not noindex when noIndex is false', () => {
      const robots = generateMeta({ ...base, noIndex: false }).robots as Record<string, unknown>
      expect(robots.index).toBe(true)
    })
  })
})
