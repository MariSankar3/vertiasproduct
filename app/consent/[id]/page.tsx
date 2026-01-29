import type { Metadata } from "next"
import { ClientsHeader } from "@/components/clients-header"
import  ConsentTable from "@/components/consent-table"
import { ClientLeftSideBar } from "@/components/client-left-sidebar"

export const metadata: Metadata = {
  title: "Clients - Ethereal Design",
  description: "Manage your clients",
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function Consent({ params }: PageProps) {
    const { id } = await params
    return (
        <div className="min-h-screen bg-[#f6f6f6]">
      <ClientsHeader activeTab="home" />
      <main className="container mx-auto px-6 py-8">
        <ClientLeftSideBar id={id} />
         <ConsentTable/>
      </main>
    </div>
    );
}