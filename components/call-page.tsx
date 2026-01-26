"use client"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Calendar, Download, Filter, Search, Users } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"


type ActivePage = "dashboard" | "clients" | "log" | "calls"


export function CallPage({
  name,
  active,
  onSearch,
  searchSuggestions = [],
  onFilterClick,
  hasActiveFilter = false,
}: {
  name: string
  active: ActivePage
  onSearch?: (value: string) => void
  searchSuggestions?: string[]
  onFilterClick?: () => void
  hasActiveFilter?: boolean
}) {

  const closeSearch = () => {
    setSearchOpen(false)
    setShowSuggestions(false)
    setSearchValue("")
    onSearch?.("") // reset results
  }

  // const [showPassword, setShowPassword] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  // const [recentPages, setRecentPages] = useState<ActivePage[]>([])
  const isTyping = searchOpen && searchValue.length > 0
  const isClosing = !searchOpen
  const [showDate, setShowDate] = useState(false)
  const [zoomRight, setZoomRight] = useState(false)

  const searchContainerRef = useRef<HTMLDivElement>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)




  const filteredSuggestions = searchSuggestions?.filter(
    s => s.toLowerCase().includes(searchValue.toLowerCase())
  ) || []


  // const isActive = (page: ActivePage) =>
  //   active === page
  //     ? "bg-black"
  //     : "bg-white"

  // const iconInvert = (page: ActivePage) =>
  //   active === page ? "invert" : ""

  const today = new Date()
  const next8Days = new Date()

  next8Days.setDate(today.getDate() - 8)

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-GB") // DD/MM/YYYY

  const actionConfig =
    active === "calls"
      ? {
        label: "+ New Calls",
        href: "/newcall",
      }
      : {
        label: "+ New Client",
        href: "/newclients",
      }

  const navItems: {
    key: ActivePage
    href: string
    icon: React.ReactNode
  }[] = [
      {
        key: "dashboard",
        href: "/dashboard",
        icon: (
          <Image
            src="/dashboard_icon4.png"
            alt="Dashboard"
            width={24}
            height={24}
            priority
          />
        ),
      },
      {
        key: "clients",
        href: "/clients",
        icon: <Users className="h-6 w-6" />,
      },
      {
        key: "log",
        href: "/log",
        icon: (
          <Image
            src="/dashboard_icon3.png"
            alt="Log"
            width={24}
            height={24}
            priority
          />
        ),
      },
      {
        key: "calls",
        href: "/calls",
        icon: (
          <Image
            src="/dashboard_icon2.png"
            alt="Calls"
            width={24}
            height={24}
            priority
          />
        ),
      },
    ]
 
  const [sortedKeys, setSortedKeys] = useState<ActivePage[]>([
    "clients",
    "log",
    "calls",
    "dashboard",
  ])


  // Effect to update history in localStorage and update state
  useEffect(() => {
    try {
      const stored = localStorage.getItem("navHistory")
      let history: ActivePage[] = stored
        ? JSON.parse(stored)
        : ["clients", "log", "calls", "dashboard"]

      // Ensure all keys are present (in case of new keys or first run)
      const allKeys: ActivePage[] = ["dashboard", "clients", "log", "calls"]

      // Filter out any invalid keys from history and add missing ones
      history = history.filter(k => allKeys.includes(k))
      const missing = allKeys.filter(k => !history.includes(k))
      history = [...history, ...missing]

      // Remove current active from history and append it to the end (most recent)
      history = history.filter((k) => k !== active)
      history.push(active)

      // Save back to localStorage
      localStorage.setItem("navHistory", JSON.stringify(history))

      // Update state
      setSortedKeys(history)
    } catch (e) {
      console.error("Failed to update nav history", e)
    }
  }, [active])

  const orderedNavItems = sortedKeys
    .map((key) => navItems.find((item) => item.key === key))
    .filter(Boolean) as typeof navItems


  return (

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">


        <motion.div
          layout
          className="flex items-center gap-4"
        >
          {orderedNavItems.map((item) => (
            <motion.div
              key={item.key}
              layout
              layoutId={item.key}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 40,
              }}
            >
              <Link href={item.href}>
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center cursor-pointer transition
            ${active === item.key ? "bg-black" : "bg-white"}
          `}
                >
                  <div className={active === item.key ? "invert" : ""}>
                    {item.icon}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>


        <h1 className="text-2xl text-[#101828]">{name}</h1>
      </div>

      <motion.div
        animate={{ scale: zoomRight ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex items-center gap-3 bg-[#000] h-[48px] rounded-full"
      >

        {!searchOpen && (
          <Button
            variant="outline"
            className="h-10 px-2 rounded-full ml-1 bg-[#121212]  text-white font-medium flex items-center overflow-hidden"
          >
            <div
              onClick={(e) => {
                e.stopPropagation()
                setShowDate(prev => !prev)
              }}
              className="cursor-pointer flex items-center mx-1 shrink-0"
            >
              <Calendar className="h-4 w-4" />
            </div>

            <AnimatePresence>
              {showDate && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowDate(false)
                  }}
                  className="whitespace-nowrap overflow-hidden cursor-pointer "
                >
                  {formatDate(next8Days)} - {formatDate(today)}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        )}
        <div className="flex items-center gap-3 relative">

          {/* FILTER */}
          {!searchOpen && (
            <motion.div layout>
              <Button
                variant="outline"
                size="icon"
                className={`h-11 w-11 rounded-full cursor-pointer 
                  ${hasActiveFilter ? "bg-[#a7e55c] text-[#121212]" : "bg-[#121212] text-white"}`}
                onClick={() => {
                  // Filter currently implemented for clients and calls pages
                  if (active === "clients" || active === "calls") {
                    onFilterClick?.()
                  }
                }}
              >
                <Filter className="h-5 w-5" />
              </Button>
            </motion.div>
          )}

          {/* GRAPH */}
          {/* {!searchOpen && (
            <motion.div layout>
              <Button
                variant="outline"
                size="icon"
                className="group h-11 w-11 rounded-full bg-[#121212] text-white hover:bg-white cursor-pointer"
              >
                <Image
                  src="/dashboard_icon6.png"
                  alt="Dashboard Graph"
                  width={16}
                  height={18}
                  className="transition-all duration-200 group-hover:invert"
                />
              </Button>
            </motion.div>
          )} */}

          {/* DOWNLOAD */}
          {!searchOpen && (
            <motion.div layout>
              <Button
                variant="outline"
                size="icon"
                className="h-11 w-11 rounded-full bg-[#121212] text-white cursor-pointer"
              >
                <Download className="h-5 w-5" />
              </Button>
            </motion.div>
          )}

          <div
            ref={searchContainerRef}
            className={`
    h-12 flex items-center rounded-full overflow-visible
    ${searchOpen ? "w-[370px]" : "w-12"}
    ${isTyping ? "bg-[#a7e55c]" : "bg-[#121212]"}
  `}
          >
            {/* INPUT */}
            {searchOpen && (
              <div className="relative flex-1">
                <input
                  autoFocus
                  value={searchValue}
                  placeholder={
                    active === "calls"
                      ? "Search calls..."
                      : active === "clients"
                        ? "Search clients..."
                        : "Search..."
                  }
                  className={`
        w-full h-12 px-5 bg-transparent outline-none
        ${isTyping ? "text-black placeholder:text-black/60" : "text-white"}
      `}
                  onChange={(e) => {
                    setSearchValue(e.target.value)
                    setShowSuggestions(true)
                    onSearch?.(e.target.value)
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") closeSearch()
                  }}
                />

                <AnimatePresence>
                  {showSuggestions && searchValue && filteredSuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="
        absolute top-full left-0 right-0 mt-2
        bg-[#121212] border border-gray-800
        rounded-xl shadow-xl z-50
        max-h-60 overflow-y-auto
        no-scrollbar
      "
                    >
                      {filteredSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="
            px-4 py-3 text-sm text-gray-300
            hover:bg-[#A7E55C] hover:text-[#121212] cursor-pointer
            transition-colors
          "
                          onClick={(e) => {
                            e.stopPropagation()
                            setSearchValue(suggestion)
                            onSearch?.(suggestion)
                            setShowSuggestions(false)
                          }}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            )}


            {/* SEARCH ICON (RIGHT) */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setZoomRight(true)
                setSearchOpen(true)
                setSearchValue("")
                onSearch?.("")

                // reset zoom smoothly
                setTimeout(() => setZoomRight(false), 150)
              }}
              className={`
    h-12 w-12 rounded-full shrink-0
    transition-colors duration-100 cursor-pointer
    ${isTyping
                  ? "bg-black text-white"
                  : searchOpen
                    ? "bg-[#a7e55c] text-black"
                    : "bg-[#121212] text-white border"
                }
  `}
            >
              <Search className="h-5 w-5" />
            </Button>

          </div>

        </div>
        {!searchOpen && (
          <Link href={actionConfig.href}>
            <Button className="h-10 px-6 mr-1 rounded-full bg-[#a7e55c] text-[#121212] font-bold hover:bg-[#95d04a] cursor-pointer">
              {actionConfig.label}
            </Button>
          </Link>
        )}
      </motion.div>
    </div>
  )
}
