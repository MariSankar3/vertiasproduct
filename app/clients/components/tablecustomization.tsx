// "use client";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { GripVertical } from "lucide-react";
// import {
//   DndContext,
//   closestCenter,
//   DragOverlay,
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   useSortable,
//   arrayMove,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

// type Column = {
//   key: string;
//   label: string;
//   mandatory?: boolean;
// };

// type Props = {
//   open: boolean;
//   onClose: () => void;
//   allColumns: Column[];
//   visibleColumns: string[];
//   setVisibleColumns: React.Dispatch<React.SetStateAction<string[]>>;
//   columnOrder: string[];
//   setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>;
//   storageKey: string;
// };

// export function TableCustomization({
//   open,
//   onClose,
//   allColumns,
//   visibleColumns,
//   setVisibleColumns,
//   columnOrder,
//   setColumnOrder,
//   storageKey,
// }: Props) {
//   const [activeId, setActiveId] = useState<string | null>(null);

//   if (!open) return null;

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ x: "110%" }}
//         animate={{ x: 0 }}
//         exit={{ x: "100%" }}
//         transition={{ duration: 0.5, ease: "easeInOut" }}
//         className="fixed top-0 right-0 z-50 w-[350px] h-full bg-white border-l p-6 rounded-2xl"
//       >
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h2 className="text-lg font-bold">Table customization</h2>
//             <p className="text-sm text-[#667085]">
//               A minimum of 8 columns must be visible
//             </p>
//           </div>
//           <button onClick={onClose}>✕</button>
//         </div>

//         <div className="flex flex-col justify-between h-[86vh] border-t py-4 overflow-y-auto">
//           <DndContext
//             collisionDetection={closestCenter}
//             onDragStart={(e) => setActiveId(e.active.id as string)}
//             onDragEnd={({ active, over }) => {
//               setActiveId(null);
//               if (!over || active.id === over.id) return;

//               setColumnOrder((items) =>
//                 arrayMove(
//                   items,
//                   items.indexOf(active.id as string),
//                   items.indexOf(over.id as string),
//                 ),
//               );
//             }}
//           >
//             <SortableContext
//               items={columnOrder}
//               strategy={verticalListSortingStrategy}
//             >
//               {columnOrder.map((key) => {
//                 const col = allColumns.find((c) => c.key === key)!;
//                 const checked = visibleColumns.includes(col.key);

//                 return (
//                   <SortableColumnRow
//                     key={col.key}
//                     column={col}
//                     checked={checked}
//                     disabled={!!col.mandatory}
//                     onToggle={(v) => {
//                       if (!v && visibleColumns.length <= 7) return;
//                       setVisibleColumns((prev) =>
//                         v
//                           ? [...prev, col.key]
//                           : prev.filter((k) => k !== col.key),
//                       );
//                     }}
//                   />
//                 );
//               })}
//             </SortableContext>

//             <DragOverlay>
//               {activeId && (
//                 <ColumnRow
//                   column={allColumns.find((c) => c.key === activeId)!}
//                   checked={visibleColumns.includes(activeId)}
//                   disabled={
//                     allColumns.find((c) => c.key === activeId)?.mandatory ??
//                     false
//                   }
//                 />
//               )}
//             </DragOverlay>
//           </DndContext>

//           <div className="flex justify-between pt-5 border-t">
//             <Button
//               variant="outline"
//               onClick={() => {
//                 const defaults = allColumns
//                   .filter((c) => c.mandatory)
//                   .map((c) => c.key);

//                 setVisibleColumns(defaults);
//                 setColumnOrder(allColumns.map((c) => c.key));
//                 localStorage.removeItem(storageKey);
//                 localStorage.removeItem("clients_table_column_order");
//               }}
//             >
//               Reset
//             </Button>

//             <Button
//               className="bg-[#A7E55C] text-black"
//               onClick={() => {
//                 localStorage.setItem(
//                   storageKey,
//                   JSON.stringify(visibleColumns),
//                 );
//                 localStorage.setItem(
//                   "clients_table_column_order",
//                   JSON.stringify(columnOrder),
//                 );
//                 onClose();
//               }}
//             >
//               Apply
//             </Button>
//           </div>
//         </div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }

// /* -------------------- Helpers -------------------- */

// function SortableColumnRow({ column, checked, disabled, onToggle }: any) {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: column.key });

//   return (
//     <div
//       ref={setNodeRef}
//       style={{
//         transform: CSS.Transform.toString(transform),
//         transition,
//       }}
//     >
//       <ColumnRow
//         column={column}
//         checked={checked}
//         disabled={disabled}
//         onToggle={onToggle}
//         dragHandleProps={{ ...attributes, ...listeners }}
//       />
//     </div>
//   );
// }

// function ColumnRow({
//   column,
//   checked,
//   disabled,
//   onToggle,
//   dragHandleProps,
// }: any) {
//   return (
//     <label className="flex items-center gap-3 p-1">
//       <span {...dragHandleProps} className="cursor-grab text-gray-400">
//         <GripVertical className="h-4 w-4" />
//       </span>
//       <Checkbox
//         checked={checked}
//         disabled={disabled}
//         onCheckedChange={onToggle}
//       />
//       {column.label}
//     </label>
//   );
// }
