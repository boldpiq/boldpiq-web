import type { Metadata } from "next"

const OG_IMAGE = "https://assets.cdn.filesafe.space/2YVSGppZ3t1nNSl74HPu/media/6970aa72d4fb90fe7dc9068b.png"
const SITE_URL = "https://www.boldpiq.com"

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
    url: `${SITE_URL}/work`,
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
    canonical: `${SITE_URL}/work`,
  },
}

const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "BoldPiq Portfolio — Web Design & Branding Projects",
  description: "A portfolio of web design, development, and brand identity projects delivered by BoldPiq for businesses across South Africa.",
  url: `${SITE_URL}/work`,
  isPartOf: { "@type": "WebSite", url: SITE_URL, name: "BoldPiq" },
  hasPart: [
    {
      "@type": "WebPage",
      name: "Whitesons Case Study",
      url: `${SITE_URL}/work/case-whitesons`,
      description: "Website redesign and branding project for Whitesons.",
    },
    {
      "@type": "WebPage",
      name: "Bright Haven Case Study",
      url: `${SITE_URL}/work/case-bright-haven`,
      description: "Full website build and digital presence for Bright Haven.",
    },
    {
      "@type": "WebPage",
      name: "Netvirpret Case Study",
      url: `${SITE_URL}/work/case-netvirpret`,
      description: "Website and digital presence build for Netvirpret.",
    },
    {
      "@type": "WebPage",
      name: "The Cherri Chilli Case Study",
      url: `${SITE_URL}/work/case-the-cherri-chilli`,
      description: "E-commerce and brand identity for The Cherri Chilli.",
    },
  ],
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/work` },
    ],
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2"],
  },
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }} />
      {children}
    </>
  )
}
