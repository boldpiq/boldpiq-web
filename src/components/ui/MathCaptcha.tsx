"use client"
import { Turnstile } from "@marsidev/react-turnstile"
import { useNonce } from "@/lib/nonce"

interface MathCaptchaProps {
  onVerified: (verified: boolean, token: string | null) => void
}

export function MathCaptcha({ onVerified }: MathCaptchaProps) {
  const nonce = useNonce()

  return (
    <Turnstile
      siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      options={{ theme: "dark" }}
      scriptOptions={nonce ? { nonce } : undefined}
      onSuccess={(token) => onVerified(true, token)}
      onExpire={() => onVerified(false, null)}
      onError={() => onVerified(false, null)}
    />
  )
}
