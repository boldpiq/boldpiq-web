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

  let body: { fileName?: string; fileType?: string; fileSize?: number; folderUrl?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { fileName, fileType, fileSize, folderUrl } = body
  if (!fileName || !folderUrl) {
    return NextResponse.json({ error: 'Missing fileName or folderUrl' }, { status: 400 })
  }

  try {
    const res = await fetch(`${N8N_BASE}/webhook/client-upload-init`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-boldpiq-secret': SECRET },
      body: JSON.stringify({ token, fileName, fileType: fileType || 'application/octet-stream', fileSize, folderUrl }),
    })
    if (!res.ok) return NextResponse.json({ error: 'Failed to create upload session' }, { status: 502 })
    return NextResponse.json(await res.json())
  } catch {
    return NextResponse.json({ error: 'Upload init failed' }, { status: 502 })
  }
}
