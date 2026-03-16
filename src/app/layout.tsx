import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { LenisProvider } from "@/components/scroll/LenisProvider"
import { PageTransition } from "@/components/transitions/PageTransition"
import { Navigation } from "@/components/layout/Navigation"
import { CookieConsent } from "@/components/ui/CookieConsent"
import { ScrollToTop } from "@/components/ui/ScrollToTop"
import { GHLChatWidget } from "@/components/ui/GHLChatWidget"
import Script from "next/script"
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
    default: "Boldpiq: Crafting Stunning Websites & Graphics",
    template: "%s | Boldpiq",
  },
  description: "At Boldpiq, we craft powerful websites and graphics that captivate audiences. High-performance web design, development, and branding for businesses that demand results. Transform your digital presence today!",
  keywords: [
    "boldpiq", "web design", "graphic design", "branding", "e-commerce development",
    "responsive design", "digital experiences", "website development", "custom web design",
    "small business web development", "SEO-friendly web design", "website redesign services",
    "online store design", "Shopify e-commerce development", "UI/UX design services",
    "mobile-first web design", "branding services South Africa", "affordable web design South Africa",
    "web design South Africa", "Cape Town web design", "Johannesburg web design",
    "Pretoria graphic design", "affordable website development", "website maintenance services",
    "web design for startups", "professional web design services", "logo design and branding services",
    "e-commerce websites for fashion brands", "digital marketing web design", "lead generation web design",
    "custom e-commerce solutions", "high-performance website design", "website optimization services",
    "graphic design for small businesses", "real estate website design", "law firm web design",
    "creative agency web design", "nonprofit website development", "portfolio websites for creatives",
    "HTML5 and CSS3 web development", "progressive web app design", "responsive website design Cape Town",
    "SEO web design South Africa", "web design studios in Cape Town", "best web developers in Western Cape",
    "freelance web design professionals South Africa", "WordPress web development Cape Town",
    "Shopify stores for South African businesses",
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
    siteName: "Boldpiq",
    title: "Boldpiq: Crafting Stunning Websites & Graphics",
    description: "At Boldpiq, we craft powerful websites and graphics that captivate audiences. Transform your digital presence today!",
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
    title: "Boldpiq: Crafting Stunning Websites & Graphics",
    description: "At Boldpiq, we craft powerful websites and graphics that captivate audiences. Transform your digital presence today!",
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
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/work?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
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
      </head>
      <body className={`${geist.variable} antialiased`}>
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

        {/* Cookie Consent Banner */}
        <CookieConsent />

        {/* GHL Booking & Form Embed Script (global — required for all booking widgets) */}
        <Script
          src="https://link.zip360.co.za/js/form_embed.js"
          strategy="afterInteractive"
        />

        {/* GHL Chat Widget — injected outside React tree to prevent DOM reconciliation errors */}
        <GHLChatWidget />
      </body>
    </html>
  )
}
