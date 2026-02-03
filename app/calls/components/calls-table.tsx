"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { usePage } from "@/components/page-context";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx-js-style";
import FileSaver from "file-saver";
import {
  Edit,
  ChevronsUp,
  ChevronsDown,
  ArrowUpDown,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { count } from "console"

import { callsData } from "@/lib/mock-data";

const ROW_HEIGHT = 65;
const HEADER_HEIGHT = 56;

type SortKey =
  | "timedate"
  | "name"
  | "segment"
  | "call"
  | "version"
  | "shared"
  | "entryprice"
  | "targetprice"
  | "stoploss"
  | "riskratio"
  | "status"
  | null;
type SortOrder = "asc" | "desc" | null;

type CallsTableProps = {
  searchQuery?: string;
  statusFilters?: string[];
  categoryFilters?: string[];
};

export function CallsTable({
  searchQuery = "",
  statusFilters = [],
  categoryFilters = [],
}: CallsTableProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  useEffect(() => {
    const calculateRows = () => {
      // Calculate 60vh in pixels
      const containerHeight = window.innerHeight - 300;
      // Available height for rows = Container Height - Header Height
      const availableHeight = containerHeight - HEADER_HEIGHT;
      // Calculate max rows that can fit
      const rows = Math.floor(availableHeight / ROW_HEIGHT);
      // Ensure at least 1 row is shown
      setRowsPerPage(Math.max(rows, 1));
    };

    calculateRows();
    window.addEventListener("resize", calculateRows);
    return () => window.removeEventListener("resize", calculateRows);
  }, []);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const clients = callsData;
  // const clients = []

  if (clients.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl border border-[#eaecf0] h-[70vh] mt-6 flex items-center justify-center"
      >
        <div className="flex flex-col items-center text-center">
          <Image
            src="/nocallsyet.png"
            alt="No clients yet"
            width={340}
            height={260}
            priority
            className="mb-6"
          />

          <h2 className="text-[24px] font-semibold text-[#101828]">
            No Calls Yet
          </h2>

          <p className="mt-2 text-[16px] text-[#888888] max-w-md">
            Start by give your first advice !
          </p>

          <Link href="/newcall">
            <Button className="text-[16px] font-bold cursor-pointer mt-6 bg-[#A7E55C] text-[#121212] rounded-full px-6 hover:bg-[#A7E55C] hover:scale-[1.05] transition">
              + New Calls
            </Button>
          </Link>
        </div>
      </motion.div>
    );
  }

  // Calculate counts based on filtered data (excluding activeTab filter)
  const baseFilteredClients = clients.filter((client) => {
    // Header filter: status (Hit / Failed / Inactive)
    if (statusFilters.length > 0 && !statusFilters.includes(client.status)) {
      return false;
    }

    // Header filter: call type (Buy / Sell)
    if (categoryFilters.length > 0 && !categoryFilters.includes(client.call)) {
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
    active: baseFilteredClients.filter((c) => c.status === "Hit").length,
    failed: baseFilteredClients.filter((c) => c.status === "Failed").length,
    inactive: baseFilteredClients.filter(
      (c) => c.status !== "Hit" && c.status !== "Failed",
    ).length,
  };

  const filteredClients = clients.filter((client) => {
    // Header filter: status (Hit / Failed / Inactive)
    if (statusFilters.length > 0 && !statusFilters.includes(client.status)) {
      return false;
    }

    // Header filter: call type (Buy / Sell)
    if (categoryFilters.length > 0 && !categoryFilters.includes(client.call)) {
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

    if (activeTab === "active") return client.status === "Hit";

    if (activeTab === "failed") return client.status === "Failed";

    if (activeTab === "inactive")
      return client.status !== "Hit" && client.status !== "Failed";

    return true;
  });

  const parseNumber = (value: any) => {
    if (value === null || value === undefined) return Number.POSITIVE_INFINITY;
    if (typeof value === "number") return value;

    const num = Number(String(value).replace(/[^0-9.-]/g, ""));
    return isNaN(num) ? Number.POSITIVE_INFINITY : num;
  };

  const sortedClients = useMemo(() => {
    if (!sortKey || !sortOrder) return filteredClients;

    return [...filteredClients].sort((a, b) => {
      if (sortKey === "timedate") {
        const parseDate = (dateStr: string) => {
          // Format: "21-Oct-2025, 09:25 AM"
          try {
            // Remove comma and split
            const parts = dateStr.replace(",", "").split(" ");
            const dateParts = parts[0].split("-");
            const timeParts = parts[1].split(":");
            const ampm = parts[2];

            const day = parseInt(dateParts[0]);
            const monthStr = dateParts[1];
            const year = parseInt(dateParts[2]);

            let hour = parseInt(timeParts[0]);
            const minute = parseInt(timeParts[1]);

            const months: { [key: string]: number } = {
              Jan: 0,
              Feb: 1,
              Mar: 2,
              Apr: 3,
              May: 4,
              Jun: 5,
              Jul: 6,
              Aug: 7,
              Sep: 8,
              Oct: 9,
              Nov: 10,
              Dec: 11,
            };

            if (ampm === "PM" && hour !== 12) hour += 12;
            if (ampm === "AM" && hour === 12) hour = 0;

            return new Date(
              year,
              months[monthStr],
              day,
              hour,
              minute,
            ).getTime();
          } catch (e) {
            return 0;
          }
        };

        const dateA = parseDate(a.timedate);
        const dateB = parseDate(b.timedate);

        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      }
      if (sortKey === "name") {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return sortOrder === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }
      if (sortKey === "segment") {
        const segmentA = a.segment.toLowerCase();
        const segmentB = b.segment.toLowerCase();
        return sortOrder === "asc"
          ? segmentA.localeCompare(segmentB)
          : segmentB.localeCompare(segmentA);
      }
      if (sortKey === "call") {
        const callA = a.call.toLowerCase();
        const callB = b.call.toLowerCase();
        return sortOrder === "asc"
          ? callA.localeCompare(callB)
          : callB.localeCompare(callA);
      }
      if (sortKey === "version") {
        const versionA = a.version.toLowerCase();
        const versionB = b.version.toLowerCase();
        return sortOrder === "asc"
          ? versionA.localeCompare(versionB)
          : versionB.localeCompare(versionA);
      }
      if (sortKey === "entryprice") {
        return sortOrder === "asc"
          ? parseNumber(a.entryprice) - parseNumber(b.entryprice)
          : parseNumber(b.entryprice) - parseNumber(a.entryprice);
      }

      if (sortKey === "targetprice") {
        return sortOrder === "asc"
          ? parseNumber(a.targetprice) - parseNumber(b.targetprice)
          : parseNumber(b.targetprice) - parseNumber(a.targetprice);
      }

      if (sortKey === "stoploss") {
        const stoplossA = parseNumber(a.stoploss);
        const stoplossB = parseNumber(b.stoploss);

        return sortOrder === "asc"
          ? stoplossA - stoplossB
          : stoplossB - stoplossA;
      }
      if (sortKey === "riskratio") {
        return sortOrder === "asc"
          ? parseNumber(a.riskratio) - parseNumber(b.riskratio)
          : parseNumber(b.riskratio) - parseNumber(a.riskratio);
      }

      if (sortKey === "status") {
        const statusA = a.status.toLowerCase();
        const statusB = b.status.toLowerCase();
        return sortOrder === "asc"
          ? statusA.localeCompare(statusB)
          : statusB.localeCompare(statusA);
      }
      if (sortKey === "shared") {
        const sharedA = a.shared;
        const sharedB = b.shared;
        return sortOrder === "asc"
          ? sharedA.localeCompare(sharedB)
          : sharedB.localeCompare(sharedA);
      }
      return 0;
    });
  }, [filteredClients, sortKey, sortOrder]);

  const { registerDownloadHandler } = usePage();
  const stateRef = useRef({ sortedClients });

  useEffect(() => {
    registerDownloadHandler(async (format: "pdf" | "excel") => {
      // Simulate small delay if needed or for UI feedback (optional)
      await new Promise((r) => setTimeout(r, 800));

      const { sortedClients } = stateRef.current;
      if (!sortedClients.length) {
        alert("No calls to download.");
        return;
      }

      const rows = sortedClients.map((c) => ({
        "Call Type": c.call,
        "Stock Name": c.name,
        Segment: c.segment,
        Version: c.version,
        "Entry Price": c.entryprice,
        "Target Price": c.targetprice,
        "Stop Loss": c.stoploss,
        "Risk Ratio": c.riskratio,
        "Call Time / Date": c.timedate,
        Validity: c.validity,
        Shared: c.shared,
        Status: c.status,
      }));

      if (format === "excel") {
        const worksheet = XLSX.utils.json_to_sheet(rows);
        const range = XLSX.utils.decode_range(worksheet["!ref"]!);
        worksheet["!cols"] = [
          { wch: 12 },
          { wch: 22 },
          { wch: 14 },
          { wch: 10 },
          { wch: 14 },
          { wch: 16 },
          { wch: 14 },
          { wch: 12 },
          { wch: 26 },
          { wch: 14 },
          { wch: 10 },
          { wch: 12 },
        ];
        const headerStyle = {
          fill: {
            fgColor: { rgb: "A7E55C" }, // green
          },
          font: {
            bold: true,
            color: { rgb: "000000" },
          },
          alignment: {
            horizontal: "center",
            vertical: "center",
          },
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
        XLSX.utils.book_append_sheet(workbook, worksheet, "Calls");
        const excelBuffer = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });
        const blob = new Blob([excelBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        FileSaver.saveAs(blob, "calls_report.xlsx");
      } else if (format === "pdf") {
        const doc = new jsPDF("l", "pt", "a4"); // Landscape orientation
        const tableColumn = Object.keys(rows[0]);
        const tableRows = rows.map((row) => Object.values(row));

        autoTable(doc, {
          head: [tableColumn],
          body: tableRows,
          startY: 40,
          styles: { fontSize: 8 },
          headStyles: { fillColor: [167, 229, 92], textColor: [0, 0, 0] },
          didDrawPage: (_data: any) => {
            doc.text("Calls Report", 40, 30);
          },
        });
        doc.save("calls_report.pdf");
      }
    });
  }, [registerDownloadHandler]);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className=""
    >
      <div className="bg-white space-y-6 mt-4 rounded-t-2xl border-1 border-b-0">
        <div className="flex items-center gap-3 mt-2 pl-3 pb-2">
          <button
            onClick={() => setActiveTab("all")}
            className={cn(
              "cursor-pointer px-6 py-2 rounded-full font-medium transition border-2 border-[#D6D6D6]",
              activeTab === "all"
                ? "bg-[#a7e55c] text-[#121212]"
                : "bg-[#E2E2E2] text-[#667085]",
            )}
          >
            Live Calls{" "}
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
              "cursor-pointer px-6 py-2 rounded-full font-medium border-1 transition border border-[#ccc]",
              activeTab === "active"
                ? "bg-[#a7e55c] text-[#121212]"
                : "bg-[#E2E2E2] text-[#667085]",
            )}
          >
            Active{" "}
            <span
              className={cn(
                "ml-2 rounded-2xl p-1 px-1.5",
                activeTab === "active" ? "bg-[#5FAE2E]/40" : "bg-[#D6D6D6] ",
              )}
            >
              {counts.active}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("inactive")}
            className={cn(
              "cursor-pointer px-6 py-2 rounded-full font-medium border-1 transition border border-[#ccc]",
              activeTab === "inactive"
                ? "bg-[#a7e55c] text-[#121212]"
                : "bg-[#E2E2E2] text-[#667085]",
            )}
          >
            InActive{" "}
            <span
              className={cn(
                "ml-2 rounded-2xl p-1 px-1.5",
                activeTab === "inactive" ? "bg-[#5FAE2E]/40" : "bg-[#D6D6D6] ",
              )}
            >
              {counts.inactive}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("failed")}
            className={cn(
              "cursor-pointer px-6 py-2 rounded-full font-medium border-1 transition border border-[#ccc]",
              activeTab === "failed"
                ? "bg-[#a7e55c] text-[#121212]"
                : "bg-[#E2E2E2] text-[#667085]",
            )}
          >
            Failed{" "}
            <span
              className={cn(
                "ml-2 rounded-2xl p-1 px-1.5",
                activeTab === "failed" ? "bg-[#5FAE2E]/40" : "bg-[#D6D6D6] ",
              )}
            >
              {counts.failed}
            </span>
          </button>
        </div>
      </div>
      <div className="bg-white border border-[#eaecf0] h-[calc(100vh-310px)] flex flex-col rounded-b-2xl">
        <div className="overflow-x-auto scrollbar-x-thin">
          <div className="max-h-[calc(100vh-310px)] ">
            <table className="w-full table-fixed">
              <colgroup>
                <col className="w-[100px]" />
                <col className="w-[120px]" />
                <col className="w-[90px]  lg:table-column" />
                <col className="w-[90px]  xl:table-column" />
                <col className="w-[110px]" />
                <col className="w-[120px]  md:table-column" />
                <col className="w-[100px]  lg:table-column" />
                <col className="w-[100px]  xl:table-column" />
                <col className="w-[140px]" />
                <col className="w-[80px]  md:table-column" />
                <col className="w-[80px]  lg:table-column" />
                <col className="w-[70px]" />
                <col className="w-[55px]" />
              </colgroup>

              <thead>
                <tr className="border-b border-[#eaecf0] sticky top-0 z-10 bg-white">
                  <SortableHeader
                    label="Call Type"
                    sKey="call"
                    currentSortKey={sortKey}
                    currentSortOrder={sortOrder}
                    onSort={(k, o) => {
                      setSortKey(k);
                      setSortOrder(o);
                    }}
                  />

                  <SortableHeader
                    label="Stock Name"
                    sKey="name"
                    currentSortKey={sortKey}
                    currentSortOrder={sortOrder}
                    onSort={(k, o) => {
                      setSortKey(k);
                      setSortOrder(o);
                    }}
                  />

                  <th className=" lg:table-cell p-0">
                    <SortableHeader
                      label="Segment"
                      sKey="segment"
                      currentSortKey={sortKey}
                      currentSortOrder={sortOrder}
                      onSort={(k, o) => {
                        setSortKey(k);
                        setSortOrder(o);
                      }}
                    />
                  </th>

                  <th className=" xl:table-cell p-0">
                    <SortableHeader
                      label="Version"
                      sKey="version"
                      currentSortKey={sortKey}
                      currentSortOrder={sortOrder}
                      onSort={(k, o) => {
                        setSortKey(k);
                        setSortOrder(o);
                      }}
                    />
                  </th>

                  <SortableHeader
                    label="Entry Price"
                    sKey="entryprice"
                    currentSortKey={sortKey}
                    currentSortOrder={sortOrder}
                    onSort={(k, o) => {
                      setSortKey(k);
                      setSortOrder(o);
                    }}
                  />

                  <th className=" md:table-cell p-0">
                    <SortableHeader
                      label="Target Price"
                      sKey="targetprice"
                      currentSortKey={sortKey}
                      currentSortOrder={sortOrder}
                      onSort={(k, o) => {
                        setSortKey(k);
                        setSortOrder(o);
                      }}
                    />
                  </th>

                  <th className=" lg:table-cell p-0">
                    <SortableHeader
                      label="Stop Loss"
                      sKey="stoploss"
                      currentSortKey={sortKey}
                      currentSortOrder={sortOrder}
                      onSort={(k, o) => {
                        setSortKey(k);
                        setSortOrder(o);
                      }}
                    />
                  </th>
                  <th className=" lg:table-cell p-0">
                    <SortableHeader
                      label="Risk Ratio"
                      sKey="riskratio"
                      currentSortKey={sortKey}
                      currentSortOrder={sortOrder}
                      onSort={(k, o) => {
                        setSortKey(k);
                        setSortOrder(o);
                      }}
                    />
                  </th>


                  <SortableHeader
                    label="Call Time / Date"
                    sKey="timedate"
                    currentSortKey={sortKey}
                    currentSortOrder={sortOrder}
                    onSort={(k, o) => {
                      setSortKey(k);
                      setSortOrder(o);
                    }}
                  />
                  <th className="text-left p-3 text-xs font-semibold text-[#667085] uppercase tracking-wider md:table-cell">
                    Validity
                  </th>

                  <th className="lg:table-cell p-0">
                    <SortableHeader
                      label="Shared"
                      sKey="shared"
                      currentSortKey={sortKey}
                      currentSortOrder={sortOrder}
                      onSort={(k, o) => {
                        setSortKey(k);
                        setSortOrder(o);
                      }}
                    />
                  </th>

                  <th className="text-left p-3 text-xs font-semibold text-[#667085] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left p-3 text-xs font-semibold text-[#667085] uppercase tracking-wider">
                    More
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: rowsPerPage }).map((_, i) => (
                    <TableSkeletonRow key={i} />
                  ))
                ) : paginatedClients.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="h-[50vh]">
                      <div className="flex flex-col items-center justify-center h-full text-center font-nunito">
                        {/* Image */}
                        <Image
                          src="/clientnofound.png"
                          alt="No clients found"
                          width={280}
                          height={280}
                          priority
                        />

                        <p className="mt-6 text-[24px] font-semibold text-[#121212]">
                          No Stock found matching{" "}
                          <span className="text-[#121212]">
                            "{searchQuery}"
                          </span>
                        </p>

                        <p className="mt-2 text-[16px] text-[#667085]">
                          Try a different search term
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {paginatedClients.map((client, index) => (
                      <tr
                        key={index}
                        className={cn(
                          "hover:bg-[#f9fafb] transition h-[65px]",
                          index === paginatedClients.length - 1 && "border-0",
                        )}
                      >
                        <td
                          className={cn(
                            "p-4 text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis",
                            client.call === "Long" && "text-[#34C759]",
                            client.call === "Short" && "text-[#FF3B30]",
                          )}
                        >
                          {client.call}
                        </td>

                        <td className="p-4 text-sm font-medium text-[#101828] whitespace-nowrap overflow-hidden text-ellipsis">
                          {client.name}
                        </td>

                        <td className="p-4 text-sm whitespace-nowrap overflow-hidden text-ellipsis  lg:table-cell">
                          {client.segment}
                        </td>

                        <td className="p-4 text-sm font-medium text-[#101828] whitespace-nowrap overflow-hidden text-ellipsis xl:table-cell">
                          {client.version}
                        </td>

                        <td className="p-4 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                          {client.entryprice}
                        </td>

                        <td className="p-4 text-sm whitespace-nowrap overflow-hidden text-ellipsis  md:table-cell">
                          {client.targetprice}
                        </td>

                        <td className="p-4 text-sm whitespace-nowrap overflow-hidden text-ellipsis  lg:table-cell">
                          {client.stoploss}
                        </td>

                        <td className="p-4 text-sm whitespace-nowrap overflow-hidden text-ellipsis  xl:table-cell">
                          {client.riskratio}
                        </td>

                        <td className="text-sm whitespace-nowrap overflow-hidden text-ellipsis ">
                          {client.timedate}
                        </td>

                        <td className="p-4 text-sm whitespace-nowrap overflow-hidden text-ellipsis  md:table-cell">
                          {client.validity}
                        </td>

                        <td className="p-4 text-sm whitespace-nowrap overflow-hidden text-ellipsis  lg:table-cell">
                          {client.shared}
                        </td>

                        <td
                          className={cn(
                            "p-4 text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis",
                            client.status === "Hit" && "text-[#34C759]",
                            client.status === "Failed" && "text-[#FF3B30]",
                            client.status === "Inactive" && "text-yellow-500",
                          )}
                        >
                          {client.status}
                        </td>

                        <td className="p-4 whitespace-nowrap">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-[#667085] hover:text-[#101828] hover:bg-[#f9fafb]"
                          >
                            <Link href={`/editcall/${client.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {/* EMPTY ROW FILLER */}
                    {!loading &&
                      paginatedClients.length < rowsPerPage &&
                      Array.from({
                        length: rowsPerPage - paginatedClients.length,
                      }).map((_, i) => (
                        <tr key={`empty-${i}`} className="h-[65px]">
                          <td className="p-4" colSpan={13}>
                            &nbsp;
                          </td>
                        </tr>
                      ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-1">
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
    </motion.div>
  );
}

function TableSkeletonRow() {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: 13 }).map((_, i) => (
        <td key={i} className="p-4 py-6">
          <div className="h-4 w-full rounded-md bg-gray-200" />
        </td>
      ))}
    </tr>
  );
}

function SortableHeader({
  label,
  sKey,
  currentSortKey,
  currentSortOrder,
  onSort,
}: {
  label: string;
  sKey: SortKey;
  currentSortKey: SortKey;
  currentSortOrder: SortOrder;
  onSort: (key: SortKey, order: SortOrder) => void;
}) {
  const isSelected = currentSortKey === sKey;

  return (
    <th className="p-2 py-4 text-left text-xs font-semibold text-[#667085] uppercase tracking-wider whitespace-nowrap">
      <div className="flex items-center gap-1 whitespace-nowrap">
        <span>{label}</span>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-transparent"
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
