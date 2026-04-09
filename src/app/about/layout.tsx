import type { Metadata } from "next"

const OG_IMAGE = "https://assets.cdn.filesafe.space/2YVSGppZ3t1nNSl74HPu/media/6970aa72d4fb90fe7dc9068b.png"
const SITE_URL = "https://www.boldpiq.com"

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
    url: `${SITE_URL}/about`,
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
    canonical: `${SITE_URL}/about`,
  },
}

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About BoldPiq",
  description: "BoldPiq is a South African web design and development agency building high-performance Next.js websites, brand identities, and AI-powered digital solutions for service businesses.",
  url: `${SITE_URL}/about`,
  isPartOf: { "@type": "WebSite", url: SITE_URL, name: "BoldPiq" },
  about: {
    "@type": "Organization",
    name: "BoldPiq",
    url: SITE_URL,
    description: "South African web design, development, and branding agency. Specialists in Next.js, GEO-optimised websites, brand identity, and digital automation.",
    foundingLocation: "South Africa",
    areaServed: ["ZA", "Africa", "International"],
    knowsAbout: [
      "Web Design", "Web Development", "Brand Identity", "Next.js",
      "E-Commerce Development", "GEO Optimisation", "AI Automation", "GoHighLevel CRM",
    ],
    sameAs: [
      "https://www.instagram.com/boldpiq/",
      "https://www.facebook.com/boldpiq",
      "https://www.linkedin.com/company/boldpiq/",
      "https://za.pinterest.com/boldpiq/",
    ],
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
    ],
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2", "p"],
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      {children}
    </>
  )
}
