"use client";

import { useState } from "react";
import { EditIcon, Users } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion"  

export function Activity() {
  const [activeTab, setActiveTab] = useState("all");
  const [config, setConfig] = useState({
    message: true,
    push: true,
    mail: true,
    whatsapp: true,
    telegram: true,
  });

  const toggle = (key: string) => {
    setConfig((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Reusable row component
  const Row = ({
    label,
    value,
    toggleValue,
  }: {
    label: string;
    value: string | boolean;
    toggleValue: () => void;
  }) => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleValue}
          className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
            typeof value === "boolean" && value ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
              typeof value === "boolean" && value ? "translate-x-5" : ""
            }`}
          />
        </button>
        <span className="font-medium">{label}</span>
      </div>

      <div className="flex items-center gap-2 mt-2 sm:mt-0 text-gray-700">
        {typeof value === "string" ? value : ""}
        <EditIcon className="text-green-600 cursor-pointer" />
      </div>
    </div>
  );

  return (
      <motion.div
initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-6">
      <div className="mt-5 bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Notification configuration</h2>

        <Row
          label="Message"
          value={config.message}
          toggleValue={() => toggle("message")} 
        />

        <Row
          label="Push notification"
          value={config.push}
          toggleValue={() => toggle("push")}
        />

        <Row
          label="Mail"
          value="suganthak31@gmail.com, vasuak_3112@yahoo.in, +5"
          toggleValue={() => toggle("mail")}
        />

        <Row
          label="WhatsApp"
          value="+91-91761939390"
          toggleValue={() => toggle("whatsapp")}
        />

        <Row
          label="Telegram"
          value="@suganthalagesn"
          toggleValue={() => toggle("telegram")}
        />
      </div>
    </motion.div>
  );
}
