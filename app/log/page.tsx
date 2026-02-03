import type { Metadata } from "next"
import { ClientsHeader } from "@/components/clients-header"
import { CallPage } from "@/components/call-page"

export const metadata: Metadata = {
  title: "Clients - Ethereal Design",
  description: "Manage your clients",
}

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <ClientsHeader activeTab="home" />
      <main className="container mx-auto px-6 py-8">
        <CallPage name="PREFERENCE" active="log" />
      </main>
    </div>
  )
}
