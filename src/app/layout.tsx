import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { LenisProvider } from "@/components/scroll/LenisProvider"
import { PageTransition } from "@/components/transitions/PageTransition"
import { Navigation } from "@/components/layout/Navigation"
import { ScrollToTop } from "@/components/ui/ScrollToTop"
import { GHLChatWidget } from "@/components/ui/GHLChatWidget"
import { GHLFormScript } from "@/components/ui/GHLFormScript"
import { headers } from 'next/headers'
import { NonceProvider } from '@/lib/nonce'
import "./globals.css"
import "../styles/tokens.css"

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

const SITE_URL = "https://www.boldpiq.com"
const OG_IMAGE = "https://assets.cdn.filesafe.space/2YVSGppZ3t1nNSl74HPu/media/6970aa72d4fb90fe7dc9068b.png"
const FAVICON = "https://assets.cdn.filesafe.space/2YVSGppZ3t1nNSl74HPu/media/6970121015885e63271908fa.png"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BoldPiq — Web Design & AI Solutions Agency | South Africa",
    template: "%s | BoldPiq",
  },
  description: "BoldPiq builds high-performance websites and AI systems designed to support growth for scaling service businesses in South Africa. Next.js, GEO-optimised, Built to Grow.",
  keywords: [
    "web design South Africa", "web development South Africa", "Next.js web design agency",
    "Cape Town web design", "Johannesburg web design", "brand identity South Africa",
    "e-commerce development South Africa", "GEO optimised websites", "boldpiq", "AI search optimisation",
  ],
  authors: [{ name: "Boldpiq Team", url: SITE_URL }],
  creator: "Boldpiq",
  publisher: "Boldpiq",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: SITE_URL,
    siteName: "BoldPiq",
    title: "BoldPiq — Web Design & AI Solutions Agency | South Africa",
    description: "BoldPiq builds high-performance websites and AI systems designed to support growth for scaling service businesses in South Africa. Next.js, GEO-optimised, Built to Grow.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Boldpiq — Web Design & Development Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BoldPiq — Web Design & AI Solutions Agency | South Africa",
    description: "BoldPiq builds high-performance websites and AI systems designed to support growth for scaling service businesses in South Africa. Next.js, GEO-optimised, Built to Grow.",
    images: [OG_IMAGE],
    creator: "@boldpiq",
  },
  icons: {
    icon: [
      { url: FAVICON, type: "image/png" },
    ],
    shortcut: FAVICON,
    apple: FAVICON,
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "L1AJnQnD7hgCHadc6B4bnwLMbP7P62ePRcdMnq7RGXk",
  },
}

const navItems = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

// Organisation structured data (JSON-LD)
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Boldpiq",
  url: SITE_URL,
  logo: OG_IMAGE,
  image: OG_IMAGE,
  description: "Boldpiq crafts high-performance websites and graphics that captivate audiences and drive business growth.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "ZA",
  },
  sameAs: [
    "https://www.instagram.com/boldpiq/",
    "https://www.facebook.com/boldpiq",
    "https://za.pinterest.com/boldpiq/",
    "https://www.linkedin.com/company/boldpiq/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    url: `${SITE_URL}/contact`,
  },
  knowsAbout: [
    "Web Design", "Web Development", "Brand Identity",
    "Graphic Design", "E-Commerce Development", "UI/UX Design",
    "SEO", "Digital Marketing",
  ],
  areaServed: ["ZA", "Africa"],
  foundingLocation: "South Africa",
}

// Website schema
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Boldpiq",
  url: SITE_URL,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2", ".hero-description"],
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/work?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
}

// LocalBusiness / ProfessionalService schema
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "Boldpiq",
  url: SITE_URL,
  logo: OG_IMAGE,
  image: OG_IMAGE,
  description: "Boldpiq is a South African web design and development agency building high-performance Next.js websites, brand identities, and e-commerce solutions.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "ZA",
    addressRegion: "Western Cape",
  },
  areaServed: ["ZA", "Africa", "International"],
  priceRange: "$$",
  sameAs: [
    "https://www.instagram.com/boldpiq/",
    "https://www.facebook.com/boldpiq",
    "https://za.pinterest.com/boldpiq/",
    "https://www.linkedin.com/company/boldpiq/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    url: `${SITE_URL}/contact`,
    availableLanguage: "English",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Design & Development Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Design", description: "Custom UI/UX design in Figma with motion design, responsive layouts, and conversion-focused architecture." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Development", description: "Next.js 15 development optimised for Core Web Vitals, AI search (GEO), and production security." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brand Identity", description: "Full visual identity systems: logo, typography, colour palette, and brand guidelines." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "E-Commerce Development", description: "Custom Shopify and headless e-commerce solutions for South African and international retailers." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Marketing", description: "GoHighLevel CRM automation — email, SMS, paid ads, and social media campaign management." } },
    ],
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get('x-nonce') ?? ''
  return (
    <html lang="en">
      <head>
        {/* consentmanager.net CMP — must be first script for auto-blocking to work */}
        <script
          type="text/javascript"
          data-cmp-ab="1"
          src="https://cdn.consentmanager.net/delivery/autoblocking/46ef2127e265c.js"
          data-cmp-host="b.delivery.consentmanager.net"
          data-cmp-cdn="cdn.consentmanager.net"
          data-cmp-codesrc="0"
          nonce={nonce}
        />
        <meta name="theme-color" content="#0B0F1C" />
        <meta name="msapplication-TileColor" content="#C4541A" />
        <link rel="icon" href={FAVICON} type="image/png" />
        <link rel="apple-touch-icon" href={FAVICON} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${geist.variable} antialiased`}>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <NonceProvider nonce={nonce}>
          <Navigation
            items={navItems}
            ctaLabel="Get Started"
            ctaHref="/contact"
            theme="dark"
          />
          <LenisProvider>
            <PageTransition variant="fade">
              {children}
            </PageTransition>
          </LenisProvider>

          {/* Scroll to top button */}
          <ScrollToTop />
        </NonceProvider>

        {/* GHL scripts — gated on functional consent (GDPR compliant) */}
        <GHLFormScript nonce={nonce} />
        <GHLChatWidget nonce={nonce} />
      </body>
    </html>
  )
}
