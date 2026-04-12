import { describe, it, expect } from 'vitest'
import { z } from 'zod'

// Mirror the schema from the API route
const schema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().max(100).optional().default(''),
  email: z.string().email().max(254),
  companyName: z.string().max(200).optional().default(''),
  website: z.string().max(500).optional().default(''),
  service: z.string().max(100).optional().default(''),
  message: z.string().max(5000).optional().default(''),
  recaptchaToken: z.string().min(1),
})

// Mirror the rate limiter logic
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 })
    return false
  }
  if (entry.count >= 5) return true
  entry.count++
  return false
}

const validPayload = {
  firstName: 'Jane',
  email: 'jane@example.com',
  recaptchaToken: 'valid-token',
}

describe('submit-brief schema validation', () => {
  it('accepts a minimal valid payload', () => {
    const result = schema.safeParse(validPayload)
    expect(result.success).toBe(true)
  })

  it('accepts a full valid payload', () => {
    const result = schema.safeParse({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      companyName: 'Acme',
      website: 'https://acme.com',
      service: 'Web Design',
      message: 'Build us a great site.',
      recaptchaToken: 'tok',
    })
    expect(result.success).toBe(true)
  })

  it('rejects missing firstName', () => {
    const result = schema.safeParse({ email: 'a@b.com', recaptchaToken: 'x' })
    expect(result.success).toBe(false)
  })

  it('rejects empty firstName', () => {
    const result = schema.safeParse({ ...validPayload, firstName: '' })
    expect(result.success).toBe(false)
  })

  it('rejects firstName longer than 100 chars', () => {
    const result = schema.safeParse({ ...validPayload, firstName: 'a'.repeat(101) })
    expect(result.success).toBe(false)
  })

  it('rejects invalid email', () => {
    const result = schema.safeParse({ ...validPayload, email: 'not-an-email' })
    expect(result.success).toBe(false)
  })

  it('rejects missing recaptchaToken', () => {
    const result = schema.safeParse({ firstName: 'Jane', email: 'jane@example.com' })
    expect(result.success).toBe(false)
  })

  it('rejects empty recaptchaToken', () => {
    const result = schema.safeParse({ ...validPayload, recaptchaToken: '' })
    expect(result.success).toBe(false)
  })

  it('rejects message over 5000 chars', () => {
    const result = schema.safeParse({ ...validPayload, message: 'x'.repeat(5001) })
    expect(result.success).toBe(false)
  })

  it('defaults optional fields to empty string', () => {
    const result = schema.safeParse(validPayload)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.lastName).toBe('')
      expect(result.data.companyName).toBe('')
      expect(result.data.service).toBe('')
      expect(result.data.message).toBe('')
    }
  })
})

describe('submit-brief rate limiter', () => {
  it('allows first 5 requests from an IP', () => {
    const ip = `test-ip-${Date.now()}`
    for (let i = 0; i < 5; i++) {
      expect(isRateLimited(ip)).toBe(false)
    }
  })

  it('blocks the 6th request from same IP', () => {
    const ip = `block-ip-${Date.now()}`
    for (let i = 0; i < 5; i++) isRateLimited(ip)
    expect(isRateLimited(ip)).toBe(true)
  })

  it('allows a different IP independently', () => {
    const ip1 = `ip-a-${Date.now()}`
    const ip2 = `ip-b-${Date.now()}`
    for (let i = 0; i < 5; i++) isRateLimited(ip1)
    expect(isRateLimited(ip2)).toBe(false)
  })
})
