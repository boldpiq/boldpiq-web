"use client"
import { useEffect, useRef } from "react"
import { getConsentPrefs, CONSENT_EVENT } from "@/lib/consent"

interface GHLChatWidgetProps {
  nonce?: string
}

export function GHLChatWidget({ nonce = '' }: GHLChatWidgetProps) {
  const loaded = useRef(false)

  useEffect(() => {
    function load() {
      if (loaded.current) return
      const prefs = getConsentPrefs()
      if (!prefs?.functional) return

      loaded.current = true

      const div = document.createElement("div")
      div.setAttribute("data-chat-widget", "")
      div.setAttribute("data-widget-id", "68c905cf1c15b470ad4f3a1b")
      div.setAttribute("data-location-id", "2YVSGppZ3t1nNSl74HPu")
      document.body.appendChild(div)

      const script = document.createElement("script")
      script.src = "https://widgets.leadconnectorhq.com/loader.js"
      script.dataset.resourcesUrl = "https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      script.dataset.widgetId = "68c905cf1c15b470ad4f3a1b"
      script.async = true
      if (nonce) script.nonce = nonce
      document.body.appendChild(script)
    }

    load()
    window.addEventListener(CONSENT_EVENT, load)
    return () => window.removeEventListener(CONSENT_EVENT, load)
  }, [nonce])

  return null
}
