import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Client Onboarding",
  description: "Welcome to Boldpiq. Complete your onboarding form and watch the introduction video to get started on your project.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
