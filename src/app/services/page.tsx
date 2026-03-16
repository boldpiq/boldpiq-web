"use client"
import { useState } from "react"
import { motion } from "motion/react"
import { ScrollReveal } from "@/components/scroll/ScrollReveal"
import Link from "next/link"
import { Footer } from "@/components/layout/Footer"

const BG = "#0B0F1C"
const ACCENT = "#C4541A"
const MUTED = "rgba(255,255,255,0.45)"
const SURFACE = "rgba(255,255,255,0.05)"
const BORDER = "rgba(255,255,255,0.08)"

function Eyebrow({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 32 }}>
      <span style={{ width: 32, height: 1, background: ACCENT, flexShrink: 0 }} />
      <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED }}>{label}</span>
    </div>
  )
}

const services = [
  {
    number: "01",
    title: "Web Design",
    tagline: "Award-worthy design that earns the click.",
    description: "We design websites that stop your audience mid-scroll and make your brand feel undeniably premium. Every design is purpose-built around your audience, goals, and the action you need them to take.",
    deliverables: ["Full homepage design in Figma", "Mobile-first responsive layouts", "Motion & interaction design", "Component design system", "Design sign-off before any code"],
    tags: ["UI/UX", "Figma", "Motion Design", "Responsive", "Design Systems"],
    outcome: "Brands that look like they charge more — because they do.",
  },
  {
    number: "02",
    title: "Web Development",
    tagline: "Fast, secure, built to scale.",
    description: "We build in Next.js — the same stack used by the world's fastest websites. Your site loads fast, and is connected to your GHL CRM from day one.",
    deliverables: ["Next.js + TypeScript codebase", "Sanity CMS integration", "GHL CRM form connections", "Core Web Vitals optimised", "GEO-optimised for AI search (ChatGPT, Perplexity)"],
    tags: ["Next.js", "TypeScript", "Vercel", "Sanity CMS", "GHL", "GEO"],
    outcome: "Sites that rank, load fast, and work on every device.",
  },
  {
    number: "03",
    title: "Brand Identity",
    tagline: "A visual system that commands attention.",
    description: "Before anyone reads your headline, they've already judged your brand. We build visual identities that signal quality instantly — logo, typography, colour palette, and full brand guidelines your team can actually use.",
    deliverables: ["Logo design (primary + lockups)", "Typography system", "Colour palette with usage rules", "Brand guidelines PDF", "Social media & digital asset templates"],
    tags: ["Logo Design", "Typography", "Colour System", "Brand Guidelines", "Digital Assets"],
    outcome: "A brand that attracts premium clients without saying a word.",
  },
]

const faqs = [
  { q: "How long does a project take?", a: "Most websites are live within 6 weeks of the brief. Brand identity projects typically run 2–3 weeks. Timelines are agreed upfront — we don't move goalposts." },
  { q: "Do you work with businesses outside South Africa?", a: "Yes. We work with clients across Australia, the UK, US, and beyond. All projects are managed remotely with clear communication every step of the way." },
  { q: "What do you need from me to get started?", a: "A brief call to understand your business, goals, and audience. We handle the rest and come back with a clear plan before any money changes hands." },
  { q: "Will I own the website and brand assets?", a: "Absolutely. Everything we create is yours — full ownership of all files, code, and assets. No lock-in, no ongoing licence fees." },
  { q: "Can you connect my website to my existing tools?", a: "Yes. We integrate with GHL CRM, Calendly, booking software, and most major tools. Ask us about your specific stack." },
]

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main style={{ background: BG, color: "#fff", minHeight: "100vh" }}>

      {/* HERO */}
      <section style={{ padding: "clamp(100px, 18vw, 160px) clamp(20px, 4vw, 48px) 60px", maxWidth: 1400, margin: "0 auto", position: "relative", overflow: "hidden" }}>
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse 60% 50% at 80% 30%, rgba(196,84,26,0.20) 0%, transparent 68%)` }}
        />
        <ScrollReveal effect="fade-up">
          <Eyebrow label="Services" />
          <h1 style={{ fontSize: "clamp(48px, 8vw, 120px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.88, marginBottom: 40 }}>
            What We<br /><span style={{ color: ACCENT }}>Build.</span>
          </h1>
          <p style={{ fontSize: "clamp(16px, 1.4vw, 20px)", color: MUTED, maxWidth: 560, lineHeight: 1.65 }}>
            Three core services. Every one designed to produce measurable growth — not just a deliverable to tick off a list.
          </p>
        </ScrollReveal>
      </section>

      {/* SERVICE CARDS */}
      <section style={{ padding: "0 clamp(20px, 4vw, 48px)", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {services.map((s, i) => (
            <ScrollReveal key={s.number} effect="fade-up" delay={i * 0.08}>
              <ServiceRow service={s} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* INCLUDED IN EVERY PROJECT */}
      <section style={{ padding: "clamp(60px, 8vw, 100px) clamp(20px, 4vw, 48px)", maxWidth: 1400, margin: "0 auto" }}>
        <ScrollReveal effect="fade-up">
          <div style={{ padding: "clamp(32px, 4vw, 64px)", border: `1px solid ${BORDER}`, borderRadius: 24, background: SURFACE }}>
            <Eyebrow label="Always included" />
            <h2 style={{ fontSize: "clamp(28px, 3vw, 48px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 48 }}>
              Standard on every<br /><span style={{ color: ACCENT }}>BoldPiq project.</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3" style={{ gap: 32 }}>
              {[
                { icon: "⚡", title: "Fast load times", desc: "Optimised for speed on every device." },
                { icon: "📱", title: "Mobile-first design", desc: "Pixel-perfect on every screen, every browser." },
                { icon: "🔒", title: "Security hardened", desc: "CSP headers, HTTPS, no exposed secrets — ever." },
                { icon: "🤖", title: "GEO optimised", desc: "Structured to be cited by ChatGPT, Perplexity, and Google AI." },
                { icon: "📊", title: "Analytics ready", desc: "Privacy-first analytics installed and verified before launch." },
                { icon: "🚀", title: "30-day post-launch support", desc: "We stay available after go-live. No disappearing act." },
              ].map((item, i) => (
                <ScrollReveal key={item.title} effect="fade-up" delay={i * 0.06}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    style={{ cursor: "default" }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      style={{ fontSize: 28, marginBottom: 12, display: "inline-block" }}
                    >{item.icon}</motion.div>
                    <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{item.title}</p>
                    <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ */}
      <section style={{ padding: "0 clamp(20px, 4vw, 48px) clamp(60px, 8vw, 100px)", maxWidth: 800, margin: "0 auto" }}>
        <ScrollReveal effect="fade-up">
          <Eyebrow label="FAQ" />
          <h2 style={{ fontSize: "clamp(28px, 3vw, 48px)", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 48 }}>
            Common<br /><span style={{ color: ACCENT }}>questions.</span>
          </h2>
        </ScrollReveal>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} effect="fade-up" delay={i * 0.05}>
              <div style={{ borderBottom: `1px solid ${BORDER}` }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", textAlign: "left", padding: "24px 0", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, fontFamily: "inherit" }}
                >
                  <span style={{ fontSize: "clamp(16px, 1.2vw, 18px)", fontWeight: 600, color: "#fff" }}>{faq.q}</span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    style={{ fontSize: 24, color: ACCENT, flexShrink: 0, display: "block", lineHeight: 1 }}
                  >
                    +
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  style={{ overflow: "hidden" }}
                >
                  <p style={{ color: MUTED, fontSize: 16, lineHeight: 1.7, paddingBottom: 24 }}>{faq.a}</p>
                </motion.div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div style={{ borderTop: `1px solid ${BORDER}`, padding: "clamp(60px, 8vw, 100px) clamp(20px, 4vw, 48px)" }}>
        <ScrollReveal effect="scale">
          <div style={{ maxWidth: 1400, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(36px, 5vw, 80px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.92, marginBottom: 32 }}>
              Ready to<br /><span style={{ color: ACCENT }}>get started?</span>
            </h2>
            <p style={{ color: MUTED, fontSize: 18, maxWidth: 480, margin: "0 auto 48px", lineHeight: 1.65 }}>
              Tell us about your business. We&rsquo;ll come back with a clear plan — no fluff, no hard sell.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
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

function ServiceRow({ service, index }: { service: typeof services[0]; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ border: `1px solid ${BORDER}`, borderRadius: 20, overflow: "hidden", marginBottom: 12 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: "clamp(28px, 3vw, 44px) clamp(24px, 3vw, 40px)" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
          <div style={{ textAlign: "left" }}>
            <p style={{ fontSize: 11, letterSpacing: "0.15em", color: MUTED, textTransform: "uppercase", marginBottom: 8 }}>{service.number}</p>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 56px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#fff", margin: 0 }}>{service.title}</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <p className="hidden md:block" style={{ color: MUTED, fontSize: 16, maxWidth: 320, textAlign: "right" }}>{service.tagline}</p>
            <motion.div
              animate={{ rotate: open ? 45 : 0 }}
              style={{ width: 48, height: 48, borderRadius: "50%", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: ACCENT, flexShrink: 0 }}
            >
              +
            </motion.div>
          </div>
        </div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0 }}
        style={{ overflow: "hidden" }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: 48, padding: "clamp(24px, 3vw, 40px) clamp(24px, 3vw, 40px) clamp(28px, 3vw, 44px)", borderTop: `1px solid ${BORDER}` }}
        >
          <div>
            <p style={{ color: MUTED, fontSize: 16, lineHeight: 1.75, marginBottom: 32 }}>{service.description}</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: ACCENT, fontStyle: "italic" }}>&ldquo;{service.outcome}&rdquo;</p>
          </div>
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, marginBottom: 20 }}>Deliverables</p>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {service.deliverables.map(d => (
                <li key={d} style={{ display: "flex", gap: 12, alignItems: "flex-start", color: "#fff", fontSize: 15 }}>
                  <span style={{ color: ACCENT, marginTop: 2, flexShrink: 0 }}>✦</span>{d}
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {service.tags.map(t => (
                <span key={t} style={{ padding: "4px 14px", borderRadius: 100, border: `1px solid ${BORDER}`, fontSize: 12, color: MUTED }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
