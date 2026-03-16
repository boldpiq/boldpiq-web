"use client"
import { motion, useRef, useInView } from "motion/react"
import { ScrollReveal } from "@/components/scroll/ScrollReveal"
import { Footer } from "@/components/layout/Footer"
import { GHLBookingWidget } from "@/components/ui/GHLBookingWidget"
import { HeroRings, DotGrid, FloatingDots, ScanLine, CornerAccents } from "@/components/ui/BackgroundDecor"

const BG = "#0B0F1C"
const ACCENT = "#C4541A"
const MUTED = "rgba(255,255,255,0.45)"
const SURFACE = "rgba(255,255,255,0.05)"
const BORDER = "rgba(255,255,255,0.08)"

function Eyebrow({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 32 }}>
      <motion.span
        initial={{ width: 0 }}
        animate={inView ? { width: 32 } : { width: 0 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        style={{ height: 1, background: ACCENT, flexShrink: 0, display: "block" }}
      />
      <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED }}>{label}</span>
    </div>
  )
}


export default function ContactPage() {
  return (
    <main style={{ background: `radial-gradient(ellipse 75% 62% at 76% 24%, rgba(196,84,26,0.40) 0%, transparent 63%), ${BG}`, color: "#fff", minHeight: "100vh" }}>

        {/* HERO */}
        <section style={{ padding: "clamp(100px, 18vw, 160px) clamp(20px, 4vw, 48px) 40px", maxWidth: 1400, margin: "0 auto", position: "relative", overflow: "hidden" }}>
          <HeroRings side="left" />
          <DotGrid />
          <FloatingDots />
          <ScanLine />
          <CornerAccents />
          <ScrollReveal effect="fade-up">
            <Eyebrow label="Get Started" />
            <h1 style={{ fontSize: "clamp(48px, 8vw, 120px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.88, marginBottom: 32 }}>
              Ready to<br /><span style={{ color: ACCENT }}>Grow?</span>
            </h1>
            <p style={{ fontSize: "clamp(16px, 1.4vw, 20px)", color: MUTED, maxWidth: 520, lineHeight: 1.65 }}>
              Book your free discovery call. Tell us about your business and what you want to achieve — we&rsquo;ll come back with a clear plan, no fluff, no hard sell.
            </p>
          </ScrollReveal>
        </section>

        {/* BOOKING + INFO */}
        <section style={{ padding: "0 clamp(20px, 4vw, 48px) clamp(60px, 8vw, 100px)", maxWidth: 1400, margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(48px, 6vw, 100px)", alignItems: "start" }}>

            {/* Left — info */}
            <ScrollReveal effect="fade-up">
              <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
                <div>
                  <p style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, marginBottom: 20 }}>What to expect</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {[
                      { step: "01", text: "Book a time slot that works best for you — no forms, just your calendar." },
                      { step: "02", text: "A free 30-minute discovery call to understand your goals and vision." },
                      { step: "03", text: "A clear proposal with timeline and investment — delivered within 24 hours." },
                      { step: "04", text: "Project kickoff — we move fast once aligned." },
                    ].map((item, i) => (
                      <ScrollReveal key={item.step} effect="fade-right" delay={i * 0.1}>
                        <motion.div
                          whileHover={{ x: 6 }}
                          transition={{ type: "spring", stiffness: 300, damping: 28 }}
                          style={{ display: "flex", gap: 20, alignItems: "flex-start", cursor: "default" }}
                        >
                          <motion.span
                            animate={{ textShadow: ["0 0 0px #C4541A", "0 0 12px #C4541A", "0 0 0px #C4541A"] }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
                            style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: "0.08em", paddingTop: 3, flexShrink: 0 }}
                          >{item.step}</motion.span>
                          <p style={{ color: MUTED, fontSize: 16, lineHeight: 1.6 }}>{item.text}</p>
                        </motion.div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>

                <motion.div
                  animate={{ boxShadow: ["0 0 0px rgba(196,84,26,0)", "0 0 28px rgba(196,84,26,0.18)", "0 0 0px rgba(196,84,26,0)"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ padding: "32px", border: `1px solid rgba(196,84,26,0.25)`, borderRadius: 20, background: SURFACE }}
                >
                  <p style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, marginBottom: 20 }}>Guarantees</p>
                  {[
                    "Free initial consultation",
                    "No lock-in contracts",
                    "Full ownership of all assets",
                    "30-day post-launch support",
                  ].map(g => (
                    <div key={g} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
                      <span style={{ color: ACCENT, fontSize: 10, flexShrink: 0 }}>✦</span>
                      <p style={{ color: "#fff", fontSize: 15 }}>{g}</p>
                    </div>
                  ))}
                </motion.div>

                <div>
                  <p style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, marginBottom: 16 }}>Connect</p>
                  <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                    {[
                      { label: "Instagram", url: "https://www.instagram.com/boldpiq/" },
                      { label: "Facebook", url: "https://www.facebook.com/boldpiq" },
                      { label: "Pinterest", url: "https://za.pinterest.com/boldpiq/" },
                      { label: "LinkedIn", url: "https://www.linkedin.com/company/boldpiq/" },
                    ].map(s => (
                      <motion.a
                        key={s.label}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ color: "#fff" }}
                        style={{ color: MUTED, fontSize: 14, textDecoration: "none" }}
                      >
                        {s.label}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right — booking widget */}
            <GHLBookingWidget
              src="https://link.zip360.co.za/widget/booking/2iYXsaTBfL5b7Y870XVX"
              id="2iYXsaTBfL5b7Y870XVX_contact"
              title="Book a Free Discovery Call"
              defaultHeight={700}
              borderRadius={24}
              border={`1px solid ${BORDER}`}
              background={SURFACE}
              redirectTo="/thank-you"
              deferLoad
            />
          </div>
        </section>

      <Footer />
    </main>
  )
}
