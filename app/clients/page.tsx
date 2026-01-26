import type { Metadata } from "next"
import { ClientsHeader } from "@/components/clients-header"
import { ClientsTable } from "@/components/clients-table"
import { CallPage } from "@/components/call-page"

export const metadata: Metadata = {
  title: "Clients - Ethereal Design",
  description: "Manage your clients",
}

import { clientsData } from "@/lib/mock-data"

import { SearchablePageLayout } from "@/components/searchable-page-layout"

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <ClientsHeader activeTab="home" />
      <main className="container mx-auto px-6 py-8 pb-2">
        <SearchablePageLayout
          name="CLIENTS"
          active="clients"
          searchSuggestions={clientsData.map((c) => c.name)}
          ContentComponent={ClientsTable}
        />
      </main>
    </div>
  )
}
