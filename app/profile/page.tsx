"use client"

import { useSession, signOut } from "next-auth/react"
import { motion } from "framer-motion"
import { ClientsHeader } from "@/components/clients-header"
import Link from "next/link"

export default function Profile() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    )
  }

  if (!session?.user) {
    return (
       <div
       className="min-h-screen bg-[#f6f6f6]">
      <ClientsHeader activeTab="home" />

      <main className="container mx-auto px-6 py-10 flex justify-center">
        <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }} className="flex flex-col bg-white w-full max-w-md rounded-xl shadow-sm p-6 text-center">
          
       Log in with Google or Apple
          
     <Link
        href="/signin"
        className="px-6 py-3 mt-5 w-40 mx-auto bg-[#a7e55c] text-black rounded-full font-semibold hover:bg-[#95d04a] transition"
      >
        Sign In
      </Link>
          
        </motion.div>
      </main>
    </div>
    )
  }

  const { name, email, image } = session.user

  return (
      <div
       className="min-h-screen bg-[#f6f6f6]">
      <ClientsHeader activeTab="home" />

      <main className="container mx-auto px-6 py-10 flex justify-center">
        <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }} className="bg-white w-full max-w-md rounded-xl shadow-sm p-6 text-center">
          
          <div className="flex justify-center mb-4">
            <img
              src={image ?? "/avatar-placeholder.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full border object-cover"
            />
          </div>

          <h2 className="text-xl font-semibold text-gray-900">
            {name}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {email}
          </p>

          <div className="my-6 border-t" />

          <div className="text-left space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Provider</span>
              <span className="font-medium">Google</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Status</span>
              <span className="text-green-600 font-medium">Active</span>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
