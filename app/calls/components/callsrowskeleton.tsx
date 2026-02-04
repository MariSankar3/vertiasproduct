"use client";

type TableSkeletonRowProps = {
  columns?: number;
  rowHeightClass?: string;
};

export function TableSkeletonRow({
  columns = 13,
  rowHeightClass = "py-[17px]",
}: TableSkeletonRowProps) {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className={`p-4 ${rowHeightClass}`}>
          <div className="h-4 w-full rounded-md bg-gray-200" />
        </td>
      ))}
    </tr>
  );
}
