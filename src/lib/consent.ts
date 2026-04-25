export const CONSENT_KEY = "boldpiq_cookie_consent"
export const CONSENT_EVENT = "boldpiq:consent-update"

export interface ConsentPrefs {
  analytics: boolean
  marketing: boolean
  functional: boolean
}

export function getConsentPrefs(): ConsentPrefs | null {
  try {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) return null
    const parsed = JSON.parse(stored)
    return parsed.prefs ?? null
  } catch {
    return null
  }
}
