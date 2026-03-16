"use client"
import { createContext, useContext, useEffect, useRef, type ReactNode } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

interface LenisProviderProps {
  children: ReactNode
  duration?: number       // scroll duration (default 1.2)
  easing?: (t: number) => number
  disabled?: boolean      // e.g. on mobile if preferred
}

export function LenisProvider({
  children,
  duration = 1.2,
  easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  disabled = false,
}: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (disabled) return
    if (window.matchMedia("(pointer: coarse)").matches) return

    const lenis = new Lenis({ duration, easing })
    lenisRef.current = lenis

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [duration, easing, disabled])

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  )
}
