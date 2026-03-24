"use client"
import { useRef } from "react"
import { motion, useAnimationFrame } from "motion/react"
import { ScrollReveal } from "@/components/scroll/ScrollReveal"
import { Footer } from "@/components/layout/Footer"
import { HeroRings, DotGrid, FloatingDots, ScanLine, CornerAccents } from "@/components/ui/BackgroundDecor"
import Script from "next/script"
import { useNonce } from "@/lib/nonce"

const BG = "#0B0F1C"
const ACCENT = "#C4541A"
const MUTED = "rgba(255,255,255,0.45)"
const SURFACE = "rgba(255,255,255,0.04)"
const BORDER = "rgba(255,255,255,0.08)"

function OnboardingGlow() {
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)
  useAnimationFrame((t) => {
    if (ref1.current) {
      const x = Math.sin(t * 0.00042) * 90
      const y = Math.cos(t * 0.00030) * 55
      ref1.current.style.transform = `translate(${x}px, ${y}px)`
    }
    if (ref2.current) {
      const x = Math.cos(t * 0.00036) * 70
      const y = Math.sin(t * 0.00050) * 45
      ref2.current.style.transform = `translate(${x}px, ${y}px)`
    }
  })
  return (
    <>
      <div ref={ref1} style={{ position: "absolute", inset: -200, pointerEvents: "none", background: `radial-gradient(ellipse 55% 50% at 20% 30%, rgba(196,84,26,0.36) 0%, transparent 65%)`, willChange: "transform" }} />
      <div ref={ref2} style={{ position: "absolute", inset: -150, pointerEvents: "none", background: `radial-gradient(ellipse 40% 34% at 80% 75%, rgba(196,84,26,0.18) 0%, transparent 60%)`, willChange: "transform" }} />
    </>
  )
}

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

const steps = [
  { num: "01", title: "Watch the intro", desc: "Start by watching the short video below — it covers what happens next and how we work together." },
  { num: "02", title: "Fill in the form", desc: "Complete the onboarding form with your business details, project goals, and preferences." },
  { num: "03", title: "We get to work", desc: "Once submitted, our team reviews everything and reaches out within 1–2 business days to kick things off." },
]

export default function OnboardingPage() {
  const nonce = useNonce()
  return (
    <main style={{ background: BG, color: "#fff", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <OnboardingGlow />
        <HeroRings side="left" />
        <DotGrid />
        <FloatingDots />
        <ScanLine />
        <CornerAccents />

        <section style={{ padding: "clamp(100px, 16vw, 148px) clamp(20px, 4vw, 48px) 72px", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <ScrollReveal effect="fade-up">
            <Eyebrow label="Client Onboarding" />
            <h1 style={{ fontSize: "clamp(44px, 8vw, 108px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.9, marginBottom: 28 }}>
              Welcome<br /><span style={{ color: ACCENT }}>Aboard.</span>
            </h1>
            <p style={{ fontSize: "clamp(15px, 1.4vw, 20px)", color: MUTED, maxWidth: 520, lineHeight: 1.65, marginBottom: 0 }}>
              We&apos;re excited to get started. Please watch the introduction video, then complete the form below so we have everything we need to hit the ground running.
            </p>
          </ScrollReveal>
        </section>
      </div>

      {/* ── STEPS ── */}
      <section style={{ padding: "0 clamp(20px, 4vw, 48px) 80px", maxWidth: 1200, margin: "0 auto" }}>
        <ScrollReveal effect="fade-up">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {steps.map((s) => (
              <div
                key={s.num}
                style={{
                  padding: "32px 28px",
                  border: `1px solid ${BORDER}`,
                  borderRadius: 16,
                  background: SURFACE,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <span style={{ position: "absolute", top: 20, right: 24, fontSize: 13, fontWeight: 700, color: ACCENT, letterSpacing: "0.06em", opacity: 0.7 }}>{s.num}</span>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ── INTRODUCTION VIDEO ── */}
      <section style={{ padding: "0 clamp(20px, 4vw, 48px) 96px", maxWidth: 1200, margin: "0 auto" }}>
        <ScrollReveal effect="fade-up">
          <div style={{ marginBottom: 40 }}>
            <Eyebrow label="Introduction Video" />
            <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 12 }}>
              Start here — watch first.
            </h2>
            <p style={{ fontSize: "clamp(14px, 1.2vw, 17px)", color: MUTED, maxWidth: 480, lineHeight: 1.65, margin: 0 }}>
              This short video walks you through the onboarding process and what to expect from us during the project.
            </p>
          </div>

          {/* Video wrapper */}
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingBottom: "56.25%", /* 16:9 */
              borderRadius: 16,
              overflow: "hidden",
              border: `1px solid ${BORDER}`,
              background: "#000",
              boxShadow: `0 0 80px rgba(196,84,26,0.15)`,
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/gWu7Ba6TvD0?rel=0&modestbranding=1&color=white"
              title="Boldpiq Client Onboarding Introduction"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </div>
        </ScrollReveal>
      </section>

      {/* ── ONBOARDING FORM ── */}
      <section style={{ padding: "0 clamp(20px, 4vw, 48px) 120px", maxWidth: 1200, margin: "0 auto" }}>
        <ScrollReveal effect="fade-up">
          <div style={{ marginBottom: 48 }}>
            <Eyebrow label="Onboarding Form" />
            <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 12 }}>
              Tell us about<br /><span style={{ color: ACCENT }}>your project.</span>
            </h2>
            <p style={{ fontSize: "clamp(14px, 1.2vw, 17px)", color: MUTED, maxWidth: 480, lineHeight: 1.65, margin: 0 }}>
              Fill in the form completely — the more detail you provide, the faster we can get to work.
            </p>
          </div>

          {/* GHL Inline Form */}
          <div
            style={{
              border: `1px solid ${BORDER}`,
              borderRadius: 16,
              background: SURFACE,
              overflow: "hidden",
              boxShadow: `0 0 60px rgba(196,84,26,0.08)`,
            }}
          >
            <iframe
              src="https://link.zip360.co.za/widget/form/vlJUXbvvCGhZVv0EGjoc"
              style={{ width: "100%", height: "2764px", border: "none", borderRadius: 3, display: "block" }}
              id="inline-vlJUXbvvCGhZVv0EGjoc"
              data-layout={`{"id":"INLINE"}`}
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Client Onboarding Form Boldpiq"
              data-height="2764"
              data-layout-iframe-id="inline-vlJUXbvvCGhZVv0EGjoc"
              data-form-id="vlJUXbvvCGhZVv0EGjoc"
              title="Client Onboarding Form Boldpiq"
            />
          </div>

          {/* GHL form script — in addition to the global one, ensuring the inline widget initialises */}
          <Script
            src="https://link.zip360.co.za/js/form_embed.js"
            strategy="afterInteractive"
            nonce={nonce}
          />
        </ScrollReveal>
      </section>

      <Footer />
    </main>
  )
}
