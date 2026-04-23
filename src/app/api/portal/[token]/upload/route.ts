import { NextRequest, NextResponse } from 'next/server'

const N8N_BASE = process.env.N8N_BASE_URL || 'https://n8nservice.boldpiq.com'
const SECRET = '52um9c0GEki4JSIr9io5RKrkXJ5qtGBf2M4j2wpyxLBsxQGh+NGGiZTLNYp08dei'
const MAX_MB = 500

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params
  if (!token || !/^[\w\-]{10,64}$/.test(token)) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
  }

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const file = formData.get('file') as File | null
  const folderUrl = formData.get('folder_url') as string | null

  if (!file || !folderUrl) {
    return NextResponse.json({ error: 'Missing file or folder_url' }, { status: 400 })
  }

  if (file.size > MAX_MB * 1024 * 1024) {
    return NextResponse.json({ error: `File exceeds ${MAX_MB}MB limit` }, { status: 413 })
  }

  const upstream = new FormData()
  upstream.append('file', file, file.name)
  upstream.append('folder_url', folderUrl)
  upstream.append('token', token)
  upstream.append('file_name', file.name)

  try {
    const res = await fetch(`${N8N_BASE}/webhook/client-upload`, {
      method: 'POST',
      headers: { 'x-boldpiq-secret': SECRET },
      body: upstream,
    })
    const data = await res.json()
    if (!res.ok) return NextResponse.json({ error: 'Upload failed' }, { status: 502 })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Upload failed' }, { status: 502 })
  }
}
