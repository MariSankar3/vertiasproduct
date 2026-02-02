"use client";

import { useState } from "react";
import { DownloadIcon, EditIcon, FileIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { InvoiceDetails } from "./invoicedetails";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const INVOICES = [
  { id: 1, date: "Sep 25, 2025", status: "Paid", freq: "Monthly" },
  { id: 2, date: "Oct 25, 2025", status: "Pending", freq: "Monthly" },
  { id: 3, date: "Nov 25, 2025", status: "Overdue", freq: "Monthly" },
  { id: 4, date: "Dec 25, 2025", status: "Paid", freq: "Yearly" },
  { id: 5, date: "Dec 25, 2025", status: "Paid", freq: "Yearly" },
];

export function Billing() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [lastSelected, setLastSelected] = useState(INVOICES[0]);

  const handleSelect = (id: number) => {
    const item = INVOICES.find((i) => i.id === id);
    if (item) {
      setLastSelected(item);
      setSelectedId(id);
    }
  };

  const handleDownloadInvoice = () => {
    const doc = new jsPDF();

    // Title
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Monthly invoice", 14, 22);

    // Status Badge
    let statusColor = [0, 0, 0];
    if (lastSelected.status === "Paid") statusColor = [22, 163, 74];
    else if (lastSelected.status === "Pending") statusColor = [234, 88, 12];
    else if (lastSelected.status === "Overdue") statusColor = [220, 38, 38];

    doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
    doc.setFontSize(10);
    doc.text(lastSelected.status, 60, 21);

    // Date subtext
    doc.setTextColor(156, 163, 175); // gray
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Date ${lastSelected.date}`, 14, 28);

    // Close button simulation (X) - skipped for PDF

    // -- GRID DETAILS --
    let y = 45;
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175); // gray uppercase
    doc.setFont("helvetica", "bold");
    doc.text("DUE DATE", 14, y);
    doc.text("STATUS", 100, y);

    y += 5;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text(lastSelected.date, 14, y);
    doc.text(lastSelected.status, 100, y);

    y += 15;
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text("INVOICE NUMBER", 14, y);
    doc.text("PAYMENT METHOD", 100, y);

    y += 5;
    doc.setFontSize(10);
    doc.setTextColor(37, 99, 235); // blue for invoice num
    doc.text("93E29A9E", 14, y);

    doc.setTextColor(0, 0, 0);
    doc.text("VISA 1175", 100, y);

    // -- TABLE SECTION --
    y += 15;
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Renewing monthly seats", 14, y);

    y += 5;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(107, 114, 128);
    doc.text(
      "Assigned monthly seats that renewed for September 25, 2025 - October 25, 2025",
      14,
      y,
    );

    // AutoTable for items
    autoTable(doc, {
      startY: y + 5,
      head: [],
      body: [
        ["1 Full", "$15.00"],
        ["0 Dev", "$0.00"],
        ["0 Collab", "$0.00"],
      ],
      theme: "plain",
      styles: { fontSize: 10, cellPadding: 2 },
      columnStyles: {
        0: { halign: "left" },
        1: { halign: "right" },
      },
    });

    // -- TOTALS --
    // @ts-ignore
    let finalY = doc.lastAutoTable.finalY + 10;

    doc.setDrawColor(229, 231, 235);
    doc.line(14, finalY, 196, finalY); // top border

    finalY += 10;
    doc.setFontSize(10);
    doc.setTextColor(55, 65, 81);
    doc.text("Subtotal", 14, finalY);
    doc.text("$15.00", 196, finalY, { align: "right" });

    finalY += 7;
    doc.text("Taxes", 14, finalY);
    doc.text("$0.00", 196, finalY, { align: "right" });

    finalY += 8;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(17, 24, 39);
    doc.text("Total", 14, finalY);
    doc.text("$15.00", 196, finalY, { align: "right" });

    doc.save(`invoice_${lastSelected.id}.pdf`);
  };

  const isPanelOpen = selectedId !== null;

  return (
    <div className="p-4 mx-auto overflow-hidden">
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-12 items-start">
        {/* LEFT: Invoice List */}
        <motion.div
          layout
          transition={{
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier for smoother motion
          }}
          className={cn(
            "bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden",
            isPanelOpen ? "lg:col-span-7" : "lg:col-span-12",
          )}
        >
          {/* STABLE HEADER */}
          <div className="p-6 flex items-center justify-between border-b border-gray-50">
            <motion.h3
              layout="position"
              className="text-lg font-semibold text-gray-900 whitespace-nowrap"
            >
              Invoices
            </motion.h3>

            <motion.div
              layout="position"
              className="flex items-center gap-3 shrink-0"
            >
              <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
                <DownloadIcon size={16} className="text-gray-600" />
              </button>
              <button className="px-4 py-2 bg-[#A7E55C] hover:bg-[#96d44b] rounded-xl text-sm font-medium transition-colors whitespace-nowrap">
                Edit Subscription
              </button>
            </motion.div>
          </div>

          <div className="p-2">
            <ul className="space-y-1">
              {INVOICES.map((inv) => (
                <motion.li
                  layout="position"
                  key={inv.id}
                  onClick={() => handleSelect(inv.id)}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors border",
                    selectedId === inv.id
                      ? "bg-blue-50 border-blue-100 shadow-sm"
                      : "hover:bg-gray-50 border-transparent",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-900 whitespace-nowrap">
                        {inv.date}
                      </span>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-gray-200 text-[10px] font-bold uppercase tracking-tight bg-white">
                        <div
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            inv.status === "Paid"
                              ? "bg-green-500"
                              : inv.status === "Pending"
                                ? "bg-orange-400"
                                : "bg-red-500",
                          )}
                        />
                        {inv.status}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {!isPanelOpen && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hidden sm:block text-sm text-gray-500"
                      >
                        {inv.freq}
                      </motion.p>
                    )}
                    <div className="flex gap-1">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <EditIcon size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <DownloadIcon size={18} />
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* RIGHT: Detail Panel */}
        <AnimatePresence mode="popLayout">
          {isPanelOpen && (
            <motion.aside
              key="detail-panel"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-5 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col h-full"
            >
              <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                    <FileIcon className="text-green-600" size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-md flex items-center gap-2 truncate">
                      Monthly invoice
                      <span
                        className={cn(
                          "text-[10px] px-1.5 py-0.5 rounded-md font-bold border",
                          lastSelected.status === "Paid" &&
                            "border-green-600 text-green-600",
                          lastSelected.status === "Pending" &&
                            "border-orange-500 text-orange-500",
                          lastSelected.status === "Overdue" &&
                            "border-red-600 text-red-600",
                        )}
                      >
                        {lastSelected.status}
                      </span>
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      Date {lastSelected.date}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedId(null)}
                  className="py-1.5 px-3 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto">
                <div className="grid grid-cols-2 gap-y-4">
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">
                      Due date
                    </p>
                    <p className="text-sm font-semibold mt-0.5">
                      {lastSelected.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">
                      Status
                    </p>
                    <p className="text-sm font-semibold mt-0.5">
                      {lastSelected.status}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <p className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">
                      Invoice Number
                    </p>
                    <p className="text-sm font-semibold mt-0.5 text-blue-600">
                      93E29A9E
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">
                      Payment Method
                    </p>
                    <p className="text-sm font-semibold mt-0.5">VISA 1175</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50">
                  <p className="font-bold text-sm">Renewing monthly seats</p>
                  <p className="text-sm text-gray-500 mb-4 mt-2">
                    Assigned monthly seats that renewed for September 25, 2025 -
                    October 25, 2025
                  </p>
                  <div className="mt-4 space-y-4 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>1 Full</span>
                      <span>$15.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>0 Dev</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>0 Collab</span>
                      <span>$0.00</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-b border-t border-gray-100 pb-2 space-y-3">
                  <div className="flex justify-between text-base text-gray-700">
                    <span>Subtotal</span>
                    <span>$15.00</span>
                  </div>
                  <div className="flex justify-between text-base text-gray-700">
                    <span>Taxes</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-gray-900">
                    <span>Total</span>
                    <span>$15.00</span>
                  </div>
                </div>

                <button
                  onClick={handleDownloadInvoice}
                  className="cursor-pointer w-full flex items-center justify-center gap-2 text-black border border-gray-300 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all active:scale-[0.98]"
                >
                  <DownloadIcon size={18} />
                  Download PDF
                </button>
              </div>
              {/* <InvoiceDetails/> */}
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
