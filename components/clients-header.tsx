"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { useRef, useEffect } from "react";

type ClientsHeaderProps = {
  activeTab: "home" | "chat" | "connections" | "settings" | "notification";
};

const tabs = [
  { name: "Home", key: "home", href: "/dashboard" },
  { name: "Chat", key: "chat", href: "/chat" },
  { name: "Connections", key: "connections", href: "/connections" },
  { name: "Settings", key: "settings", href: "/settings" },
];

export function ClientsHeader({ activeTab }: ClientsHeaderProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const isNotificationActive = activeTab === "notification";

  const { data: session, status } = useSession();

  const profileImage = session?.user?.image ?? "/select_client1.png";
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
                    const isActive = activeTab === tab.key;

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
                    );
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
                          if (e.key === "Escape") setSearchOpen(false);
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
          <div
            ref={dropdownRef}
            className="relative flex items-center gap-4 border border-[#888888] rounded-full h-[52px] pl-1 pr-3"
          >
            {/* Profile Image */}
            <div
              onClick={() => setOpen((prev) => !prev)}
              className="relative w-10 h-10 rounded-full overflow-hidden border border-[#888888] cursor-pointer"
            >
              <Image
                src={profileImage}
                alt="profile"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Arrow */}
            <div className="relative w-5 h-5 cursor-pointer">
              <Image
                src="/downarrow_header.png"
                alt="arrow"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* DROPDOWN */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute right-0 top-[60px] w-48 bg-white rounded-xl shadow-lg border overflow-hidden z-50"
                >
                  {/* Your Profile */}
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </Link>

                  <div className="border-t" />

                  {/* Logout */}
                  <button
                    onClick={() =>
                      signOut({
                        callbackUrl: "/",
                      })
                    }
                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
