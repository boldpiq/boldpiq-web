"use client"
import { useRef, useEffect, useState } from "react"
import { motion, useInView, AnimatePresence, useAnimationFrame } from "motion/react"
import { VelocityMarquee } from "@/components/scroll/VelocityMarquee"
import { ScrollReveal } from "@/components/scroll/ScrollReveal"
import Image from "next/image"
import { Footer } from "@/components/layout/Footer"
import { GHLBookingWidget } from "@/components/ui/GHLBookingWidget"
import { HeroRings, DotGrid, FloatingDots, ScanLine, CornerAccents } from "@/components/ui/BackgroundDecor"

const BG = "#0B0F1C"
const ACCENT = "#C4541A"
const MUTED = "rgba(255,255,255,0.45)"
const SURFACE = "rgba(255,255,255,0.05)"
const BORDER = "rgba(255,255,255,0.08)"


function Section({ id, children, style, className }: { id?: string; children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  return (
    <section
      id={id}
      className={className}
      style={{ padding: "80px clamp(20px, 4vw, 48px)", maxWidth: 1400, margin: "0 auto", ...style }}
    >
      {children}
    </section>
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

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0 })
  const decimals = Number.isInteger(to) ? 0 : 1

  useEffect(() => {
    if (!inView) return
    let start = 0
    const tick = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / 1600, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      const current = p < 1 ? eased * to : to
      setCount(parseFloat(current.toFixed(decimals)))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to, decimals])

  return <span ref={ref}>{count}{suffix}</span>
}

function ServiceCard({ number, title, description, tags }: { number: string; title: string; description: string; tags: string[] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.a
      href="/work/"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ borderColor: hovered ? ACCENT : BORDER }}
      style={{ padding: "48px 40px", borderRadius: 20, border: `1px solid ${BORDER}`, background: SURFACE, display: "flex", flexDirection: "column", gap: 24, position: "relative", overflow: "hidden", cursor: "default" }}
    >
      <motion.div animate={{ opacity: hovered ? 1 : 0 }} style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />
      <span style={{ fontSize: 11, letterSpacing: "0.15em", color: MUTED, textTransform: "uppercase" }}>{number}</span>
      <div>
        <h3 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>{title}</h3>
        <p style={{ color: MUTED, lineHeight: 1.7, fontSize: 16 }}>{description}</p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: "auto" }}>
        {tags.map(t => <span key={t} style={{ padding: "4px 14px", borderRadius: 100, border: `1px solid ${BORDER}`, fontSize: 12, color: MUTED }}>{t}</span>)}
      </div>
      <motion.div animate={{ x: hovered ? 0 : 16, opacity: hovered ? 1 : 0 }} style={{ fontSize: 13, fontWeight: 700, color: ACCENT }}>Learn more →</motion.div>
    </motion.a>
  )
}

function CaseCard({ tag, title, outcome, gradient }: { tag: string; title: string; outcome: string; gradient: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.a
      href="/work/"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ scale: hovered ? 1.02 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{ borderRadius: 20, overflow: "hidden", background: gradient, minHeight: 400, padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}
    >
      <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: 100, background: "rgba(255,255,255,0.1)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", width: "fit-content" }}>{tag}</span>
      <div>
        <h3 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>{title}</h3>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENT, flexShrink: 0, display: "inline-block" }} />{outcome}
        </p>
      </div>
      <motion.div animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }} style={{ fontSize: 13, fontWeight: 700 }}>View case study →</motion.div>
    </motion.a>
  )
}

function ProcessStep({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ x: 6 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: 24, paddingBottom: 48, borderBottom: `1px solid ${BORDER}` }}
    >
      <span style={{ fontSize: "clamp(32px, 5vw, 44px)", fontWeight: 900, color: ACCENT, letterSpacing: "-0.04em", lineHeight: 1 }}>{number}</span>
      <div>
        <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, letterSpacing: "-0.02em" }}>{title}</h3>
        <p style={{ color: MUTED, lineHeight: 1.7, fontSize: 15 }}>{description}</p>
      </div>
    </motion.div>
  )
}

function ProcessGlow() {
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)
  useAnimationFrame((t) => {
    if (ref1.current) {
      const x = Math.sin(t * 0.00056) * 120
      const y = Math.cos(t * 0.00038) * 80
      ref1.current.style.transform = `translate(${x}px, ${y}px)`
    }
    if (ref2.current) {
      const x = Math.cos(t * 0.00044) * 90
      const y = Math.sin(t * 0.00068) * 70
      ref2.current.style.transform = `translate(${x}px, ${y}px)`
    }
  })
  return (
    <>
      <div ref={ref1} style={{ position: "absolute", inset: -160, pointerEvents: "none", background: `radial-gradient(ellipse 58% 52% at 60% 40%, rgba(196,84,26,0.30) 0%, transparent 68%)`, willChange: "transform" }} />
      <div ref={ref2} style={{ position: "absolute", inset: -120, pointerEvents: "none", background: `radial-gradient(ellipse 44% 40% at 38% 62%, rgba(196,84,26,0.18) 0%, transparent 62%)`, willChange: "transform" }} />
    </>
  )
}

// ── Rotating Testimonials ──────────────────────────────────────────────────
const reviews = [
  {
    quote: "Her commitment to quality and her ability to capture the spirit of our brand in every aspect of the site… highly recommend her services.",
    name: "The Cherri Chilli",
    role: "Founder, The Cherri Chilli - Award-winning brand",
    image: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/2YVSGppZ3t1nNSl74HPu/media/67fa558dc7a0152ed4d48f4c.png",
  },
  {
    quote: "Working with BoldPiq has been a complete game-changer for my coaching business… The website design is not only visually stunning but also user-friendly, with seamless hosting and an intuitive booking solution.",
    name: "Dr. Eleanor O'Sullivan",
    role: "Founder / Coach, Dr. Eleanor O'Sullivan",
    image: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/2YVSGppZ3t1nNSl74HPu/media/67fa5819266b6fb33c8f4005.png",
  },
  {
    quote: "We are very fortunate to have had Monique develop our website and would recommend her to anyone in the process of developing a website. She did a wonderful job with our website, and we are sure that she would approach any project with the same care and attention to detail.",
    name: "Net Vir Pret",
    role: "Net Vir Pret, Founder - Community of Practice for Social Change",
    image: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/2YVSGppZ3t1nNSl74HPu/media/696e1ee2436e7117cd38fc9d.webp",
  },
]

function RotatingTestimonials() {
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setDir(1)
      setCurrent(c => (c + 1) % reviews.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const go = (idx: number) => {
    setDir(idx > current ? 1 : -1)
    setCurrent(idx)
  }

  const review = reviews[current]

  return (
    <div style={{ padding: "80px clamp(20px, 4vw, 48px)", borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={current}
            custom={dir}
            initial={{ opacity: 0, y: dir * 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: dir * -24 }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          >
            <p style={{ fontSize: "clamp(18px, 2.8vw, 34px)", fontWeight: 700, lineHeight: 1.35, letterSpacing: "-0.02em", marginBottom: 48 }}>
              &ldquo;{review.quote}&rdquo;
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", overflow: "hidden", flexShrink: 0, position: "relative", outline: "2px solid #C4541A", outlineOffset: "2px" }}>
                <Image src={review.image} alt={review.name} fill style={{ objectFit: "cover" }} sizes="48px" />
              </div>
              <div style={{ textAlign: "left" }}>
                <p style={{ fontWeight: 700, fontSize: 15 }}>{review.name}</p>
                <p style={{ color: MUTED, fontSize: 13 }}>{review.role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot nav */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 40 }}>
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Review ${i + 1}`}
              style={{
                width: i === current ? 28 : 8,
                height: 8,
                borderRadius: 100,
                background: i === current ? ACCENT : "rgba(255,255,255,0.2)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.35s ease, background 0.35s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null)

  return (
    <main style={{ background: BG, color: "#fff", minHeight: "100vh" }}>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="hero-section"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 clamp(20px, 4vw, 48px) 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decor */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse 80% 65% at 76% 36%, rgba(196,84,26,0.40) 0%, transparent 66%)` }} />
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse 44% 38% at 16% 78%, rgba(196,84,26,0.22) 0%, transparent 62%)` }}
        />
        <HeroRings side="right" />
        <DotGrid />
        <FloatingDots />
        <ScanLine />
        <CornerAccents />
        <motion.div
          animate={{ opacity: [0.025, 0.055, 0.025] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ position: "absolute", bottom: -60, right: -40, fontSize: "clamp(120px, 30vw, 420px)", fontWeight: 900, color: "#fff", userSelect: "none", pointerEvents: "none", letterSpacing: "-0.05em", lineHeight: 1 }}
        >01</motion.div>

        <div style={{ maxWidth: 1400, width: "100%", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 18px", border: `1px solid ${BORDER}`, borderRadius: 100, marginBottom: 48, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED }}
          >
            <motion.span
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT, display: "block", flexShrink: 0 }}
            />
            Web Design &amp; Development Agency
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
            style={{ fontSize: "clamp(64px, 13vw, 200px)", fontWeight: 900, lineHeight: 0.88, letterSpacing: "-0.04em", margin: 0 }}
          >
            <span style={{ color: "#fff", display: "block" }}>Built</span>
            <motion.span
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.45 }}
              style={{ color: ACCENT, display: "block" }}
            >
              To Grow.
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between"
            style={{ gap: 40, marginTop: 64, flexWrap: "wrap" }}
          >
            <p style={{ fontSize: "clamp(15px, 1.4vw, 20px)", color: MUTED, maxWidth: 480, lineHeight: 1.65, margin: 0 }}>
              Strategically crafted websites designed to support growth — built for businesses that refuse to blend in. Results vary based on industry, market conditions, and client execution.
            </p>
            <div className="hero-cta-wrap" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <motion.a href="/contact" whileHover={{ scale: 1.04, background: "#D4601F" }} whileTap={{ scale: 0.97 }} style={{ padding: "15px 36px", background: ACCENT, color: "#fff", borderRadius: 100, fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em", display: "inline-block" }}>Get Started</motion.a>
              <motion.a href="/work" whileHover={{ borderColor: "rgba(255,255,255,0.3)" }} style={{ padding: "15px 36px", border: `1px solid ${BORDER}`, color: "#fff", borderRadius: 100, fontWeight: 600, fontSize: 15, letterSpacing: "-0.01em", display: "inline-block" }}>See Our Work</motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────────── */}
      <div style={{ padding: "28px 0", borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <VelocityMarquee
          items={["Web Design", "Web Development", "Brand Identity", "GEO Optimised", "Conversion Focused", "Mobile First", "Sanity CMS", "Motion & Animation", "Results Driven", "Vercel Hosted"]}
          baseVelocity={-2}
        />
      </div>

      {/* ── STATS ────────────────────────────────────────────────── */}
      <Section>
        <ScrollReveal effect="fade-up"><Eyebrow label="Outcomes" /></ScrollReveal>
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${BORDER}` }}
        >
          {[
            { stat: 3.2, suffix: "×", label: "Average conversion rate improvement across client projects — results vary by industry and execution" },
            { stat: 94, suffix: "%", label: "Client retention rate — we keep the clients we earn" },
            { stat: 6, suffix: " wks", label: "Average time from brief to live website" },
          ].map(({ stat, suffix, label }, i) => (
            <ScrollReveal key={label} effect="fade-up" delay={i * 0.1}>
              <div
                className={i < 2 ? "border-b md:border-b-0 md:border-r" : ""}
                style={{
                  padding: "clamp(40px, 5vw, 64px) clamp(24px, 4vw, 48px)",
                  background: i === 1 ? `rgba(196,84,26,0.20)` : SURFACE,
                  borderColor: BORDER,
                  height: "100%",
                  position: "relative",
                }}
              >
                {i === 1 && (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5], scaleX: [0.7, 1, 0.7] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`, transformOrigin: "center" }}
                  />
                )}
                <div style={{ fontSize: "clamp(48px, 7vw, 96px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, color: i === 1 ? ACCENT : "#fff", marginBottom: 20 }}>
                  <Counter to={stat} suffix={suffix} />
                </div>
                <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.6, maxWidth: 240 }}>{label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* ── SERVICES ─────────────────────────────────────────────── */}
      <Section id="services" style={{ paddingTop: 0 }}>
        <ScrollReveal effect="fade-up">
          <div
            className="flex flex-col md:flex-row md:items-end md:justify-between"
            style={{ marginBottom: 64, gap: 24 }}
          >
            <div>
              <Eyebrow label="Services" />
              <h2 style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.92 }}>What We<br /><span style={{ color: ACCENT }}>Build.</span></h2>
            </div>
            <p style={{ color: MUTED, maxWidth: 360, lineHeight: 1.7, fontSize: 16 }}>Every engagement is designed with your growth goals in mind — not just a deliverable to tick off a list.</p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 20 }}>
          {[
            { number: "01", title: "Web Design", description: "Award-worthy designs that stop the scroll, earn the click, and reflect the premium nature of your brand.", tags: ["UI/UX", "Figma", "Motion Design", "Responsive"] },
            { number: "02", title: "Web Development", description: "Fast, secure, scalable Next.js websites — optimised for Core Web Vitals and AI search from day one.", tags: ["Next.js", "TypeScript", "Vercel", "Sanity CMS"] },
            { number: "03", title: "Brand Identity", description: "Visual systems that command attention and build instant trust — logo, typography, colour, and full brand guidelines.", tags: ["Logo", "Typography", "Colour System", "Guidelines"] },
          ].map((s, i) => (
            <ScrollReveal key={s.title} effect="fade-up" delay={i * 0.1}><ServiceCard {...s} /></ScrollReveal>
          ))}
        </div>
      </Section>

      {/* ── WORK ─────────────────────────────────────────────────── */}
      <Section id="work" style={{ paddingTop: 0 }}>
        <ScrollReveal effect="fade-up">
          <div
            className="flex flex-col md:flex-row md:items-end md:justify-between"
            style={{ marginBottom: 64, gap: 24 }}
          >
            <div>
              <Eyebrow label="Work" />
              <h2 style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.92 }}>Proof in<br /><span style={{ color: ACCENT }}>Results.</span></h2>
            </div>
            <a href="/work" style={{ padding: "14px 32px", border: `1px solid ${BORDER}`, borderRadius: 100, fontSize: 14, fontWeight: 600, color: "#fff", flexShrink: 0 }}>View all work →</a>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 20 }}>
          {[
            { tag: "Web Design · Development", title: "Premium brand with a site designed to support qualified lead generation", outcome: "Noticeable improvement in qualified enquiry quality after launch", gradient: "linear-gradient(135deg, #1a1f35 0%, #0d1117 100%)" },
            { tag: "Brand Identity · Web", title: "Full rebrand and launch for a scaling service business", outcome: "Website became primary channel for inbound enquiries post-launch", gradient: `linear-gradient(135deg, rgba(196,84,26,0.22) 0%, #0d1117 100%)` },
          ].map((c, i) => (
            <ScrollReveal key={c.title} effect="fade-up" delay={i * 0.1}><CaseCard {...c} /></ScrollReveal>
          ))}
        </div>
      </Section>

      {/* ── PROCESS ─────────────────────────────── */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <ProcessGlow />
        <FloatingDots />
        <Section id="process" style={{ paddingTop: 40 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(48px, 6vw, 100px)", alignItems: "start" }}>
            <ScrollReveal effect="fade-up">
              <Eyebrow label="Process" />
              <h2 style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.92 }}>How We<br /><span style={{ color: ACCENT }}>Work.</span></h2>
            </ScrollReveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
              {[
                { number: "01", title: "Brief", description: "We learn your business, your goals, and your audience inside out. No guesswork — we build from a clear foundation of what success looks like for you." },
                { number: "02", title: "Design", description: "We craft a visual direction that earns your sign-off fast. You see and approve the full homepage design before a single line of code is written." },
                { number: "03", title: "Build", description: "Clean, fast, secure Next.js code with world-class animations — connected to your GHL CRM and GEO-optimised for AI search from day one." },
                { number: "04", title: "Launch", description: "We handle domain, hosting, analytics, and GEO setup. You go live with a site that works as hard as you do. We don't disappear after launch." },
              ].map((step, i) => (
                <ScrollReveal key={step.number} effect="fade-up" delay={i * 0.05}>
                  <ProcessStep {...step} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </Section>
      </div>

      {/* ── ROTATING TESTIMONIALS ────────────────────────────────── */}
      <RotatingTestimonials />

      {/* ── CONTACT ──────────────────────────────────────────────── */}
      <Section id="contact">
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(40px, 6vw, 80px)", alignItems: "start" }}>
          <ScrollReveal effect="fade-up">
            <Eyebrow label="Get Started" />
            <h2 style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.92, marginBottom: 32 }}>Ready to<br /><span style={{ color: ACCENT }}>Grow?</span></h2>
            <p style={{ color: MUTED, fontSize: 17, lineHeight: 1.7, maxWidth: 380, marginBottom: 48 }}>
              Tell us about your business and what you want to achieve. We&rsquo;ll come back with a clear plan — no fluff, no hard sell.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 48}}>
              {["Response within 24 hours", "Free initial consultation", "No lock-in contracts"].map(text => (
                <div key={text} style={{ display: "flex", gap: 14, alignItems: "center", color: MUTED, fontSize: 15}}>
                  <span style={{ color: ACCENT, fontSize: 10, flexShrink: 0 }}>✦</span>{text}
                </div>
              ))}
            </div>

            <div>
              <p style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, marginBottom: 16 }}>Connect</p>
              <div style={{ display: "flex", gap: 20 }}>
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
            
          </ScrollReveal>

          <GHLBookingWidget
            src="https://link.zip360.co.za/widget/booking/2iYXsaTBfL5b7Y870XVX"
            id="2iYXsaTBfL5b7Y870XVX_home"
            title="Book a Discovery Call"
            defaultHeight={700}
            borderRadius={24}
            border={`1px solid ${BORDER}`}
            background={SURFACE}
            redirectTo="/thank-you"
            deferLoad
          />
        </div>
      </Section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <Footer />

    </main>
  )
}
