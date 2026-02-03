import type { Metadata } from "next"
import { SignInForm } from "./components/signin-form"
import { HeroSection } from "@/components/hero-section"

export const metadata: Metadata = {
  title: "Sign In - Ethereal Design",
  description: "Sign in to your account",
}

export default function SignInPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#d8d8d8] p-[2px]">
      <HeroSection />
      <SignInForm />
    </div>
  )
}
