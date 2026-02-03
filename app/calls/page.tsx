import type { Metadata } from "next"
import { ClientsHeader } from "@/components/clients-header"
import { CallsTable } from "./components/calls-table"

export const metadata: Metadata = {
  title: "Clients - Ethereal Design",
  description: "Manage your clients",
}

import { callsData } from "@/lib/mock-data"

import { SearchablePageLayout } from "@/components/searchable-page-layout"

export default function CallsPage() {

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <ClientsHeader activeTab="home" />
      <main className="container mx-auto px-6 py-8 pb-1">
        <SearchablePageLayout
          name="CALLS"
          active="calls"
          searchSuggestions={callsData.map((c) => c.name)}
          ContentComponent={CallsTable}
        />
      </main>
    </div>
  )
}
