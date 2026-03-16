"use client"
import { motion } from "motion/react"

// ── Rotating concentric rings ─────────────────────────────────────────────
export function HeroRings({ side = "right" }: { side?: "left" | "right" }) {
  const isRight = side === "right"
  const outer  = isRight ? { right: "-20%", left: "auto" as const } : { left: "-20%", right: "auto" as const }
  const mid    = isRight ? { right: "-8%",  left: "auto" as const } : { left: "-8%",  right: "auto" as const }
  const inner  = isRight ? { right: "2%",   left: "auto" as const } : { left: "2%",   right: "auto" as const }
  const dot    = isRight ? { right: "16%",  left: "auto" as const } : { left: "16%",  right: "auto" as const }
  const cross  = isRight ? { right: "32%",  left: "auto" as const } : { left: "32%",  right: "auto" as const }

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>

      {/* Outer ring — slow spin */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute", top: "-28%", ...outer,
          width: "68vw", height: "68vw",
          maxWidth: 920, maxHeight: 920,
          borderRadius: "50%",
          border: "1px solid rgba(196,84,26,0.16)",
        }}
      />

      {/* Middle ring — reverse spin */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute", top: "-12%", ...mid,
          width: "48vw", height: "48vw",
          maxWidth: 660, maxHeight: 660,
          borderRadius: "50%",
          border: "1px solid rgba(196,84,26,0.28)",
        }}
      />

      {/* Inner ring — spin + breathe */}
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.06, 1] }}
        transition={{
          rotate: { duration: 38, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{
          position: "absolute", top: "2%", ...inner,
          width: "26vw", height: "26vw",
          maxWidth: 370, maxHeight: 370,
          borderRadius: "50%",
          border: "1px solid rgba(196,84,26,0.44)",
          boxShadow: "0 0 40px rgba(196,84,26,0.10), inset 0 0 40px rgba(196,84,26,0.05)",
        }}
      />

      {/* Glowing accent dot orbiting the inner ring */}
      <motion.div
        animate={{ y: [0, -22, 0], opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: "26%", ...dot,
          width: 8, height: 8,
          borderRadius: "50%",
          background: "#C4541A",
          boxShadow: "0 0 18px 4px rgba(196,84,26,0.7)",
        }}
      />

      {/* Animated plus / cross */}
      <motion.div
        animate={{ rotate: [0, 90, 0], opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ position: "absolute", top: "19%", ...cross, width: 18, height: 18 }}
      >
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "rgba(196,84,26,0.7)", transform: "translateY(-50%)" }} />
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "rgba(196,84,26,0.7)", transform: "translateX(-50%)" }} />
      </motion.div>

      {/* Second smaller cross */}
      <motion.div
        animate={{ rotate: [45, 135, 45], opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        style={{ position: "absolute", top: "55%", ...dot, marginRight: 80, width: 12, height: 12 }}
      >
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "rgba(196,84,26,0.6)", transform: "translateY(-50%)" }} />
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "rgba(196,84,26,0.6)", transform: "translateX(-50%)" }} />
      </motion.div>

    </div>
  )
}

// ── Subtle dot grid ───────────────────────────────────────────────────────
export function DotGrid() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.075) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 0%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 0%, transparent 100%)",
      }}
    />
  )
}

// ── Floating small orange dots scattered in section ───────────────────────
export function FloatingDots() {
  const dots: { x: string; y: string; size: number; delay: number; dur: number }[] = [
    { x: "7%",  y: "22%", size: 4, delay: 0,   dur: 7  },
    { x: "13%", y: "68%", size: 3, delay: 1.8, dur: 9  },
    { x: "80%", y: "72%", size: 5, delay: 0.6, dur: 6  },
    { x: "90%", y: "38%", size: 3, delay: 3.2, dur: 8  },
    { x: "46%", y: "84%", size: 3, delay: 2.1, dur: 11 },
    { x: "62%", y: "15%", size: 4, delay: 4.0, dur: 7  },
  ]
  return (
    <>
      {dots.map((d, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: d.dur, repeat: Infinity, ease: "easeInOut", delay: d.delay }}
          style={{
            position: "absolute",
            left: d.x, top: d.y,
            width: d.size, height: d.size,
            borderRadius: "50%",
            background: "rgba(196,84,26,0.85)",
            boxShadow: "0 0 8px rgba(196,84,26,0.5)",
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  )
}

// ── Horizontal scan line that sweeps through a section periodically ───────
export function ScanLine() {
  return (
    <motion.div
      initial={{ top: "110%" }}
      animate={{ top: ["-5%", "110%"] }}
      transition={{ duration: 6, repeat: Infinity, repeatDelay: 10, ease: "linear" }}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        height: 1,
        background: "linear-gradient(90deg, transparent 0%, rgba(196,84,26,0.5) 30%, rgba(196,84,26,0.8) 50%, rgba(196,84,26,0.5) 70%, transparent 100%)",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  )
}

// ── Corner accent lines ───────────────────────────────────────────────────
export function CornerAccents() {
  const corner = {
    position: "absolute" as const,
    pointerEvents: "none" as const,
    width: 40,
    height: 40,
  }
  const line = {
    position: "absolute" as const,
    background: "rgba(196,84,26,0.5)",
  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1] }}
        transition={{ duration: 1.2, delay: 0.6 }}
        style={{ ...corner, top: 24, left: 24 }}
      >
        <div style={{ ...line, top: 0, left: 0, width: 2, height: "100%" }} />
        <div style={{ ...line, top: 0, left: 0, height: 2, width: "100%" }} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1] }}
        transition={{ duration: 1.2, delay: 0.8 }}
        style={{ ...corner, top: 24, right: 24 }}
      >
        <div style={{ ...line, top: 0, right: 0, width: 2, height: "100%" }} />
        <div style={{ ...line, top: 0, right: 0, height: 2, width: "100%" }} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1] }}
        transition={{ duration: 1.2, delay: 1.0 }}
        style={{ ...corner, bottom: 24, left: 24 }}
      >
        <div style={{ ...line, bottom: 0, left: 0, width: 2, height: "100%" }} />
        <div style={{ ...line, bottom: 0, left: 0, height: 2, width: "100%" }} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1] }}
        transition={{ duration: 1.2, delay: 1.2 }}
        style={{ ...corner, bottom: 24, right: 24 }}
      >
        <div style={{ ...line, bottom: 0, right: 0, width: 2, height: "100%" }} />
        <div style={{ ...line, bottom: 0, right: 0, height: 2, width: "100%" }} />
      </motion.div>
    </>
  )
}
