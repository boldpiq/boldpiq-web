import type { Metadata } from "next"

const OG_IMAGE = "https://assets.cdn.filesafe.space/2YVSGppZ3t1nNSl74HPu/media/6970aa72d4fb90fe7dc9068b.png"

export const metadata: Metadata = {
  title: "About Boldpiq — The Team Behind Your Digital Growth",
  description: "Meet the Boldpiq team. We're a South African web design and branding agency passionate about crafting stunning digital experiences designed to support real business growth.",
  keywords: [
    "about Boldpiq", "Boldpiq team", "South African web design agency",
    "web design studio Cape Town", "creative agency South Africa",
    "web design agency about us", "digital agency South Africa",
  ],
  openGraph: {
    title: "About Boldpiq — South African Web Design Agency",
    description: "We're a passionate South African agency crafting high-performance websites and stunning brand identities.",
    url: "https://www.boldpiq.com/about",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "About Boldpiq — Web Design Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Boldpiq — South African Web Design Agency",
    description: "Meet the passionate team behind Boldpiq's high-performance websites and brand identities.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: "https://www.boldpiq.com/about",
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
