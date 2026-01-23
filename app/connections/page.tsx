import type { Metadata } from "next"
import { ClientsHeader } from "@/components/clients-header"

export const metadata: Metadata = {
  title: "Clients - Ethereal Design",
  description: "Manage your clients",
}

export default function Connections() {
  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <ClientsHeader activeTab="connections"/>
      <main className="container mx-auto px-6 py-8">
     
      </main>
    </div>
  )
}
