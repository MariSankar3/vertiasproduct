"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const NOTIFICATIONS = [
  {
    id: 1,
    title: "Request Successfully completed!",
    message:
      "Your request has been successfully processed and completed. All required system validations, security checks, and compliance verifications were performed without any issues. The results have been recorded, and no further action is required from you at this time.",
    time: "5m ago",
    type: "success",
  },
  {
    id: 2,
    title: "Data Updated!",
    message:
      "Your data has been updated successfully. You can review the changes now.",
    time: "5m ago",
    type: "info",
  },
  {
    id: 3,
    title: "Update Available!",
    message:
      "A new version of the application is ready for download. Please update to enjoy the latest features.",
    time: "10m ago",
    type: "info",
  },
  {
    id: 4,
    title: "Error Occurred!",
    message:
      "There was an issue processing your request. Please try again later or contact support.",
    time: "15m ago",
    type: "error",
  },
  {
    id: 5,
    title: "New Message Received!",
    message:
      "You have a new message in your inbox. Click here to read it now.",
    time: "20m ago",
    type: "info",
  },
];

export function Notification() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selected = NOTIFICATIONS.find(n => n.id === selectedId);

  return (
    <LayoutGroup>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="space-y-6"
      >
        <div className="mt-5 bg-white rounded-xl p-6">
          <h2 className="text-xl font-semibold pb-3 border-b border-gray-200">
            Notifications
          </h2>

          {/* GRID */}
          <div
            className={cn(
              "grid gap-6 mt-4 items-start",
              selectedId ? "grid-cols-1 lg:grid-cols-[60%_40%]" : "grid-cols-1"
            )}
          >
            {/* LEFT: NOTIFICATION LIST */}
            <motion.div

              transition={{
                layout: {
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              className="space-y-2"
            >
              {NOTIFICATIONS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={cn(
                    "flex items-start justify-between gap-4 rounded-lg p-4 cursor-pointer transition",
                    selectedId === item.id
                      ? "bg-gray-100"
                      : "hover:bg-gray-50"
                  )}
                >
                  <div className="flex items-start gap-4">
                    {/* Status bar */}
                    <div
                      className={cn(
                        "w-1 h-12 rounded-full",
                        item.type === "success" && "bg-green-500",
                        item.type === "error" && "bg-red-500",
                        item.type === "info" && "bg-gray-300"
                      )}
                    />

                    {/* Avatar */}
                    <Image
                      src="/select_client1.png"
                      alt="user"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />

                    {/* Content */}
                    <div>
                      <p className="font-semibold text-sm text-gray-900">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {item.message}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {item.time}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* RIGHT: MESSAGE DETAILS (40%) */}
            <AnimatePresence>
              {selected && (
                <motion.div
                  initial={{ opacity: 0, filter: "blur(6px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(6px)" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="bg-gray-50 rounded-xl p-6"
                >
                  <div className="flex justify-between items-start border-b border-gray-300 pb-4">
                    <div>
                      <p className="font-semibold text-lg">
                        {selected.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {selected.time}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedId(null)}
                      className="text-gray-400 hover:text-gray-700 cursor-pointer"
                    >
                      <X />
                    </button>
                  </div>

                  <p className="mt-4 text-sm text-gray-700 leading-relaxed">
                    {selected.message}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </LayoutGroup>
  );
}
