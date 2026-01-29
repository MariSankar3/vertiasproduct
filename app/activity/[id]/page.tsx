import type { Metadata } from "next"
import { ClientsHeader } from "@/components/clients-header"
import { Activity } from "@/components/activity"
import { ClientLeftSideBar } from "@/components/client-left-sidebar"
import { clientsData } from "@/lib/mock-data"

export const metadata: Metadata = {
  title: "Clients - Ethereal Design",
  description: "Manage your clients",
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ActivityPage({ params }: PageProps) {
  const { id } = await params
    const clientData = clientsData.find(c => c.id === id) || clientsData[0]
    
  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <ClientsHeader activeTab="home" />
      <main className="container mx-auto px-6 py-8">
        <ClientLeftSideBar id={id} />
      <Activity
  name={clientData.name}
  phone={clientData.phone}
/>

      </main>
    </div>
  )
}
