import type { Metadata } from "next"
import { ClientsHeader } from "@/components/clients-header"
import { NewCall } from "@/components/new-call"
import { SelectClients } from "@/components/select-clients"

export const metadata: Metadata = {
  title: "Clients - Ethereal Design",
  description: "Manage your clients",
}

export default function SelectClientsPage() {
  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <ClientsHeader />
      <main className="container mx-auto px-6 py-4">
      </main>
      <SelectClients />
    </div>
  )
}
