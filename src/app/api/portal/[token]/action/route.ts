import { NextRequest, NextResponse } from 'next/server'

const N8N_BASE = process.env.N8N_BASE_URL || 'https://n8nservice.boldpiq.com'
const WEBHOOK_SECRET = process.env.BOS_PORTAL_WEBHOOK_SECRET || ''

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params
  if (!token || !/^[\w\-]{10,64}$/.test(token)) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
  }

  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const action = String((body as Record<string, unknown>).action || '').trim()
  if (!['approve', 'revision'].includes(action)) {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  }

  try {
    const upstream = await fetch(`${N8N_BASE}/webhook/portal-action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-BOS-Secret': WEBHOOK_SECRET,
      },
      body: JSON.stringify({ token, action }),
      signal: AbortSignal.timeout(10000),
    })

    if (!upstream.ok) {
      return NextResponse.json({ error: 'Action failed' }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Action failed' }, { status: 502 })
  }
}
