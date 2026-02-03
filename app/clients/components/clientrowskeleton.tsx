"use client";

type ClientRowSkeletonProps = {
  visibleColumns: string[];
};

export function ClientRowSkeleton({
  visibleColumns,
}: ClientRowSkeletonProps) {
  return (
    <tr className="animate-pulse">
      {/* Checkbox skeleton */}
      <td className="px-4 py-3">
        <div className="h-4 w-4 bg-gray-200 rounded" />
      </td>

      {visibleColumns.includes("id") && (
        <td className="px-4 py-3">
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </td>
      )}

      {visibleColumns.includes("name") && (
        <td className="px-4 py-3">
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </td>
      )}

      {visibleColumns.includes("status") && (
        <td className="px-4 py-3">
          <div className="h-6 w-20 bg-gray-200 rounded-md" />
        </td>
      )}

      {visibleColumns.includes("riskScore") && (
        <td className="px-4 py-3">
          <div className="h-4 w-10 bg-gray-200 rounded" />
        </td>
      )}

      {visibleColumns.includes("riskCategory") && (
        <td className="px-4 py-3">
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </td>
      )}

      {visibleColumns.includes("email") && (
        <td className="px-4 py-3">
          <div className="h-4 w-36 bg-gray-200 rounded" />
        </td>
      )}

      {visibleColumns.includes("phone") && (
        <td className="px-4 py-3">
          <div className="h-4 w-28 bg-gray-200 rounded" />
        </td>
      )}

      {visibleColumns.includes("dob") && (
        <td className="px-4 py-3">
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </td>
      )}

      {visibleColumns.includes("gender") && (
        <td className="px-4 py-3">
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </td>
      )}

      {visibleColumns.includes("lastlogin") && (
        <td className="px-4 py-3">
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </td>
      )}

      {visibleColumns.includes("lastcall") && (
        <td className="px-4 py-3">
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </td>
      )}

      {visibleColumns.includes("city") && (
        <td className="px-4 py-3">
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </td>
      )}

      {visibleColumns.includes("state") && (
        <td className="px-4 py-3">
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </td>
      )}

      {visibleColumns.includes("kycvalidated") && (
        <td className="px-4 py-3">
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </td>
      )}

      {visibleColumns.includes("actions") && (
        <td className="px-4 py-3">
          <div className="h-8 w-8 bg-gray-200 rounded-full" />
        </td>
      )}
    </tr>
  );
}
