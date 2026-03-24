# CSP Nonce Hardening — Design Spec
**Date:** 2026-03-24
**Status:** Approved
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
- `unsafe-inline` is removed entirely

---

## Architecture

```
Request arrives
      ↓
middleware.ts — generates nonce, builds CSP header, sets x-nonce request header
      ↓
layout.tsx (Server Component) — reads nonce via headers(), passes to Script components and GHLChatWidget
      ↓
GHLChatWidget.tsx — receives nonce prop, sets script.nonce before DOM injection
      ↓
Browser — trusts nonced scripts + anything strict-dynamic allows them to load
```

---

## Files Changed

| File | Change |
|---|---|
| `middleware.ts` | New file — nonce generation, dynamic CSP header |
| `next.config.ts` | Remove CSP from static headers (moves to middleware); all other headers stay |
| `src/app/layout.tsx` | Read nonce from `headers()`, pass to `<Script>` components and `<GHLChatWidget>` |
| `src/components/ui/GHLChatWidget.tsx` | Accept `nonce` prop, set `script.nonce` before appending script to DOM |

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

Note: `style-src` retains `unsafe-inline` — inline styles are a lower security risk than inline scripts and removing them would break Framer Motion and other animation libraries.

---

## Nonce Generation

```typescript
const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
```

- Fresh token every request, never reused
- Passed via `x-nonce` request header from middleware to layout
- Layout reads via `headers()` Next.js App Router API

---

## Error Handling

- If nonce is missing, scripts fail closed (blocked by CSP) — correct security behaviour
- Site remains navigable; widgets do not load
- No silent failures — CSP violations are visible in browser console

---

## Testing Checklist

- [ ] GHL chat widget loads and opens
- [ ] GHL booking widget functions and redirects after confirmation
- [ ] Form submission (`/api/submit-brief`) works end to end
- [ ] Cloudflare Turnstile challenge renders on contact form
- [ ] Browser console shows zero CSP violations
- [ ] Security audit confirms `unsafe-inline` absent from `script-src`
- [ ] No regression on Safari iOS (existing known-sensitive platform)

---

## Out of Scope

- `style-src unsafe-inline` removal — requires Framer Motion refactor, separate task
- HubSpot script (`js.hs-scripts.com`) — external script, covered by nonce via `<Script>` component
- JSON-LD structured data scripts (`type="application/ld+json"`) — exempt from `script-src`, no changes needed
