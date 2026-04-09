import type { Metadata } from "next"

const OG_IMAGE = "https://assets.cdn.filesafe.space/2YVSGppZ3t1nNSl74HPu/media/6970aa72d4fb90fe7dc9068b.png"
const SITE_URL = "https://www.boldpiq.com"

export const metadata: Metadata = {
  title: "What to Expect | Working With BoldPiq",
  description: "Here's exactly what happens when you work with BoldPiq — from discovery call to launch day. A clear four-step process: Discovery, Design & Build, Review, and Handover.",
  keywords: [
    "what to expect web design agency", "web design process South Africa",
    "how web design works", "website project process",
    "BoldPiq client process", "web design timeline South Africa",
    "how to get a website built", "website development process explained",
  ],
  openGraph: {
    title: "What to Expect When Working With BoldPiq",
    description: "A clear, four-step process from discovery call to launch day. No surprises — just honest work delivered on time.",
    url: `${SITE_URL}/what-to-expect`,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "BoldPiq Client Process — What to Expect" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "What to Expect When Working With BoldPiq",
    description: "A clear four-step process from discovery to launch. Here's exactly how it works.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/what-to-expect`,
  },
}

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How BoldPiq Delivers Your Website Project",
  description: "BoldPiq follows a clear four-step process to deliver high-performance websites and digital solutions for service businesses in South Africa.",
  url: `${SITE_URL}/what-to-expect`,
  image: OG_IMAGE,
  totalTime: "P21D",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Discovery Call",
      text: "We start with a short call to understand your goals, brand, and timeline. No jargon — just a real conversation about what you need.",
      url: `${SITE_URL}/what-to-expect#discovery`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Design & Build",
      text: "Our team designs and builds your solution. You receive progress updates so you are never left in the dark.",
      url: `${SITE_URL}/what-to-expect#design`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Review & Refine",
      text: "We present the work for your feedback. You get revision rounds to make sure everything feels exactly right before going live.",
      url: `${SITE_URL}/what-to-expect#review`,
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Launch & Handover",
      text: "We launch your project and hand everything over — credentials, assets, and guides. You are fully equipped and ready to grow.",
      url: `${SITE_URL}/what-to-expect#launch`,
    },
  ],
}

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "What to Expect | BoldPiq",
  description: "A clear four-step overview of the BoldPiq client process — from discovery call to launch and handover.",
  url: `${SITE_URL}/what-to-expect`,
  isPartOf: { "@type": "WebSite", url: SITE_URL, name: "BoldPiq" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "What to Expect", item: `${SITE_URL}/what-to-expect` },
    ],
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2", "p"],
  },
}

export default function WhatToExpectLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      {children}
    </>
  )
}
