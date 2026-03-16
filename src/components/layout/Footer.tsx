"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"

const BG = "#0B0F1C"
const ACCENT = "#C4541A"
const MUTED = "rgba(255,255,255,0.45)"
const BORDER = "rgba(255,255,255,0.08)"

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/boldpiq/" },
  { label: "Facebook", href: "https://www.facebook.com/boldpiq" },
  { label: "Pinterest", href: "https://za.pinterest.com/boldpiq/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/boldpiq/" },
]

const legalLinks = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund Policy", href: "/refund" },
  { label: "PAIA Manual", href: "/paia" },
  { label: "DPA", href: "/dpa" },
]

export function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${BORDER}`, background: BG, position: "relative", overflow: "hidden" }}>
      {/* Subtle accent glow */}
      <motion.div
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse 60% 50% at 20% 50%, rgba(196,84,26,0.14) 0%, transparent 65%)` }}
      />
      {/* Floating dots */}
      {[
        { x: "5%",  y: "30%", size: 3, delay: 0,   dur: 7  },
        { x: "92%", y: "25%", size: 4, delay: 2,   dur: 9  },
        { x: "75%", y: "70%", size: 3, delay: 1.2, dur: 8  },
        { x: "18%", y: "75%", size: 3, delay: 3.5, dur: 6  },
      ].map((d, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -16, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: d.dur, repeat: Infinity, ease: "easeInOut", delay: d.delay }}
          style={{ position: "absolute", left: d.x, top: d.y, width: d.size, height: d.size, borderRadius: "50%", background: "rgba(196,84,26,0.7)", pointerEvents: "none" }}
        />
      ))}
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "60px clamp(20px, 4vw, 48px) 32px",
          position: "relative",
        }}
      >
        {/* Top row */}
        <div
          className="flex flex-col md:flex-row md:items-start md:justify-between"
          style={{ gap: 48, marginBottom: 48 }}
        >
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "inline-block", marginBottom: 12 }}>
              <Image src="/logo.svg" alt="BoldPiq" width={81} height={120} style={{ height: 120, width: "auto" }} />
            </Link>
            <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.65, maxWidth: 280 }}>
              High-performance websites that attract, convert, and retain.
            </p>
          </div>

          {/* Nav links */}
          <nav>
            <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, marginBottom: 16 }}>Navigation</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Work", href: "/work" },
                { label: "Services", href: "/services" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Book a Call", href: "/contact" },
              ].map(item => (
                <Link key={item.label} href={item.href} className="footer-nav-link-orange" style={{ color: MUTED, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Social */}
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, marginBottom: 16 }}>Connect</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
              {socialLinks.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{ color: MUTED, fontSize: 14, textDecoration: "none", transition: "color 0.2s" }}>
                  {s.label}
                </a>
              ))}
            </div>
            <Link
              href="/contact"
              style={{
                display: "inline-block",
                padding: "12px 28px",
                background: ACCENT,
                color: "#fff",
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              Start a Project
            </Link>
          </div>

          {/* Stay in touch */}
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, marginBottom: 16 }}>Stay in Touch</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="mailto:support@boldpiq.com" className="footer-social-link" style={{ color: MUTED, fontSize: 14, textDecoration: "none", transition: "color 0.2s" }}>support@boldpiq.com</a>
              <a href="mailto:team@boldpiq.com" className="footer-social-link" style={{ color: MUTED, fontSize: 14, textDecoration: "none", transition: "color 0.2s" }}>team@boldpiq.com</a>
              <a href="tel:+27608326083" className="footer-social-link" style={{ color: MUTED, fontSize: 14, textDecoration: "none", transition: "color 0.2s" }}>+27 60 832 6083</a>
              <a href="https://api.whatsapp.com/send/?phone=27608326083&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{ color: MUTED, fontSize: 14, textDecoration: "none", transition: "color 0.2s" }}>WhatsApp</a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            borderTop: `1px solid ${BORDER}`,
            paddingTop: 24,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div className="flex flex-wrap" style={{ gap: "6px 0", alignItems: "center" }}>
            {legalLinks.map((l, i) => (
              <span key={l.href} style={{ display: "inline-flex", alignItems: "center" }}>
                <Link href={l.href} className="footer-nav-link" style={{ color: MUTED, fontSize: 12, textDecoration: "none" }}>
                  {l.label}
                </Link>
                {i < legalLinks.length - 1 && (
                  <span style={{ color: MUTED, fontSize: 12, opacity: 0.4, margin: "0 10px" }}>|</span>
                )}
              </span>
            ))}
          </div>
          <p style={{ color: MUTED, fontSize: 12, opacity: 0.6 }}>
            © {new Date().getFullYear()} BoldPiq. All rights reserved. · Built with Next.js &amp; Vercel
          </p>
        </div>
      </div>
      <style>{`.footer-social-link:hover { color: #fff !important; }`}</style>
    </footer>
  )
}
