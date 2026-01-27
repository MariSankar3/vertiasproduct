"use client";

import { useState } from "react";
import { EditIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type ConfigKey = "message" | "push" | "mail" | "whatsapp" | "telegram";

export function Activity() {
  const [config, setConfig] = useState<Record<ConfigKey, boolean>>({
    message: true,
    push: true,
    mail: true,
    whatsapp: true,
    telegram: true,
  });

  const toggle = (key: ConfigKey) => {
    setConfig((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  /* ---------- Reusable Animated Toggle Row ---------- */
  const Row = ({
    label,
    value,
    enabled,
    onToggle,
  }: {
    label: string;
    value?: string;
    enabled: boolean;
    onToggle: () => void;
  }) => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b last:border-b-0">
      <div className="flex items-center gap-4">
        {/* Toggle */}
        <button
          onClick={onToggle}
          className={cn(
            "relative w-10 h-5 rounded-full px-1 flex items-center transition-colors duration-300",
            enabled ? "bg-green-500" : "bg-gray-300"
          )}
          aria-pressed={enabled}
        >
          {/* Animated knob */}
          <motion.span
            layout
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
            className="w-4 h-4 bg-white rounded-full shadow"
            style={{
              marginLeft: enabled ? "1.25rem" : "0rem",
            }}
          />
        </button>

        <span className="font-medium">{label}</span>
      </div>

      <div className="flex items-center gap-3 mt-2 sm:mt-0 text-gray-700">
        {value && <span className="text-[16px]">{value}</span>}
        <EditIcon className="text-green-600 cursor-pointer" />
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="mt-5 bg-white rounded-xl p-6">
        <h2 className="text-xl font-semibold pb-3 border-b border-gray-200">
          Notification configuration
        </h2>

        <Row
          label="Message"
          value="+91-91761939390"
          enabled={config.message}
          onToggle={() => toggle("message")}
        />

        <Row
          label="Push notification"
          value="ON"
          enabled={config.push}
          onToggle={() => toggle("push")}
        />

        <Row
          label="Mail"
          value="suganthak31@gmail.com, vasuak_3112@yahoo.in, +5"
          enabled={config.mail}
          onToggle={() => toggle("mail")}
        />

        <Row
          label="WhatsApp"
          value="+91-91761939390"
          enabled={config.whatsapp}
          onToggle={() => toggle("whatsapp")}
        />

        <Row
          label="Telegram"
          value="@suganthalagesn"
          enabled={config.telegram}
          onToggle={() => toggle("telegram")}
        />
      </div>
    </motion.div>
  );
}
