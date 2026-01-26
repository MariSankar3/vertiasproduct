"use client"

import { useState } from "react"
import { Calendar, Filter, Download, Search, ArrowRight, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { clientsData } from "@/lib/mock-data"
import { useEffect, useMemo } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronsUp, ChevronsDown, ArrowUpDown, Check } from "lucide-react"

// const clients = [] ?? clientsData 
const clients = clientsData ?? []

const ROW_HEIGHT = 70
const HEADER_HEIGHT = 56


const statusColors: Record<string, string> = {
  Active: "bg-[#ecfdf3] text-[#067647] border-[#abefc6]",
  Review: "bg-[#eff8ff] text-[#175cd3] border-[#b2ddff]",
  "KYC Pending": "bg-[#fef6ee] text-[#b93815] border-[#f9dbaf]",
  "Risk Profile": "bg-[#fdf2fa] text-[#c11574] border-[#fcceee]",
  Inactive: "bg-[#fef3f2] text-[#b42318] border-[#fecdca]",
}
type SortKey = "id" | "name" | null
type SortOrder = "asc" | "desc" | null
type ClientsTableProps = {
  searchQuery?: string
  statusFilters?: string[]
  categoryFilters?: string[]
}

export function ClientsTable({

  searchQuery = "",
  statusFilters = [],
  categoryFilters = [],
}: ClientsTableProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [sortKey, setSortKey] = useState<SortKey>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(8)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // simulate API delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500) // 1.2s skeleton

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const calculateRows = () => {
      const containerHeight = window.innerHeight * 0.7
      const availableHeight = containerHeight - HEADER_HEIGHT
      const rows = Math.floor(availableHeight / ROW_HEIGHT)
      setRowsPerPage(Math.max(rows, 1))
    }

    calculateRows()
    window.addEventListener("resize", calculateRows)
    return () => window.removeEventListener("resize", calculateRows)
  }, [])

  const filteredClients = clients.filter((client) => {
    // Advanced Filter (from header filter modal)
    if (statusFilters.length > 0 && !statusFilters.includes(client.status)) {
      return false
    }

    if (categoryFilters.length > 0 && !categoryFilters.includes(client.riskCategory)) {
      return false
    }

    // Search Filter
    if (searchQuery && !client.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    if (activeTab === "all") return true
    if (activeTab === "active") return client.status === "Active"
    if (activeTab === "inactive") return client.status === "Inactive"
    if (activeTab === "review") return client.status === "Review"
    if (activeTab === "kycpending") return client.status === "KYC Pending"
    if (activeTab === "riskprofile") return client.status === "Risk Profile"
    return true
  })
  const sortedClients = [...filteredClients].sort((a, b) => {
    if (!sortKey || !sortOrder) return 0

    const aValue = sortKey === "id" ? a.id : a.name.toLowerCase()
    const bValue = sortKey === "id" ? b.id : b.name.toLowerCase()

    if (sortOrder === "asc") return aValue > bValue ? 1 : -1
    if (sortOrder === "desc") return aValue < bValue ? 1 : -1

    return 0
  })
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const allSelected =
    sortedClients.length > 0 &&
    sortedClients.every((c) => selectedIds.includes(c.id))
  const totalPages = Math.ceil(sortedClients.length / rowsPerPage)

  const paginatedClients = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return sortedClients.slice(start, start + rowsPerPage)
  }, [sortedClients, currentPage, rowsPerPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab, searchQuery, statusFilters, categoryFilters, sortKey, sortOrder])



  // Calculate counts based on filtered data (excluding activeTab filter)
  const baseFilteredClients = clients.filter((client) => {
    // Advanced Filter (from header filter modal)
    if (statusFilters.length > 0 && !statusFilters.includes(client.status)) {
      return false
    }

    if (categoryFilters.length > 0 && !categoryFilters.includes(client.riskCategory)) {
      return false
    }

    // Search Filter
    if (searchQuery && !client.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    return true
  })

  const counts = {
    all: baseFilteredClients.length,
    active: baseFilteredClients.filter(c => c.status === "Active").length,
    inactive: baseFilteredClients.filter(c => c.status === "Inactive").length,
    review: baseFilteredClients.filter(c => c.status === "Review").length,
    kycpending: baseFilteredClients.filter(c => c.status === "KYC Pending").length,
    riskprofile: baseFilteredClients.filter(c => c.status === "Risk Profile").length,
  }


  // ✅ EARLY RETURN — outside JSX
  if (clients.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl border border-[#eaecf0] h-[70vh] mt-6 flex items-center justify-center"
      >
        <div className="flex flex-col items-center text-center">

          <Image
            src="/noclientyet.png"
            alt="No clients yet"
            width={340}
            height={260}
            priority
            className="mb-6"
          />

          <h2 className="text-[24px] font-semibold text-[#101828]">
            No Client Yet
          </h2>

          <p className="mt-2 text-[16px] text-[#888888] max-w-md">
            Start by adding your first client to begin building your
            compliance-first practice.
          </p>
          <Link href="/newclients">
            <Button className="text-[16px] font-bold cursor-pointer mt-6 bg-[#A7E55C] text-[#121212] rounded-full px-6 hover:bg-[#A7E55C] hover:scale-[1.05]">
              + Add your first client
            </Button>
          </Link>

        </div>
      </motion.div>
    )
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="space-y-1"
    >


      <div className="bg-white space-y-6 mt-4 rounded-2xl border-1">
        <div className="flex items-center gap-3 mt-2 mb-2 pl-3">
          <button
            onClick={() => setActiveTab("all")}
            className={cn(
              "px-6 py-2 rounded-full font-medium transition cursor-pointer",
              activeTab === "all" ? "bg-[#a7e55c] text-[#121212]" : "bg-[#e2e2e2] text-[#101828]",
            )}
          >
            All Clients <span className={cn("ml-2 rounded-2xl p-1 px-1.5", activeTab === "all" ? "bg-[#5FAE2E]/40" : "bg-[#D6D6D6] ")}>{counts.all}</span>
          </button>
          <button
            onClick={() => setActiveTab("active")}
            className={cn(
              "px-6 py-2 rounded-full font-medium border-1 transition border border-[#ccc] cursor-pointer",
              activeTab === "active" ? "bg-[#a7e55c] text-[#121212]" : "bg-[#e2e2e2] text-[#667085]",
            )}
          >
            Active <span className={cn("ml-2 rounded-2xl p-1 px-1.5", activeTab === "active" ? "bg-[#5FAE2E]/40" : "bg-[#D6D6D6] ")}> {counts.active}</span>
          </button>
          <button
            onClick={() => setActiveTab("inactive")}
            className={cn(
              "px-6 py-2 rounded-full font-medium border-1 transition border border-[#ccc] cursor-pointer",
              activeTab === "inactive" ? "bg-[#a7e55c] text-[#121212]" : "bg-[#e2e2e2] text-[#667085]",
            )}
          >
            In-Active <span className={cn("ml-2 rounded-2xl p-1 px-1.5", activeTab === "inactive" ? "bg-[#5FAE2E]/40" : "bg-[#D6D6D6] ")}> {counts.inactive}</span>
          </button>
          <button
            onClick={() => setActiveTab("review")}
            className={cn(
              "px-6 py-2 rounded-full font-medium border-1 transition border border-[#ccc] cursor-pointer",
              activeTab === "review" ? "bg-[#a7e55c] text-[#121212]" : "bg-[#e2e2e2] text-[#667085]",
            )}
          >
            Review <span className={cn("ml-2 rounded-2xl p-1 px-1.5", activeTab === "review" ? "bg-[#5FAE2E]/40" : "bg-[#D6D6D6] ")}> {counts.review}</span>
          </button>
          <button
            onClick={() => setActiveTab("kycpending")}
            className={cn(
              "px-6 py-2 rounded-full font-medium border-1 transition border border-[#ccc] cursor-pointer",
              activeTab === "kycpending" ? "bg-[#a7e55c] text-[#121212]" : "bg-[#e2e2e2] text-[#667085]",
            )}
          >
            KYC Pending <span className={cn("ml-2 rounded-2xl p-1 px-1.5", activeTab === "kycpending" ? "bg-[#5FAE2E]/40" : "bg-[#D6D6D6] ")}> {counts.kycpending}</span>
          </button>
          <button
            onClick={() => setActiveTab("riskprofile")}
            className={cn(
              "px-6 py-2 rounded-full font-medium border-1 transition border border-[#ccc] cursor-pointer",
              activeTab === "riskprofile" ? "bg-[#a7e55c] text-[#121212]" : "bg-[#e2e2e2] text-[#667085]",
            )}
          >
            Risk Profile
            <span className={cn("ml-2 rounded-2xl p-1 px-1.5", activeTab === "riskprofile" ? "bg-[#5FAE2E]/40" : "bg-[#D6D6D6] ")}> {counts.riskprofile}</span>
          </button>
        </div>
        <div className="bg-white rounded-2xl border border-[#eaecf0]  h-[calc(100vh-310px)] flex flex-col">
          <div className="overflow-x-auto">

            <table className="w-full">
              <thead>
                <tr className="border-b border-[#eaecf0] bg-[#F7F7F7]">
                  <th className="text-left p-4 w-12">
                    <Checkbox
                      checked={allSelected}
                      className="cursor-pointer"
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedIds(sortedClients.map((c) => c.id))
                        } else {
                          setSelectedIds([])
                        }
                      }}
                    />
                  </th>

                  <SortableHeader
                    label="Client ID"
                    sKey="id"
                    currentSortKey={sortKey}
                    currentSortOrder={sortOrder}
                    onSort={(k, o) => {
                      setSortKey(k)
                      setSortOrder(o)
                    }}
                  />
                  <SortableHeader
                    label="Name"
                    sKey="name"
                    currentSortKey={sortKey}
                    currentSortOrder={sortOrder}
                    onSort={(k, o) => {
                      setSortKey(k)
                      setSortOrder(o)
                    }}
                  />

                  <th className="text-left p-4 text-xs font-semibold text-[#101828] uppercase tracking-wider">Status</th>
                  <th className="text-left p-4 text-xs font-semibold text-[#101828] uppercase tracking-wider">
                    Risk Score & Category
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-[#101828] uppercase tracking-wider">
                    Email Address
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-[#101828] uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-[#101828] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>


              <tbody>
                {loading ? (
                  Array.from({ length: rowsPerPage }).map((_, i) => (
                    <ClientRowSkeleton key={i} />
                  ))
                ) : sortedClients.length === 0 ? (

                  <tr>
                    <td colSpan={8} className="h-[50vh]">
                      <div className="flex flex-col items-center justify-center h-full text-center font-nunito">

                        {/* Image */}
                        <Image
                          src="/clientnofound.png"
                          alt="No clients found"
                          width={280}
                          height={280}
                          priority
                        />

                        {/* Main text */}
                        <p className="mt-6 text-[24px] font-semibold text-[#121212]">
                          No clients found matching{" "}
                          <span className="text-[#121212]">"{searchQuery}"</span>
                        </p>

                        {/* Sub text */}
                        <p className="mt-2 text-[16px] text-[#667085]">
                          Try a different search term
                        </p>

                      </div>
                    </td>
                  </tr>

                ) : (
                  paginatedClients.map((client, index) => (
                    <tr
                      key={client.id}
                      className={cn(
                        "group hover:bg-[#f9fafb] transition",
                        index === paginatedClients.length - 1 && "border-0"
                      )}
                    >


                      <td className="px-4 py-3">

                        <Checkbox
                          checked={selectedIds.includes(client.id)}
                          className="cursor-pointer"
                          onCheckedChange={(checked) => {
                            setSelectedIds((prev) =>
                              checked
                                ? [...prev, client.id]
                                : prev.filter((id) => id !== client.id)
                            )
                          }}
                        />
                      </td>

                      <td className="px-4 py-3 text-sm text-[#101828]">{client.id}</td>
                      <td className="px-4 py-3 text-sm text-[#101828]">{client.name}</td>
                      <td className="px-4 py-3">

                        <span
                          className={cn(
                            "inline-flex items-center px-3 py-1 rounded-md text-xs font-medium border",
                            statusColors[client.status]
                          )}
                        >
                          {client.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">

                        <div className="flex items-center gap-3">
                          <span className="text-sm border rounded-md px-2">
                            {client.riskScore}
                          </span>
                          <span className="text-sm border rounded-md px-2">
                            {client.riskCategory}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#475467]">{client.email}</td>
                      <td className="px-4 py-3text-sm text-[#475467]">{client.phone}</td>
                      <td className="px-4 py-3">

                        <Button variant="ghost" size="icon">
                          <Link
                            href={`/client-profile/${client.id}`}
                            className="flex items-center gap-2"
                          >
                            {/* View text (hidden by default) */}
                            <span
                              className="
      text-[14px] text-[#535353]
      opacity-0 translate-x-2
      group-hover:opacity-100 group-hover:translate-x-0
      transition-all duration-200
      whitespace-nowrap
    "
                            >
                              View
                            </span>

                            {/* Arrow (always visible, slight move on hover) */}
                            <ArrowRight
                              className="
      h-4 w-4
      transition-transform duration-200
      group-hover:translate-x-1
    "
                            />
                          </Link>

                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>


            </table>

          </div>
        </div>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-[16px]">
            <span className="text-black">
              {String(currentPage).padStart(2, "0")}
            </span>
            {" / "}
            <span className="text-[#667085]">
              {String(totalPages).padStart(2, "0")}
            </span>
          </span>

          <div className="flex items-center">
            {/* PREVIOUS */}
            <button
              onClick={() => currentPage > 1 && setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className={cn(
                "h-10 w-10 flex items-center justify-center rounded-full transition",
                currentPage === 1
                  ? "text-[#667085] cursor-not-allowed"
                  : "text-black hover:bg-gray-100 cursor-pointer"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                />
              </svg>
            </button>

            {/* NEXT */}
            <button
              onClick={() =>
                currentPage < totalPages && setCurrentPage((currentPage) => currentPage + 1)
              }
              disabled={currentPage === totalPages}
              className={cn(
                "h-10 w-10 flex items-center justify-center rounded-full transition",
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-[#101828] hover:bg-gray-100 cursor-pointer"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                />
              </svg>
            </button>
          </div>

        </div>
      )}
    </motion.div>
  )
}

function SortableHeader({
  label,
  sKey,
  currentSortKey,
  currentSortOrder,
  onSort,
}: {
  label: string
  sKey: SortKey
  currentSortKey: SortKey
  currentSortOrder: SortOrder
  onSort: (key: SortKey, order: SortOrder) => void
}) {
  const isSelected = currentSortKey === sKey

  return (
    <th className="p-4 text-xs font-semibold uppercase tracking-wider">
      <div className="flex items-center gap-1">
        <span>{label}</span>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 ml-1 p-0 hover:bg-transparent"
            >
              {!isSelected || !currentSortOrder ? (
                <ArrowUpDown className="h-3 w-3 text-gray-400" />
              ) : currentSortOrder === "asc" ? (
                <ChevronsUp className="h-3 w-3 text-[#101828]" />
              ) : (
                <ChevronsDown className="h-3 w-3 text-[#101828]" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[150px]">
            <DropdownMenuItem
              onClick={() => onSort(null, null)}
              className="flex items-center justify-between"
            >
              <span>Normal</span>
              {!isSelected || !currentSortOrder ? <Check className="h-4 w-4" /> : null}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onSort(sKey, "asc")}
              className="flex items-center justify-between"
            >
              <span>Ascending</span>
              {isSelected && currentSortOrder === "asc" ? <Check className="h-4 w-4" /> : <ChevronsUp className="h-3 w-3 text-gray-400" />}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onSort(sKey, "desc")}
              className="flex items-center justify-between"
            >
              <span>Descending</span>
              {isSelected && currentSortOrder === "desc" ? <Check className="h-4 w-4" /> : <ChevronsDown className="h-3 w-3 text-gray-400" />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </th>
  )
}


function ClientRowSkeleton() {
  return (
    <tr className="animate-pulse">
      <td className="px-4 py-3">
        <div className="h-4 w-4 bg-gray-200 rounded" />
      </td>

      <td className="px-4 py-3">
        <div className="h-4 w-20 bg-gray-200 rounded" />
      </td>

      <td className="px-4 py-3">
        <div className="h-4 w-32 bg-gray-200 rounded" />
      </td>

      <td className="px-4 py-3">
        <div className="h-5 w-20 bg-gray-200 rounded-full" />
      </td>

      <td className="px-4 py-3">
        <div className="flex gap-2">
          <div className="h-4 w-8 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>
      </td>

      <td className="px-4 py-3">
        <div className="h-4 w-36 bg-gray-200 rounded" />
      </td>

      <td className="px-4 py-3">
        <div className="h-4 w-28 bg-gray-200 rounded" />
      </td>

      <td className="px-4 py-3">
        <div className="h-8 w-8 bg-gray-200 rounded-full" />
      </td>
    </tr>
  )
}
