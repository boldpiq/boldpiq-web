"use client"
import { useEffect, useState } from "react"
import Script from "next/script"
import { getConsentPrefs, CONSENT_EVENT } from "@/lib/consent"

export function GHLFormScript({ nonce }: { nonce?: string }) {
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    function check() {
      const prefs = getConsentPrefs()
      if (prefs?.functional) setAllowed(true)
    }
    check()
    window.addEventListener(CONSENT_EVENT, check)
    return () => window.removeEventListener(CONSENT_EVENT, check)
  }, [])

  if (!allowed) return null
  return (
    <Script
      src="https://link.zip360.co.za/js/form_embed.js"
      strategy="afterInteractive"
      nonce={nonce}
    />
  )
}
