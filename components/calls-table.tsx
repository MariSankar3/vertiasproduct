"use client"

import { useState } from "react"
import { Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Image from "next/image"
// import { count } from "console"

import { callsData } from "@/lib/mock-data"

const clients = callsData

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white space-y-6 mt-4 rounded-2xl border-1">


      <div className="flex items-center gap-3 mt-2 mb-2 pl-3">
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

      <div className="border border-[#eaecf0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>

              </tr>
              <tr className="border-b border-[#eaecf0]">

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
              {filteredClients.length === 0 ? (
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
                filteredClients.map((client, index) => (
                  <tr
                    key={index}
                    className={cn(
                      "border-b border-[#eaecf0] hover:bg-[#f9fafb] transition",
                      index === filteredClients.length - 1 && "border-0"
                    )}
                  >
                    <td className="p-4 text-sm font-semibold text-[#34C759]">{client.call}</td>
                    <td className="p-4 text-sm font-medium text-[#101828]">{client.name}</td>
                    <td className="p-4 text-sm font-medium text-[#101828]">{client.version}</td>
                    <td className="p-4 text-sm">{client.entryprice}</td>
                    <td className="p-4 text-sm">{client.targetprice}</td>
                    <td className="p-4 text-sm">{client.stoploss}</td>
                    <td className="p-4 text-sm">{client.riskratio}</td>
                    <td className="p-4 text-sm">{client.timedate}</td>
                    <td className="p-4 text-sm">{client.validity}</td>
                    <td className="p-4 text-sm">{client.shared}</td>
                    <td className="p-4 text-sm font-semibold text-[#FF3B30]">{client.status}</td>
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
    </motion.div>
  )
}
