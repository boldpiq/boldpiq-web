import { describe, it, expect } from 'vitest'
import sitemap from '@/app/sitemap'

const BASE = 'https://www.boldpiq.com'
const entries = sitemap()
const urls = entries.map(e => e.url)

describe('sitemap.ts', () => {
  describe('required pages', () => {
    const required = [
      BASE,
      `${BASE}/services`,
      `${BASE}/work`,
      `${BASE}/about`,
      `${BASE}/contact`,
    ]
    required.forEach(url => {
      it(`includes ${url}`, () => {
        expect(urls).toContain(url)
      })
    })
  })

  describe('case studies', () => {
    const cases = [
      `${BASE}/work/case-whitesons`,
      `${BASE}/work/case-bright-haven`,
      `${BASE}/work/case-netvirpret`,
      `${BASE}/work/case-the-cherri-chilli`,
    ]
    cases.forEach(url => {
      it(`includes ${url}`, () => {
        expect(urls).toContain(url)
      })
    })
  })

  describe('legal pages', () => {
    const legal = ['/privacy', '/terms', '/refund', '/dpa', '/paia']
    legal.forEach(path => {
      it(`includes ${path}`, () => {
        expect(urls).toContain(`${BASE}${path}`)
      })
    })
  })

  describe('priorities', () => {
    it('homepage has priority 1.0', () => {
      expect(entries.find(e => e.url === BASE)?.priority).toBe(1.0)
    })

    it('services has priority 0.9', () => {
      expect(entries.find(e => e.url === `${BASE}/services`)?.priority).toBe(0.9)
    })

    it('work has priority 0.9', () => {
      expect(entries.find(e => e.url === `${BASE}/work`)?.priority).toBe(0.9)
    })

    it('about has priority 0.8', () => {
      expect(entries.find(e => e.url === `${BASE}/about`)?.priority).toBe(0.8)
    })

    it('case studies have priority 0.8', () => {
      const caseEntries = entries.filter(e => e.url.includes('/work/case-'))
      caseEntries.forEach(e => expect(e.priority).toBe(0.8))
    })

    it('legal pages have priority ≤ 0.4', () => {
      const legal = entries.filter(e =>
        ['/privacy', '/terms', '/refund', '/dpa', '/paia'].some(p => e.url.endsWith(p))
      )
      legal.forEach(e => expect(e.priority!).toBeLessThanOrEqual(0.4))
    })

    it('privacy has lower priority than contact', () => {
      const privacy = entries.find(e => e.url === `${BASE}/privacy`)!
      const contact = entries.find(e => e.url === `${BASE}/contact`)!
      expect(privacy.priority!).toBeLessThan(contact.priority!)
    })

    it('homepage has highest priority of all', () => {
      const maxPriority = Math.max(...entries.map(e => e.priority ?? 0))
      expect(maxPriority).toBe(1.0)
      expect(entries.find(e => e.url === BASE)?.priority).toBe(maxPriority)
    })
  })

  describe('changeFrequency', () => {
    it('homepage is weekly', () => {
      expect(entries.find(e => e.url === BASE)?.changeFrequency).toBe('weekly')
    })

    it('services is monthly', () => {
      expect(entries.find(e => e.url.endsWith('/services'))?.changeFrequency).toBe('monthly')
    })

    it('legal pages are yearly', () => {
      const legal = entries.filter(e =>
        ['/privacy', '/terms', '/refund', '/dpa', '/paia'].some(p => e.url.endsWith(p))
      )
      legal.forEach(e => expect(e.changeFrequency).toBe('yearly'))
    })
  })

  describe('integrity', () => {
    it('all URLs start with https://www.boldpiq.com', () => {
      urls.forEach(url => expect(url.startsWith(BASE)).toBe(true))
    })

    it('no duplicate URLs', () => {
      expect(new Set(urls).size).toBe(urls.length)
    })

    it('all entries have a lastModified date', () => {
      entries.forEach(e => expect(e.lastModified).toBeInstanceOf(Date))
    })

    it('all priorities are between 0 and 1', () => {
      entries.forEach(e => {
        if (e.priority !== undefined) {
          expect(e.priority).toBeGreaterThanOrEqual(0)
          expect(e.priority).toBeLessThanOrEqual(1)
        }
      })
    })

    it('has at least 16 entries', () => {
      expect(entries.length).toBeGreaterThanOrEqual(16)
    })

    it('no URL has a trailing slash (except root)', () => {
      urls.filter(u => u !== BASE).forEach(url => {
        expect(url.endsWith('/')).toBe(false)
      })
    })
  })
})
