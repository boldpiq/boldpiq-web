"use client"
import { type ReactNode } from "react"

interface PageTransitionProps {
  children: ReactNode
  variant?: string
}

export function PageTransition({ children }: PageTransitionProps) {
  return <>{children}</>
}
