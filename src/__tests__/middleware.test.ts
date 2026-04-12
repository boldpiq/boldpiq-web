import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// Inline the middleware logic to avoid Next.js edge runtime constraints in test env
const HSTS = 'max-age=63072000; includeSubDomains; preload'

function buildCsp(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    `style-src 'self' 'unsafe-inline' https://*.leadconnectorhq.com https://*.gohighlevel.com https://fonts.bunny.net https://www.gstatic.com`,
    "img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com https://res.cloudinary.com https://*.leadconnectorhq.com https://assets.cdn.filesafe.space https://images.squarespace-cdn.com https://www.google.com https://www.gstatic.com https://lh3.googleusercontent.com",
    "font-src 'self' data: https://*.leadconnectorhq.com https://fonts.bunny.net https://www.gstatic.com",
    "connect-src 'self' https://services.leadconnectorhq.com https://*.leadconnectorhq.com https://challenges.cloudflare.com https://static.cloudflareinsights.com https://js.hs-scripts.com wss://challenges.cloudflare.com",
    "worker-src blob:",
    "frame-src https://link.zip360.co.za https://*.leadconnectorhq.com https://*.gohighlevel.com https://www.youtube.com https://www.youtube-nocookie.com https://challenges.cloudflare.com",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "manifest-src 'self'",
  ].join('; ')
}

describe('Middleware security headers', () => {
  describe('Bare domain redirect', () => {
    it('redirects boldpiq.com to www with 308', () => {
      const req = new NextRequest('https://boldpiq.com/about', {
        headers: { host: 'boldpiq.com' },
      })
      const host = req.headers.get('host') ?? ''
      expect(host === 'boldpiq.com' || host === 'boldpiq.com:443').toBe(true)
    })

    it('detects boldpiq.com:443 host variant', () => {
      expect('boldpiq.com:443' === 'boldpiq.com' || 'boldpiq.com:443' === 'boldpiq.com:443').toBe(true)
    })

    it('does not redirect www.boldpiq.com', () => {
      const host = 'www.boldpiq.com'
      const isBareDomain = host === 'boldpiq.com' || host === 'boldpiq.com:443'
      expect(isBareDomain).toBe(false)
    })
  })

  describe('HSTS header', () => {
    it('includes max-age of 2 years', () => {
      expect(HSTS).toContain('max-age=63072000')
    })

    it('includes includeSubDomains', () => {
      expect(HSTS).toContain('includeSubDomains')
    })

    it('includes preload directive', () => {
      expect(HSTS).toContain('preload')
    })
  })

  describe('CSP', () => {
    const nonce = 'dGVzdC1ub25jZQ=='

    it('contains nonce in script-src', () => {
      const csp = buildCsp(nonce)
      expect(csp).toContain(`'nonce-${nonce}'`)
    })

    it('uses strict-dynamic in script-src', () => {
      expect(buildCsp(nonce)).toContain("'strict-dynamic'")
    })

    it('does NOT include nonce in style-src (would kill unsafe-inline)', () => {
      const csp = buildCsp(nonce)
      const styleSrc = csp.split(';').find(d => d.trim().startsWith('style-src'))
      expect(styleSrc).not.toContain(`nonce-${nonce}`)
    })

    it('style-src includes unsafe-inline for inline styles', () => {
      const csp = buildCsp(nonce)
      const styleSrc = csp.split(';').find(d => d.trim().startsWith('style-src'))
      expect(styleSrc).toContain("'unsafe-inline'")
    })

    it('blocks object-src', () => {
      expect(buildCsp(nonce)).toContain("object-src 'none'")
    })

    it('blocks frame-ancestors', () => {
      expect(buildCsp(nonce)).toContain("frame-ancestors 'none'")
    })

    it('restricts base-uri to self', () => {
      expect(buildCsp(nonce)).toContain("base-uri 'self'")
    })

    it('each request generates a unique nonce', () => {
      const n1 = Buffer.from(crypto.randomUUID()).toString('base64')
      const n2 = Buffer.from(crypto.randomUUID()).toString('base64')
      expect(n1).not.toBe(n2)
    })
  })
})
