import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { Verification } from "@/components/verification"

export const metadata: Metadata = {
  title: "Sign In - Ethereal Design",
  description: "Sign in to your account",
}

export default function SignInPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <HeroSection />
      <Verification />
    </div>
  )
}
