"use client"

import { useState } from "react"
import { Users, Check, UserIcon, EditIcon, DownloadIcon, ShareIcon, LinkIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { motion } from "framer-motion"


export function RiskProfileTable() {
  const [activeTab, setActiveTab] = useState("all")

  return (
      <motion.div
initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }} className="space-y-6">

      <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
        {/* --- TOP CARDS SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* LEFT CARD */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-purple-900 to-purple-600 text-white shadow-md">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <UserIcon className="border border-[#fff] rounded-lg p-1" />
                <h2 className="text-lg font-semibold">Risk Assessment Report</h2>
              </div>
              <button className="text-2xl">•••</button>
            </div>

            <div className="flex items-center justify-between">
              <div className="mt-6">
                <div className="flex">
                  <p className="text-6xl leading-none">82</p>
                  <p className="text-sm mt-9 opacity-80">/100</p>
                </div>
                <p className="text-xs mt-2 opacity-80">Updated: 06 - Oct - 2025</p>
              </div>
              <button className="mt-5 px-4 py-1 rounded-lg bg-white text-black text-sm">
                Maharathi
              </button>
            </div>
          </div>

          {/* MIDDLE CARD */}
          <div className="p-6 rounded-xl bg-white shadow-md">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#A7E55C] flex items-center justify-center rounded-lg">
                <UserIcon />
              </span>
              Investment Objective
            </h2>

            <div className="text-sm">
              <div className="flex items-center gap-12">
                <div className="flex flex-col">
                  <div className="text-gray-500">Primary Goal:</div>
                  <div className="font-semibold">Wealth Creation</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-gray-500">Expected Return:</div>
                  <div className="font-semibold">12–15%</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-gray-500">Liquidity:</div>
                  <div className="font-semibold">Medium</div>
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <div className="text-gray-500">Investment Horizon:</div>
                <div className="font-semibold">Long Term (5+ years)</div>
              </div>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="p-6 rounded-xl bg-white shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#A7E55C] flex items-center justify-center rounded-lg">
                  <UserIcon />
                </span>
                Risk Assessment Allocation
              </h2>
              <EditIcon height={20} />
            </div>

            <div className="text-sm space-y-2">
              <p className="flex justify-between">
                <span className="text-gray-500">Equity</span> <span className="font-semibold">70%</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Mutual Funds</span> <span className="font-semibold">20%</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Debt Instruments</span> <span className="font-semibold">10%</span>
              </p>
            </div>
          </div>
        </div>

        {/* --- QUESTIONNAIRE SECTION --- */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center border-b pb-3">
            <h2 className="text-lg font-semibold">Questioner</h2>

            <div className="flex items-center gap-8">
              <div className="border py-1 px-2 rounded-full">
                <DownloadIcon height={16} />
              </div>
              <div className="border py-1 px-2 rounded-full">
                <LinkIcon height={16} />
              </div>
              <div className="border py-1 px-2 rounded-full">
                <ShareIcon height={16} />
              </div>
              <button className="px-4 py-1 rounded-2xl bg-lime-500 hover:bg-lime-600">
                Edit Question
              </button>
            </div>
          </div>

          {/* LIST */}
          <div className="mt-4 divide-y">
            {[
              { q: "What is your age group?", a: "41-60" },
              { q: "What is your current employment status?", a: "Salaried" },
              { q: "What percentage of income do you invest monthly?", a: "24%" },
              {
                q: "What is your approximate annual income range?",
                a: "75,00,000 - 80,00,000",
              },
              {
                q: "Do you have major financial obligations?",
                a: "No",
              },
              {
                q: "How many years of investment experience?",
                a: "2 Years",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="py-4 flex justify-between items-center text-sm"
              >
                <p className="text-gray-700">
                  <span className="font-semibold">Q{index + 1}:</span> {item.q}
                </p>

                <div className="flex items-center gap-3">
                  <Check className="text-green-600 w-5 h-5" />
                  <span className="font-semibold">{item.a}</span>

                  {/* tags */}
                  <button className="border px-2 py-0.5 rounded text-xs">Mark: 5</button>
                  <button className="border px-2 py-0.5 rounded text-xs">5%</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </motion.div>
  )
}
