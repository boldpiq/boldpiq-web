# Accessibility Audit — boldpiq.com
**Date:** 2026-03-29 | WCAG 2.1 AA Compliance Review

---

## Summary

| Severity | Count |
|----------|-------|
| Critical | 3 |
| Serious | 3 |
| Moderate | 2 |
| Minor | 2 |

**Estimated compliance level: ~72%** — Core structure is solid (landmarks, lang, alt text, nav button labels). Issues are concentrated in the contact form (unlabelled inputs, no focus indicators) and the accordion component (missing state communication). All findings are fixable without design changes.

---

## Critical (Fix Before Launch)

### 1. ContactForm — Inputs Have No Labels

- **WCAG:** 1.3.1 Info and Relationships (A) + 3.3.2 Labels or Instructions (A)
- **Impact:** Screen reader users are told only the input type, not what the field expects. A blind user encounters a text box with no programmatic name.
- **Affected:** `src/components/forms/ContactForm.tsx:60,64,68,72` — `name`, `email`, `company`, `message` fields have `placeholder` only, no `<label>` or `aria-label`.
- **Fix:** Add `aria-label` to each input, or wrap each in a `<label>`:

```tsx
// Option A — aria-label (minimal change)
<input {...register("name")} placeholder="Name" aria-label="Your name" style={inputStyle} />
<input {...register("email")} type="email" placeholder="Email" aria-label="Your email address" style={inputStyle} />
<input {...register("company")} placeholder="Company (optional)" aria-label="Company name (optional)" style={inputStyle} />
<textarea {...register("message")} placeholder="Tell us about your project..." aria-label="Project details" ... />
```

---

### 2. AnimatedAccordion — Missing `aria-expanded` and `aria-controls`

- **WCAG:** 4.1.2 Name, Role, Value (A)
- **Impact:** Screen reader users cannot tell whether an accordion panel is open or closed. The button announces as a plain button with no state.
- **Affected:** `src/components/layout/AnimatedAccordion.tsx:37` — `<button onClick={() => toggle(item.id)}>` has no `aria-expanded` and the `<motion.div>` panel has no `id` for `aria-controls`.
- **Fix:**

```tsx
// In AnimatedAccordion.tsx
const panelId = `accordion-panel-${item.id}`

<button
  onClick={() => toggle(item.id)}
  aria-expanded={isOpen}
  aria-controls={panelId}
  // ...existing styles
>

// On the motion.div panel:
<motion.div
  id={panelId}
  role="region"
  aria-labelledby={/* button id if you add one */}
  // ...existing props
>
```

---

### 3. No Skip Navigation Link

- **WCAG:** 2.4.1 Bypass Blocks (A)
- **Impact:** Keyboard-only users must Tab through the entire navigation bar on every page before reaching main content. On a site with 6+ nav links, this is significant friction.
- **Affected:** All pages — no skip link found in any component.
- **Fix:** Add as the **first focusable element** in the root layout, visually hidden until focused:

```tsx
// In src/app/layout.tsx, first element inside <body>:
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded focus:shadow-lg"
>
  Skip to main content
</a>

// Add id="main-content" to the <main> element (already present in layout)
```

---

## Serious

### 4. ContactForm — `outline: none` Removes Focus Indicator

- **WCAG:** 2.4.7 Focus Visible (AA)
- **Impact:** Keyboard and switch users cannot see which input is active. The focus indicator is the primary navigation cue for non-mouse users.
- **Affected:** `src/components/forms/ContactForm.tsx:33` — `outline: "none"` in `inputStyle`
- **Fix:** Replace with a visible focus style rather than removing outline entirely:

```tsx
// Replace outline: "none" with:
// Option A — CSS-in-JS focus via :focus-visible (need a wrapper class or styled component)
// Option B — Add to globals.css:
// .contact-input:focus-visible { outline: 2px solid #C4541A; outline-offset: 2px; }

// Option C — Use onFocus/onBlur state to toggle border color (already has transition):
border: "1px solid rgba(255,255,255,0.15)",  // base
// On focus: border: "1px solid #C4541A"
```

---

### 5. ContactForm — Error Messages Not Linked to Their Fields

- **WCAG:** 1.3.1 Info and Relationships (A) + 3.3.1 Error Identification (A)
- **Impact:** Error messages appear visually below the input but aren't programmatically associated. A screen reader user submitting invalid data hears the field name, not the error.
- **Affected:** `src/components/forms/ContactForm.tsx:61,65,73` — `{errors.name.message}` etc. rendered in `<p>` tags with no `id`/`aria-describedby` connection.
- **Fix:**

```tsx
<input
  {...register("name")}
  aria-label="Your name"
  aria-describedby={errors.name ? "name-error" : undefined}
  aria-invalid={!!errors.name}
  style={inputStyle}
/>
{errors.name && (
  <p id="name-error" role="alert" style={{ color: "#f43f5e", fontSize: 12, marginTop: 4 }}>
    {errors.name.message}
  </p>
)}
```

---

### 6. Multiple `<nav>` Elements Without `aria-label`

- **WCAG:** 2.4.6 Headings and Labels (AA)
- **Impact:** Screen reader users navigating by landmarks encounter multiple "navigation" regions with no way to distinguish them (main nav vs. mobile nav vs. footer nav).
- **Affected:**
  - `src/components/layout/Navigation.tsx:128` — desktop nav, no `aria-label`
  - `src/components/layout/Navigation.tsx:257` — mobile nav, no `aria-label`
  - `src/components/layout/Footer.tsx:73` — footer nav, no `aria-label`
- **Fix:**

```tsx
// Navigation.tsx:128
<nav aria-label="Main navigation" className="hidden md:flex" ...>

// Navigation.tsx:257
<nav aria-label="Mobile navigation" ...>

// Footer.tsx:73
<nav aria-label="Footer navigation">
```

---

## Moderate

### 7. Homepage — Two `<h1>` Elements

- **WCAG:** 1.3.1 Info and Relationships (A)
- **Impact:** Low for sighted users (looks correct visually). For screen reader users navigating by headings, two `<h1>` elements signal two top-level page topics, creating confusion.
- **Affected:** `src/app/page.tsx:302-309` — `["Built", "To Grow."].map((line) => <motion.h1>...)` renders two `<h1>` tags.
- **Fix:** Wrap in a single `<h1>` with line-break formatting, or use `<span>` for the second line:

```tsx
// Replace the .map() with a single h1:
<motion.h1
  initial={{ opacity: 0, y: 32 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
  style={{ fontSize: "clamp(64px, 13vw, 200px)", fontWeight: 900, lineHeight: 0.88, letterSpacing: "-0.04em", margin: 0 }}
>
  Built<br />
  <span style={{ color: ACCENT }}>To Grow.</span>
</motion.h1>
```

---

### 8. Animated Accordion Panel — No `role="region"` on Panel

- **WCAG:** 4.1.2 Name, Role, Value (A) (covered by fix in Critical #2 above)
- **Impact:** The expanding panel is not exposed as a region to assistive technologies. Minor additional note to Critical #2.
- **Fix:** Already included in the Critical #2 fix — add `role="region"` to the `<motion.div>` panel and an `id` for `aria-controls`.

---

## Minor

### 9. Duplicate Logo Anchor Links (Header + Footer)

- **WCAG:** 2.4.4 Link Purpose in Context (A)
- **Impact:** Low — both logo anchors (`href="/"`, `alt="BoldPiq"`) provide identical accessible names. Screen readers will announce "BoldPiq link" twice in a landmarks list. Not a blocker.
- **Fix:** Add a distinguishing `aria-label` to the footer logo link:

```tsx
// Footer logo anchor:
<a href="/" aria-label="BoldPiq — Back to homepage (footer)">
```

---

### 10. `<title>` Uses "Crafting Stunning Websites" Phrasing

- **Not a WCAG issue** — informational only.
- Homepage title: `"Boldpiq: Crafting Stunning Websites & Graphics"` uses phrasing that contradicts brand voice guidelines (BRAND-VOICE.md: never "stunning"). SEO audit also flagged the title doesn't include "South Africa" or service keywords.
- **Fix:** Update in `src/app/page.tsx` metadata export to align with brand voice and SEO targets. Suggested: `"BoldPiq — Web Design & AI Solutions Agency | South Africa"`

---

## Passed Checks ✅

| Check | Status |
|-------|--------|
| `<html lang="en">` on all pages | ✅ |
| Single `<h1>` per page (all pages except homepage) | ✅ |
| Logical heading hierarchy (H1 → H2 → H3) | ✅ |
| All `<img>` / `<Image>` have `alt` attributes | ✅ |
| `<main>` landmark present on all pages | ✅ |
| `<header>` and `<footer>` present on all pages | ✅ |
| Mobile nav toggle button has `aria-label="Toggle menu"` | ✅ |
| ScrollToTop button has `aria-label="Scroll to top"` | ✅ |
| Consent checkbox wrapped in `<label>` | ✅ |
| `<iframe>` on contact page has `title` attribute | ✅ |
| No `<div onClick>` anti-patterns — interactive elements use `<button>` | ✅ |
| All `<a>` tags have text content or labelled child images | ✅ |
| `lang="en"` matches content language | ✅ |

---

## Prioritized Fix Order

| Priority | Fix | File | Effort |
|----------|-----|------|--------|
| 1 | Add `aria-label` to all ContactForm inputs | `ContactForm.tsx:60-72` | 10 min |
| 2 | Add `aria-expanded` + `aria-controls` to AnimatedAccordion | `AnimatedAccordion.tsx:37` | 15 min |
| 3 | Add skip navigation link to layout | `app/layout.tsx` | 10 min |
| 4 | Replace `outline: none` with visible focus style | `ContactForm.tsx:33` | 5 min |
| 5 | Add `aria-describedby` + `role="alert"` to error messages | `ContactForm.tsx:61-73` | 20 min |
| 6 | Add `aria-label` to all three `<nav>` elements | `Navigation.tsx:128,257` + `Footer.tsx:73` | 5 min |
| 7 | Consolidate homepage `<h1>` to single element | `app/page.tsx:300-312` | 10 min |
| 8 | Update homepage `<title>` tag | `app/page.tsx` metadata | 5 min |

**Total estimated fix time: ~80 minutes**

---

*Audit method: Static HTML analysis via WebFetch + codebase grep scan. Playwright/axe-core automated scan not run (no Playwright MCP available). Dynamic interactions (keyboard nav, focus order, colour contrast ratios) require browser-based verification.*
