import type { Metadata } from "next"
import { ClientsHeader } from "@/components/clients-header"
import { EditCall } from "./components/edit-call"

export const metadata: Metadata = {
    title: "Edit Call - Ethereal Design",
    description: "Edit existing call",
}

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function EditCallPage({ params }: PageProps) {
    const { id } = await params
    return (
        <div className="min-h-screen bg-[#f6f6f6]">
            <ClientsHeader activeTab="home" />
            <main className="container mx-auto px-6 py-4">
            </main>
            <EditCall id={id} />
        </div>
    )
}
