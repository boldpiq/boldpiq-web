import { NextRequest, NextResponse } from 'next/server'

const N8N_BASE = process.env.N8N_BASE_URL || 'https://n8nservice.boldpiq.com'
const SECRET = '52um9c0GEki4JSIr9io5RKrkXJ5qtGBf2M4j2wpyxLBsxQGh+NGGiZTLNYp08dei'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params
  if (!token || !/^[\w\-]{10,64}$/.test(token)) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
  }

  let body: { fileName?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Fire-and-forget — log the event in n8n but don't block the response
  fetch(`${N8N_BASE}/webhook/client-upload-complete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-boldpiq-secret': SECRET },
    body: JSON.stringify({ token, fileName: body.fileName }),
  }).catch(() => {})

  return NextResponse.json({ ok: true })
}
