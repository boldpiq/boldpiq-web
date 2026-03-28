"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useAnimationFrame } from "motion/react"
import Link from "next/link"
import Image from "next/image"


interface NavItem {
  label: string
  href: string
}

interface NavigationProps {
  items?: NavItem[]
  logo?: React.ReactNode
  ctaLabel?: string
  ctaHref?: string
  theme?: "dark" | "light"
}

const defaultItems: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/boldpiq/" },
  { label: "Facebook", href: "https://www.facebook.com/boldpiq" },
  { label: "Pinterest", href: "https://za.pinterest.com/boldpiq/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/boldpiq/" },
]


function MenuGlow() {
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)
  useAnimationFrame((t) => {
    if (ref1.current) {
      const x = Math.sin(t * 0.00028) * 120
      const y = Math.cos(t * 0.00019) * 80
      ref1.current.style.transform = `translate(${x}px, ${y}px)`
    }
    if (ref2.current) {
      const x = Math.cos(t * 0.00022) * 90
      const y = Math.sin(t * 0.00034) * 70
      ref2.current.style.transform = `translate(${x}px, ${y}px)`
    }
  })
  return (
    <>
      <div ref={ref1} style={{ position: "absolute", inset: -160, pointerEvents: "none", background: "radial-gradient(ellipse 55% 48% at 60% 40%, rgba(196,84,26,0.13) 0%, transparent 68%)", willChange: "transform" }} />
      <div ref={ref2} style={{ position: "absolute", inset: -120, pointerEvents: "none", background: "radial-gradient(ellipse 42% 38% at 38% 60%, rgba(196,84,26,0.07) 0%, transparent 62%)", willChange: "transform" }} />
    </>
  )
}

export function Navigation({
  items = defaultItems,
  ctaLabel = "Get in touch",
  ctaHref = "/contact",
  theme = "dark",
}: NavigationProps) {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const lastY = useRef(0)

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 20)
    setHidden(y > lastY.current && y > 80)
    lastY.current = y
  })

  useEffect(() => {
    // iOS Safari ignores overflow:hidden on body alone — lock both html + body
    if (open) {
      document.documentElement.style.overflow = "hidden"
      document.body.style.overflow = "hidden"
    } else {
      document.documentElement.style.overflow = ""
      document.body.style.overflow = ""
    }
    return () => {
      document.documentElement.style.overflow = ""
      document.body.style.overflow = ""
    }
  }, [open])

  const isDark = theme === "dark"
  const fg = isDark ? "#fff" : "#111"
  const bg = isDark ? "rgba(0,0,0,0.96)" : "rgba(255,255,255,0.96)"
  const ACCENT = "#C4541A"
  const MUTED = "rgba(255,255,255,0.45)"
  const BORDER = "rgba(255,255,255,0.08)"

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 clamp(16px, 3vw, 40px)",
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          background: scrolled ? bg : "transparent",
          borderBottom: scrolled ? `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` : "none",
          transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image src="/BoldPiqLogo.svg" alt="BoldPiq" width={64} height={64} style={{ height: 64, width: 64 }} priority />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex" style={{ gap: 36, alignItems: "center" }}>
          {items.map((item) => (
            <MagneticLink key={item.href} href={item.href} color={fg}>
              {item.label}
            </MagneticLink>
          ))}
        </nav>

        {/* CTA + Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Link
            href={ctaHref}
            className="nav-cta"
            style={{
              color: isDark ? "#000" : "#fff",
              background: fg,
              padding: "8px 20px",
              borderRadius: 100,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "-0.01em",
              display: "none",
            }}
          >
            {ctaLabel}
          </Link>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              display: "flex",
              flexDirection: "column",
              gap: 5,
              alignItems: "flex-end",
            }}
          >
            <motion.span
              animate={{ rotateZ: open ? 45 : 0, y: open ? 7 : 0, width: 24 }}
              style={{ display: "block", height: 2, background: fg, borderRadius: 2, transformOrigin: "center" }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1, width: open ? 0 : 16 }}
              style={{ display: "block", height: 2, background: fg, borderRadius: 2 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={{ rotateZ: open ? -45 : 0, y: open ? -7 : 0, width: 24 }}
              style={{ display: "block", height: 2, background: fg, borderRadius: 2, transformOrigin: "center" }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99,
              background: isDark ? "#000" : "#fafafa",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <MenuGlow />
            {/* ── TOP: Agency badge + CSS Marquee ── */}
            <div style={{ padding: "96px clamp(20px, 5vw, 40px) 32px", borderBottom: `1px solid ${BORDER}` }}>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 18px", border: `1px solid ${BORDER}`, borderRadius: 100, marginBottom: 28, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED }}
              >
                <motion.span
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT, display: "block", flexShrink: 0 }}
                />
                Web Design &amp; Development Agency
              </motion.div>

              {/* Pure CSS marquee — zero JS scroll interference */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                style={{
                  margin: "0 calc(-1 * clamp(20px, 5vw, 40px))",
                  borderTop: `1px solid ${BORDER}`,
                  borderBottom: `1px solid ${BORDER}`,
                  padding: "13px 0",
                  overflow: "hidden",
                  pointerEvents: "none",
                  touchAction: "none",
                }}
              >
                <div style={{ display: "flex", animation: "menuMarquee 28s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
                  {[...Array(4)].map((_, rep) => (
                    <span key={rep} style={{ display: "inline-flex", alignItems: "center" }}>
                      {["Web Design", "Web Development", "Brand Identity", "GEO Optimised", "Conversion Focused", "Mobile First", "Sanity CMS", "Motion & Animation", "Results Driven", "Vercel Hosted"].map((item) => (
                        <span key={item} style={{ display: "inline-flex", alignItems: "center", fontSize: 13, fontWeight: 500, color: MUTED }}>
                          {item}
                          <span style={{ margin: "0 16px", opacity: 0.3 }}>•</span>
                        </span>
                      ))}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── NAV LINKS ── */}
            <nav aria-label="Mobile navigation" style={{ padding: "24px clamp(20px, 5vw, 40px)", display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
              {items.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + i * 0.06, duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    style={{
                      display: "block",
                      fontSize: "clamp(28px, 7vw, 52px)",
                      fontWeight: 800,
                      letterSpacing: "-0.04em",
                      color: fg,
                      textDecoration: "none",
                      lineHeight: 1.15,
                      padding: "4px 0",
                    }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Book a call CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.78, duration: 0.4 }}
                style={{ marginTop: 20 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  style={{
                    display: "inline-block",
                    padding: "14px 32px",
                    background: ACCENT,
                    color: "#fff",
                    borderRadius: 100,
                    fontSize: 15,
                    fontWeight: 700,
                    textDecoration: "none",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Book a Call →
                </Link>
              </motion.div>
            </nav>

            {/* ── FOOTER ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              style={{ borderTop: `1px solid ${BORDER}`, padding: "28px clamp(20px, 5vw, 40px) 40px", display: "flex", flexDirection: "column", gap: 20 }}
            >
              {/* Logo + tagline */}
              <div>
                <Link href="/" onClick={() => setOpen(false)} style={{ display: "inline-block", marginBottom: 10 }}>
                  <Image src="/logo.svg" alt="BoldPiq" width={54} height={80} style={{ height: 80, width: "auto" }} />
                </Link>
                <p style={{ color: MUTED, fontSize: 12, lineHeight: 1.6, maxWidth: 260 }}>
                  High-performance websites that attract, convert, and retain.
                </p>
              </div>

              {/* Social links */}
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                {socialLinks.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="nav-social-link" style={{ color: MUTED, fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}>
                    {s.label}
                  </a>
                ))}
              </div>

              {/* Legal links */}
              <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 16, display: "flex", flexWrap: "wrap", gap: "4px 0", alignItems: "center" }}>
                {[
                  { label: "Terms of Service", href: "/terms" },
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Refund Policy", href: "/refund" },
                  { label: "PAIA Manual", href: "/paia" },
                  { label: "DPA", href: "/dpa" },
                ].map((l, i, arr) => (
                  <span key={l.href} style={{ display: "inline-flex", alignItems: "center" }}>
                    <Link href={l.href} onClick={() => setOpen(false)} className="footer-nav-link" style={{ color: MUTED, fontSize: 11, textDecoration: "none", opacity: 0.7 }}>
                      {l.label}
                    </Link>
                    {i < arr.length - 1 && (
                      <span style={{ color: MUTED, fontSize: 11, opacity: 0.3, margin: "0 8px" }}>|</span>
                    )}
                  </span>
                ))}
              </div>

              {/* Copyright */}
              <p style={{ color: MUTED, fontSize: 11, opacity: 0.5 }}>
                © {new Date().getFullYear()} BoldPiq. All rights reserved.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .nav-cta { display: inline-block !important; }
        }
        @keyframes menuMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-25%); }
        }
        .nav-social-link:hover { color: #fff !important; }
      `}</style>
    </>
  )
}

// Magnetic nav link
function MagneticLink({ href, children, color }: { href: string; children: React.ReactNode; color: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect()
    setPos({ x: (e.clientX - rect.left - rect.width / 2) * 0.3, y: (e.clientY - rect.top - rect.height / 2) * 0.3 })
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ color, textDecoration: "none", fontSize: 14, fontWeight: 500, letterSpacing: "-0.01em", opacity: 0.8 }}
      whileHover={{ opacity: 1 }}
    >
      {children}
    </motion.a>
  )
}
