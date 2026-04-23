export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function PUT(req: Request) {
  const driveUrl = req.headers.get('x-drive-url')
  const contentType = req.headers.get('content-type') || 'application/octet-stream'
  const contentRange = req.headers.get('content-range')

  if (!driveUrl || !driveUrl.startsWith('https://www.googleapis.com/upload/drive/')) {
    return Response.json({ error: 'Invalid or missing upload URL' }, { status: 400 })
  }

  const headers: HeadersInit = { 'Content-Type': contentType }
  if (contentRange) headers['Content-Range'] = contentRange

  const res = await fetch(driveUrl, {
    method: 'PUT',
    headers,
    body: req.body,
  })

  const text = await res.text()
  return new Response(text, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  })
}
