"use client";

import { DownloadIcon } from "lucide-react";

export function InvoiceDetails() {
  const handleDownload = () => {
    window.print();
  };

  return (
    <>
      {/* ===== PRINTABLE AREA ===== */}
      <div id="invoice-print" className="p-6 space-y-6 bg-white text-black">
        <div className="grid grid-cols-2 gap-y-4">
          <div>
            <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">
              Due date
            </p>
            <p className="text-sm font-semibold mt-0.5">12/01/2024</p>
          </div>

          <div>
            <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">
              Status
            </p>
            <p className="text-sm font-semibold mt-0.5">Completed</p>
          </div>

          <div>
            <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">
              Invoice Number
            </p>
            <p className="text-sm font-semibold mt-0.5 text-blue-600">
              93E29A9E
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">
              Payment Method
            </p>
            <p className="text-sm font-semibold mt-0.5">VISA 1175</p>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <p className="font-bold text-sm">Renewing monthly seats</p>
          <p className="text-sm text-gray-600 mt-2 mb-4">
            Assigned monthly seats that renewed for September 25, 2025 –
            October 25, 2025
          </p>

          <div className="space-y-3 text-sm">
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

        <div className="pt-4 border-t border-gray-300 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>$15.00</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>$15.00</span>
          </div>
        </div>
      </div>

      {/* ===== NOT PRINTED ===== */}
      <button
        onClick={handleDownload}
        className="mt-6 w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-xl font-medium hover:bg-gray-100 transition"
      >
        <DownloadIcon size={18} />
        Download PDF
      </button>
    </>
  );
}
