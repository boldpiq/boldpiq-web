# CSP Nonce Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove `unsafe-inline` from `script-src` CSP by implementing nonce-based CSP with `strict-dynamic` via Next.js middleware, while keeping all third-party widgets (GHL chat, Turnstile, form embed) fully functional.

**Architecture:** A per-request nonce is generated in `middleware.ts` and injected into the `Content-Security-Policy` response header. The nonce is passed to layout via a custom `x-nonce` request header, distributed to server-side `<Script>` components as a prop, and made available to client components via a `NonceContext`. `GHLChatWidget` receives the nonce as a direct prop from layout (it sits outside the `NonceProvider` tree). `MathCaptcha` and `onboarding/page.tsx` read the nonce from context.

**Tech Stack:** Next.js 16 App Router, TypeScript, `@marsidev/react-turnstile`, Next.js `<Script>` component, Web Crypto API (`crypto.randomUUID`)

**Spec:** `docs/superpowers/specs/2026-03-24-csp-nonce-design.md`

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Create | `middleware.ts` | Generate nonce per request, build dynamic CSP header, set `x-nonce` request header |
| Modify | `next.config.ts` | Delete `Content-Security-Policy` key from `headers()` — all other headers stay |
| Create | `src/lib/nonce.ts` | `NonceContext`, `NonceProvider`, `useNonce` hook |
| Modify | `src/app/layout.tsx` | Read nonce from `headers()`, wrap children in `<NonceProvider>`, pass nonce to `<Script>` and `<GHLChatWidget>` |
| Modify | `src/components/ui/GHLChatWidget.tsx` | Accept `nonce` prop, set `script.nonce` before DOM injection |
| Modify | `src/components/ui/MathCaptcha.tsx` | Call `useNonce()`, pass nonce to `<Turnstile scriptOptions={{ nonce }}>` |
| Modify | `src/app/onboarding/page.tsx` | Call `useNonce()`, pass nonce to `<Script nonce={nonce}>` |

---

## Task 1: Create NonceContext

**Files:**
- Create: `src/lib/nonce.ts`

- [ ] **Step 1: Create the file**

```typescript
// src/lib/nonce.ts
'use client'
import { createContext, useContext } from 'react'

export const NonceContext = createContext('')

export function NonceProvider({
  nonce,
  children,
}: {
  nonce: string
  children: React.ReactNode
}) {
  return (
    <NonceContext.Provider value={nonce}>
      {children}
    </NonceContext.Provider>
  )
}

export function useNonce() {
  return useContext(NonceContext)
}
```

- [ ] **Step 2: Verify build passes**

```bash
cd "/Users/mac/Documents/Website Design/boldpiq-web" && npm run build 2>&1 | tail -5
```

Expected: clean build, no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/nonce.ts
git commit -m "feat: add NonceContext for distributing CSP nonce to client components"
```

---

## Task 2: Create middleware.ts

**Files:**
- Create: `middleware.ts` (project root, alongside `next.config.ts`)

- [ ] **Step 1: Create the file**

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https:`,
    "style-src 'self' 'unsafe-inline' https://*.leadconnectorhq.com https://*.gohighlevel.com https://fonts.bunny.net https://www.gstatic.com",
    "img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com https://res.cloudinary.com https://*.leadconnectorhq.com https://assets.cdn.filesafe.space https://images.squarespace-cdn.com https://www.google.com https://www.gstatic.com https://lh3.googleusercontent.com",
    "font-src 'self' data: https://*.leadconnectorhq.com https://fonts.bunny.net https://www.gstatic.com",
    "connect-src 'self' https://services.leadconnectorhq.com https://*.leadconnectorhq.com https://challenges.cloudflare.com https://static.cloudflareinsights.com https://js.hs-scripts.com wss://challenges.cloudflare.com",
    "worker-src blob:",
    "frame-src https://link.zip360.co.za https://*.leadconnectorhq.com https://*.gohighlevel.com https://www.youtube.com https://www.youtube-nocookie.com https://challenges.cloudflare.com",
    "frame-ancestors 'none'",
  ].join('; ')

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  // Note: do NOT set content-security-policy on the request headers —
  // CSP is a response header only. Setting it on the request would forward
  // the nonce value to origin logs and downstream services.

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })
  response.headers.set('content-security-policy', csp)

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files and images.
     * Nonce is only needed for HTML responses — skip _next/static, _next/image, favicon, etc.
     */
    {
      source: '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
```

- [ ] **Step 2: Verify build passes**

```bash
cd "/Users/mac/Documents/Website Design/boldpiq-web" && npm run build 2>&1 | tail -5
```

Expected: clean build.

- [ ] **Step 3: Commit**

```bash
git add middleware.ts
git commit -m "feat: add middleware for per-request CSP nonce generation"
```

---

## Task 3: Remove CSP from next.config.ts

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Delete the Content-Security-Policy header entry**

Open `next.config.ts`. In the `headers()` function, find and delete the entire `Content-Security-Policy` key/value object from the `source: "/(.*)"` headers array. Leave all other headers untouched (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, Strict-Transport-Security).

Also keep the `/api/(.*)` CORS headers block exactly as-is.

After the edit the `source: "/(.*)"` headers array should contain exactly these 5 entries and nothing else:
```typescript
{ key: "X-Frame-Options", value: "DENY" },
{ key: "X-Content-Type-Options", value: "nosniff" },
{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
{ key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
```

- [ ] **Step 2: Verify build passes**

```bash
cd "/Users/mac/Documents/Website Design/boldpiq-web" && npm run build 2>&1 | tail -5
```

Expected: clean build.

- [ ] **Step 3: Commit**

```bash
git add next.config.ts
git commit -m "feat: remove static CSP from next.config.ts — now served dynamically via middleware"
```

---

## Task 4: Update GHLChatWidget to accept and use nonce

**Files:**
- Modify: `src/components/ui/GHLChatWidget.tsx`

> Must be done before Task 5 (layout.tsx) to avoid a TypeScript build error when layout passes the nonce prop.

- [ ] **Step 1: Add nonce to the component props**

Replace the entire file contents with:

```typescript
"use client"
import { useEffect } from "react"

interface GHLChatWidgetProps {
  nonce?: string
}

export function GHLChatWidget({ nonce = '' }: GHLChatWidgetProps) {
  useEffect(() => {
    const div = document.createElement("div")
    div.setAttribute("data-chat-widget", "")
    div.setAttribute("data-widget-id", "68c905cf1c15b470ad4f3a1b")
    div.setAttribute("data-location-id", "2YVSGppZ3t1nNSl74HPu")
    document.body.appendChild(div)

    const script = document.createElement("script")
    script.src = "https://widgets.leadconnectorhq.com/loader.js"
    script.dataset.resourcesUrl = "https://widgets.leadconnectorhq.com/chat-widget/loader.js"
    script.dataset.widgetId = "68c905cf1c15b470ad4f3a1b"
    script.async = true
    if (nonce) script.nonce = nonce
    document.body.appendChild(script)

    return () => {
      div.remove()
      script.remove()
    }
  }, [nonce])

  return null
}
```

- [ ] **Step 2: Verify build passes**

```bash
cd "/Users/mac/Documents/Website Design/boldpiq-web" && npm run build 2>&1 | tail -5
```

Expected: clean build, no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/GHLChatWidget.tsx
git commit -m "feat: add nonce prop to GHLChatWidget for CSP compliance"
```

---

## Task 5: Update layout.tsx to read and distribute the nonce

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add imports at the top of the file**

Add these two imports after the existing imports:
```typescript
import { headers } from 'next/headers'
import { NonceProvider } from '@/lib/nonce'
```

- [ ] **Step 2: Read the nonce inside RootLayout**

At the top of the `RootLayout` function body (before the `return`), add:
```typescript
const nonce = (await headers()).get('x-nonce') ?? ''
```

Also update the function signature to be `async`:
```typescript
export default async function RootLayout({ children }: { children: React.ReactNode }) {
```

- [ ] **Step 3: Pass nonce to the existing Script component**

Find the existing `<Script>` for `form_embed.js` and add the nonce prop:
```typescript
<Script
  src="https://link.zip360.co.za/js/form_embed.js"
  strategy="afterInteractive"
  nonce={nonce}
/>
```

- [ ] **Step 4: Pass nonce to GHLChatWidget**

Find `<GHLChatWidget />` and add the nonce prop:
```typescript
<GHLChatWidget nonce={nonce} />
```

- [ ] **Step 5: Wrap children with NonceProvider**

Find the `<LenisProvider>` block inside `<body>` and wrap it along with the other child components:
```typescript
<NonceProvider nonce={nonce}>
  <Navigation ... />
  <LenisProvider>
    <PageTransition variant="fade">
      {children}
    </PageTransition>
  </LenisProvider>
  <ScrollToTop />
  <CookieConsent />
</NonceProvider>
```

Note: `<GHLChatWidget nonce={nonce} />` and the `<Script>` remain **outside** the `<NonceProvider>` — they receive the nonce as direct props, not via context.

- [ ] **Step 6: Verify build passes**

```bash
cd "/Users/mac/Documents/Website Design/boldpiq-web" && npm run build 2>&1 | tail -10
```

Expected: clean build with no TypeScript errors.

- [ ] **Step 7: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: distribute CSP nonce from layout to Script components and NonceProvider"
```

---

## Task 6: Update MathCaptcha to pass nonce to Turnstile

**Files:**
- Modify: `src/components/ui/MathCaptcha.tsx`

- [ ] **Step 1: Add useNonce and pass to Turnstile**

```typescript
"use client"
import { Turnstile } from "@marsidev/react-turnstile"
import { useNonce } from "@/lib/nonce"

interface MathCaptchaProps {
  onVerified: (verified: boolean, token: string | null) => void
}

export function MathCaptcha({ onVerified }: MathCaptchaProps) {
  const nonce = useNonce()

  return (
    <Turnstile
      siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      options={{ theme: "dark" }}
      scriptOptions={nonce ? { nonce } : undefined}
      onSuccess={(token) => onVerified(true, token)}
      onExpire={() => onVerified(false, null)}
      onError={() => onVerified(false, null)}
    />
  )
}
```

- [ ] **Step 2: Verify build passes**

```bash
cd "/Users/mac/Documents/Website Design/boldpiq-web" && npm run build 2>&1 | tail -5
```

Expected: clean build.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/MathCaptcha.tsx
git commit -m "feat: pass CSP nonce to Cloudflare Turnstile via scriptOptions"
```

---

## Task 7: Update onboarding page Script nonce

**Files:**
- Modify: `src/app/onboarding/page.tsx`

- [ ] **Step 1: Add useNonce import**

At the top of `onboarding/page.tsx`, add:
```typescript
import { useNonce } from "@/lib/nonce"
```

- [ ] **Step 2: Call useNonce inside the component**

Find the top-level client component function and add:
```typescript
const nonce = useNonce()
```

- [ ] **Step 3: Add nonce to the Script tag**

Find the `<Script>` at line ~196 and add the nonce prop:
```typescript
<Script
  src="https://link.zip360.co.za/js/form_embed.js"
  strategy="afterInteractive"
  nonce={nonce}
/>
```

- [ ] **Step 4: Verify build passes**

```bash
cd "/Users/mac/Documents/Website Design/boldpiq-web" && npm run build 2>&1 | tail -5
```

Expected: clean build.

- [ ] **Step 5: Commit**

```bash
git add src/app/onboarding/page.tsx
git commit -m "feat: pass CSP nonce to form embed Script on onboarding page"
```

---

## Task 8: End-to-end verification

- [ ] **Step 1: Start dev server**

```bash
cd "/Users/mac/Documents/Website Design/boldpiq-web" && npm run dev
```

- [ ] **Step 2: Verify nonce is in the CSP header**

Open browser DevTools → Network tab → click the main document request for `http://localhost:3000`.
In Response Headers, find `content-security-policy`.
Confirm it contains `nonce-` followed by a base64 string.
Confirm `unsafe-inline` is **absent** from `script-src`.

- [ ] **Step 3: Verify nonce on script tags matches header**

In DevTools → Elements tab, inspect `<script>` tags in `<head>` and `<body>`.
Confirm each `<script>` that is not `type="application/ld+json"` has a `nonce` attribute.
Confirm the nonce value matches the one in the CSP header.
Confirm the two `<script type="application/ld+json">` tags in `<head>` do **not** have a `nonce` attribute — they are data scripts, not executable, and must remain unnonce-attributed.

- [ ] **Step 4: Check browser console for CSP violations**

Open DevTools → Console tab.
Navigate to `/`, `/contact`, `/onboarding`, `/booking`.
Confirm zero CSP violation errors (they appear as red errors starting with "Refused to execute script").

- [ ] **Step 5: Verify GHL chat widget loads**

On the homepage, confirm the GHL chat bubble appears in the bottom corner and opens when clicked.

- [ ] **Step 6: Verify Cloudflare Turnstile renders**

Navigate to `/contact`. Confirm the Turnstile widget renders (the checkbox challenge or invisible token generation). Submit the form and confirm it succeeds.

- [ ] **Step 7: Verify onboarding form embed loads**

Navigate to `/onboarding`. Confirm the GHL form embed renders correctly.

- [ ] **Step 8: Test on Safari (iOS simulator or device)**

Open Safari and navigate to `http://localhost:3000`.
Confirm no blank pages, no invisible content, no broken widgets.
This is a known-sensitive platform — check all pages visited above.

- [ ] **Step 9: Final build**

```bash
cd "/Users/mac/Documents/Website Design/boldpiq-web" && npm run build 2>&1 | tail -10
```

Expected: clean build with no errors or warnings.

- [ ] **Step 10: Push to production**

```bash
git push origin main
```

Vercel will deploy automatically. After deploy (~2 min), repeat Step 2 against `https://www.boldpiq.com` to confirm the live site has the new CSP header with nonce and no `unsafe-inline`.

---

## Rollback

If anything breaks in production:

```bash
git revert HEAD~7..HEAD
git push origin main
```

This reverts all 7 commits from this feature in one step.
