"use client";

import { useState } from "react";
import { Users, DownloadIcon, UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";

const clients = [
  {
    calltype: "Sell",
    name: "Megan Lewis",
    versions: 5,
    entryprice: 256.45,
    targetprice: 300.0,
    stoploss: 85.2,
    riskratio: "3:1",
    callprovideddate: "07/11/25",
  },
  {
    calltype: "Sell",
    name: "Megan Lewis",
    versions: 5,
    entryprice: 256.45,
    targetprice: 300.0,
    stoploss: 85.2,
    riskratio: "3:1",
    callprovideddate: "07/11/25",
  },
  {
    calltype: "Sell",
    name: "Megan Lewis",
    versions: 5,
    entryprice: 256.45,
    targetprice: 300.0,
    stoploss: 85.2,
    riskratio: "3:1",
    callprovideddate: "07/11/25",
  },
  {
    calltype: "Sell",
    name: "Megan Lewis",
    versions: 5,
    entryprice: 256.45,
    targetprice: 300.0,
    stoploss: 85.2,
    riskratio: "3:1",
    callprovideddate: "07/11/25",
  },
  {
    calltype: "Sell",
    name: "Megan Lewis",
    versions: 5,
    entryprice: 256.45,
    targetprice: 300.0,
    stoploss: 85.2,
    riskratio: "3:1",
    callprovideddate: "07/11/25",
  },
];

import { clientsData } from "@/lib/mock-data";

export function ClientProfile({ id }: { id?: string }) {
  const [activeTab, setActiveTab] = useState("all");

  const clientData = clientsData.find((c) => c.id === id) || clientsData[0];

  function Section({ title }: { title: string }) {
    return <h3 className="text-lg font-semibold border-b pb-3">{title}</h3>;
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
      <div className="p-4 rounded-2xl bg-[#EFF8FF] text-sm border border-[#C6E5FF]">
        <p className="text-[#515151] font-inter text-xs">{label}</p>
        <p className="font-semibold text-black pt-[5px]">{value}</p>
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
      <div className="min-h-screen  py-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="bg-white p-6 rounded-xl flex flex-col items-center w-4xs">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              className="w-32 h-32 rounded-full object-cover"
              alt="profile"
            />

            <h2 className="text-[20px] font-bold mt-4">{clientData.name}</h2>

            <div className="flex gap-2 mt-2">
              <span
                className={`px-3 py-1 text-xs rounded-full border
    ${
      clientData.status === "Active"
        ? "bg-green-100 text-green-700 border-green-700"
        : clientData.status === "Inactive"
          ? "bg-red-100 text-red-700 border-red-700"
          : clientData.status === "KYC Pending"
            ? "bg-orange-100 text-orange-700 border-orange-700"
            : clientData.status === "Risk Profile"
              ? "bg-pink-100 text-pink-700 border-pink-700"
              : clientData.status === "Review"
                ? "bg-blue-100 text-blue-700 border-blue-700"
                : "bg-gray-100 text-gray-700 border-gray-700"
    }
  `}
              >
                {clientData.status}
              </span>

              <span className="px-3 py-1 bg-purple-200 text-purple-900 text-xs rounded-full border border-purple-900">
                {clientData.riskCategory}
              </span>
            </div>
           {clientData.status === "Risk Profile" && (
  <div className="px-3 py-1 mt-5 bg-red-100 text-[#D61E1E] font-semibold text-sm rounded-full flex items-center gap-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      className="fill-red-600"
      viewBox="0 0 16 16"
    >
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
      <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
    </svg>
    Risk profile expiring in 7 days
  </div>
)}


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

            <div className="flex flex-col gap-2 bg-[#F5F5F5] p-3 rounded-xl border border-[#515151]">
              <div className="p-1 text-black text-sm font-semibold">
                <p className="text-gray-600 text-xs mb-1">Bank Name</p>
                HDFC Bank
              </div>
              <div className="p-1 text-black text-sm font-semibold">
                <p className="text-gray-600 text-xs mb-1">Account Number</p>
                XXXX XXXX 5678
              </div>
              <div className="p-1 text-black text-sm font-semibold">
                <p className="text-gray-600 text-xs mb-1">IFSC Code</p>
                HDFC000123
              </div>
            </div>
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
            <div className="p-4 rounded-2xl border-2 border-[#E16448] bg-red-50 text-[#E16448] text-sm font-medium">
              <p className="text-gray-700 text-xs mb-1">Risk Appetite</p>
              Aggressive
            </div>

            <div className="p-4 rounded-2xl border-2 border-[#007AFF] bg-[#CBE4FF] text-blue-600 text-sm font-medium">
              <p className="text-gray-700 text-xs mb-1">
                Expected Return Range
              </p>
              12–15% p.a.
            </div>
          </Card>

          <Card>
            <Section title="Compliance" />
            <SubTitle title="Account Status" />

            <div className="p-4 rounded-2xl border-2 border-[#009D2C] bg-[#DEFFE8] flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 16 16"
                fill="green"
              >
                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
              </svg>
              <div>
                <p className="text-xs text-gray-600">KYC Status</p>
                <p className="text-[#009D2C] font-semibold">Verified</p>
              </div>
            </div>

            <InfoBox label="SEBI Registration Type" value="Individual" />
            <InfoBox label="Account Opening Date" value="10-Mar-2023" />
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
