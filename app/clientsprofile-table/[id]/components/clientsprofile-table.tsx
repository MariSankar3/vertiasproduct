"use client";

import { useState } from "react";
import { Users, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";

const clients = [
  {
    calltype: "Long",
    name: "Megan Lewis",
    versions: 5,
    entryprice: 256.45,
    targetprice: 300.0,
    stoploss: 85.2,
    riskratio: "3:1",
    callprovideddate: "07/11/2025",
  },
  {
    calltype: "Short",
    name: "Megan Lewis",
    versions: 5,
    entryprice: 256.45,
    targetprice: 300.0,
    stoploss: 85.2,
    riskratio: "3:1",
    callprovideddate: "07/11/2025",
  },
  {
    calltype: "Short",
    name: "Megan Lewis",
    versions: 5,
    entryprice: 256.45,
    targetprice: 300.0,
    stoploss: 85.2,
    riskratio: "3:1",
    callprovideddate: "07/11/2025",
  },
  {
    calltype: "Short",
    name: "Megan Lewis",
    versions: 5,
    entryprice: 256.45,
    targetprice: 300.0,
    stoploss: 85.2,
    riskratio: "3:1",
    callprovideddate: "07/11/2025",
  },
  {
    calltype: "Long",
    name: "Megan Lewis",
    versions: 5,
    entryprice: 256.45,
    targetprice: 300.0,
    stoploss: 85.2,
    riskratio: "3:1",
    callprovideddate: "07/11/2025",
  },
];

const statusColors: Record<string, string> = {
  Active: "bg-[#ecfdf3] text-[#067647] border-[#abefc6]",
  Review: "bg-[#eff8ff] text-[#175cd3] border-[#b2ddff]",
  "KYC Pending": "bg-[#fef6ee] text-[#b93815] border-[#f9dbaf]",
  "Risk Profile": "bg-[#fdf2fa] text-[#c11574] border-[#fcceee]",
  Inactive: "bg-[#fef3f2] text-[#b42318] border-[#fecdca]",
};

export function ClientsProfileTable() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-6 mt-8"
    >
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-[#eaecf0] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#eaecf0]">
                  <th className="text-left p-4 text-xs font-semibold text-[#101828] uppercase tracking-wider">
                    Call Type
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-[#101828] uppercase tracking-wider">
                    Stock Name
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-[#101828] uppercase tracking-wider">
                    Versions
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-[#101828] uppercase tracking-wider">
                    Entry Price
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-[#101828] uppercase tracking-wider">
                    Target Price
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-[#101828] uppercase tracking-wider">
                    Stop Loss
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-[#101828] uppercase tracking-wider">
                    Risk Ratio
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-[#101828] uppercase tracking-wider">
                    Call Provided Date
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-[#101828] uppercase tracking-wider">
                    More
                  </th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, index) => (
                  <tr
                    // key={client.id}
                    className={cn(
                      "border-b border-[#eaecf0] hover:bg-[#f9fafb] transition",
                      index === clients.length - 1 && "border-0",
                    )}
                  >
                    <td
                      className={cn(
                        "p-4 text-sm font-medium",
                        client.calltype === "Short"
                          ? "text-red-600"
                          : client.calltype === "Long"
                            ? "text-green-600"
                            : "text-[#101828]",
                      )}
                    >
                      {client.calltype}
                    </td>

                    <td className="p-4 text-sm text-[#101828]">
                      {client.name}
                    </td>
                    <td className="p-4">{client.versions}</td>
                    <td className="p-4">{client.entryprice}</td>
                    <td className="p-4">{client.targetprice}</td>
                    <td className="p-4 text-sm text-[#475467]">
                      {client.stoploss}
                    </td>
                    <td className="p-4 text-sm text-[#475467]">
                      {client.riskratio}
                    </td>
                    <td className="p-4 text-sm text-[#475467]">
                      {client.callprovideddate}
                    </td>
                    <td className="p-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[#101828] hover:text-[#101828] hover:bg-[#f9fafb]"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
