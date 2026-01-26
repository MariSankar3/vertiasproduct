"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, LayoutGroup, AnimatePresence } from "framer-motion"

type ClientsHeaderProps = {
  activeTab: "home" | "chat" | "connections" | "settings" | "notification"
}

const tabs = [
  { name: "Home", key: "home", href: "/dashboard" },
  { name: "Chat", key: "chat", href: "/chat" },
  { name: "Connections", key: "connections", href: "/connections" },
  { name: "Settings", key: "settings", href: "/settings" },
]

export function ClientsHeader({ activeTab }: ClientsHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const isNotificationActive = activeTab === "notification"

  return (
    <header className=" bg-[#121212] border-b border-[#d0d5dd] sticky top-0 z-50 w-full h-[100px]">
      <div className="container mx-auto px-6 h-full flex items-center">
        <div className="flex items-center justify-between w-full">

          {/* LEFT SECTION */}
          <div className="flex items-center gap-8">

            {/* LOGO — FIXED SIZE (NO SHAKE) */}
            <div className="relative w-12 h-12 shrink-0">
              <Image
                src="/verita_logo_white.png"
                alt="Logo"
                fill
                priority
                className="object-contain"
              />
            </div>

            <LayoutGroup>
              <nav className="relative flex items-center h-[52px] border border-[#888888] rounded-full pr-2 overflow-hidden">

                {/* TABS */}
                <motion.div
                  layout="position"
                  style={{ opacity: searchOpen ? 0 : 1 }}
                  className="flex items-center gap-2"
                >
                  {tabs.map((tab) => {
                    const isActive = activeTab === tab.key

                    return (
                      <Link
                        key={tab.key}
                        href={tab.href}
                        className="relative px-8 py-3 font-medium text-white"
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-[#A7E55C] rounded-full"
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 40,
                            }}
                          />
                        )}

                        <span
                          className={`relative z-10 ${
                            isActive
                              ? "text-[#121212] font-semibold"
                              : "hover:text-white"
                          }`}
                        >
                          {tab.name}
                        </span>
                      </Link>
                    )
                  })}

                  {/* NOTIFICATION */}
                  <Link
                    href="/notification"
                    className={`h-10 w-10 rounded-full ml-2 flex items-center justify-center transition-colors ${
                      isNotificationActive
                        ? "bg-[#A7E55C]"
                        : "bg-[#88888866] border border-[#888888]"
                    }`}
                  >
                    <div className="relative w-4 h-4">
                      <Image
                        src="/notification-box.png"
                        alt="icon"
                        fill
                        className={`object-contain ${
                          isNotificationActive ? "invert brightness-0" : ""
                        }`}
                      />
                    </div>
                  </Link>
                </motion.div>

                {/* SEARCH INPUT */}
                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-y-1 right-1 left-1 rounded-full flex items-center pl-6 pr-14 z-40"
                    >
                      <input
                        autoFocus
                        placeholder="Search"
                        className="flex-1 bg-transparent outline-none text-white placeholder:text-white/60"
                        onKeyDown={(e) => {
                          if (e.key === "Escape") setSearchOpen(false)
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* SEARCH ICON — ALWAYS FIXED */}
                <div
                  onClick={() => setSearchOpen(true)}
                  className={`h-10 w-10 rounded-full flex items-center justify-center cursor-pointer ml-2 z-50 transition-colors ${
                    searchOpen
                      ? "bg-[#A7E55C] text-[#121212]"
                      : "bg-[#88888866] border border-[#888888] text-white"
                  }`}
                >
                  <Search className="h-5 w-5" />
                </div>
              </nav>
            </LayoutGroup>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-4 border border-[#888888] rounded-full h-[52px] pl-1 pr-3">
            <div className="relative w-10 h-10">
              <Image
                src="/select_client1.png"
                alt="profile"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="relative w-5 h-5">
              <Image
                src="/downarrow_header.png"
                alt="arrow"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </header>
  )
}
