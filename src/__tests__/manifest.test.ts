import { describe, it, expect } from 'vitest'
import manifest from '@/app/manifest'

const m = manifest()

describe('manifest.ts', () => {
  it('has correct full name', () => {
    expect(m.name).toBe('Boldpiq — Web Design & Development')
  })

  it('has correct short_name', () => {
    expect(m.short_name).toBe('Boldpiq')
  })

  it('has a description', () => {
    expect(m.description).toBeTruthy()
    expect(m.description!.length).toBeGreaterThan(10)
  })

  it('start_url is /', () => {
    expect(m.start_url).toBe('/')
  })

  it('display is standalone', () => {
    expect(m.display).toBe('standalone')
  })

  it('background_color matches brand dark', () => {
    expect(m.background_color).toBe('#0B0F1C')
  })

  it('theme_color matches brand dark', () => {
    expect(m.theme_color).toBe('#0B0F1C')
  })

  it('has at least one icon', () => {
    expect(m.icons).toBeDefined()
    expect((m.icons as unknown[]).length).toBeGreaterThanOrEqual(1)
  })

  it('icon src is a valid URL', () => {
    const icons = m.icons as Array<{ src: string; sizes: string; type: string }>
    icons.forEach(icon => {
      expect(icon.src.startsWith('https://')).toBe(true)
    })
  })

  it('icon type is image/png', () => {
    const icons = m.icons as Array<{ src: string; sizes: string; type: string }>
    expect(icons[0].type).toBe('image/png')
  })
})
