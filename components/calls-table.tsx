"use client"

import { useState, useEffect, useMemo } from "react"
import { Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
// import { count } from "console"

import { callsData } from "@/lib/mock-data"


const ROW_HEIGHT = 65 
const HEADER_HEIGHT = 56 


type CallsTableProps = {
  searchQuery?: string
  statusFilters?: string[]
  categoryFilters?: string[]
}

export function CallsTable({
  searchQuery = "",
  statusFilters = [],
  categoryFilters = [],
}: CallsTableProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(8)

  useEffect(() => {
    const calculateRows = () => {
      // Calculate 60vh in pixels
      const containerHeight = window.innerHeight * 0.62
      // Available height for rows = Container Height - Header Height
      const availableHeight = containerHeight - HEADER_HEIGHT
      // Calculate max rows that can fit
      const rows = Math.floor(availableHeight / ROW_HEIGHT)
      // Ensure at least 1 row is shown
      setRowsPerPage(Math.max(rows, 1))
    }

    calculateRows()
    window.addEventListener("resize", calculateRows)
    return () => window.removeEventListener("resize", calculateRows)
  }, [])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false)
  }, 1000) 

  return () => clearTimeout(timer)
}, [])


  const clients = callsData
  // const clients = []


  if (clients.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl border border-[#eaecf0] h-[70vh] mt-6 flex items-center justify-center"
      >
        <div className="flex flex-col items-center text-center">

          <Image
            src="/nocallsyet.png"
            alt="No clients yet"
            width={340}
            height={260}
            priority
            className="mb-6"
          />

          <h2 className="text-[24px] font-semibold text-[#101828]">
            No Calls Yet
          </h2>

          <p className="mt-2 text-[16px] text-[#888888] max-w-md">
            Start by give your first advice to the Suganth Alagesan!
          </p>

          <Link href="/newcall">
            <Button className="text-[16px] font-bold cursor-pointer mt-6 bg-[#A7E55C] text-[#121212] rounded-full px-6 hover:bg-[#A7E55C] hover:scale-[1.05] transition">
              + Give Advice
            </Button>
          </Link>

        </div>
      </motion.div>
    )
  }


  // Calculate counts based on filtered data (excluding activeTab filter)
  const baseFilteredClients = clients.filter((client) => {
    // Header filter: status (Hit / Failed / Inactive)
    if (statusFilters.length > 0 && !statusFilters.includes(client.status)) {
      return false
    }

    // Header filter: call type (Buy / Sell)
    if (categoryFilters.length > 0 && !categoryFilters.includes(client.call)) {
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
    active: baseFilteredClients.filter(c => c.status === "Hit").length,
    failed: baseFilteredClients.filter(c => c.status === "Failed").length,
    inactive: baseFilteredClients.filter(c => c.status !== "Hit" && c.status !== "Failed").length,
  }


  const filteredClients = clients.filter((client) => {
    // Header filter: status (Hit / Failed / Inactive)
    if (statusFilters.length > 0 && !statusFilters.includes(client.status)) {
      return false
    }

    // Header filter: call type (Buy / Sell)
    if (categoryFilters.length > 0 && !categoryFilters.includes(client.call)) {
      return false
    }

    // Search Filter
    if (searchQuery && !client.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    if (activeTab === "all") return true

    if (activeTab === "active") return client.status === "Hit"

    if (activeTab === "failed") return client.status === "Failed"

    if (activeTab === "inactive") return client.status !== "Hit" && client.status !== "Failed"

    return true
  })

  const totalPages = Math.ceil(filteredClients.length / rowsPerPage)

  const paginatedClients = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return filteredClients.slice(start, start + rowsPerPage)
  }, [filteredClients, currentPage, rowsPerPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab, searchQuery, statusFilters, categoryFilters])


  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="">

     <div className="bg-white space-y-6 mt-4 rounded-t-2xl border-1 border-b-0">
       <div className="flex items-center gap-3 mt-2 pl-3 pb-2">
        <button
          onClick={() => setActiveTab("all")}
          className={cn(
            "cursor-pointer px-6 py-2 rounded-full font-medium transition border-2 border-[#D6D6D6]",
            activeTab === "all" ? "bg-[#a7e55c] text-[#121212]" : "bg-[#E2E2E2] text-[#667085]",
          )}
        >
          Live Calls <span className={cn("ml-2 rounded-2xl p-1 px-1.5", activeTab === "all" ? "bg-[#5FAE2E]/40" : "bg-[#D6D6D6] ")}>{counts.all}</span>
        </button>
        <button
          onClick={() => setActiveTab("active")}
          className={cn(
            "cursor-pointer px-6 py-2 rounded-full font-medium border-1 transition border border-[#ccc]",
            activeTab === "active" ? "bg-[#a7e55c] text-[#121212]" : "bg-[#E2E2E2] text-[#667085]",
          )}
        >
          Active <span className={cn("ml-2 rounded-2xl p-1 px-1.5", activeTab === "active" ? "bg-[#5FAE2E]/40" : "bg-[#D6D6D6] ")}>{counts.active}</span>
        </button>
        <button
          onClick={() => setActiveTab("inactive")}
          className={cn(
            "cursor-pointer px-6 py-2 rounded-full font-medium border-1 transition border border-[#ccc]",
            activeTab === "inactive" ? "bg-[#a7e55c] text-[#121212]" : "bg-[#E2E2E2] text-[#667085]",
          )}
        >
          In-Active <span className={cn("ml-2 rounded-2xl p-1 px-1.5", activeTab === "inactive" ? "bg-[#5FAE2E]/40" : "bg-[#D6D6D6] ")}>{counts.inactive}</span>
        </button>
        <button
          onClick={() => setActiveTab("failed")}
          className={cn(
            "cursor-pointer px-6 py-2 rounded-full font-medium border-1 transition border border-[#ccc]",
            activeTab === "failed" ? "bg-[#a7e55c] text-[#121212]" : "bg-[#E2E2E2] text-[#667085]",
          )}
        >
          Failed <span className={cn("ml-2 rounded-2xl p-1 px-1.5", activeTab === "failed" ? "bg-[#5FAE2E]/40" : "bg-[#D6D6D6] ")}>{counts.failed}</span>
        </button>
      </div>
       </div>
      <div className="bg-white border border-[#eaecf0] h-[calc(100vh-310px)] flex flex-col rounded-b-2xl">
        <div className="overflow-x-auto">
  <div className="max-h-[calc(100vh-310px)] ">
    <table className="w-full">
            <thead>
             <tr className="border-b border-[#eaecf0] sticky top-0 z-10 bg-white">


                <th className="text-left p-4 text-xs font-semibold text-[#667085] uppercase tracking-wider">
                  Call Type
                </th>
                <th className="text-left p-4 text-xs font-semibold text-[#667085] uppercase tracking-wider">Stock Name</th>
                <th className="text-left p-4 text-xs font-semibold text-[#667085] uppercase tracking-wider">Versions</th>
                <th className="text-left p-4 text-xs font-semibold text-[#667085] uppercase tracking-wider">
                  Entry Price
                </th>
                <th className="text-left p-4 text-xs font-semibold text-[#667085] uppercase tracking-wider">
                  Traget Price
                </th>
                <th className="text-left p-4 text-xs font-semibold text-[#667085] uppercase tracking-wider">
                  Stop Loss
                </th>
                <th className="text-left p-4 text-xs font-semibold text-[#667085] uppercase tracking-wider">
                  Risk Ratio
                </th>
                <th className="text-left p-4 text-xs font-semibold text-[#667085] uppercase tracking-wider">
                  Call Time / Date
                </th>
                <th className="text-left p-4 text-xs font-semibold text-[#667085] uppercase tracking-wider">
                  Validity
                </th>
                <th className="text-left p-4 text-xs font-semibold text-[#667085] uppercase tracking-wider">
                  Shared
                </th>
                <th className="text-left p-4 text-xs font-semibold text-[#667085] uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left p-4 text-xs font-semibold text-[#667085] uppercase tracking-wider">More</th>
              </tr>
            </thead>
           <tbody>
  {loading ? (
    Array.from({ length: rowsPerPage }).map((_, i) => (
      <TableSkeletonRow key={i} />
    ))
  ) : filteredClients.length === 0 ? (

                <tr>
                  <td colSpan={12} className="h-[50vh]">
                    <div className="flex flex-col items-center justify-center h-full text-center font-nunito">

                      {/* Image */}
                      <Image
                        src="/clientnofound.png"
                        alt="No clients found"
                        width={280}
                        height={280}
                        priority
                      />

                      <p className="mt-6 text-[24px] font-semibold text-[#121212]">
                        No Stock found matching{" "}
                        <span className="text-[#121212]">"{searchQuery}"</span>
                      </p>

                      <p className="mt-2 text-[16px] text-[#667085]">
                        Try a different search term
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedClients.map((client, index) => (
                  <tr
                    key={index}
                    className={cn(
                      "hover:bg-[#f9fafb] transition",
                      index === paginatedClients.length - 1 && "border-0"
                    )}
                  >
                    <td
                      className={cn(
                        "p-4 text-sm font-semibold",
                        client.call === "Buy" && "text-[#34C759]", // green
                        client.call === "Sell" && "text-[#FF3B30]" // red
                      )}
                    >
                      {client.call}
                    </td>

                    <td className="p-4 text-sm font-medium text-[#101828]">{client.name}</td>
                    <td className="p-4 text-sm font-medium text-[#101828]">{client.version}</td>
                    <td className="p-4 text-sm">{client.entryprice}</td>
                    <td className="p-4 text-sm">{client.targetprice}</td>
                    <td className="p-4 text-sm">{client.stoploss}</td>
                    <td className="p-4 text-sm">{client.riskratio}</td>
                    <td className="p-4 text-sm">{client.timedate}</td>
                    <td className="p-4 text-sm">{client.validity}</td>
                    <td className="p-4 text-sm">{client.shared}</td>
                    <td
                      className={cn(
                        "p-4 text-sm font-semibold",
                        client.status === "Hit" && "text-[#34C759]", // green
                        client.status === "Failed" && "text-[#FF3B30]", // red
                        client.status == "Inactive" && "text-yellow-500" // red
                      )}
                    >
                      {client.status}
                    </td>
                    <td className="p-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[#667085] hover:text-[#101828] hover:bg-[#f9fafb]"
                      >
                        <Edit className="h-4 w-4" />
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
        <div className="flex items-center justify-between mt-1">
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

function TableSkeletonRow() {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: 12 }).map((_, i) => (
        <td key={i} className="p-4 py-6">
          <div className="h-4 w-full rounded-md bg-gray-200" />
        </td>
      ))}
    </tr>
  )
}
