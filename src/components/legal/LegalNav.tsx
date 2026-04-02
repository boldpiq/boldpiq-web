"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund Policy", href: "/refund" },
  { label: "PAIA Manual", href: "/paia" },
  { label: "Data Processing Agreement", href: "/dpa" },
  { label: "Disclaimers", href: "/disclaimers" },
]

const ACCENT = "#C4541A"
const MUTED = "rgba(255,255,255,0.45)"
const BORDER = "rgba(255,255,255,0.08)"

export function LegalNav() {
  const pathname = usePathname()
  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "8px 4px",
      marginBottom: 48,
      padding: "16px 20px",
      border: `1px solid ${BORDER}`,
      borderRadius: 12,
      background: "rgba(255,255,255,0.03)",
    }}>
      {links.map((link, i) => (
        <span key={link.href} style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {i > 0 && <span style={{ color: BORDER, fontSize: 12, marginRight: 4 }}>·</span>}
          <Link
            href={link.href}
            style={{
              fontSize: 13,
              color: pathname === link.href ? ACCENT : MUTED,
              textDecoration: "none",
              fontWeight: pathname === link.href ? 700 : 400,
              borderBottom: pathname === link.href ? `1px solid ${ACCENT}` : "1px solid transparent",
              paddingBottom: 1,
              transition: "color 0.2s",
            }}
          >
            {link.label}
          </Link>
        </span>
      ))}
    </div>
  )
}
