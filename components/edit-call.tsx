"use client"

import { Search, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { callsData } from "@/lib/mock-data"
import {motion} from "framer-motion"
import { useRouter } from "next/navigation"

interface EditCallProps {
    id: string
}

export function EditCall({ id }: EditCallProps) {
    const router = useRouter()
    // Find the call data
    const callData = callsData.find((c) => c.id === id)

    if (!callData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7]">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">Call Not Found</h2>
                    <Link href="/calls">
                        <button className="text-blue-600 hover:underline">Return to Calls</button>
                    </Link>
                </div>
            </div>
        )
    }

    // Parse dates if needed, formatted for date input YYYY-MM-DD
    const formatDateForInput = (dateString: string) => {
        // Assuming format "DD-Mon-YYYY, HH:MM AM" or similar
        // This simple parsing might fail if format is complex. 
        // Given the mock-data format: "21-Oct-2025, 09:25 AM"
        // We can try to parse it.
        try {
            const datePart = dateString.split(',')[0]
            const date = new Date(datePart)
            if (Number.isNaN(date.getTime())) return ""
            return date.toISOString().split('T')[0]
        } catch (e) {
            return ""
        }
    }

    return (
        <motion.div 
         initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-[#f7f7f7]">
            <div className="flex items-center justify-between bg-black text-white px-2 h-14 rounded-full mx-8">
                <div className="flex items-center gap-4">
                    <Link href="/calls">
                        <button
                            type="button"
                            className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-black hover:text-white transition cursor-pointer"
                            aria-label="Go to dashboard"
                        >
                            <ArrowLeft className="h-6 w-6" />
                        </button>
                    </Link>
                    <h1 className="text-lg">EDIT CALL</h1>
                </div>
                <button className="bg-lime-300 text-black px-10 py-2 rounded-full font-semibold">
                    Save Changes
                </button>
            </div>
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex gap-6 px-6 py-6">
                    <div className="flex flex-col gap-4 w-1/2">

                        <div className="bg-white border border-[#A8A8A8] rounded-xl border p-2">
                            <p className="text-xs text-gray-500 px-4">Call Title</p>
                            <input
                                type="text"
                                className="w-full mt-1 rounded-md text-[#1D2939] font-semibold focus:outline-none focus:ring-0 p-2 text-sm px-4"
                                defaultValue={callData.name + " - " + callData.call} // Constructing title as placeholder
                            />
                        </div>

                        <div className="bg-white border border-[#A8A8A8] rounded-xl border p-2">
                            <p className="text-xs text-gray-500 px-4">Instrument Name</p>
                            <div className="flex items-center justify-between">
                                <input
                                    type="text"
                                    className="w-full mt-1 rounded-md text-[#1D2939] font-semibold focus:outline-none focus:ring-0 p-2 text-sm px-4"
                                    defaultValue={callData.name}
                                />
                                <button className="text-gray-500 text-lg ml-2"><Search /></button>
                            </div>
                        </div>

                        <div className="bg-white border border-[#A8A8A8] rounded-xl border p-2">
                            <p className="text-xs text-gray-500 px-4">Term</p>
                            <input
                                type="text"
                                className="w-full mt-1 rounded-md text-[#1D2939] font-semibold focus:outline-none focus:ring-0 p-2 text-sm px-4"
                                defaultValue={callData.validity} // Using validity as term proxy or placeholder
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white border border-[#A8A8A8] rounded-xl border p-2">
                                <p className="text-xs text-gray-500 px-4">BUY/SELL</p>
                                <input
                                    type="text"
                                    className="w-full mt-1 rounded-md text-[#1D2939] font-semibold focus:outline-none focus:ring-0 p-2 text-sm px-4"
                                    defaultValue={callData.call}
                                />
                            </div>
                            <div className="bg-white border border-[#A8A8A8] rounded-xl border p-2">
                                <p className="text-xs text-gray-500 px-4">Validity Date</p>
                                <input
                                    type="date"
                                    className="w-full mt-1 rounded-md text-[#1D2939] font-semibold focus:outline-none focus:ring-0 p-2 text-sm px-4"
                                    defaultValue={formatDateForInput(callData.timedate)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white border border-[#A8A8A8] rounded-xl border p-2">
                                <p className="text-xs text-gray-500 px-4">Entry Price</p>
                                <input
                                    type="number"
                                    className="w-full mt-1 rounded-md text-[#1D2939] font-semibold focus:outline-none focus:ring-0 p-2 text-sm px-4"
                                    defaultValue={callData.entryprice}
                                />
                            </div>
                            <div className="bg-white border border-[#A8A8A8] rounded-xl border p-2">
                                <p className="text-xs text-gray-500 px-4">SL</p>
                                <input
                                    type="number" // stoploss in mock data is string "78.00"
                                    className="w-full mt-1 rounded-md text-[#1D2939] font-semibold p-2 text-sm px-4 focus:outline-none focus:ring-0"
                                    defaultValue={parseFloat(callData.stoploss)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white border border-[#A8A8A8] rounded-xl border p-2">
                                <p className="text-xs text-gray-500 px-4">Target Price</p>
                                <input
                                    type="number" // targetprice is string "120.00"
                                    className="w-full mt-1 rounded-md text-[#1D2939] font-semibold focus:outline-none focus:ring-0 p-2 text-sm px-4"
                                    defaultValue={parseFloat(callData.targetprice)}
                                />
                            </div>
                            <div className="bg-white border border-[#A8A8A8] rounded-xl border p-2">
                                <p className="text-xs text-gray-500 px-4">Target Price 2</p>
                                <input
                                    type="number"
                                    className="w-full mt-1 rounded-md text-[#1D2939] font-semibold focus:outline-none focus:ring-0 p-2 text-sm px-4"
                                    defaultValue="" // Placeholder
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white border border-[#A8A8A8] rounded-xl border p-2">
                                <p className="text-xs text-gray-500 px-4">Target Price 3</p>
                                <input
                                    type="number"
                                    className="w-full mt-1 rounded-md text-[#1D2939] font-semibold focus:outline-none focus:ring-0 p-2 text-sm px-4"
                                    defaultValue="" // Placeholder
                                />
                            </div>
                            <div className="bg-white border border-[#A8A8A8] rounded-xl border p-2">
                                <p className="text-xs text-gray-500 px-4">Quantity</p>
                                <input
                                    type="number"
                                    className="w-full mt-1 rounded-md text-[#1D2939] font-semibold focus:outline-none focus:ring-0 p-2 text-sm px-4"
                                    defaultValue="" // Placeholder
                                />
                            </div>
                        </div>

                    </div>

                    <div className="w-1/2 bg-white border border-[#A8A8A8] rounded-xl border p-6">
                        <h2 className="font-semibold text-[#1D2939]">RESEARCH DOCUMENT</h2>
                        <p className="text-xs text-gray-500 mt-1">TEXT EDITOR</p>

                        <textarea
                            className="mt-4 h-[500px] w-full rounded-lg p-4 text-gray-600 resize-none focus:outline-none focus:ring-0"
                            defaultValue={`Research notes for ${callData.name}...`}
                        />
                    </div>
                </div>
            </div>

        </motion.div>
    )
}
