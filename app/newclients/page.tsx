import type { Metadata } from "next"
import { ClientsHeader } from "@/components/clients-header"
import { NewClient } from "./components/newclient"

export const metadata: Metadata = {
  title: "Clients - Ethereal Design",
  description: "Manage your clients",
}

export default function NewClientsPage() {
  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <ClientsHeader activeTab="home"/>
      <main className="container mx-auto px-6 py-4">
      </main>
       <NewClient/>
    </div>
  )
}
