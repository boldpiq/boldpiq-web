"use client"
import { useState } from "react"
import { motion } from "motion/react"
import { ScrollReveal } from "@/components/scroll/ScrollReveal"
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/layout/Footer"
import { HeroRings, DotGrid, FloatingDots, ScanLine, CornerAccents } from "@/components/ui/BackgroundDecor"

const BG = "#0B0F1C"
const ACCENT = "#C4541A"
const MUTED = "rgba(255,255,255,0.45)"
const BORDER = "rgba(255,255,255,0.08)"

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

const projects = [
  {
    id: 1,
    tag: "Website Development",
    category: "Web",
    client: "White & Sons Panel Beaters",
    title: "Family-owned panel beating & renovation business brought online with a professional, credibility-building presence",
    outcome: "Enhanced brand credibility and improved client inquiries through word-of-mouth referrals",
    image: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/2YVSGppZ3t1nNSl74HPu/media/6899e583ccc96cbf93ffaae8.png",
    testimonial: null,
    caseStudyUrl: "/work/case-whitesons",
  },
  {
    id: 2,
    tag: "Website Design & Development",
    category: "Web",
    client: "Bright Haven Barrydale",
    title: "Warm, child-friendly platform for a neurodiverse youth non-profit — built to drive donations and volunteer sign-ups",
    outcome: "Increased volunteer sign-ups and donations through an accessible, emotive online presence",
    image: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/2YVSGppZ3t1nNSl74HPu/media/6899ec40af2898269f570db8.png",
    testimonial: null,
    caseStudyUrl: "/work/case-bright-haven",
  },
  {
    id: 3,
    tag: "Website Development",
    category: "Web",
    client: "The Cherri Chilli",
    title: "Mobile-first restaurant site with WhatsApp ordering integration and story-driven brand presence",
    outcome: "Seamless ordering experience and a digital presence that matched the quality of the food",
    image: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/2YVSGppZ3t1nNSl74HPu/media/6899d8a51636d2692d99f396.png",
    testimonial: "Her commitment to quality and her ability to capture the spirit of our brand in every aspect of the site… highly recommend her services.",
    caseStudyUrl: "/work/case-the-cherri-chilli",
  },
  {
    id: 4,
    tag: "Website Development",
    category: "Web",
    client: "Net Vir Pret",
    title: "Central communication hub for a community arts & education org — giving sponsors and donors a reason to engage",
    outcome: "Stronger local engagement with 19 students in tertiary education showcased as proof of impact",
    image: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/2YVSGppZ3t1nNSl74HPu/media/6899e8d622c2333c8710e223.png",
    testimonial: "We are very fortunate to have Monique develop a website and would recommend her to anyone.",
    caseStudyUrl: "/work/case-netvirpret",
  },
  {
    id: 5,
    tag: "Logo Design",
    category: "Brand",
    client: "Dr. Eleanor O'Sullivan — EOS Coaching",
    title: "Minimalist EOS initials logo communicating trust, clarity, and professional approachability",
    outcome: "A complete game-changer for my coaching business — visually stunning but also user-friendly.",
    image: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/2YVSGppZ3t1nNSl74HPu/media/6811d86233fee4bdd24943b2.png",
    imageFit: "contain" as const,
    testimonial: "A complete game-changer for my coaching business… visually stunning but also user-friendly.",
    caseStudyUrl: null,
    externalUrl: "https://www.eleanorosullivan.ie/",
  },
  {
    id: 6,
    tag: "Branding & Identity",
    category: "Brand",
    client: "Net Vir Pret",
    title: "Bold typographic WW identity system — two logo concepts built for elegance and instant recall",
    outcome: "Clean, minimal identity that projects professionalism and approachability at first glance",
    image: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/2YVSGppZ3t1nNSl74HPu/media/67a701b82329022f993ccc0a.png",
    imageFit: "contain" as const,
    imageScale: 1.25,
    testimonial: null,
    caseStudyUrl: null,
  },
]

const promoVideos = [
  { id: "9rOgtJE02DQ", thumb: "https://img.youtube.com/vi/9rOgtJE02DQ/maxresdefault.jpg" },
  { id: "rfIz2HxMitE", thumb: "https://img.youtube.com/vi/rfIz2HxMitE/maxresdefault.jpg" },
  { id: "3f91eR62eFc", thumb: "https://img.youtube.com/vi/3f91eR62eFc/maxresdefault.jpg" },
  { id: "AJlNGTXM-NE", thumb: "https://img.youtube.com/vi/AJlNGTXM-NE/maxresdefault.jpg" },
]

const filters = ["All", "Web", "Brand"]

export default function WorkPage() {
  const [active, setActive] = useState("All")
  const filtered = active === "All" ? projects : projects.filter(p => p.category === active)

  return (
    <main style={{ background: BG, color: "#fff", minHeight: "100vh" }}>

      {/* HERO */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <motion.div
          animate={{ opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse 80% 65% at 84% 26%, rgba(196,84,26,0.40) 0%, transparent 64%)` }}
        />
        <HeroRings side="right" />
        <DotGrid />
        <FloatingDots />
        <ScanLine />
        <CornerAccents />
        <section style={{ padding: "clamp(100px, 18vw, 160px) clamp(20px, 4vw, 48px) 60px", maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <ScrollReveal effect="fade-up">
            <Eyebrow label="Our Work" />
            <h1 style={{ fontSize: "clamp(48px, 8vw, 120px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.88, marginBottom: 40 }}>
              Proof in<br /><span style={{ color: ACCENT }}>Results.</span>
            </h1>
            <p style={{ fontSize: "clamp(16px, 1.4vw, 20px)", color: MUTED, maxWidth: 560, lineHeight: 1.65 }}>
              Real clients. Real outcomes. Every project measured against one thing — does it grow the business?
            </p>
          </ScrollReveal>

          {/* Filter tabs */}
          <ScrollReveal effect="fade-up" delay={0.1}>
            <div style={{ display: "flex", gap: 12, marginTop: 56, flexWrap: "wrap" }}>
              {filters.map(f => (
                <motion.button
                  key={f}
                  onClick={() => setActive(f)}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    padding: "10px 28px",
                    borderRadius: 100,
                    border: `1px solid ${active === f ? ACCENT : BORDER}`,
                    background: active === f ? ACCENT : "transparent",
                    color: active === f ? "#fff" : MUTED,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    letterSpacing: "-0.01em",
                    transition: "all 0.2s ease",
                  }}
                >
                  {f}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>
        </section>
      </div>

      {/* PROJECT GRID */}
      <section style={{ padding: "0 clamp(20px, 4vw, 48px) clamp(60px, 8vw, 100px)", maxWidth: 1400, margin: "0 auto" }}>
        {active === "All" ? (
          <>
            {[{ label: "Website Projects", cat: "Web" }, { label: "Branding & Identity", cat: "Brand" }].map(group => {
              const groupProjects = projects.filter(p => p.category === group.cat)
              return (
                <div key={group.cat} style={{ marginBottom: 64 }}>
                  <ScrollReveal effect="fade-right">
                    <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
                      <span style={{ width: 32, height: 1, background: ACCENT, flexShrink: 0 }} />
                      <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED }}>{group.label}</span>
                      <span style={{ flex: 1, height: 1, background: BORDER }} />
                    </div>
                  </ScrollReveal>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 16 }}>
                    {groupProjects.map((p, i) => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.06 }}
                      >
                        <ProjectCard project={p} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )
            })}
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 16 }}>
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* PROMO VIDEOS */}
      {(active === "All" || active === "Web") && (
        <section style={{ padding: "0 clamp(20px, 4vw, 48px) clamp(80px, 10vw, 120px)", maxWidth: 1400, margin: "0 auto" }}>
          <ScrollReveal effect="fade-up">
            <div style={{ marginBottom: 40 }}>
              <Eyebrow label="Promo Videos" />
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 52px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.92 }}>
                See the work<br /><span style={{ color: ACCENT }}>in action.</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 20 }}>
            {promoVideos.map((v, i) => (
              <ScrollReveal key={v.id} effect="fade-up" delay={i * 0.08}>
                <VideoCard videoId={v.id} thumb={v.thumb} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <div style={{ borderTop: `1px solid ${BORDER}`, padding: "clamp(60px, 8vw, 100px) clamp(20px, 4vw, 48px)" }}>
        <ScrollReveal effect="fade-up">
          <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 40 }}>
            <div>
              <h2 style={{ fontSize: "clamp(32px, 4vw, 60px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.92, marginBottom: 16 }}>
                Want results<br /><span style={{ color: ACCENT }}>like these?</span>
              </h2>
              <p style={{ color: MUTED, fontSize: 16, maxWidth: 400, lineHeight: 1.65 }}>
                Tell us about your business and we&rsquo;ll show you exactly how we&rsquo;d approach it.
              </p>
            </div>
            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.04, background: "#D4601F" }}
                whileTap={{ scale: 0.97 }}
                style={{ padding: "18px 48px", background: ACCENT, color: "#fff", borderRadius: 100, fontWeight: 700, fontSize: 16, letterSpacing: "-0.01em", cursor: "pointer" }}
              >
                Start a Project
              </motion.div>
            </Link>
          </div>
        </ScrollReveal>
      </div>

      <Footer />
    </main>
  )
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [hovered, setHovered] = useState(false)

  const card = (
    <motion.div
      animate={{ scale: hovered ? 1.015 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      style={{ borderRadius: 20, overflow: "hidden", background: "#111520", border: `1px solid ${BORDER}`, display: "flex", flexDirection: "column" }}
    >
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden", background: "#0d1117" }}>
        <Image
          src={project.image}
          alt={project.client}
          fill
          style={{ objectFit: project.imageFit ?? "cover", objectPosition: project.imageFit === "contain" ? "center" : "top", transition: "transform 0.5s ease", transform: `scale(${hovered ? (project.imageScale ?? 1) * 1.04 : (project.imageScale ?? 1)})` }}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(11,15,28,0.5) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(196,84,26,0.22)", mixBlendMode: "multiply" }} />
      </div>

      <div style={{ padding: "16px 20px 20px", display: "flex", flexDirection: "column", gap: 8, flexGrow: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: 100, background: "rgba(255,255,255,0.06)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED }}>{project.tag}</span>
          {(project.caseStudyUrl || project.externalUrl) && (
            <span style={{ fontSize: 12, color: ACCENT, fontWeight: 600, opacity: hovered ? 1 : 0, transition: "opacity 0.2s ease" }}>
              {project.caseStudyUrl ? "Case Study →" : "Visit Site →"}
            </span>
          )}
        </div>
        <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginTop: 4 }}>{project.client}</p>
        <h3 style={{ fontSize: "clamp(14px, 1.1vw, 17px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.25 }}>{project.title}</h3>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "flex-start", gap: 10 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT, flexShrink: 0, marginTop: 5, display: "inline-block" }} />
          {project.outcome}
        </p>
        {project.testimonial && (
          <p style={{ fontSize: 13, color: MUTED, fontStyle: "italic", borderLeft: `2px solid ${ACCENT}`, paddingLeft: 12, marginTop: 4, lineHeight: 1.6 }}>
            &ldquo;{project.testimonial}&rdquo;
          </p>
        )}
      </div>
    </motion.div>
  )

  if (project.caseStudyUrl) {
    return (
      <Link href={project.caseStudyUrl} style={{ display: "block", textDecoration: "none", color: "#fff" }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {card}
      </Link>
    )
  }
  if (project.externalUrl) {
    return (
      <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none", color: "#fff" }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {card}
      </a>
    )
  }
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {card}
    </div>
  )
}

function VideoCard({ videoId, thumb }: { videoId: string; thumb: string }) {
  const [playing, setPlaying] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${BORDER}`, background: "#111520", cursor: "pointer" }}
      onClick={() => setPlaying(true)}
    >
      {playing ? (
        <iframe
          width="100%"
          style={{ aspectRatio: "16/9", display: "block", border: "none" }}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
          <Image
            src={thumb}
            alt="Promo video"
            fill
            style={{ objectFit: "cover", transition: "transform 0.4s ease", transform: hovered ? "scale(1.03)" : "scale(1)" }}
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <motion.div
              animate={{ scale: hovered ? 1.1 : 1 }}
              style={{
                width: 64, height: 64, borderRadius: "50%",
                background: ACCENT,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 24px rgba(196,84,26,0.5)",
              }}
            >
              <span style={{ fontSize: 22, marginLeft: 4 }}>▶</span>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  )
}
