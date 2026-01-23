import type { Metadata } from "next"
import { ClientsHeader } from "@/components/clients-header"
import { ClientsProfileTable } from "@/components/clientsprofile-table"
import { ClientProfile } from "@/components/client-profile"
import { ClientLeftSideBar } from "@/components/client-left-sidebar"

export const metadata: Metadata = {
  title: "Clients - Ethereal Design",
  description: "Manage your clients",
}

export default function ClientProfilePage() {
  return (
    <div className="min-h-screen bg-[#f6f6f6]">
       <ClientsHeader activeTab="home" />
      <main className="container mx-auto px-6 py-8">
        <ClientLeftSideBar />
        <ClientProfile />
      </main>
    </div>
  )
}
