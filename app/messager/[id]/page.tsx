import type { Metadata } from "next"
import { ClientsHeader } from "@/components/clients-header"
import { Messager } from "./components/message"
import { ClientLeftSideBar } from "@/components/client-left-sidebar"

export const metadata: Metadata = {
  title: "Clients - Ethereal Design",
  description: "Manage your clients",
}

import { clientsData } from "@/lib/mock-data"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ClientNotification({ params }: PageProps) {
  const { id } = await params
  const clientData = clientsData.find(c => c.id === id) || clientsData[0]
  
  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <ClientsHeader activeTab="home" />
      <main className="container mx-auto px-6 py-8">
        <ClientLeftSideBar id={id} />
       <Messager name={clientData.name}/>
      </main>
    </div>
  )
}
