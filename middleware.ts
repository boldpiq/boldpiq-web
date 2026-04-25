// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const HSTS = 'max-age=63072000; includeSubDomains; preload'

export function middleware(request: NextRequest) {
  // Redirect bare domain → www with HSTS on the redirect response itself.
  // vercel.json redirects are processed at infrastructure level and don't carry
  // custom headers, so this must be handled here where we control the response.
  const host = request.headers.get('host') ?? ''
  if (host === 'boldpiq.com' || host === 'boldpiq.com:443') {
    const url = request.nextUrl.clone()
    url.host = 'www.boldpiq.com'
    const redirect = NextResponse.redirect(url, 308)
    redirect.headers.set('strict-transport-security', HSTS)
    return redirect
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  const csp = [
    "default-src 'self'",
    // 'strict-dynamic' causes modern browsers to ignore 'self' and host allowlists —
    // they are kept only as legacy fallbacks for browsers without strict-dynamic support.
    // 'https:' removed: with strict-dynamic it is redundant and flags HIGH on audit tools.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://cdn.consentmanager.net https://b.delivery.consentmanager.net`,
    // Nonces are NOT used in style-src: when a nonce is present, modern browsers ignore
    // 'unsafe-inline', which blocks Next.js inline <style> tags (fonts, critical CSS).
    // 'unsafe-inline' + 'self' is sufficient for styles; nonces are only needed for script-src.
    `style-src 'self' 'unsafe-inline' https://*.leadconnectorhq.com https://*.gohighlevel.com https://fonts.bunny.net https://www.gstatic.com`,
    "img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com https://res.cloudinary.com https://*.leadconnectorhq.com https://assets.cdn.filesafe.space https://images.squarespace-cdn.com https://www.google.com https://www.gstatic.com https://lh3.googleusercontent.com",
    "font-src 'self' data: https://*.leadconnectorhq.com https://fonts.bunny.net https://www.gstatic.com",
    "connect-src 'self' https://services.leadconnectorhq.com https://*.leadconnectorhq.com https://challenges.cloudflare.com https://static.cloudflareinsights.com https://js.hs-scripts.com wss://challenges.cloudflare.com https://n8nservice.boldpiq.com https://cdn.consentmanager.net https://b.delivery.consentmanager.net",
    "worker-src blob:",
    "frame-src https://link.zip360.co.za https://*.leadconnectorhq.com https://*.gohighlevel.com https://www.youtube.com https://www.youtube-nocookie.com https://challenges.cloudflare.com",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "manifest-src 'self'",
  ].join('; ')

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  // Note: do NOT set content-security-policy on the request headers —
  // CSP is a response header only. Setting it on the request would forward
  // the nonce value to origin logs and downstream services.

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })
  response.headers.set('strict-transport-security', HSTS)
  response.headers.set('content-security-policy', csp)
  response.headers.set('x-xss-protection', '0')

  return response
}

export const config = {
  matcher: [
    {
      source: '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
