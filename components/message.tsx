"use client";

import { motion, LayoutGroup } from "framer-motion";
import Image from "next/image";
import { RefreshCw, Smile, Paperclip } from "lucide-react";

export function Messager() {
  return (
    <LayoutGroup>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mt-5 bg-white rounded-2xl border h-[60vh] flex flex-col overflow-hidden"
      >
       
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                src="/select_client1.png"
                alt="user"
                width={48}
                height={48}
                className="rounded-full"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                Ethereal design
              </p>
              <p className="text-sm text-gray-500">
                @Suganth Alagesan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border rounded-full text-sm">
              Archive
            </button>
          
            <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm">
              View profile
            </button>
          </div>
        </div>

        {/* ================= CHAT BODY (LAYOUT ONLY) ================= */}
        <div className="flex-1 px-6 py-4 space-y-10 overflow-y-auto bg-[#fafafa]">

        </div>

        {/* ================= FOOTER ================= */}
        <div className="px-6 py-4 flex items-center gap-3 bg-[#fafafa]">
          <Smile className="text-gray-400" />
          <input
            placeholder="Write a message..."
            className="flex-1 px-4 py-4 rounded-full border bg-gray-50 text-sm"
          />
          <Paperclip className="text-gray-400" />
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-full opacity-60"
          >
            Send
          </button>
        </div>
      </motion.div>
    </LayoutGroup>
  );
}
