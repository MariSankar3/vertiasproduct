"use client"

import { useState } from "react"
import { Users, DownloadIcon, UserIcon, ArrowLeft, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Card } from "./ui/card"
import Link from "next/link"
import { usePathname } from "next/navigation"



const tabs = [
  { key: "userprofile", label: "User Profile", count: 24, href: "/client-profile" },
  { key: "calls", label: "CALLS", count: 24, href: "/clientsprofile-table" },
  { key: "risk", label: "Risk Profile", count: 24, href: "/risk-profile" },
  { key: "consent", label: "Consent", count: 24, href: "/consent" },
  { key: "billing", label: "Billing", count: 24, href: "/billing" },
  { key: "activity", label: "Activity", count: 24, href: "", disabled: true},
];



import { clientsData } from "@/lib/mock-data"

export function ClientLeftSideBar({ id }: { id?: string }) {
  const pathname = usePathname()
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
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between bg-black text-white px-4 h-14 rounded-full mx-4 md:mx-8 lg:mx-0">
          <div className="flex items-center gap-4">
            <Link href="/clients">
              <button
                type="button"
                className="cursor-pointer h-10 w-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-black hover:text-white transition"
                aria-label="Go to dashboard"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
            </Link>
            <h1 className="text-base md:text-lg uppercase">{clientData.name}</h1>
          </div>

        </div>
        <div className="flex items-center gap-4 bg-[#121212] p-1 rounded-full">
          <div className={cn(
             "h-12 w-12 rounded-full border border-gray-400 flex items-center justify-center transition"
           )}>

            <MessageCircle  className="object-contain text-white" />
          </div>



          <Link href="/client-notifications">
          <div className={cn(
             "h-12 w-12 rounded-full border border-gray-400 flex items-center justify-center transition",
             pathname === "/client-notifications" ? "bg-[#A7E55C] border-transparent" : "bg-transparent"
           )}>
            <Image
              src="/noti.svg"
              alt="Dashboard Graph"
              width={20}
              height={20}
              className={cn(
                "object-contain",
                pathname === "/client-notifications" ? "text-white" : "invert")}
            />
          </div>
          </Link>
          <Link href="/activity">
           <div className={cn(
             "h-12 w-12 rounded-full border border-gray-400 flex items-center justify-center transition",
             pathname === "/activity" ? "bg-[#A7E55C] border-transparent" : "bg-transparent"
           )}>
             <Image
              src="/dashboard_icon3.png"
              alt="Dashboard Graph"
              width={20}
              height={20}
              className={cn(
                "object-contain",
                pathname === "/activity" ? "text-black" : "invert"
              )}
             />
           </div>
          </Link>

        </div>

      </div>



      <div className="flex items-center gap-3 mt-2 mb-2 pl-3">
  {tabs.map((tab) => {
    // Dynamically update href for User Profile if ID exists
    const href = tab.key === "userprofile" && id ? `/client-profile/${id}` : tab.href
    
    // Check if active: exact match OR (for userprofile) starts with /client-profile/
    const isActive = pathname === href || (tab.key === "userprofile" && pathname.startsWith("/client-profile/"))

    return (
      <Link
        key={tab.key}
        href={href}
        className={cn(
          "px-6 py-2 rounded-full font-medium border transition border-[#ccc] inline-flex items-center",
          isActive
            ? "bg-[#a7e55c] text-[#121212]"
            : "bg-[#fff] text-[#667085]"
        )}
      >
        {tab.label}
      </Link>
    )
  })}

  <div className="ml-auto flex gap-2">
    <div className="w-14 h-10 bg-white rounded-full border border-gray-400 flex items-center justify-center">
    <DownloadIcon width={18} height={18} />
    </div>
    <div className="bg-[#A7E55C] flex items-center justify-center rounded-full px-4 font-semibold">
      Send link for Risk profile
    </div>
  </div>
</div>

    </div>
  )
}
