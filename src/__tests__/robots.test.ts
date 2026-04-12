import { describe, it, expect } from 'vitest'
import robots from '@/app/robots'

const result = robots()
const BASE = 'https://www.boldpiq.com'
const BLOCKED = ['/thank-you', '/demo', '/api/', '/onboarding']

describe('robots.ts', () => {
  describe('sitemap and host', () => {
    it('sets sitemap URL', () => {
      expect(result.sitemap).toBe(`${BASE}/sitemap.xml`)
    })

    it('sets host', () => {
      expect(result.host).toBe(BASE)
    })
  })

  describe('default rule (*)', () => {
    const defaultRule = (result.rules as Array<{ userAgent: string; allow: string; disallow: string[] }>)
      .find(r => r.userAgent === '*')!

    it('exists', () => {
      expect(defaultRule).toBeDefined()
    })

    it('allows /', () => {
      expect(defaultRule.allow).toBe('/')
    })

    it('disallows /thank-you', () => {
      expect(defaultRule.disallow).toContain('/thank-you')
    })

    it('disallows /demo', () => {
      expect(defaultRule.disallow).toContain('/demo')
    })

    it('disallows /api/', () => {
      expect(defaultRule.disallow).toContain('/api/')
    })

    it('disallows /onboarding', () => {
      expect(defaultRule.disallow).toContain('/onboarding')
    })
  })

  describe('AI crawler rules', () => {
    const agents = [
      'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
      'ClaudeBot', 'anthropic-ai',
      'Googlebot', 'Google-Extended',
      'PerplexityBot',
      'FacebookBot',
      'Applebot', 'Applebot-Extended',
      'cohere-ai', 'Diffbot', 'CCBot', 'Bytespider',
      'bingbot', 'Amazonbot',
    ]

    agents.forEach(agent => {
      it(`${agent} is allowed on /`, () => {
        const rule = (result.rules as Array<{ userAgent: string; allow: string; disallow: string[] }>)
          .find(r => r.userAgent === agent)
        expect(rule).toBeDefined()
        expect(rule!.allow).toBe('/')
      })

      it(`${agent} shares same disallow list`, () => {
        const rule = (result.rules as Array<{ userAgent: string; allow: string; disallow: string[] }>)
          .find(r => r.userAgent === agent)
        expect(rule!.disallow).toEqual(BLOCKED)
      })
    })
  })

  describe('integrity', () => {
    it('has at least 18 rules (default + 17 AI agents)', () => {
      expect((result.rules as unknown[]).length).toBeGreaterThanOrEqual(18)
    })

    it('every rule has allow set to "/"', () => {
      (result.rules as Array<{ allow: string }>).forEach(rule => {
        expect(rule.allow).toBe('/')
      })
    })

    it('every rule disallows /api/', () => {
      (result.rules as Array<{ disallow: string[] }>).forEach(rule => {
        expect(rule.disallow).toContain('/api/')
      })
    })

    it('no rule allows /thank-you (always blocked)', () => {
      (result.rules as Array<{ allow?: string | string[] }>).forEach(rule => {
        const allowed = Array.isArray(rule.allow) ? rule.allow : [rule.allow]
        expect(allowed).not.toContain('/thank-you')
      })
    })
  })
})
