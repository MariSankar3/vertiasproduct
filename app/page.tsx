import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Ethereal Design - Never Fail an Audit",
  description: "Compliance software for SEBI-regulated firms",
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#d8d8d8] flex items-center justify-center gap-8">
      <Link
        href="/signin"
        className="px-6 py-3 bg-[#a7e55c] text-black rounded-full font-semibold hover:bg-[#95d04a] transition"
      >
        Go to Sign In
      </Link>

      <Link
        href="/signup"
        className="px-6 py-3 bg-[#a7e55c] text-black rounded-full font-semibold hover:bg-[#95d04a] transition"
      >
        Go to Sign Up
      </Link>
    </main>
  )
}
