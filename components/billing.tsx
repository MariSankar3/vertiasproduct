"use client"

import { useState } from "react"
import { DownloadIcon, EditIcon, FileIcon, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { motion } from "framer-motion"


const INVOICES = [
  { id: 1, date: "Sep 25, 2025", status: "Paid", freq: "Monthly", highlighted: false },
  { id: 2, date: "Oct 25, 2025", status: "Pending", freq: "Monthly", highlighted: false },
  { id: 3, date: "Nov 25, 2025", status: "Overdue", freq: "Monthly", highlighted: false },
  { id: 4, date: "Dec 25, 2025", status: "Paid", freq: "Yearly", highlighted: false },
];


export function Billing() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedId, setSelectedId] = useState<number | null>(3);

  const selected = INVOICES.find((i) => i.id === selectedId) ?? INVOICES[0];

  return (
     <motion.div
initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }} className="space-y-6">

      <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Invoice List (spans 2 columns on large screens) */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Invoices</h3>

              <div className="flex items-center gap-3">
                <button className="py-1 px-2 rounded-full border" aria-label="download all">
                  <DownloadIcon height={16} />
                </button>
                <button className="px-4 py-1 bg-[#A7E55C]  rounded-2xl text-sm">
                  Edit Subscription
                </button>
              </div>
            </div>

            <ul className="mt-6 space-y-3 border-t">
              {INVOICES.map((inv) => (
                <li
                  className={[
                    "flex items-center justify-between p-4 rounded-lg cursor-pointer border-b mb-0",
                    inv.id === selectedId ? "bg-blue-50 border border-blue-100" : "hover:bg-gray-50",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4"
                    />

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800">{inv.date}</span>
                        <div className="text-xs px-2 py-1 rounded-lg border text-center flex items-center gap-2">
                          <div className="bg-[#17B26A] w-2 h-2 rounded-full"></div>
                          <span
                            className={[
                              "",
                              inv.status === "Paid" ? "" : "",
                              inv.status === "Pending" ? "" : "",
                              inv.status === "Overdue" ? "" : "",
                            ].join(" ")}
                          >
                            {inv.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                      <p className="text-sm text-gray-500 mt-1">{inv.freq}</p>
                    <button className="p-2 rounded text-gray-600 hover:bg-gray-100" title="edit">
                      <EditIcon />
                    </button>
                    <button className="p-2 rounded text-gray-600 hover:bg-gray-100" title="download">
                      <DownloadIcon />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: Detail Panel */}
          <aside className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Using provided local path for image */}
                <div className="w-12 h-12 rounded-full bg-green-50 object-cover flex items-center justify-center">
                  <FileIcon  className="text-green-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Monthly invoice <span className="ml-2 text-xs px-2 border text-green-700 rounded-lg">Paid</span></p>
                  <p className="text-xs text-gray-500">Invoice date {selected.date}</p>
                </div>
              </div>

              <button
                className="text-gray-400 hover:text-gray-700"
                aria-label="close"
              >
                ✕
              </button>
            </div>

            <div className="border-t mt-6 pt-6 space-y-4 text-sm text-gray-700">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Due date</p>
                  <p className="font-medium">September 25, 2025</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <p className="font-medium">Paid</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Invoice number</p>
                  <p className="font-medium text-blue-600">93E29A9E-0009</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Payment method</p>
                  <p className="font-medium">VISA 1175</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="font-medium">Renewing monthly seats</p>
                <p className="text-xs text-gray-500 mt-1">
                  Assigned monthly seats that renewed for September 25, 2025 - October 25, 2025.
                </p>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>1 Full</span>
                    <span>$15.00</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>0 Dev</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>0 Collab</span>
                    <span>$0.00</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$15.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between font-semibold mt-3">
                  <span>Total</span>
                  <span>$15.00</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

      </div>


    </motion.div>
  )
}
