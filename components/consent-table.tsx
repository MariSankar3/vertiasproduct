"use client"
import { Eye, Download } from "lucide-react"
import {motion} from "framer-motion"

export default function ConsentTable() {
  const documents = [
    { name: "Signed Document 1", date: "10/10/2024" },
    { name: "Signed Document 2", date: "11/11/2024" },
    { name: "Signed Document 3", date: "12/12/2024" },
    { name: "Signed Document 4", date: "01/01/2025" },
    { name: "Signed Document 5", date: "02/02/2025" },
    { name: "Signed Document 6", date: "03/03/2025" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden mt-4">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 text-sm font-semibold text-black">
        Documents
      </div>

      {/* Rows */}
      <div className="divide-y divide-white">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_2fr_0.3fr_auto_auto] items-center px-6 py-4 text-sm hover:bg-gray-100"
          >
            {/* Document name */}
            <p className="text-[#535353]">{doc.name}</p>

            {/* Signed date */}
            <p className="text-[#535353]">
              Signed on {doc.date}
            </p>

            {/* View */}
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
              <Eye className="w-4 h-4" />
            </button>

            {/* Download */}
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
