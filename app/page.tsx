import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Ethereal Design - Never Fail an Audit",
  description: "Compliance software for SEBI-regulated firms",
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#d8d8d8] flex flex-row items-center justify-center">
      <Link
        href="/signin"
        className="inline-block m-8 px-6 py-3 bg-[#a7e55c] text-black rounded-full font-semibold hover:bg-[#95d04a] transition"
      >
        Go to Sign In
      </Link>
      <Link
        href="/signup"
        className="inline-block m-8 px-6 py-3 bg-[#a7e55c] text-black rounded-full font-semibold hover:bg-[#95d04a] transition"
      >
        Go to Sign Up
      </Link>
      {/* <Link
        href="/verification"
        className="inline-block m-8 px-6 py-3 bg-[#a7e55c] text-black rounded-full font-semibold hover:bg-[#95d04a] transition"
      >
        Verification
      </Link> */}
      {/* <Link
        href="/calls"
        className="inline-block m-8 px-6 py-3 bg-[#a7e55c] text-black rounded-full font-semibold hover:bg-[#95d04a] transition"
      >
        Calls
      </Link>
      <Link
        href="/clients"
        className="inline-block m-8 px-6 py-3 bg-[#a7e55c] text-black rounded-full font-semibold hover:bg-[#95d04a] transition"
      >
        Go to Clients Dashboard
      </Link> */}
    </div>
  )
}
