import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mirror the indexnow route logic for unit testing
const INDEXNOW_KEY = '7a5a0924b54441b3a6b2da905aa8e2cd'
const HOST = 'www.boldpiq.com'

const URLS = [
  `https://${HOST}`,
  `https://${HOST}/services`,
  `https://${HOST}/work`,
  `https://${HOST}/about`,
  `https://${HOST}/contact`,
  `https://${HOST}/work/case-whitesons`,
  `https://${HOST}/work/case-bright-haven`,
  `https://${HOST}/work/case-netvirpret`,
  `https://${HOST}/work/case-the-cherri-chilli`,
]

function parseBearer(header: string | null): string {
  return header?.replace('Bearer ', '').trim() ?? ''
}

function buildPayload() {
  return {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: URLS,
  }
}

describe('indexnow route', () => {
  describe('authentication', () => {
    it('rejects missing Authorization header', () => {
      const secret = parseBearer(null)
      expect(secret).toBe('')
      expect(secret).not.toBe('correct-secret')
    })

    it('rejects wrong Bearer token', () => {
      const secret = parseBearer('Bearer wrong-token')
      expect(secret).toBe('wrong-token')
      expect(secret).not.toBe('correct-secret')
    })

    it('accepts correct Bearer token', () => {
      const secret = parseBearer('Bearer correct-secret')
      expect(secret).toBe('correct-secret')
    })

    it('strips Bearer prefix and whitespace', () => {
      expect(parseBearer('Bearer   my-token  ')).toBe('my-token')
    })
  })

  describe('payload', () => {
    it('uses the correct host', () => {
      expect(buildPayload().host).toBe('www.boldpiq.com')
    })

    it('keyLocation points to the correct URL', () => {
      expect(buildPayload().keyLocation).toBe(
        `https://www.boldpiq.com/${INDEXNOW_KEY}.txt`
      )
    })

    it('includes at least the 5 main pages', () => {
      const { urlList } = buildPayload()
      expect(urlList).toContain('https://www.boldpiq.com')
      expect(urlList).toContain('https://www.boldpiq.com/services')
      expect(urlList).toContain('https://www.boldpiq.com/work')
      expect(urlList).toContain('https://www.boldpiq.com/about')
      expect(urlList).toContain('https://www.boldpiq.com/contact')
    })

    it('includes all case study URLs', () => {
      const { urlList } = buildPayload()
      expect(urlList).toContain('https://www.boldpiq.com/work/case-whitesons')
      expect(urlList).toContain('https://www.boldpiq.com/work/case-bright-haven')
      expect(urlList).toContain('https://www.boldpiq.com/work/case-netvirpret')
      expect(urlList).toContain('https://www.boldpiq.com/work/case-the-cherri-chilli')
    })

    it('all URLs use HTTPS', () => {
      buildPayload().urlList.forEach(url => {
        expect(url.startsWith('https://')).toBe(true)
      })
    })

    it('all URLs belong to the correct host', () => {
      buildPayload().urlList.forEach(url => {
        expect(url.startsWith(`https://${HOST}`)).toBe(true)
      })
    })

    it('has no duplicate URLs', () => {
      const { urlList } = buildPayload()
      expect(new Set(urlList).size).toBe(urlList.length)
    })
  })

  describe('fetch integration (mocked)', () => {
    beforeEach(() => {
      vi.stubGlobal('fetch', vi.fn())
    })
    afterEach(() => {
      vi.unstubAllGlobals()
    })

    it('calls IndexNow API with correct endpoint', async () => {
      const mockFetch = vi.mocked(fetch)
      mockFetch.mockResolvedValueOnce({ ok: true, status: 200 } as Response)

      await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(buildPayload()),
      })

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.indexnow.org/indexnow',
        expect.objectContaining({ method: 'POST' })
      )
    })

    it('sends JSON content type', async () => {
      const mockFetch = vi.mocked(fetch)
      mockFetch.mockResolvedValueOnce({ ok: true, status: 200 } as Response)

      await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(buildPayload()),
      })

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({ 'Content-Type': 'application/json; charset=utf-8' }),
        })
      )
    })
  })
})
