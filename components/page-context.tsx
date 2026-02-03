"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from "react";

interface PageContextType {
  registerDownloadHandler: (handler: (format: "pdf" | "excel") => void) => void;
  triggerDownload: (format: "pdf" | "excel") => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export function PageProvider({ children }: { children: ReactNode }) {
  const [downloadHandler, setDownloadHandler] = useState<
    ((format: "pdf" | "excel") => void) | null
  >(null);

  const registerDownloadHandler = useCallback(
    (handler: (format: "pdf" | "excel") => void) => {
      setDownloadHandler(() => handler);
    },
    [],
  );

  const triggerDownload = useCallback(
    (format: "pdf" | "excel") => {
      if (downloadHandler) {
        downloadHandler(format);
      } else {
        console.warn("No download handler registered");
      }
    },
    [downloadHandler],
  );

  const value = useMemo(
    () => ({ registerDownloadHandler, triggerDownload }),
    [registerDownloadHandler, triggerDownload],
  );

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}

export function usePage() {
  const context = useContext(PageContext);
  // Return default no-op context if used outside of provider
  if (context === undefined) {
    return {
      registerDownloadHandler: () => {},
      triggerDownload: () => {
        console.warn("Download triggered but no PageProvider found.");
      },
    };
  }
  return context;
}
