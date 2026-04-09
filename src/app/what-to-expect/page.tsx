"use client"
import { useRef } from "react"
import { motion, useAnimationFrame, useInView } from "motion/react"
import { ScrollReveal } from "@/components/scroll/ScrollReveal"
import { Footer } from "@/components/layout/Footer"
import { HeroRings, DotGrid, FloatingDots, ScanLine, CornerAccents } from "@/components/ui/BackgroundDecor"

const BG = "#0B0F1C"
const ACCENT = "#C4541A"
const MUTED = "rgba(255,255,255,0.45)"
const SURFACE = "rgba(255,255,255,0.04)"
const BORDER = "rgba(255,255,255,0.08)"
const ACCENT_DIM = "rgba(196,84,26,0.12)"

/* ── Animated background glow ── */
function PageGlow() {
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)
  const ref3 = useRef<HTMLDivElement>(null)
  useAnimationFrame((t) => {
    if (ref1.current) {
      const x = Math.sin(t * 0.00038) * 80
      const y = Math.cos(t * 0.00028) * 50
      ref1.current.style.transform = `translate(${x}px, ${y}px)`
    }
    if (ref2.current) {
      const x = Math.cos(t * 0.00032) * 60
      const y = Math.sin(t * 0.00045) * 40
      ref2.current.style.transform = `translate(${x}px, ${y}px)`
    }
    if (ref3.current) {
      const x = Math.sin(t * 0.00055) * 40
      const y = Math.cos(t * 0.00022) * 30
      ref3.current.style.transform = `translate(${x}px, ${y}px)`
    }
  })
  return (
    <>
      <div ref={ref1} style={{ position: "absolute", inset: -200, pointerEvents: "none", background: `radial-gradient(ellipse 50% 44% at 15% 25%, rgba(196,84,26,0.32) 0%, transparent 65%)`, willChange: "transform" }} />
      <div ref={ref2} style={{ position: "absolute", inset: -150, pointerEvents: "none", background: `radial-gradient(ellipse 35% 30% at 85% 70%, rgba(196,84,26,0.16) 0%, transparent 60%)`, willChange: "transform" }} />
      <div ref={ref3} style={{ position: "absolute", inset: -100, pointerEvents: "none", background: `radial-gradient(ellipse 25% 20% at 60% 10%, rgba(196,84,26,0.10) 0%, transparent 60%)`, willChange: "transform" }} />
    </>
  )
}

/* ── Eyebrow label ── */
function Eyebrow({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 32 }}>
      <motion.span
        initial={{ width: 0 }}
        whileInView={{ width: 32 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        style={{ height: 1, background: ACCENT, flexShrink: 0, display: "block" }}
      />
      <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED }}>{label}</span>
    </div>
  )
}

/* ── Step connector line ── */
function StepConnector() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
      style={{
        height: 1,
        background: `linear-gradient(90deg, ${ACCENT}, rgba(196,84,26,0.2))`,
        transformOrigin: "left",
        flex: 1,
        marginTop: -1,
      }}
    />
  )
}

/* ── Individual step icons ── */
function StepIcon({ step }: { step: number }) {
  const icons = [
    /* 01 — Discovery */
    <svg key="1" width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="12" cy="12" r="7" stroke={ACCENT} strokeWidth="1.5" />
      <path d="M17 17L22 22" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 12h6M12 9v6" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" />
    </svg>,
    /* 02 — Design */
    <svg key="2" width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="6" width="16" height="12" rx="2" stroke={ACCENT} strokeWidth="1.5" />
      <path d="M8 22h8M12 18v4" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 10h4M8 13h6" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" />
    </svg>,
    /* 03 — Review */
    <svg key="3" width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M6 14a8 8 0 1 0 16 0 8 8 0 0 0-16 0Z" stroke={ACCENT} strokeWidth="1.5" />
      <path d="M10 14l2.5 2.5L17 11" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    /* 04 — Launch */
    <svg key="4" width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 4C14 4 18 8 18 14s-4 8-4 8" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 4C14 4 10 8 10 14s4 8 4 8" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 14h18" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="14" cy="14" r="9" stroke={ACCENT} strokeWidth="1.5" />
    </svg>,
  ]
  return icons[step] ?? null
}

/* ── Step card ── */
function StepCard({ num, title, desc, index }: { num: string; title: string; desc: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: index * 0.12 }}
      style={{
        position: "relative",
        padding: "36px 32px 32px",
        border: `1px solid ${BORDER}`,
        borderRadius: 20,
        background: SURFACE,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {/* Glow on hover */}
      <motion.div
        whileHover={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${ACCENT_DIM} 0%, transparent 70%)`,
          pointerEvents: "none",
          borderRadius: 20,
        }}
      />

      {/* Accent top bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: index * 0.12 + 0.2 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, ${ACCENT}, transparent)`,
          transformOrigin: "left",
          borderRadius: "20px 20px 0 0",
        }}
      />

      {/* Step number */}
      <span style={{
        position: "absolute", top: 20, right: 24,
        fontSize: 11, fontWeight: 800, color: ACCENT,
        letterSpacing: "0.12em", opacity: 0.6,
      }}>{num}</span>

      {/* Icon */}
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        background: ACCENT_DIM, border: `1px solid rgba(196,84,26,0.2)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <StepIcon step={index} />
      </div>

      <div>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.01em" }}>{title}</h3>
        <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.65, margin: 0 }}>{desc}</p>
      </div>
    </motion.div>
  )
}

/* ── Timeline item (mobile-friendly vertical flow) ── */
function TimelineItem({ num, title, desc, index }: { num: string; title: string; desc: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const isLast = index === 3

  return (
    <div ref={ref} style={{ display: "flex", gap: 24 }}>
      {/* Line + dot */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1], delay: index * 0.15 }}
          style={{
            width: 40, height: 40, borderRadius: "50%",
            background: ACCENT_DIM, border: `1.5px solid ${ACCENT}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, zIndex: 1,
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 800, color: ACCENT, letterSpacing: "0.06em" }}>{num}</span>
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: index * 0.15 + 0.3 }}
            style={{
              width: 1, flex: 1, minHeight: 48,
              background: `linear-gradient(180deg, ${ACCENT}, rgba(196,84,26,0.1))`,
              transformOrigin: "top", marginTop: 4,
            }}
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: index * 0.15 + 0.1 }}
        style={{ paddingBottom: isLast ? 0 : 40 }}
      >
        <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6, letterSpacing: "-0.01em" }}>{title}</h3>
        <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.65, margin: 0 }}>{desc}</p>
      </motion.div>
    </div>
  )
}

/* ── Data ── */
const steps = [
  {
    num: "01",
    title: "Discovery Call",
    desc: "We start with a short call to understand your goals, brand, and timeline. No jargon — just a real conversation about what you need.",
  },
  {
    num: "02",
    title: "Design & Build",
    desc: "Our team gets to work designing and building your solution. You'll receive progress updates so you're never left in the dark.",
  },
  {
    num: "03",
    title: "Review & Refine",
    desc: "We present the work for your feedback. You get revision rounds to make sure everything feels exactly right before we go live.",
  },
  {
    num: "04",
    title: "Launch & Handover",
    desc: "We launch your project and hand everything over — credentials, assets, guides. You're fully equipped and ready to grow.",
  },
]

/* ── Page ── */
export default function WhatToExpectPage() {
  return (
    <main style={{ background: BG, color: "#fff", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <PageGlow />
        <HeroRings side="right" />
        <DotGrid />
        <FloatingDots />
        <ScanLine />
        <CornerAccents />

        <section style={{ padding: "clamp(100px, 16vw, 148px) clamp(20px, 4vw, 48px) 72px", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <ScrollReveal effect="fade-up">
            <Eyebrow label="Your Journey With Us" />

            {/* Welcome badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "8px 16px", borderRadius: 100,
                background: ACCENT_DIM, border: `1px solid rgba(196,84,26,0.3)`,
                marginBottom: 28,
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                style={{ fontSize: 16 }}
              >
                👋
              </motion.span>
              <span style={{ fontSize: 13, color: ACCENT, fontWeight: 600, letterSpacing: "0.04em" }}>
                Welcome to BoldPiq
              </span>
            </motion.div>

            <h1 style={{ fontSize: "clamp(44px, 8vw, 108px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.9, marginBottom: 28 }}>
              Here&apos;s what<br /><span style={{ color: ACCENT }}>to expect.</span>
            </h1>
            <p style={{ fontSize: "clamp(15px, 1.4vw, 20px)", color: MUTED, maxWidth: 560, lineHeight: 1.65 }}>
              From your first interaction to launch day, we keep things clear, communicative, and stress-free. Here&apos;s exactly how the process works.
            </p>
          </ScrollReveal>
        </section>
      </div>

      {/* ── VIDEO INTRO ── */}
      <section style={{ padding: "0 clamp(20px, 4vw, 48px) 96px", maxWidth: 1200, margin: "0 auto" }}>
        <ScrollReveal effect="fade-up">
          <div style={{ marginBottom: 40 }}>
            <Eyebrow label="Introduction" />
            <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 12 }}>
              Watch this first.
            </h2>
            <p style={{ fontSize: "clamp(14px, 1.2vw, 17px)", color: MUTED, maxWidth: 520, lineHeight: 1.65 }}>
              A short welcome from the BoldPiq team — we cover how the process works, what we need from you, and what great results look like together.
            </p>
          </div>

          {/* Video */}
          <div style={{ position: "relative" }}>
            {/* Glow behind video */}
            <div style={{
              position: "absolute", inset: -40, zIndex: 0,
              background: `radial-gradient(ellipse 70% 60% at 50% 50%, rgba(196,84,26,0.14) 0%, transparent 70%)`,
              pointerEvents: "none",
            }} />
            <div
              style={{
                position: "relative", zIndex: 1,
                width: "100%", paddingBottom: "56.25%",
                borderRadius: 20, overflow: "hidden",
                border: `1px solid ${BORDER}`,
                background: "#000",
                boxShadow: `0 0 80px rgba(196,84,26,0.18), 0 40px 80px rgba(0,0,0,0.5)`,
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/gWu7Ba6TvD0?rel=0&modestbranding=1&color=white"
                title="BoldPiq — What to Expect"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
              />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── NEXT STEPS INTRO PARAGRAPH ── */}
      <section style={{ padding: "0 clamp(20px, 4vw, 48px) 80px", maxWidth: 1200, margin: "0 auto" }}>
        <ScrollReveal effect="fade-up">
          <div style={{
            padding: "48px clamp(28px, 5vw, 64px)",
            border: `1px solid ${BORDER}`,
            borderRadius: 24,
            background: SURFACE,
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Accent corner */}
            <div style={{
              position: "absolute", top: 0, left: 0,
              width: 120, height: 120,
              background: `radial-gradient(ellipse at 0% 0%, rgba(196,84,26,0.18) 0%, transparent 70%)`,
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0,
              height: 2,
              background: `linear-gradient(90deg, ${ACCENT}, transparent 60%)`,
              borderRadius: "24px 24px 0 0",
            }} />

            <Eyebrow label="What Happens Next" />
            <h2 style={{ fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20 }}>
              A process built around<br /><span style={{ color: ACCENT }}>your success.</span>
            </h2>
            <p style={{ fontSize: "clamp(14px, 1.2vw, 17px)", color: MUTED, maxWidth: 640, lineHeight: 1.75 }}>
              Every project we take on follows a structured four-step process — built for clarity, speed, and results. You stay informed at every stage, and our team is always available when you need us. No surprises, no delays. Just honest work delivered on time.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ── STEPS GRID (desktop) ── */}
      <section style={{ padding: "0 clamp(20px, 4vw, 48px) 40px", maxWidth: 1200, margin: "0 auto" }}>
        <ScrollReveal effect="fade-up">
          <div style={{ marginBottom: 48 }}>
            <Eyebrow label="The Process" />
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1 }}>
                Four steps to <span style={{ color: ACCENT }}>launch.</span>
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: 8, opacity: 0.5, marginTop: 4 }}>
                <StepConnector />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Desktop grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20,
        }}>
          {steps.map((s, i) => (
            <StepCard key={s.num} {...s} index={i} />
          ))}
        </div>
      </section>

      {/* ── TIMELINE (visual flow) ── */}
      <section style={{ padding: "80px clamp(20px, 4vw, 48px) 96px", maxWidth: 760, margin: "0 auto" }}>
        <ScrollReveal effect="fade-up">
          <div style={{ marginBottom: 56 }}>
            <Eyebrow label="Step by Step" />
            <h2 style={{ fontSize: "clamp(24px, 3vw, 44px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1 }}>
              Your journey, laid out.
            </h2>
          </div>
        </ScrollReveal>

        <div>
          {steps.map((s, i) => (
            <TimelineItem key={s.num} {...s} index={i} />
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "0 clamp(20px, 4vw, 48px) 120px", maxWidth: 1200, margin: "0 auto" }}>
        <ScrollReveal effect="fade-up">
          <div style={{
            textAlign: "center",
            padding: "64px clamp(24px, 5vw, 80px)",
            border: `1px solid ${BORDER}`,
            borderRadius: 24,
            background: SURFACE,
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: `radial-gradient(ellipse 60% 50% at 50% 100%, rgba(196,84,26,0.12) 0%, transparent 70%)`,
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
              borderRadius: "0 0 24px 24px",
            }} />

            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              style={{ fontSize: 36, marginBottom: 16 }}
            >
              🚀
            </motion.div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 48px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 12 }}>
              Ready to get started?
            </h2>
            <p style={{ fontSize: "clamp(14px, 1.2vw, 17px)", color: MUTED, maxWidth: 440, margin: "0 auto 36px", lineHeight: 1.65 }}>
              Book your discovery call and let&apos;s map out what we can build together.
            </p>
            <motion.a
              href="/booking"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "14px 32px", borderRadius: 100,
                background: ACCENT, color: "#fff",
                fontSize: 15, fontWeight: 700, letterSpacing: "0.02em",
                textDecoration: "none",
                boxShadow: `0 0 40px rgba(196,84,26,0.35)`,
              }}
            >
              Book a Discovery Call
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </main>
  )
}
