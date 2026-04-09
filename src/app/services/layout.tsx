import type { Metadata } from "next"

const OG_IMAGE = "https://assets.cdn.filesafe.space/2YVSGppZ3t1nNSl74HPu/media/6970aa72d4fb90fe7dc9068b.png"
const SITE_URL = "https://www.boldpiq.com"

export const metadata: Metadata = {
  title: "Web Design, Development & Branding Services",
  description: "Explore Boldpiq's full range of services — custom web design, Next.js development, brand identity, e-commerce, and GEO-optimised digital experiences for businesses across South Africa.",
  keywords: [
    "web design services South Africa", "web development services Cape Town",
    "brand identity design South Africa", "e-commerce development services",
    "Next.js web development", "UI/UX design services South Africa",
    "GEO optimised web design", "Boldpiq services",
    "logo design South Africa", "Shopify development South Africa",
  ],
  openGraph: {
    title: "Web Design, Development & Branding Services | Boldpiq",
    description: "Custom web design, development, and brand identity — built for businesses that refuse to blend in.",
    url: `${SITE_URL}/services`,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Boldpiq Web Design & Development Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design, Development & Branding Services | Boldpiq",
    description: "Custom web design, development, and brand identity for South African businesses.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
}

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "BoldPiq Services",
  description: "Full range of web design, development, and branding services offered by BoldPiq for service businesses across South Africa.",
  url: `${SITE_URL}/services`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: "Web Design",
        description: "Custom UI/UX design with responsive layouts, motion design, and conversion-focused architecture. Built to perform on all devices.",
        provider: { "@type": "Organization", name: "BoldPiq", url: SITE_URL },
        areaServed: "ZA",
        url: `${SITE_URL}/services`,
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "Web Development",
        description: "Next.js 15 development optimised for Core Web Vitals, AI search (GEO), and production security. Fast, scalable, and maintainable.",
        provider: { "@type": "Organization", name: "BoldPiq", url: SITE_URL },
        areaServed: "ZA",
        url: `${SITE_URL}/services`,
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        name: "Brand Identity",
        description: "Full visual identity systems: logo design, typography, colour palette, brand guidelines, and print-ready assets.",
        provider: { "@type": "Organization", name: "BoldPiq", url: SITE_URL },
        areaServed: "ZA",
        url: `${SITE_URL}/services`,
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Service",
        name: "E-Commerce Development",
        description: "Custom Shopify and headless e-commerce solutions optimised for South African payment gateways and international buyers.",
        provider: { "@type": "Organization", name: "BoldPiq", url: SITE_URL },
        areaServed: "ZA",
        url: `${SITE_URL}/services`,
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "Service",
        name: "AI & Automation",
        description: "GoHighLevel CRM setup, email/SMS automations, AI chatbots, and pipeline automation for service businesses.",
        provider: { "@type": "Organization", name: "BoldPiq", url: SITE_URL },
        areaServed: "ZA",
        url: `${SITE_URL}/services`,
      },
    },
  ],
}

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Services | BoldPiq",
  description: "Web design, development, brand identity, e-commerce, and AI automation services by BoldPiq for South African businesses.",
  url: `${SITE_URL}/services`,
  isPartOf: { "@type": "WebSite", url: SITE_URL, name: "BoldPiq" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
    ],
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2"],
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      {children}
    </>
  )
}
