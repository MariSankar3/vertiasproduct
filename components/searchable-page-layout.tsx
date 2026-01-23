"use client"

import { useState } from "react"
import { CallPage } from "@/components/call-page"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"


interface SearchablePageLayoutProps {
  name: string
  active: "dashboard" | "clients" | "log" | "calls"
  searchSuggestions?: string[]
  ContentComponent: React.ComponentType<{
    searchQuery: string
    statusFilters?: string[]
    categoryFilters?: string[]
  }>
}
const statusStyles: Record<string, string> = {
  Active: "bg-green-100 text-green-700 border-green-300",
  Inactive: "bg-red-100 text-red-700 border-red-300",
  Review: "bg-blue-100 text-blue-700 border-blue-300",
  "KYC Pending": "bg-yellow-100 text-yellow-700 border-yellow-300",
  "Risk Profile": "bg-pink-100 text-pink-700 border-pink-300",
  Hit: "bg-green-100 text-green-700 border-green-300",
  Failed: "bg-red-200 text-red-900 border-red-700",
}

export function SearchablePageLayout({
  name,
  active,
  searchSuggestions,
  ContentComponent,
}: SearchablePageLayoutProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [statusFilters, setStatusFilters] = useState<string[]>([])
  const [categoryFilters, setCategoryFilters] = useState<string[]>([])

  const toggleStatus = (value: string) => {
    setStatusFilters(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    )
  }

  const toggleCategory = (value: string) => {
    setCategoryFilters(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    )
  }

  const handleClear = () => {
    setStatusFilters([])
    setCategoryFilters([])
    setIsFilterOpen(false)
  }

  const handleApply = () => {
    setIsFilterOpen(false)
  }

  const showFilter = active === "clients" || active === "calls"

  const statusOptions =
    active === "clients"
      ? ["Active", "Inactive", "Review", "KYC Pending", "Risk Profile"]
      : ["Hit", "Failed", "Inactive"]

  const categoryOptions =
    active === "clients"
      ? ["Rathi", "AtiRathi", "MahaRathi"]
      : ["Buy", "Sell"]

  const hasActiveFilter = statusFilters.length > 0 || categoryFilters.length > 0

  return (
    <>
      <CallPage
        name={name}
        active={active}
        onSearch={setSearchQuery}
        searchSuggestions={searchSuggestions}
        onFilterClick={showFilter ? () => setIsFilterOpen(true) : undefined}
        hasActiveFilter={showFilter ? hasActiveFilter : false}
      />

      <ContentComponent
        searchQuery={searchQuery}
        statusFilters={statusFilters}
        categoryFilters={categoryFilters}
      />



      {showFilter && isFilterOpen && (
        <div className="fixed inset-0 z-40 flex items-start justify-center bg-black/30 pt-24">
          <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl mt-25 ml-110">
            <div className="flex items-center justify-between px-6 pt-6">
              <h2 className="text-2xl font-semibold text-[#101828]">Filter</h2>
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 border-t w-[90%] mx-auto border-gray-300" />

            <div className="space-y-6 px-6 py-6">
              <div>
                <p className="mb-3 text-sm font-semibold text-[#101828]">
                  {active === "clients" ? "Status" : "Call Status"}
                </p>
                <div className="grid grid-cols-3 gap-y-6 gap-x-2">
                  {statusOptions.map(option => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center gap-3"
                    >
                      <Checkbox
                        className="cursor-pointer border-black border-1"
                        checked={statusFilters.includes(option)}
                        onCheckedChange={() => toggleStatus(option)}
                      />
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                          statusStyles[option] ?? "bg-gray-100 text-gray-500 border-gray-300"
                        )}
                      >
                        {option}
                      </span>


                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-[#101828]">
                  {active === "clients" ? "Category" : "Call Type"}
                </p>
                <div className="grid grid-cols-3 gap-y-6 gap-x-2">
                  {categoryOptions.map(option => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center gap-3"
                    >
                      <Checkbox
                        className="cursor-pointer border-black border-1"
                        checked={categoryFilters.includes(option)}
                        onCheckedChange={() => toggleCategory(option)}
                      />
                      <span className="inline-flex items-center rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-[#101828]">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between border-t border-gray-200 px-6 py-4">
              <Button
                variant="outline"
                className="cursor-pointer rounded-full border-[#d0d5dd] px-6 text-sm font-medium text-[#101828]"
                onClick={handleClear}
              >
                Clear
              </Button>
              <Button
                className="cursor-pointer rounded-full bg-[#a7e55c] px-8 text-sm font-semibold text-[#121212] hover:bg-[#95d04a]"
                onClick={handleApply}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}


    </>
  )
}
