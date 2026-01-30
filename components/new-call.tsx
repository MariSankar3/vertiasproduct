"use client"

import { Search,ArrowLeft } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"





export function NewCall() {
  const [] = useState("all")

  return (
      <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}className="min-h-screen bg-[#f7f7f7]">
      <div className="flex items-center justify-between bg-black text-white px-2 h-14 rounded-full mx-8">
        <div className="flex items-center gap-4">
          <Link href="/calls">
  <button
    type="button"
    className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center transition cursor-pointer hover:scale-[1.03]"
    aria-label="Go to dashboard"
  >
    <ArrowLeft className="h-6 w-6" />
  </button>
</Link>
          <h1 className="text-xl font-medium">NEW CALL</h1>
        </div>
        <button className="bg-lime-300 text-black px-14 py-2 rounded-full font-semibold">
          Next
        </button>
      </div>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-6 px-6 py-6">
          <div className="flex flex-col gap-4 w-1/2">

            <div className="bg-white border border-[#A8A8A8] rounded-xl border p-2 py-4">
              <p className="text-sm text-gray-500 px-4">Call Title</p>
              <input
                type="text"
                className="w-full mt-1 rounded-md text-[#1D2939] font-semibold focus:outline-none placeholder:text-gray-700 focus:ring-0 text-sm px-4"
                placeholder="Enter"
              />
            </div>

            <div className="bg-white border border-[#A8A8A8] rounded-xl border p-2 py-4">
              <p className="text-sm text-gray-500 px-4">Instrument Name</p>
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  className="w-full mt-1 rounded-md text-[#1D2939] font-semibold focus:outline-none placeholder:text-gray-700 focus:ring-0 text-sm px-4"
                  placeholder="Search"
                />
                <button className="text-gray-500 text-lg mr-2"><Search /></button>
              </div>
            </div>

            <div className="bg-white border border-[#A8A8A8] rounded-xl border p-2 py-4">
              <p className="text-sm text-gray-500 px-4">Intera \ Short term \ Long term</p>
              <div className="flex items-center justify-between">
              <input
                type="text"
                className="w-full mt-1 rounded-md text-[#1D2939] font-semibold focus:outline-none placeholder:text-gray-700 focus:ring-0 text-sm px-4"
                placeholder="Search"
              />
               <button className="text-gray-500 text-lg mr-2"><Search /></button>
                 </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-[#A8A8A8] rounded-xl border p-2 py-4">
                <p className="text-sm text-gray-500 px-4">Buy/Sell</p>
                <input
                  type="text"
                  className="w-full mt-1 rounded-md text-[#1D2939] font-semibold focus:outline-none focus:ring-0 text-sm px-4 placeholder:text-gray-700"
                  placeholder="Buy"
                />
              </div>
              <div className="bg-white border border-[#A8A8A8] rounded-xl border p-2 py-4">
                <p className="text-sm text-gray-500 px-4">Validity Date</p>
                <input
                  type="date"
                  className="w-full mt-1 rounded-md text-[#1D2939] font-semibold focus:outline-none focus:ring-0 placeholder:text-gray-700 text-sm px-4"
                  placeholder="2026-05-31"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-[#A8A8A8] rounded-xl border p-2 py-4">
                <p className="text-sm text-gray-500 px-4">Entry Price</p>
                <input
                  type="number"
                  className="w-full mt-1 rounded-md text-[#1D2939] font-semibold focus:outline-none focus:ring-0 text-sm px-4"
                  defaultValue={121.03}
                />
              </div>
              <div className="bg-white border border-[#A8A8A8] rounded-xl border p-2 py-4">
                <p className="text-sm text-gray-500 px-4">SL</p>
                <input
                  type="number"
                  className="w-full mt-1 rounded-md text-[#1D2939] font-semibold placeholder:text-gray-700 text-sm px-4 focus:outline-none focus:ring-0"
                  defaultValue={110}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-[#A8A8A8] rounded-xl border p-2 py-4">
                <p className="text-sm text-gray-500 px-4">Target Price</p>
                <input
                  type="number"
                  className="w-full mt-1 rounded-md text-[#1D2939] font-semibold focus:outline-none focus:ring-0 text-sm px-4"
                  defaultValue={148}
                />
              </div>
              <div className="bg-white border border-[#A8A8A8] rounded-xl border p-2 py-4">
                <p className="text-sm text-gray-500 px-4">Target Price 2</p>
                <input
                  type="number"
                  className="w-full mt-1 rounded-md text-[#1D2939] font-semibold focus:outline-none focus:ring-0 text-sm px-4"
                  defaultValue={153}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-[#A8A8A8] rounded-xl border p-2 py-4">
                <p className="text-sm text-gray-500 px-4">Target Price 3</p>
                <input
                  type="number"
                  className="w-full mt-1 rounded-md text-[#1D2939] font-semibold focus:outline-none focus:ring-0 text-sm px-4"
                  defaultValue={171}
                />
              </div>
              <div className="bg-white border border-[#A8A8A8] rounded-xl border p-2 py-4">
                <p className="text-sm text-gray-500 px-4">Quantity</p>
                <input
                  type="number"
                  className="w-full mt-1 rounded-md text-[#1D2939] font-semibold focus:outline-none focus:ring-0 text-sm px-4"
                  defaultValue={123}
                />
              </div>
            </div>

          </div>

          <div className="w-1/2 bg-white border border-[#A8A8A8] rounded-xl border p-6 pt-8">
            <h2 className="font-semibold text-[#1D2939]">RESEARCH DOCUMENT</h2>
            <p className="text-xs text-gray-500 mt-1">TEXT EDITOR</p>

            <textarea
              className="mt-4 h-[500px] w-full rounded-lg p-4 text-gray-600 resize-none focus:outline-none focus:ring-0"
              defaultValue=""
            />
          </div>
        </div>
      </div>

    </motion.div>
  )
}
