import type { Metadata } from "next"

const OG_IMAGE = "https://assets.cdn.filesafe.space/2YVSGppZ3t1nNSl74HPu/media/6970aa72d4fb90fe7dc9068b.png"

export const metadata: Metadata = {
  title: "Our Work — Web Design & Brand Projects Portfolio",
  description: "Browse Boldpiq's portfolio of web design, development, and branding projects. Work delivered for real businesses across South Africa and beyond.",
  keywords: [
    "Boldpiq portfolio", "web design portfolio South Africa",
    "brand identity portfolio", "e-commerce design portfolio",
    "web design case studies", "Boldpiq work", "website examples South Africa",
    "creative portfolio web design", "branding portfolio Cape Town",
  ],
  openGraph: {
    title: "Our Work — Web Design Portfolio | Boldpiq",
    description: "Web design, development, and brand identity projects — a portfolio of real work delivered.",
    url: "https://www.boldpiq.com/work",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Boldpiq Portfolio — Web Design Projects" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work — Web Design Portfolio | Boldpiq",
    description: "Real projects, real clients — browse Boldpiq's portfolio.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: "https://www.boldpiq.com/work",
  },
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
