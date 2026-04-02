import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Disclaimers",
  description: "Legal disclaimers for BoldPiq's website, services, and content — including limitations of liability, third-party links, and professional advice.",
  openGraph: {
    title: "Disclaimers | BoldPiq",
    description: "Legal disclaimers governing the use of BoldPiq's website and services.",
    url: "https://www.boldpiq.com/disclaimers",
  },
  alternates: {
    canonical: "https://www.boldpiq.com/disclaimers",
  },
}

export default function DisclaimersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
