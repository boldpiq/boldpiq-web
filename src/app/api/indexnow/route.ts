import { NextResponse } from "next/server"

const INDEXNOW_KEY = "7a5a0924b54441b3a6b2da905aa8e2cd"
const HOST = "www.boldpiq.com"

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

// POST /api/indexnow — ping Bing IndexNow to notify of content updates.
// Call this from CI/CD on every production deploy:
//   curl -X POST https://www.boldpiq.com/api/indexnow \
//     -H "Authorization: Bearer $INDEXNOW_SECRET"
export async function POST(request: Request) {
  const secret = request.headers.get("Authorization")?.replace("Bearer ", "").trim()
  if (secret !== process.env.INDEXNOW_SECRET?.trim()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: URLS,
  }

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  })

  return NextResponse.json(
    { submitted: URLS.length, status: res.status },
    { status: res.ok ? 200 : 502 }
  )
}
