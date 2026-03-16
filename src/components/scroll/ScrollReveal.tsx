"use client"
import { useState, useEffect, type ReactNode } from "react"
import { motion, type Variants } from "motion/react"

type Effect = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "clip-up" | "clip-down" | "scale" | "blur" | "rotate"

interface ScrollRevealProps {
  children: ReactNode
  effect?: Effect
  delay?: number
  distance?: number
  once?: boolean
  threshold?: number
  className?: string
}

function getVariants(effect: Effect, distance: number): Variants {
  const transition = { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }
  const map: Record<Effect, Variants> = {
    "fade-up":    { hidden: { opacity: 0, y: distance },    visible: { opacity: 1, y: 0, transition } },
    "fade-down":  { hidden: { opacity: 0, y: -distance },   visible: { opacity: 1, y: 0, transition } },
    "fade-left":  { hidden: { opacity: 0, x: distance },    visible: { opacity: 1, x: 0, transition } },
    "fade-right": { hidden: { opacity: 0, x: -distance },   visible: { opacity: 1, x: 0, transition } },
    "clip-up":    { hidden: { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }, visible: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, transition } },
    "clip-down":  { hidden: { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 }, visible: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, transition } },
    "scale":      { hidden: { opacity: 0, scale: 0.85 },    visible: { opacity: 1, scale: 1, transition } },
    "blur":       { hidden: { opacity: 0, filter: "blur(16px)" }, visible: { opacity: 1, filter: "blur(0px)", transition } },
    "rotate":     { hidden: { opacity: 0, rotate: -6, y: distance }, visible: { opacity: 1, rotate: 0, y: 0, transition } },
  }
  return map[effect]
}

export function ScrollReveal({
  children,
  effect = "fade-up",
  delay = 0,
  distance = 32,
  once = true,
  threshold = 0.1,
  className,
}: ScrollRevealProps) {
  // On touch devices (Safari iOS, Android) IntersectionObserver is unreliable.
  // Skip it entirely — animate straight to visible on mount instead.
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches)
  }, [])

  const variants = getVariants(effect, distance)

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      // Touch: animate to visible immediately (no IO needed)
      // Desktop: reveal on scroll via viewport intersection
      animate={isTouch ? "visible" : undefined}
      whileInView={isTouch ? undefined : "visible"}
      viewport={isTouch ? undefined : { once, amount: threshold, margin: "0px 0px -40px 0px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
