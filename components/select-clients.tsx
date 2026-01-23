"use client"

import { SearchIcon } from "lucide-react"
import { useState } from "react"

export function SelectClients() {
  const [] = useState("all")

  function SidebarItem({ label, count }: { label: string; count: number }) {
    return (
      <div className="flex items-center justify-between font-semibold py-2 px-3 rounded-lg hover:bg-gray-100 cursor-pointer">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4" />
          <span>{label}</span>
        </label>
        <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">{count}</span>
      </div>
    );
  }

  function SidebarItemActive({ label, count }: { label: string; count: number }) {
    return (
      <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-lime-300 cursor-pointer">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4" />
          <span className="font-medium text-black">{label}</span>
        </label>
        <span className="text-xs bg-white px-2 py-1 rounded-full">{count}</span>
      </div>
    );
  }

  function ClientCard({ selected = false }: { selected?: boolean }) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer relative">
        <div className="relative">
          <img
            src="/select_client1.png"
            className="w-10 h-10 rounded-full object-cover"
            alt="profile"
          />

          {selected && (
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">
                ✓
              </div>
            </div>
          )}
        </div>

        <div className="flex-1">
          <p className="text-sm font-semibold">Jade Correa</p>
          <p className="text-xs text-green-600">Top Management</p>
        </div>

        <button className="text-gray-500 hover:text-black">⋮</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7]">

      <div className="flex items-center justify-between bg-black text-white px-4 h-14 rounded-full mx-4 md:mx-8">
        <div className="flex items-center gap-4">
          <button className="text-2xl h-10 w-10 rounded-full font-bold text-black bg-white">
            ←
          </button>
          <h1 className="text-base md:text-lg">NEW CALL / SELECT CLIENTS</h1>
        </div>

        <button className="bg-lime-300 text-black px-6 md:px-10 py-2 rounded-full font-semibold">
          Done
        </button>
      </div>

      <div className="min-h-screen bg-gray-50 p-4 md:p-6">

        <div className="flex flex-col lg:flex-row gap-6">

          <div className="w-full lg:w-sm bg-white border border-[#A8A8A8] rounded-xl p-4">
            <div className="flex flex-col gap-3 text-sm">

              <label className="flex items-center gap-2 px-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="font-semibold">Send to Public</span>
              </label>

              <SidebarItem label="All" count={234} />
              <SidebarItem label="Bucket (1)" count={34} />
              <SidebarItem label="Bucket (2)" count={59} />
              <SidebarItemActive label="Bucket (3)" count={89} />
              <SidebarItem label="Custom List 1" count={12} />
              <SidebarItem label="Custom List 2" count={29} />
            </div>
          </div>

          <div className="flex-1 bg-white border border-[#A8A8A8] rounded-xl p-4 md:p-6">

            <h2 className="text-sm font-semibold">SELECTED CLIENTS (1)</h2>

            <div className="mt-4 rounded-lg px-3 py-2 flex items-center border border-gray-300 bg-gray-100">
              <SearchIcon className="w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full outline-none text-sm px-3 bg-transparent"
              />
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <ClientCard key={i} selected={i === 1} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
