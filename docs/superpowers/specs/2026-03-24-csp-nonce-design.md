# CSP Nonce Hardening — Design Spec
**Date:** 2026-03-24
**Status:** Approved (v3 — post spec review)
**Goal:** Remove `unsafe-inline` from `script-src` CSP while preserving all third-party widget functionality (GHL chat, booking, form embed, Cloudflare Turnstile).

---

## Problem

The current CSP includes `unsafe-inline` in `script-src`, which weakens XSS protection. It was required because third-party widgets (GHL chat widget, HubSpot, Cloudflare Turnstile) inject inline scripts at runtime that cannot be statically predicted.

---

## Solution

Implement nonce-based CSP with `strict-dynamic` via Next.js middleware.

- A unique cryptographic nonce is generated per request in middleware
- The nonce is injected into the CSP header and passed to all trusted scripts
- `strict-dynamic` allows scripts carrying a valid nonce to dynamically load sub-scripts — covering GHL's runtime script injection
- `unsafe-inline` is removed entirely from `script-src`
- Client components that need the nonce read it from a `NonceContext` populated in `layout.tsx`

---

## Architecture

```
Request arrives
      ↓
middleware.ts — generates nonce, builds CSP header, sets x-nonce request header
      ↓
layout.tsx (Server Component) — reads nonce via headers(), passes to NonceProvider + Script components + GHLChatWidget
      ↓
NonceProvider (Client Component) — makes nonce available via React context to all client components
      ↓
GHLChatWidget.tsx — receives nonce prop, sets script.nonce before DOM injection
MathCaptcha.tsx — reads nonce from context, passes to <Turnstile scriptOptions={{ nonce }}>
onboarding/page.tsx — reads nonce from NonceContext, passes to <Script nonce={nonce}>
      ↓
Browser — trusts nonced scripts + anything strict-dynamic allows them to load
```

---

## Files Changed

| File | Change |
|---|---|
| `middleware.ts` | **New file** — nonce generation, dynamic CSP header, sets `x-nonce` request header |
| `next.config.ts` | **Delete** the entire `Content-Security-Policy` key from `headers()` — must be fully removed, not commented out. All other headers (HSTS, X-Frame-Options, etc.) stay. |
| `src/lib/nonce.ts` | **New file** — `NonceContext` and `NonceProvider` client component |
| `src/app/layout.tsx` | Read nonce via `headers()`, wrap children in `<NonceProvider nonce={nonce}>`, pass nonce to `<Script>` components and `<GHLChatWidget>` |
| `src/components/ui/GHLChatWidget.tsx` | Accept `nonce` prop passed **directly from `layout.tsx` as a prop** (not via `useNonce()` — `<GHLChatWidget>` is rendered outside the `<NonceProvider>` children boundary in the layout JSX tree). Set `script.nonce = nonce` before appending script to DOM. |
| `src/components/ui/MathCaptcha.tsx` | Read nonce from `NonceContext`, pass as `scriptOptions={{ nonce }}` to `<Turnstile>` |
| `src/app/onboarding/page.tsx` | Read nonce from `NonceContext` via `useNonce()`, pass as `nonce` prop to `<Script>`. Note: Next.js deduplicates `<Script>` tags with the same `src` — the onboarding `<Script src="https://link.zip360.co.za/js/form_embed.js">` may not re-execute if the global instance in `layout.tsx` already ran. If deduplication removes it, the nonce on the onboarding instance is moot; if it does execute, the nonce is required. Apply the nonce regardless to be safe. |

---

## CSP Header (new)

```
default-src 'self';
script-src 'self' 'nonce-{token}' 'strict-dynamic' https:;
style-src 'self' 'unsafe-inline' https://*.leadconnectorhq.com https://*.gohighlevel.com https://fonts.bunny.net https://www.gstatic.com;
img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com https://res.cloudinary.com https://*.leadconnectorhq.com https://assets.cdn.filesafe.space https://images.squarespace-cdn.com https://www.google.com https://www.gstatic.com https://lh3.googleusercontent.com;
font-src 'self' data: https://*.leadconnectorhq.com https://fonts.bunny.net https://www.gstatic.com;
connect-src 'self' https://services.leadconnectorhq.com https://*.leadconnectorhq.com https://challenges.cloudflare.com https://static.cloudflareinsights.com https://js.hs-scripts.com wss://challenges.cloudflare.com;
worker-src blob:;
frame-src https://link.zip360.co.za https://*.leadconnectorhq.com https://*.gohighlevel.com https://www.youtube.com https://www.youtube-nocookie.com https://challenges.cloudflare.com;
frame-ancestors 'none';
```

**Notes:**
- `style-src` retains `unsafe-inline` — inline styles are a lower risk than inline scripts and removing them would break Framer Motion and animation libraries. Out of scope.
- `'self'` and `https:` in `script-src` are intentional fallbacks for browsers that do not support `strict-dynamic`. In modern browsers, `strict-dynamic` causes these to be ignored automatically.
- `type="application/ld+json"` scripts in `layout.tsx` are exempt from `script-src` per CSP Level 3 spec — they must NOT receive a nonce attribute.

---

## Nonce Generation

```typescript
const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
```

- Fresh token every request, never reused
- Set as `x-nonce` request header by middleware
- Layout reads via `headers()` Next.js App Router API
- Next.js automatically applies the nonce to its own internally-injected scripts (font loader, hydration) when the nonce is present in the CSP header

---

## NonceContext Pattern

Since client components cannot call `headers()`, nonce is distributed via React context:

```typescript
// src/lib/nonce.ts
'use client'
import { createContext, useContext } from 'react'

export const NonceContext = createContext('')
export const NonceProvider = ({ nonce, children }: { nonce: string; children: React.ReactNode }) => (
  <NonceContext.Provider value={nonce}>{children}</NonceContext.Provider>
)
export const useNonce = () => useContext(NonceContext)
```

`layout.tsx` wraps the entire app in `<NonceProvider nonce={nonce}>`. Client components call `useNonce()` to retrieve it.

---

## Error Handling

- If nonce is missing, scripts fail closed (blocked by CSP) — correct security behaviour
- Site remains navigable; widgets do not load
- No silent failures — CSP violations are visible in browser console

---

## Testing Checklist

- [ ] Nonce in `Content-Security-Policy` response header matches `nonce` attribute on `<script>` tags in HTML (verify via DevTools Network tab)
- [ ] GHL chat widget loads and opens
- [ ] GHL booking widget functions and redirects after confirmation
- [ ] GHL form embed initialises on onboarding page
- [ ] Form submission (`/api/submit-brief`) works end to end
- [ ] Cloudflare Turnstile challenge renders on contact form
- [ ] Browser console shows zero CSP violations
- [ ] Security audit confirms `unsafe-inline` absent from `script-src`
- [ ] No regression on Safari iOS (existing known-sensitive platform)

---

## Out of Scope

- `style-src unsafe-inline` removal — requires Framer Motion refactor, separate task
- JSON-LD structured data scripts (`type="application/ld+json"`) — exempt from `script-src`, no changes needed
- `GHLBookingWidget` — renders an iframe only, no script injection, no changes needed
- `src/components/analytics/Analytics.tsx` — **not currently imported or active in `layout.tsx`**. When activated, it must receive a `nonce` prop and pass it to `<Script nonce={nonce}>`. Activating this component without a nonce will cause a CSP violation and silent analytics failure. Add nonce support before enabling it.
