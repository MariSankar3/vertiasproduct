import type { Metadata } from "next"
import { ClientsHeader } from "@/components/clients-header"
import  ConsentTable from "@/components/consent-table"
import { ClientLeftSideBar } from "@/components/client-left-sidebar"

export const metadata: Metadata = {
  title: "Clients - Ethereal Design",
  description: "Manage your clients",
}

export default function Consent(){
    return (
        <div className="min-h-screen bg-[#f6f6f6]">
      <ClientsHeader activeTab="home" />
      <main className="container mx-auto px-6 py-8">
        <ClientLeftSideBar />
         <ConsentTable/>
      </main>
    </div>
    );
}