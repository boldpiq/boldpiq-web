"use client"
import { motion, useRef, useAnimationFrame, useInView } from "motion/react"
import { ScrollReveal } from "@/components/scroll/ScrollReveal"
import Link from "next/link"
import { Footer } from "@/components/layout/Footer"
import { HeroRings, DotGrid, FloatingDots, ScanLine, CornerAccents } from "@/components/ui/BackgroundDecor"

const BG = "#0B0F1C"
const ACCENT = "#C4541A"
const MUTED = "rgba(255,255,255,0.45)"
const SURFACE = "rgba(255,255,255,0.05)"
const BORDER = "rgba(255,255,255,0.08)"

function AboutHeroGlow() {
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)
  useAnimationFrame((t) => {
    if (ref1.current) {
      const x = Math.sin(t * 0.00045) * 100
      const y = Math.cos(t * 0.00032) * 60
      ref1.current.style.transform = `translate(${x}px, ${y}px)`
    }
    if (ref2.current) {
      const x = Math.cos(t * 0.00038) * 80
      const y = Math.sin(t * 0.00055) * 50
      ref2.current.style.transform = `translate(${x}px, ${y}px)`
    }
  })
  return (
    <>
      <div ref={ref1} style={{ position: "absolute", inset: -200, pointerEvents: "none", background: `radial-gradient(ellipse 60% 55% at 25% 35%, rgba(196,84,26,0.38) 0%, transparent 65%)`, willChange: "transform" }} />
      <div ref={ref2} style={{ position: "absolute", inset: -150, pointerEvents: "none", background: `radial-gradient(ellipse 42% 36% at 75% 70%, rgba(196,84,26,0.20) 0%, transparent 60%)`, willChange: "transform" }} />
    </>
  )
}

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

const values = [
  { title: "Outcomes over deliverables", desc: "We don't measure success by pages delivered. We measure it by what changed in your business after we shipped." },
  { title: "Design that earns its price", desc: "Every pixel serves a purpose. We won't add complexity for complexity's sake — only what moves the needle." },
  { title: "Honest communication", desc: "You'll always know where your project stands. No surprises at the finish line, no disappearing after launch." },
  { title: "Built to last", desc: "We write clean, documented code and build on stable, proven stacks. Your site should still be fast and maintainable in five years." },
]

export default function AboutPage() {
  return (
    <main style={{ background: BG, color: "#fff", minHeight: "100vh" }}>

      {/* HERO */}
      <section style={{ padding: "clamp(100px, 18vw, 160px) clamp(20px, 4vw, 48px) 60px", maxWidth: 1400, margin: "0 auto", position: "relative", overflow: "hidden" }}>
        <AboutHeroGlow />
        <HeroRings side="left" />
        <DotGrid />
        <FloatingDots />
        <ScanLine />
        <CornerAccents />
        <ScrollReveal effect="fade-up">
          <Eyebrow label="About" />
          <h1 style={{ fontSize: "clamp(48px, 8vw, 120px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.88, marginBottom: 40 }}>
            We build<br /><span style={{ color: ACCENT }}>growth engines.</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal effect="fade-up" delay={0.1}>
          <p style={{ fontSize: "clamp(17px, 1.6vw, 22px)", color: MUTED, maxWidth: 640, lineHeight: 1.7 }}>
            BoldPiq is a web design and development agency built for businesses that refuse to blend in. We don&rsquo;t make pretty websites — we make websites that produce measurable growth.
          </p>
        </ScrollReveal>
      </section>

      {/* STORY */}
      <section style={{ padding: "0 clamp(20px, 4vw, 48px) clamp(60px, 8vw, 100px)", maxWidth: 1400, margin: "0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(48px, 6vw, 120px)", alignItems: "start" }}>
          <ScrollReveal effect="fade-up">
            <Eyebrow label="Our Story" />
            <h2 style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.92, marginBottom: 40 }}>
              Built on the<br /><span style={{ color: ACCENT }}>frustration</span><br />of what&rsquo;s normal.
            </h2>
          </ScrollReveal>
          <ScrollReveal effect="fade-up" delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <p style={{ color: MUTED, fontSize: 17, lineHeight: 1.75 }}>
                BoldPiq was founded because the standard was too low. Too many businesses were being handed websites that looked decent in a browser preview but did nothing for their growth — slow, generic, forgotten by Google the week after launch.
              </p>
              <p style={{ color: MUTED, fontSize: 17, lineHeight: 1.75 }}>
                We started with a simple conviction: a website should be a business asset, not a business expense. Every element should justify its place by contributing to the outcome — more leads, more trust, more revenue.
              </p>
              <p style={{ color: MUTED, fontSize: 17, lineHeight: 1.75 }}>
                That conviction shapes everything — how we design, how we write code, how we measure success, and how we talk to clients. Bold work. Honest process. Real results.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* STATS BAR */}
      <div style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ maxWidth: 1400, margin: "0 auto" }}>
          {[
            { stat: "3.2×", label: "Average conversion lift" },
            { stat: "94%", label: "Client retention rate" },
            { stat: "6 wks", label: "Average delivery time" },
            { stat: "100%", label: "Ownership. Always." },
          ].map(({ stat, label }, i) => (
            <ScrollReveal key={label} effect="fade-up" delay={i * 0.08}>
              <div
                className={i < 3 ? "border-b md:border-b-0 md:border-r" : ""}
                style={{ padding: "clamp(32px, 4vw, 56px) clamp(20px, 3vw, 40px)", borderColor: BORDER }}
              >
                <motion.p
                  animate={i % 2 === 1 ? { textShadow: ["0 0 0px #C4541A", "0 0 20px rgba(196,84,26,0.6)", "0 0 0px #C4541A"] } : {}}
                  transition={i % 2 === 1 ? { duration: 4, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" } : {}}
                  style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, letterSpacing: "-0.04em", color: i % 2 === 1 ? ACCENT : "#fff", marginBottom: 8 }}
                >{stat}</motion.p>
                <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.5 }}>{label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* VALUES */}
      <section style={{ padding: "clamp(60px, 8vw, 100px) clamp(20px, 4vw, 48px)", maxWidth: 1400, margin: "0 auto" }}>
        <ScrollReveal effect="fade-up">
          <Eyebrow label="Values" />
          <h2 style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.92, marginBottom: 64 }}>
            How we<br /><span style={{ color: ACCENT }}>think.</span>
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 20 }}>
          {values.map((v, i) => (
            <ScrollReveal key={v.title} effect="fade-up" delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -5, borderColor: "rgba(196,84,26,0.35)" }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                style={{ padding: "clamp(32px, 3vw, 48px)", border: `1px solid ${BORDER}`, borderRadius: 20, background: SURFACE, cursor: "default" }}
              >
                <span style={{ fontSize: 13, color: ACCENT, letterSpacing: "0.1em", fontWeight: 700 }}>0{i + 1}</span>
                <h3 style={{ fontSize: "clamp(20px, 2vw, 26px)", fontWeight: 800, letterSpacing: "-0.02em", margin: "16px 0 16px" }}>{v.title}</h3>
                <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.7 }}>{v.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* STACK */}
      <section style={{ padding: "0 clamp(20px, 4vw, 48px) clamp(60px, 8vw, 100px)", maxWidth: 1400, margin: "0 auto" }}>
        <ScrollReveal effect="fade-up">
          <div style={{ padding: "clamp(32px, 4vw, 64px)", border: `1px solid ${BORDER}`, borderRadius: 24, background: `linear-gradient(135deg, rgba(196,84,26,0.14) 0%, ${SURFACE} 100%)` }}>
            <Eyebrow label="Our Stack" />
            <h2 style={{ fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 40 }}>
              Tools that let us build<br /><span style={{ color: ACCENT }}>without limits.</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 16 }}>
              {[
                { name: "Next.js 16", role: "Framework" },
                { name: "TypeScript", role: "Language" },
                { name: "Motion", role: "Animation" },
                { name: "Tailwind v4", role: "Styling" },
                { name: "Sanity CMS", role: "Content" },
                { name: "Vercel", role: "Hosting" },
                { name: "GoHighLevel", role: "CRM / Forms" },
                { name: "Figma", role: "Design" },
              ].map(tool => (
                <motion.div
                  key={tool.name}
                  whileHover={{ y: -3, borderColor: "rgba(196,84,26,0.4)", background: "rgba(196,84,26,0.06)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  style={{ padding: "20px 24px", border: `1px solid ${BORDER}`, borderRadius: 14, background: SURFACE, cursor: "default" }}
                >
                  <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{tool.name}</p>
                  <p style={{ color: MUTED, fontSize: 12 }}>{tool.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <div style={{ borderTop: `1px solid ${BORDER}`, padding: "clamp(60px, 8vw, 100px) clamp(20px, 4vw, 48px)" }}>
        <ScrollReveal effect="fade-up">
          <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 40 }}>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 64px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.92 }}>
              Let&rsquo;s build<br /><span style={{ color: ACCENT }}>something real.</span>
            </h2>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.04, background: "#D4601F" }} whileTap={{ scale: 0.97 }} style={{ padding: "18px 48px", background: ACCENT, color: "#fff", borderRadius: 100, fontWeight: 700, fontSize: 16, cursor: "pointer" }}>
                  Start a Project
                </motion.div>
              </Link>
              <Link href="/work">
                <motion.div whileHover={{ borderColor: "rgba(255,255,255,0.3)" }} style={{ padding: "18px 48px", border: `1px solid ${BORDER}`, color: "#fff", borderRadius: 100, fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
                  See Our Work
                </motion.div>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <Footer />
    </main>
  )
}
