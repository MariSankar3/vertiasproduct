"use client"

import { useState } from "react"
import { Users, DownloadIcon, UserIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Card } from "./ui/card"
import Link from "next/link"
import { motion } from "framer-motion"


const clients = [
  {
    calltype: "Sell",
    name: "Megan Lewis",
    versions: 5,
    entryprice: 256.45,
    targetprice: 300.00,
    stoploss: 85.20,
    riskratio: "3:1",
    callprovideddate: "07/11/25"
  },
  {
    calltype: "Sell",
    name: "Megan Lewis",
    versions: 5,
    entryprice: 256.45,
    targetprice: 300.00,
    stoploss: 85.20,
    riskratio: "3:1",
    callprovideddate: "07/11/25"
  },
  {
    calltype: "Sell",
    name: "Megan Lewis",
    versions: 5,
    entryprice: 256.45,
    targetprice: 300.00,
    stoploss: 85.20,
    riskratio: "3:1",
    callprovideddate: "07/11/25"
  },
  {
    calltype: "Sell",
    name: "Megan Lewis",
    versions: 5,
    entryprice: 256.45,
    targetprice: 300.00,
    stoploss: 85.20,
    riskratio: "3:1",
    callprovideddate: "07/11/25"
  },
  {
    calltype: "Sell",
    name: "Megan Lewis",
    versions: 5,
    entryprice: 256.45,
    targetprice: 300.00,
    stoploss: 85.20,
    riskratio: "3:1",
    callprovideddate: "07/11/25"
  },




]


import { clientsData } from "@/lib/mock-data"

export function ClientProfile({ id }: { id?: string }) {
  const [activeTab, setActiveTab] = useState("all")

  // Find client data based on ID, fallback to first mocked client if not found or no ID provided
  // In a real app, you might want to show loading state or 404
  const clientData = clientsData.find(c => c.id === id) || clientsData[0]

  function Section({ title }: { title: string }) {
    return <h3 className="text-lg font-semibold border-b pb-2">{title}</h3>;
  }

  function SubTitle({ title }: { title: string }) {
    return (
      <div className="flex items-center gap-2 mb-1">
        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
          <UserIcon />
        </div>
        <p className="font-semibold text-gray-700">{title}</p>
      </div>
    );
  }

  function InfoBox({ label, value }: { label: string; value: string }) {
    return (
      <div className="p-4 rounded-2xl bg-blue-50 text-sm border border-[#C6E5FF]">
        <p className="text-gray-500 text-xs">{label}</p>
        <p className="font-medium text-gray-700">{value}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-6"
    >

      <div className="min-h-screen bg-gray-100 p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          <div className="bg-white p-6 rounded-xl flex flex-col items-center w-3xs">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              className="w-32 h-32 rounded-full object-cover"
              alt="profile"
            />

            <h2 className="text-xl font-semibold mt-4">{clientData.name}</h2>

            <div className="flex gap-2 mt-2">
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                {clientData.status}
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                {clientData.riskCategory}
              </span>
            </div>

            <div className="w-full mt-6 space-y-3">
              <InfoBox label="Client Type" value="CLT1024 | Entity" />
              <InfoBox label="Age" value="34 | 31 May 1991" />
              <InfoBox label="Occupation" value="IT Professional" />
              <InfoBox label="Annual Income" value="₹75,00,000" />
              <InfoBox label="KYC completed on" value="31 Jun 2025" />
            </div>
          </div>

          <Card>
            <Section title="Basic Info" />

            <SubTitle title="Personal Details" />

            <InfoBox label="Full Name" value={clientData.name} />
            <InfoBox label="Gender" value="Male" />
            <InfoBox label="Date of Birth" value="15-May-1991" />
            <InfoBox label="Profession" value="IT Professional" />
            <InfoBox label="Age" value="34 years" />

            <SubTitle title="KYC Details" />
            <InfoBox label="PAN Number" value="XXXXXX34F" />
            <InfoBox label="Aadhaar Number" value="XXXX XXXX 1234" />
          </Card>

          {/* FINANCIAL INFO */}
          <Card>
            <Section title="Financial Info" />

            <SubTitle title="Income & Wealth" />

            <InfoBox label="Occupation" value="IT Professional" />
            <InfoBox label="Annual Income" value="₹18,00,000" />
            <InfoBox label="Net Worth" value="₹75,00,000" />
            <InfoBox label="Investment Experience" value="Moderate" />
            <InfoBox label="Tax Bracket" value="20%" />

            <SubTitle title="Payment Type" />

            <InfoBox label="Bank Name" value="HDFC Bank" />
            <InfoBox label="Account Number" value="XXXX XXXX 5678" />
            <InfoBox label="IFSC Code" value="HDFC000123" />
          </Card>

          {/* INVESTMENT PREFERENCES */}
          <Card>
            <Section title="Investment Preferences" />

            <SubTitle title="Investment Profile" />
            <InfoBox label="Preferred Segment" value="Equity, Mutual Funds" />
            <InfoBox label="Trading Frequency" value="Weekly" />
            <InfoBox label="Investment Horizon" value="Long Term (5+ years)" />

            <SubTitle title="Risk & Returns" />

            {/* Risk Appetite (colored box) */}
            <div className="p-4 rounded-2xl border-2 border-[#E16448] bg-red-50 text-red-600 text-sm font-medium">
              <p className="text-gray-700 text-xs mb-1">Risk Appetite</p>
              Aggressive
            </div>

            <div className="p-4 rounded-2xl border-2 border-[#007AFF] bg-[#CBE4FF] text-blue-600 text-sm font-medium">
              <p className="text-gray-700 text-xs mb-1">Expected Return Range</p>
              12–15% p.a.
            </div>

          </Card>

          <Card>
            <Section title="Compliance" />
            <SubTitle title="Account Status" />

            <div className="p-4 rounded-2xl border-2 border-[#009D2C] bg-[#DEFFE8] flex items-center gap-3">
              <div className="w-6 h-6 flex items-center justify-center bg-green-500 text-white rounded-full text-xs">
                ✓
              </div>
              <div>
                <p className="text-xs text-gray-600">KYC Status</p>
                <p className="text-green-700 font-semibold">Verified</p>
              </div>
            </div>

            <InfoBox label="SEBI Registration Type" value="Individual" />
            <InfoBox label="Account Opening Date" value="10-Mar-2023" />
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
