import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Suppress x-powered-by: Next.js header (framework fingerprinting)
  poweredByHeader: false,

  // Strict mode disabled — Framer Motion AnimatePresence has DOM reconciliation issues with React 19 strict mode
  reactStrictMode: false,

  // Compress responses
  compress: true,

  // Allow images from common CMS/media hosts — add client domains as needed
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.leadconnectorhq.com" },
      { protocol: "https", hostname: "assets.cdn.filesafe.space" },
      { protocol: "https", hostname: "images.squarespace-cdn.com" },
    ],
  },

  // Security headers applied to every response
  async headers() {
    return [
      // Restrict API routes to same-origin requests only
      {
        source: "/api/(.*)",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "https://www.boldpiq.com" },
          { key: "Access-Control-Allow-Methods", value: "POST, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=(), gyroscope=(), magnetometer=(), interest-cohort=(), browsing-topics=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          // Prevents cross-origin window access (Spectre mitigation). 'same-origin-allow-popups'
          // used instead of 'same-origin' to preserve GHL chat popup window functionality.
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
        ],
      },
    ]
  },
}

export default nextConfig
