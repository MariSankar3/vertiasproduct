"use client";

import { useState } from "react";
import {
  Users,
  Check,
  UserIcon,
  EditIcon,
  DownloadIcon,
  ShareIcon,
  LinkIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";

export function RiskProfileTable() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="p-4  min-h-screen">
        {/* --- TOP CARDS SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* LEFT CARD */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-[#6B03F2] to-[#161616] text-white shadow-md">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <UserIcon className="border border-[#fff] rounded-lg p-1 scale-[1.1]" />
                <h2 className="text-lg font-semibold">
                  Risk Assessment Report
                </h2>
              </div>
              <button className="">•••</button>
            </div>

            <div className="flex items-center justify-between">
              <div className="mt-6">
                <div className="flex">
                  <p className="text-6xl leading-none">82</p>
                  <p className="text-sm mt-9 opacity-80">/100</p>
                </div>
                <p className="text-xs mt-2">Updated: 06 - Oct - 2025</p>
              </div>
              <button className="mt-20 px-4 py-1 rounded-lg bg-white text-black text-sm">
                Maharathi
              </button>
            </div>
          </div>

          {/* MIDDLE CARD */}
          <div className="p-6 rounded-xl bg-white">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#A7E55C] flex items-center justify-center rounded-lg">
                <UserIcon />
              </span>
              Investment Objective
            </h2>

            <div className="text-sm space-y-4">
              <div className="flex items-center gap-12">
                <div className="flex flex-col">
                  <div className="text-gray-500">Primary Goal</div>
                  <div className="font-semibold">Wealth Creation</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-gray-500">Expected Return</div>
                  <div className="font-semibold">12–15%</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-gray-500">Liquidity</div>
                  <div className="font-semibold">Medium</div>
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <div className="text-gray-500">Investment Horizon</div>
                <div className="font-semibold">Long Term (5+ years)</div>
              </div>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="p-6 rounded-xl bg-white">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#A7E55C] flex items-center justify-center rounded-lg">
                  <UserIcon />
                </span>
                Risk Assessment Allocation
              </h2>
              <EditIcon height={20} className="mb-2" />
            </div>

            <div className="text-sm space-y-4">
              <p className="flex justify-between">
                <span className="text-gray-500">Equity</span>{" "}
                <span className="font-semibold">70%</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Mutual Funds</span>{" "}
                <span className="font-semibold">20%</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Debt Instruments</span>{" "}
                <span className="font-semibold">10%</span>
              </p>
            </div>
          </div>
        </div>

        {/* --- QUESTIONNAIRE SECTION --- */}
        <div className="bg-white rounded-xl p-6">
          <div className="flex justify-between items-center border-b border-gray-300 pb-3">
            <h2 className="text-lg font-semibold">Questioner</h2>

            <div className="flex items-center gap-5">
              <div className="border py-1.5 px-2.5 rounded-full">
                <DownloadIcon height={16} />
              </div>
              <div className="border py-1.5 px-2.5 rounded-full">
                <Image src="/repost.svg" alt="repost" width={16} height={16} />
              </div>
              <div className="border py-1.5 px-2.5 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
</svg>
              </div>
              <button className="px-4 py-1 font-semibold rounded-2xl bg-[#A7E55C]">
                Edit Question
              </button>
            </div>
          </div>

          {/* LIST */}
          <div className="mt-4 divide-y">
            {[
              { q: "What is your age group?", a: "41-60" },
              { q: "What is your current employment status?", a: "Salaried" },
              {
                q: "What percentage of income do you invest monthly?",
                a: "24%",
              },
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
                className="grid grid-cols-[1.8fr_1fr_auto] items-center py-4 text-sm"
              >
                {/* LEFT: Question */}
                <p className="text-black font-semibold">
                  <span className="font-medium">Q{index + 1}:</span> {item.q}
                </p>

                {/* MIDDLE: Answer (fixed aligned column) */}
                <div className="flex items-center gap-2 text-black font-semibold">
                  <div className="border border-green-500 p-[1px] rounded">
                  <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="font-medium">{item.a}</span>
                </div>

                {/* RIGHT: Marks */}
                <div className="flex items-center gap-2 justify-end">
                  <span className="border rounded px-2 py-0.5 text-xs font-semibold">
                    Mark: 5
                  </span>
                  <span className="border rounded px-2 py-0.5 text-xs font-semibold">5%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
