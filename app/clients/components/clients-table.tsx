"use client";

import { ClientRowSkeleton } from "./clientrowskeleton";
import { useState, useRef, useEffect, useMemo } from "react";
import { GripVertical, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { clientsData } from "@/lib/mock-data";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsUp, ChevronsDown, ArrowUpDown, Check } from "lucide-react";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { usePage } from "@/components/page-context";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx-js-style";
import FileSaver from "file-saver";

// const clients = [] ?? clientsData
const clients = clientsData ?? [];

const ROW_HEIGHT = 60;
const HEADER_HEIGHT = 56;

const statusColors: Record<string, string> = {
  Active: "bg-[#ecfdf3] text-[#067647] border-[#abefc6]",
  Review: "bg-[#eff8ff] text-[#175cd3] border-[#b2ddff]",
  "KYC Pending": "bg-[#fef6ee] text-[#b93815] border-[#f9dbaf]",
  "Risk Profile": "bg-[#fdf2fa] text-[#c11574] border-[#fcceee]",
  Inactive: "bg-[#fef3f2] text-[#b42318] border-[#fecdca]",
};

// Helper for date parsing (DD/MM/YYYY)
const parseDate = (dateStr: string) => {
  if (!dateStr) return 0;
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day).getTime();
};

type SortKey =
  | "id"
  | "name"
  | "riskScore"
  | "riskCategory"
  | "email"
  | "dob"
  | "lastlogin"
  | "lastcall"
  | "city"
  | "state"
  | "status"
  | null;
type SortOrder = "asc" | "desc" | null;

type ClientsTableProps = {
  searchQuery?: string;
  statusFilters?: string[];
  categoryFilters?: string[];
};
const ALL_COLUMNS = [
  { key: "id", label: "Client ID", mandatory: true, width: "140px" },
  { key: "name", label: "Name", mandatory: true, width: "180px" }, // Flexible width
  { key: "status", label: "Status", mandatory: true, width: "140px" },
  { key: "riskScore", label: "Risk Score", mandatory: true, width: "140px" },
  { key: "riskCategory", label: "Bucket", mandatory: true, width: "110px" },
  { key: "email", label: "Email Address", mandatory: true, width: "190px" }, // Flexible width
  { key: "phone", label: "Phone Number", mandatory: true, width: "140px" },
  { key: "actions", label: "Action", mandatory: true, width: "80px" },
  { key: "dob", label: "Date of Birth", width: "170px" },
  { key: "gender", label: "Gender", width: "100px" },
  { key: "lastlogin", label: "Last Login", width: "140px" },
  { key: "lastcall", label: "Last Call", width: "140px" },
  { key: "city", label: "City", width: "120px" },
  { key: "state", label: "State", width: "120px" },
  { key: "kycvalidated", label: "KYC Validated", width: "140px" },
];

export function ClientsTable({
  searchQuery = "",
  statusFilters = [],
  categoryFilters = [],
}: ClientsTableProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const DEFAULT_COLUMNS = ALL_COLUMNS.filter((c) => c.mandatory).map(
    (c) => c.key,
  );
  const STORAGE_KEY = "clients_table_visible_columns";

  useEffect(() => {
    // simulate API delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // 1.2s skeleton

    return () => clearTimeout(timer);
  }, []);

  const [showCustomize, setShowCustomize] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // SSR-safe initialization
  const [visibleColumns, setVisibleColumns] =
    useState<string[]>(DEFAULT_COLUMNS);
  const [columnOrder, setColumnOrder] = useState<string[]>(
    ALL_COLUMNS.map((c) => c.key),
  );

  useEffect(() => {
    // Load saved settings from localStorage on client mount
    if (typeof window !== "undefined") {
      const savedVisible = localStorage.getItem(STORAGE_KEY);
      if (savedVisible) {
        try {
          setVisibleColumns(JSON.parse(savedVisible));
        } catch (e) {
          console.error("Failed to parse saved columns", e);
        }
      }

      const savedOrder = localStorage.getItem("clients_table_column_order");
      if (savedOrder) {
        try {
          setColumnOrder(JSON.parse(savedOrder));
        } catch (e) {
          console.error("Failed to parse column order", e);
        }
      }
    }
  }, []);

  const isCustomized =
    visibleColumns.length !== DEFAULT_COLUMNS.length ||
    !DEFAULT_COLUMNS.every((col) => visibleColumns.includes(col));

  useEffect(() => {
    const calculateRows = () => {
      const containerHeight = window.innerHeight - 200;
      const availableHeight = containerHeight - HEADER_HEIGHT;
      const rows = Math.floor(availableHeight / ROW_HEIGHT);
      setRowsPerPage(Math.max(rows, 1));
    };

    calculateRows();
    window.addEventListener("resize", calculateRows);
    return () => window.removeEventListener("resize", calculateRows);
  }, []);

  const orderedVisibleColumns = useMemo(() => {
    return columnOrder.filter((key) => visibleColumns.includes(key));
  }, [columnOrder, visibleColumns]);

  const filteredClients = clients.filter((client) => {
    // Advanced Filter (from header filter modal)
    if (statusFilters.length > 0 && !statusFilters.includes(client.status)) {
      return false;
    }

    if (
      categoryFilters.length > 0 &&
      !categoryFilters.includes(client.riskCategory)
    ) {
      return false;
    }

    // Search Filter
    if (
      searchQuery &&
      !client.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    if (activeTab === "all") return true;
    if (activeTab === "active") return client.status === "Active";
    if (activeTab === "inactive") return client.status === "Inactive";
    if (activeTab === "review") return client.status === "Review";
    if (activeTab === "kycpending") return client.status === "KYC Pending";
    if (activeTab === "riskprofile") return client.status === "Risk Profile";
    return true;
  });
  const sortedClients = [...filteredClients].sort((a, b) => {
    if (!sortKey || !sortOrder) return 0;

    let aValue: any;
    let bValue: any;

    switch (sortKey) {
      case "id":
        aValue = a.id;
        bValue = b.id;
        break;
      case "name":
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case "riskScore":
        aValue = a.riskScore;
        bValue = b.riskScore;
        break;
      case "riskCategory":
        aValue = a.riskCategory.toLowerCase();
        bValue = b.riskCategory.toLowerCase();
        break;
      case "email":
        aValue = a.email.toLowerCase();
        bValue = b.email.toLowerCase();
        break;
      case "dob":
        aValue = parseDate(a.dob);
        bValue = parseDate(b.dob);
        break;
      case "lastlogin":
        aValue = parseDate(a.lastlogin);
        bValue = parseDate(b.lastlogin);
        break;
      case "lastcall":
        aValue = parseDate(a.lastcall);
        bValue = parseDate(b.lastcall);
        break;
      case "city":
        aValue = a.city?.toLowerCase() || "";
        bValue = b.city?.toLowerCase() || "";
        break;
      case "state":
        aValue = a.state?.toLowerCase() || "";
        bValue = b.state?.toLowerCase() || "";
        break;
      case "status":
        aValue = a.status.toLowerCase();
        bValue = b.status.toLowerCase();
        break;
      default:
        return 0;
    }

    if (sortOrder === "asc") return aValue > bValue ? 1 : -1;
    if (sortOrder === "desc") return aValue < bValue ? 1 : -1;

    return 0;
  });
  const { registerDownloadHandler } = usePage();

  // Use refs to keep track of current selection/data without re-triggering effect
  const stateRef = useRef({
    selectedIds,
    sortedClients,
    orderedVisibleColumns,
    ALL_COLUMNS,
  });

  useEffect(() => {
    stateRef.current = {
      selectedIds,
      sortedClients,
      orderedVisibleColumns,
      ALL_COLUMNS,
    };
  }, [selectedIds, sortedClients, orderedVisibleColumns]);

  useEffect(() => {
    // Register the handler ONLY ONCE (on mount, or when registerDownloadHandler changes)
    registerDownloadHandler((format: "pdf" | "excel") => {
      const { selectedIds, sortedClients, orderedVisibleColumns, ALL_COLUMNS } =
        stateRef.current;

      // 1. Filter data based on selection
      const dataToExport =
        selectedIds.length > 0
          ? sortedClients.filter((c) => selectedIds.includes(c.id))
          : sortedClients;

      if (dataToExport.length === 0) {
        alert("No clients selected to download.");
        return;
      }

      // 2. Prepare columns
      const exportableColumns = orderedVisibleColumns.filter(
        (colKey) => colKey !== "actions",
      );

      const tableHead = exportableColumns.map((colKey) => {
        const colDef = ALL_COLUMNS.find((c) => c.key === colKey);
        return colDef?.label || colKey;
      });

      // 3. Prepare rows
      const tableBody = dataToExport.map((client) => {
        return exportableColumns.map((colKey) => {
          const val = client[colKey as keyof typeof client];
          return val ? String(val) : "";
        });
      });

      if (format === "pdf") {
        // 4. Generate PDF
        const doc = new jsPDF();
        doc.text("Clients Report", 14, 10);

        autoTable(doc, {
          head: [tableHead],
          body: tableBody,
          startY: 20,
          styles: { fontSize: 7 },
          headStyles: { fillColor: [167, 229, 92], textColor: [0, 0, 0] },
        });

        doc.save("clients_report.pdf");
      } else if (format === "excel") {
        // 5. Generate Excel
        const excelData = [
          tableHead,
          ...dataToExport.map((client) =>
            exportableColumns.map((colKey) => {
              const val = client[colKey as keyof typeof client];
              return val ? String(val) : "";
            }),
          ),
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(excelData);

        // Styling (similar to CallsTable)
        const range = XLSX.utils.decode_range(worksheet["!ref"]!);
        
        // Auto-width logic (approximate)
        const colWidths = exportableColumns.map(colKey => {
           const colDef = ALL_COLUMNS.find((c) => c.key === colKey);
           // simple parse "140px" -> 16 chars approx
           const px = parseInt((colDef as any)?.width || "100");
           return { wch: Math.floor(px / 7) }; 
        });
        worksheet["!cols"] = colWidths;

        const headerStyle = {
          fill: { fgColor: { rgb: "A7E55C" } },
          font: { bold: true, color: { rgb: "000000" } },
          alignment: { horizontal: "center", vertical: "center" },
          border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          },
        };

        for (let C = range.s.c; C <= range.e.c; C++) {
          const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
          if (worksheet[cellAddress]) {
            worksheet[cellAddress].s = headerStyle;
          }
        }

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Clients");

        const excelBuffer = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });

        const blob = new Blob([excelBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        FileSaver.saveAs(blob, "clients_report.xlsx");
      }
    });
  }, [registerDownloadHandler]);

  const allSelected =
    sortedClients.length > 0 &&
    sortedClients.every((c) => selectedIds.includes(c.id));
  const totalPages = Math.ceil(sortedClients.length / rowsPerPage);

  const paginatedClients = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedClients.slice(start, start + rowsPerPage);
  }, [sortedClients, currentPage, rowsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    activeTab,
    searchQuery,
    statusFilters,
    categoryFilters,
    sortKey,
    sortOrder,
  ]);

  // Calculate counts based on filtered data (excluding activeTab filter)
  const baseFilteredClients = clients.filter((client) => {
    // Advanced Filter (from header filter modal)
    if (statusFilters.length > 0 && !statusFilters.includes(client.status)) {
      return false;
    }

    if (
      categoryFilters.length > 0 &&
      !categoryFilters.includes(client.riskCategory)
    ) {
      return false;
    }

    // Search Filter
    if (
      searchQuery &&
      !client.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const counts = {
    all: baseFilteredClients.length,
    active: baseFilteredClients.filter((c) => c.status === "Active").length,
    inactive: baseFilteredClients.filter((c) => c.status === "Inactive").length,
    review: baseFilteredClients.filter((c) => c.status === "Review").length,
    kycpending: baseFilteredClients.filter((c) => c.status === "KYC Pending")
      .length,
    riskprofile: baseFilteredClients.filter((c) => c.status === "Risk Profile")
      .length,
  };

  // ✅ EARLY RETURN — outside JSX
  if (clients.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl border border-[#eaecf0] h-[70vh] mt-6 flex items-center justify-center"
      >
        <div className="flex flex-col items-center text-center">
          <Image
            src="/noclientyet.png"
            alt="No clients yet"
            width={340}
            height={260}
            priority
            className="mb-6"
          />

          <h2 className="text-[24px] font-semibold text-[#101828]">
            No Client Yet
          </h2>

          <p className="mt-2 text-[16px] text-[#888888] max-w-md">
            Start by adding your first client to begin building your
            compliance-first practice.
          </p>
          <Link href="/newclients">
            <Button className="text-[16px] font-bold cursor-pointer mt-6 bg-[#A7E55C] text-[#121212] rounded-full px-6 hover:bg-[#A7E55C] hover:scale-[1.05]">
              + Add your first client
            </Button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="space-y-1"
    >
      <div className="bg-white space-y-6 mt-4 rounded-2xl border-1">
        <div className="flex items-center gap-3 mt-2 mb-2 pl-3">
          <button
            onClick={() => setActiveTab("all")}
            className={cn(
              "px-6 py-2 rounded-full font-medium transition cursor-pointer",
              activeTab === "all"
                ? "bg-[#a7e55c] text-[#121212]"
                : "bg-[#e2e2e2] text-[#101828]",
            )}
          >
            All Clients{" "}
            <span
              className={cn(
                "ml-2 rounded-2xl p-1 px-1.5",
                activeTab === "all" ? "bg-[#5FAE2E]/40" : "bg-[#D6D6D6] ",
              )}
            >
              {counts.all}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("active")}
            className={cn(
              "px-6 py-2 rounded-full font-medium border-1 transition border border-[#ccc] cursor-pointer",
              activeTab === "active"
                ? "bg-[#a7e55c] text-[#121212]"
                : "bg-[#e2e2e2] text-[#667085]",
            )}
          >
            Active{" "}
            <span
              className={cn(
                "ml-2 rounded-2xl p-1 px-1.5",
                activeTab === "active" ? "bg-[#5FAE2E]/40" : "bg-[#D6D6D6] ",
              )}
            >
              {" "}
              {counts.active}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("inactive")}
            className={cn(
              "px-6 py-2 rounded-full font-medium border-1 transition border border-[#ccc] cursor-pointer",
              activeTab === "inactive"
                ? "bg-[#a7e55c] text-[#121212]"
                : "bg-[#e2e2e2] text-[#667085]",
            )}
          >
            InActive{" "}
            <span
              className={cn(
                "ml-2 rounded-2xl p-1 px-1.5",
                activeTab === "inactive" ? "bg-[#5FAE2E]/40" : "bg-[#D6D6D6] ",
              )}
            >
              {" "}
              {counts.inactive}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("review")}
            className={cn(
              "px-6 py-2 rounded-full font-medium border-1 transition border border-[#ccc] cursor-pointer",
              activeTab === "review"
                ? "bg-[#a7e55c] text-[#121212]"
                : "bg-[#e2e2e2] text-[#667085]",
            )}
          >
            Review{" "}
            <span
              className={cn(
                "ml-2 rounded-2xl p-1 px-1.5",
                activeTab === "review" ? "bg-[#5FAE2E]/40" : "bg-[#D6D6D6] ",
              )}
            >
              {" "}
              {counts.review}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("kycpending")}
            className={cn(
              "px-6 py-2 rounded-full font-medium border-1 transition border border-[#ccc] cursor-pointer",
              activeTab === "kycpending"
                ? "bg-[#a7e55c] text-[#121212]"
                : "bg-[#e2e2e2] text-[#667085]",
            )}
          >
            KYC Pending{" "}
            <span
              className={cn(
                "ml-2 rounded-2xl p-1 px-1.5",
                activeTab === "kycpending"
                  ? "bg-[#5FAE2E]/40"
                  : "bg-[#D6D6D6] ",
              )}
            >
              {" "}
              {counts.kycpending}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("riskprofile")}
            className={cn(
              "px-6 py-2 rounded-full font-medium border-1 transition border border-[#ccc] cursor-pointer",
              activeTab === "riskprofile"
                ? "bg-[#a7e55c] text-[#121212]"
                : "bg-[#e2e2e2] text-[#667085]",
            )}
          >
            Risk Profile
            <span
              className={cn(
                "ml-2 rounded-2xl p-1 px-1.5",
                activeTab === "riskprofile"
                  ? "bg-[#5FAE2E]/40"
                  : "bg-[#D6D6D6] ",
              )}
            >
              {" "}
              {counts.riskprofile}
            </span>
          </button>
          <button
            onClick={() => setShowCustomize(true)}
            className="ml-auto mr-5"
          >
            <div
              className={cn(
                "cursor-pointer border px-3 py-1 text-sm font-bold rounded-sm transition",
                isCustomized
                  ? "bg-[#A7E55C] text-black border-[#7fc241]"
                  : "hover:bg-gray-200 border-gray-600",
              )}
            >
              Custom
            </div>
          </button>
        </div>
        <div
          className="rounded-2xl border border-[#eaecf0] 
                h-[calc(100vh-310px)] flex flex-col relative"
        >
          <div className="overflow-x-auto scrollbar-x-thin flex-1 w-full">
            {!loading && sortedClients.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex flex-col items-center text-center">
                  <Image
                    src="/clientnofound.png"
                    alt="No clients found"
                    width={280}
                    height={280}
                    priority
                  />

                  <p className="mt-6 text-[24px] font-semibold text-[#121212]">
                    No clients found matching{" "}
                    <span className="text-[#121212]">"{searchQuery}"</span>
                  </p>

                  <p className="mt-2 text-[16px] text-[#667085]">
                    Try a different search term
                  </p>
                </div>
              </div>
            )}
            <table className="w-full table-fixed">
              <thead>
                <tr className="border-b border-[#eaecf0] bg-[#F7F7F7]">
                  <th className="text-left p-4 w-12">
                    <Checkbox
                      checked={allSelected}
                      className="cursor-pointer"
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedIds(sortedClients.map((c) => c.id));
                        } else {
                          setSelectedIds([]);
                        }
                      }}
                    />
                  </th>
                  {orderedVisibleColumns.map((colKey) => {
                    const colDef = ALL_COLUMNS.find((c) => c.key === colKey);

                    // Check if column is sortable
                    const isSortable = [
                      "id",
                      "name",
                      "riskScore",
                      "riskCategory",
                      "email",
                      "dob",
                      "lastlogin",
                      "lastcall",
                      "city",
                      "state",
                      "status",
                    ].includes(colKey);

                    if (isSortable) {
                      return (
                        <SortableHeader
                          key={colKey}
                          label={colDef?.label || colKey}
                          sKey={colKey as SortKey}
                          currentSortKey={sortKey}
                          currentSortOrder={sortOrder}
                          width={(colDef as any)?.width}
                          onSort={(k, o) => {
                            setSortKey(k);
                            setSortOrder(o);
                          }}
                        />
                      );
                    }

                    return (
                      <th
                        key={colKey}
                        className="text-left p-4 text-xs font-semibold text-[#101828] uppercase tracking-wider"
                        style={{ width: (colDef as any)?.width }}
                      >
                        {colDef?.label}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {loading
                  ? Array.from({ length: rowsPerPage }).map((_, i) => (
                      <ClientRowSkeleton
                        key={i}
                        visibleColumns={orderedVisibleColumns}
                      />
                    ))
                  : paginatedClients.map((client, index) => (
                      <tr
                        key={client.id}
                        className={cn(
                          "group hover:bg-[#f9fafb] transition",
                          index === paginatedClients.length - 1 && "border-0",
                        )}
                      >
                        <div className="contents">
                          <td className="px-4 py-3">
                            <Checkbox
                              checked={selectedIds.includes(client.id)}
                              className="cursor-pointer"
                              onCheckedChange={(checked) => {
                                setSelectedIds((prev) =>
                                  checked
                                    ? [...prev, client.id]
                                    : prev.filter((id) => id !== client.id),
                                );
                              }}
                            />
                          </td>
                          {orderedVisibleColumns.map((colKey) => (
                            <div key={colKey} className="contents">
                              {renderCellContent(client, colKey)}
                            </div>
                          ))}
                        </div>
                      </tr>
                    ))}
                {/* EMPTY ROW FILLER */}
                {!loading &&
                  paginatedClients.length < rowsPerPage &&
                  Array.from({
                    length: rowsPerPage - paginatedClients.length,
                  }).map((_, i) => (
                    <tr key={`empty-${i}`} className="">
                      <td
                        className=""
                        colSpan={orderedVisibleColumns.length + 1}
                      >
                        &nbsp;
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-[16px]">
            <span className="text-black">
              {String(currentPage).padStart(2, "0")}
            </span>
            {" / "}
            <span className="text-[#667085]">
              {String(totalPages).padStart(2, "0")}
            </span>
          </span>

          <div className="flex items-center">
            {/* PREVIOUS */}
            <button
              onClick={() => currentPage > 1 && setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className={cn(
                "h-10 w-10 flex items-center justify-center rounded-full transition",
                currentPage === 1
                  ? "text-[#667085] cursor-not-allowed"
                  : "text-black hover:bg-gray-100 cursor-pointer",
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                />
              </svg>
            </button>

            {/* NEXT */}
            <button
              onClick={() =>
                currentPage < totalPages &&
                setCurrentPage((currentPage) => currentPage + 1)
              }
              disabled={currentPage === totalPages}
              className={cn(
                "h-10 w-10 flex items-center justify-center rounded-full transition",
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-[#101828] hover:bg-gray-100 cursor-pointer",
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      <AnimatePresence>
        {showCustomize && (
          <motion.div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ x: "110%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                ease: "easeInOut",
                duration: 0.6,
              }}
              className="bg-white w-[23vw] max-h-screen rounded-2xl p-6 shadow-2xl h-full border-l"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold">Table customization</h2>
                  <p className="text-sm text-[#667085]">
                    A minimum of 8 columns must be visible
                  </p>
                </div>
                <button
                  className="cursor-pointer"
                  onClick={() => setShowCustomize(false)}
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col justify-between h-[86vh] border-t prb-2 py-4 overflow-y-auto">
                <DndContext
                  collisionDetection={closestCenter}
                  onDragStart={(event) => {
                    setActiveId(event.active.id as string);
                  }}
                  onDragEnd={(event) => {
                    const { active, over } = event;
                    setActiveId(null);
                    if (!over || active.id === over.id) return;

                    setColumnOrder((items) => {
                      const oldIndex = items.indexOf(active.id as string);
                      const newIndex = items.indexOf(over.id as string);
                      return arrayMove(items, oldIndex, newIndex);
                    });
                  }}
                >
                  <SortableContext
                    items={columnOrder}
                    strategy={verticalListSortingStrategy}
                  >
                    {columnOrder.map((key) => {
                      const col = ALL_COLUMNS.find((c) => c.key === key)!;
                      const checked = visibleColumns.includes(col.key);

                      return (
                        <SortableColumnRow
                          key={col.key}
                          column={col}
                          checked={checked}
                          disabled={col.mandatory ?? false}
                          onToggle={(v) => {
                            if (!v && visibleColumns.length <= 7) return;
                            setVisibleColumns((prev) =>
                              v
                                ? [...prev, col.key]
                                : prev.filter((k) => k !== col.key),
                            );
                          }}
                        />
                      );
                    })}
                  </SortableContext>
                  <DragOverlay>
                    {activeId ? (
                      <ColumnRowContent
                        column={ALL_COLUMNS.find((c) => c.key === activeId)!}
                        checked={visibleColumns.includes(activeId)}
                        disabled={
                          ALL_COLUMNS.find((c) => c.key === activeId)
                            ?.mandatory ?? false
                        }
                        onToggle={() => {}}
                      />
                    ) : null}
                  </DragOverlay>

                  <div className="flex justify-between pt-5 border-t">
                    <Button
                      className="cursor-pointer"
                      variant="outline"
                      onClick={() => {
                        const defaults = ALL_COLUMNS.filter(
                          (c) => c.mandatory,
                        ).map((c) => c.key);

                        setVisibleColumns(defaults);
                        setColumnOrder(ALL_COLUMNS.map((c) => c.key));
                        localStorage.removeItem(STORAGE_KEY);
                        localStorage.removeItem("clients_table_column_order");
                      }}
                    >
                      Reset
                    </Button>

                    <Button
                      className="bg-[#A7E55C] text-black hover:bg-[#A7E55C] cursor-pointer"
                      onClick={() => {
                        localStorage.setItem(
                          STORAGE_KEY,
                          JSON.stringify(visibleColumns),
                        );
                        localStorage.setItem(
                          "clients_table_column_order",
                          JSON.stringify(columnOrder),
                        );
                        setShowCustomize(false);
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                </DndContext>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SortableHeader({
  label,
  sKey,
  currentSortKey,
  currentSortOrder,
  onSort,
  width,
}: {
  label: string;
  sKey: SortKey;
  currentSortKey: SortKey;
  currentSortOrder: SortOrder;
  onSort: (key: SortKey, order: SortOrder) => void;
  width?: string;
}) {
  const isSelected = currentSortKey === sKey;

  return (
    <th
      className="p-4 text-xs font-semibold uppercase tracking-wider"
      style={{ width }}
    >
      <div className="flex items-center gap-1">
        <span>{label}</span>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 ml-1 p-0 hover:bg-transparent"
            >
              {!isSelected || !currentSortOrder ? (
                <ArrowUpDown className="h-3 w-3 text-gray-400" />
              ) : currentSortOrder === "asc" ? (
                <ChevronsUp className="h-3 w-3 text-[#101828]" />
              ) : (
                <ChevronsDown className="h-3 w-3 text-[#101828]" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[150px]">
            <DropdownMenuItem
              onClick={() => onSort(null, null)}
              className="flex items-center justify-between"
            >
              <span>Normal</span>
              {!isSelected || !currentSortOrder ? (
                <Check className="h-4 w-4" />
              ) : null}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onSort(sKey, "asc")}
              className="flex items-center justify-between"
            >
              <span>Ascending</span>
              {isSelected && currentSortOrder === "asc" ? (
                <Check className="h-4 w-4" />
              ) : (
                <ChevronsUp className="h-3 w-3 text-gray-400" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onSort(sKey, "desc")}
              className="flex items-center justify-between"
            >
              <span>Descending</span>
              {isSelected && currentSortOrder === "desc" ? (
                <Check className="h-4 w-4" />
              ) : (
                <ChevronsDown className="h-3 w-3 text-gray-400" />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </th>
  );
}


function SortableColumnRow({
  column,
  checked,
  disabled,
  onToggle,
}: {
  column: any;
  checked: boolean;
  disabled: boolean;
  onToggle: (v: boolean) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.key });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <ColumnRowContent
        column={column}
        checked={checked}
        disabled={disabled}
        onToggle={onToggle}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}

function ColumnRowContent({
  column,
  checked,
  disabled,
  onToggle,
  dragHandleProps,
}: {
  column: any;
  checked: boolean;
  disabled: boolean;
  onToggle: (v: boolean) => void;
  dragHandleProps?: any;
}) {
  return (
    <label className="flex items-center gap-3 text-sm bg-white p-1 rounded">
      <span
        {...dragHandleProps}
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
      >
        <GripVertical className="h-4 w-4" />
      </span>

      <Checkbox
        checked={checked}
        disabled={disabled}
        onCheckedChange={onToggle}
      />

      {column.label}
    </label>
  );
}

function renderCellContent(client: any, colKey: string) {
  switch (colKey) {
    case "id":
      return (
        <td className="px-4 py-1 text-sm text-[#101828]">{client.id}</td>
      );
    case "name":
      return (
        <td className="px-4 py-1 text-sm text-[#101828]">{client.name}</td>
      );
    case "status":
      return (
        <td className="px-4 py-1">
          <span
            className={cn(
              "inline-flex items-center px-3 py-1 rounded-md text-xs font-medium border",
              statusColors[client.status],
            )}
          >
            {client.status}
          </span>
        </td>
      );
    case "riskScore":
      return (
        <td className="px-4 py-1">
          <div className="flex items-center gap-3">
            <span className="text-sm border rounded-md px-2">
              {client.riskScore}
            </span>
          </div>
        </td>
      );
    case "riskCategory":
      return (
        <td className="px-4 py-1">
          <div className="flex items-center gap-3">
            <span className="text-sm border rounded-md px-2">
              {client.riskCategory}
            </span>
          </div>
        </td>
      );
    case "email":
      return (
        <td className="px-4 py-1 text-sm text-[#475467]">{client.email}</td>
      );
    case "phone":
      return <td className="text-sm text-[#475467]">{client.phone}</td>;
    case "dob":
      return <td className="px-4 text-sm text-[#475467]">{client.dob}</td>;
    case "gender":
      return <td className="px-4 text-sm text-[#475467]">{client.gender}</td>;
    case "lastlogin":
      return (
        <td className="px-4 text-sm text-[#475467]">{client.lastlogin}</td>
      );
    case "lastcall":
      return <td className="px-4 text-sm text-[#475467]">{client.lastcall}</td>;
    case "city":
      return <td className="px-4 text-sm text-[#475467]">{client.city}</td>;
    case "state":
      return <td className="px-4 text-sm text-[#475467]">{client.state}</td>;
    case "kycvalidated":
      return (
        <td className="px-4  text-sm text-[#475467]">{client.kycvalidated}</td>
      );
    case "actions":
      return (
        <td className="px-6 py-[7px]">
          <Button variant="ghost" size="icon">
            <Link
              href={`/client-profile/${client.id}`}
              className="flex items-center gap-2"
            >
              <span
                className="
                  text-[14px] text-[#535353]
                  opacity-0 translate-x-2
                  group-hover:opacity-100 group-hover:translate-x-0
                  transition-all duration-200
                  whitespace-nowrap
                "
              >
                View
              </span>
              <ArrowRight
                className="
                  h-4 w-4
                  transition-transform duration-200
                  group-hover:translate-x-1
                "
              />
            </Link>
          </Button>
        </td>
      );
    default:
      return null;
  }
}
