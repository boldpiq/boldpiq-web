import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const schema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().max(100).optional().default(""),
  email: z.string().email().max(254),
  companyName: z.string().max(200).optional().default(""),
  website: z.string().max(500).optional().default(""),
  service: z.string().max(100).optional().default(""),
  message: z.string().max(5000).optional().default(""),
  recaptchaToken: z.string().min(1),
})

// Simple in-memory rate limiter: max 5 submissions per IP per hour
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

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
    if (isRateLimited(ip)) {
      return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 })
    }

    // Input validation
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 })
    }
    const { firstName, lastName, email, companyName, website, service, message, recaptchaToken } = parsed.data

    // Verify Turnstile token
    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    })
    const verifyData = await verifyRes.json()
    if (!verifyData.success) {
      return NextResponse.json({ ok: false, error: "Captcha failed" }, { status: 403 })
    }

    const apiKey = process.env.GHL_PRIVATE_API_KEY
    const locationId = process.env.GHL_LOCATION_ID

    if (apiKey) {
      await fetch("https://services.leadconnectorhq.com/contacts/", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Version": "2021-07-28",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          companyName,
          website,
          source: "Website Brief Form",
          tags: ["website-brief", service].filter(Boolean),
          customFields: [
            { key: "message", field_value: message },
            { key: "service_interest", field_value: service },
          ],
          locationId,
        }),
      })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
