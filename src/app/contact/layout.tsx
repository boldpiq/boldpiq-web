import type { Metadata } from "next"

const OG_IMAGE = "https://assets.cdn.filesafe.space/2YVSGppZ3t1nNSl74HPu/media/6970aa72d4fb90fe7dc9068b.png"
const SITE_URL = "https://www.boldpiq.com"

export const metadata: Metadata = {
  title: "Book a Free Discovery Call",
  description: "Ready to grow? Book a free 30-minute discovery call with Boldpiq. Tell us about your business goals and we'll deliver a clear plan — no fluff, no hard sell.",
  keywords: [
    "book discovery call Boldpiq", "free consultation web design South Africa",
    "contact Boldpiq", "web design consultation Cape Town",
    "book a call web developer South Africa", "get a website quote South Africa",
  ],
  openGraph: {
    title: "Book a Free Discovery Call | Boldpiq",
    description: "Book a free 30-minute discovery call. A straight conversation about your business and what's possible.",
    url: `${SITE_URL}/contact`,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Book a Free Discovery Call with Boldpiq" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Free Discovery Call | Boldpiq",
    description: "Book a free 30-minute discovery call with Boldpiq.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
}

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Book a Discovery Call | BoldPiq",
  description: "Book a free 30-minute discovery call with BoldPiq to discuss your website, branding, or automation project.",
  url: `${SITE_URL}/contact`,
  isPartOf: { "@type": "WebSite", url: SITE_URL, name: "BoldPiq" },
  mainEntity: {
    "@type": "Organization",
    name: "BoldPiq",
    url: SITE_URL,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "Sales",
        url: `${SITE_URL}/contact`,
        availableLanguage: "English",
        areaServed: "ZA",
      },
      {
        "@type": "ContactPoint",
        contactType: "Customer Support",
        email: "admin@boldpiq.com",
        availableLanguage: "English",
      },
    ],
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
    ],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      {children}
    </>
  )
}
