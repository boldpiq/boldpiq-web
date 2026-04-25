"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import { CONSENT_KEY, CONSENT_EVENT } from "@/lib/consent"

const BG_BANNER = "rgba(11,15,28,0.97)"
const ACCENT = "#C4541A"
const MUTED = "rgba(255,255,255,0.5)"
const BORDER = "rgba(255,255,255,0.1)"
const STORAGE_KEY = CONSENT_KEY

type ConsentState = "all" | "essential" | null

interface ConsentPrefs {
  analytics: boolean
  marketing: boolean
  functional: boolean
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [showCustomize, setShowCustomize] = useState(false)
  const [prefs, setPrefs] = useState<ConsentPrefs>({ analytics: true, marketing: true, functional: true })

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        // Small delay so it doesn't flash immediately on page load
        const t = setTimeout(() => setVisible(true), 1200)
        return () => clearTimeout(t)
      }
    } catch {
      // localStorage not available
    }
  }, [])

  const save = (consent: ConsentState, customPrefs?: ConsentPrefs) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        consent,
        prefs: customPrefs ?? prefs,
        timestamp: Date.now(),
      }))
      window.dispatchEvent(new CustomEvent(CONSENT_EVENT))
    } catch {
      // ignore
    }
    setVisible(false)
    setShowCustomize(false)
  }

  const acceptAll = () => {
    setPrefs({ analytics: true, marketing: true, functional: true })
    save("all", { analytics: true, marketing: true, functional: true })
  }

  const acceptEssential = () => {
    setPrefs({ analytics: false, marketing: false, functional: false })
    save("essential", { analytics: false, marketing: false, functional: false })
  }

  const saveCustom = () => save("all", prefs)

  const toggle = (key: keyof ConsentPrefs) => {
    setPrefs(p => ({ ...p, [key]: !p[key] }))
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop blur on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              zIndex: 9998,
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
            }}
            className="lg:hidden"
          />

          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 9999,
              background: BG_BANNER,
              borderTop: `1px solid ${BORDER}`,
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 -8px 48px rgba(0,0,0,0.6)",
            }}
          >
            <div style={{ maxWidth: 1400, margin: "0 auto", padding: "clamp(20px, 3vw, 32px) clamp(16px, 4vw, 48px)" }}>

              {!showCustomize ? (
                /* ── Main banner ─────────────────────────────────────────── */
                <div className="flex flex-col lg:flex-row lg:items-center" style={{ gap: "clamp(16px, 2vw, 32px)" }}>
                  {/* Icon + text */}
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flex: 1 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 12,
                      background: `rgba(196,84,26,0.15)`,
                      border: `1px solid rgba(196,84,26,0.3)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 18, flexShrink: 0,
                    }}>
                      🍪
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: "#fff" }}>
                        We value your privacy
                      </p>
                      <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.65, maxWidth: 720 }}>
                        Boldpiq uses cookies to enhance your experience, analyse site traffic, and deliver relevant content. We collect usage data, IP addresses, and browser information to improve our platform and marketing. Please choose your cookie preferences below.{" "}
                        <Link
                          href="/privacy"
                          style={{ color: ACCENT, textDecoration: "underline", textUnderlineOffset: 3 }}
                        >
                          Privacy Policy
                        </Link>
                        {" · "}
                        <Link
                          href="/terms"
                          style={{ color: ACCENT, textDecoration: "underline", textUnderlineOffset: 3 }}
                        >
                          Terms
                        </Link>
                      </p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", flexShrink: 0 }}>
                    <button
                      onClick={() => setShowCustomize(true)}
                      style={{
                        padding: "10px 20px",
                        background: "transparent",
                        color: MUTED,
                        border: `1px solid ${BORDER}`,
                        borderRadius: 100,
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Customise
                    </button>
                    <button
                      onClick={acceptEssential}
                      style={{
                        padding: "10px 20px",
                        background: "rgba(255,255,255,0.07)",
                        color: "#fff",
                        border: `1px solid ${BORDER}`,
                        borderRadius: 100,
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Essential only
                    </button>
                    <motion.button
                      whileHover={{ background: "#D4601F" }}
                      whileTap={{ scale: 0.97 }}
                      onClick={acceptAll}
                      style={{
                        padding: "10px 24px",
                        background: ACCENT,
                        color: "#fff",
                        border: "none",
                        borderRadius: 100,
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Accept all
                    </motion.button>
                  </div>
                </div>
              ) : (
                /* ── Customise panel ─────────────────────────────────────── */
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                    <button
                      onClick={() => setShowCustomize(false)}
                      style={{ background: "none", border: "none", color: MUTED, cursor: "pointer", fontSize: 20, padding: 0, lineHeight: 1 }}
                      aria-label="Back"
                    >
                      ←
                    </button>
                    <p style={{ fontWeight: 700, fontSize: 16, color: "#fff" }}>Cookie preferences</p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {/* Essential — always on */}
                    <CookieToggle
                      title="Essential cookies"
                      description="Required for the website to function. Includes session management, security, and basic functionality. Cannot be disabled."
                      enabled={true}
                      locked={true}
                      onChange={() => {}}
                    />
                    <CookieToggle
                      title="Analytics cookies"
                      description="Help us understand how visitors interact with our website. Used to measure traffic, page views, and user behaviour to improve our services."
                      enabled={prefs.analytics}
                      locked={false}
                      onChange={() => toggle("analytics")}
                    />
                    <CookieToggle
                      title="Marketing cookies"
                      description="Used to deliver relevant advertisements and track campaign performance across platforms, including Google Ads and social media."
                      enabled={prefs.marketing}
                      locked={false}
                      onChange={() => toggle("marketing")}
                    />
                    <CookieToggle
                      title="Functional cookies"
                      description="Enable enhanced features such as live chat, booking widgets, and personalised content based on your preferences."
                      enabled={prefs.functional}
                      locked={false}
                      onChange={() => toggle("functional")}
                    />
                  </div>

                  <div style={{ marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
                    <button
                      onClick={acceptEssential}
                      style={{
                        padding: "10px 20px",
                        background: "transparent",
                        color: MUTED,
                        border: `1px solid ${BORDER}`,
                        borderRadius: 100,
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      Essential only
                    </button>
                    <motion.button
                      whileHover={{ background: "#D4601F" }}
                      whileTap={{ scale: 0.97 }}
                      onClick={saveCustom}
                      style={{
                        padding: "10px 24px",
                        background: ACCENT,
                        color: "#fff",
                        border: "none",
                        borderRadius: 100,
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      Save preferences
                    </motion.button>
                  </div>

                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginTop: 16, lineHeight: 1.6 }}>
                    Data collected is used to improve services, send marketing communications where consented, and comply with legal requirements (POPIA, GDPR). You may withdraw consent at any time.{" "}
                    <Link href="/privacy" style={{ color: ACCENT, textDecoration: "underline" }}>Learn more</Link>
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ── Toggle row ────────────────────────────────────────────────────────────
function CookieToggle({
  title,
  description,
  enabled,
  locked,
  onChange,
}: {
  title: string
  description: string
  enabled: boolean
  locked: boolean
  onChange: () => void
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        alignItems: "flex-start",
        padding: "16px 0",
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <div style={{ flex: 1 }}>
        <p style={{ fontWeight: 600, fontSize: 14, color: "#fff", marginBottom: 4 }}>
          {title}
          {locked && (
            <span style={{ marginLeft: 8, fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 100, background: "rgba(196,84,26,0.15)", color: ACCENT, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Always on
            </span>
          )}
        </p>
        <p style={{ color: MUTED, fontSize: 12, lineHeight: 1.6 }}>{description}</p>
      </div>
      <div style={{ flexShrink: 0, paddingTop: 2 }}>
        <button
          onClick={locked ? undefined : onChange}
          disabled={locked}
          aria-checked={enabled}
          role="switch"
          style={{
            width: 44,
            height: 24,
            borderRadius: 100,
            background: enabled ? ACCENT : "rgba(255,255,255,0.12)",
            border: "none",
            cursor: locked ? "default" : "pointer",
            position: "relative",
            transition: "background 0.25s ease",
            opacity: locked ? 0.7 : 1,
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 3,
              left: enabled ? 23 : 3,
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#fff",
              transition: "left 0.25s ease",
              boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
            }}
          />
        </button>
      </div>
    </div>
  )
}
