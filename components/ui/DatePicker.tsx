// "use client";

// import { useState } from "react";
// import { DayPicker } from "react-day-picker";
// import { format } from "date-fns";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import "react-day-picker/dist/style.css";

// // The exact lime green from your screenshot
// const LIME_BG = "#B4E64E";

// export function DatePicker({
//   label,
//   value,
//   onChange,
//   required = false,
// }: {
//   label: string;
//   value?: Date;
//   onChange: (date?: Date) => void;
//   required?: boolean;
// }) {
//   const [open, setOpen] = useState(false);
  
//   // Default to today
//   const selectedDate = value || new Date();

//   return (
//     <div className="relative w-[320px] font-sans">
//       {/* INPUT BOX - No border version */}
//       <div
//         onClick={() => setOpen(!open)}
//         className="w-full px-6 py-3 bg-white cursor-pointer hover:bg-gray-50 transition-colors rounded-2xl"
//       >
//         <label className="text-xs text-gray-500 font-medium">
//           {label}
//           {required && <span className="text-red-500 ml-0.5">*</span>}
//         </label>
//         <div className="mt-0.5 font-bold text-base text-black">
//           {value ? format(value, "dd / MM / yyyy") : format(new Date(), "dd / MM / yyyy")}
//         </div>
//       </div>

//       {/* CALENDAR POPOVER */}
//       {open && (
//         <div className="absolute z-50 mt-2 w-full rounded-[2.5rem] shadow-2xl bg-white overflow-hidden border-none outline-none">
//           {/* HEADER SECTION - Solid Green */}
//           <div style={{ backgroundColor: LIME_BG }} className="px-8 py-6 text-black">
//             <div className="text-lg font-medium opacity-90">
//               {format(selectedDate, "yyyy")}
//             </div>
//             <div className="text-3xl font-bold mt-1">
//               {format(selectedDate, "EEE, MMM d")}
//             </div>
//           </div>

//           {/* DAY PICKER SECTION */}
//           <div className="p-4 pb-6">
//             <DayPicker
//               mode="single"
//               selected={selectedDate}
//               onSelect={(date) => {
//                 if (date) {
//                   onChange(date);
//                   setOpen(false);
//                 }
//               }}
//               // Hides numbers from other months
//               showOutsideDays={false} 
//               weekStartsOn={1}
//               classNames={{
//                 months: "flex flex-col",
//                 month: "space-y-4",
//                 caption: "flex justify-between items-center px-4 mb-4 relative",
//                 caption_label: "text-base font-bold text-gray-800 w-full text-center",
//                 nav: "flex items-center absolute w-full justify-between z-10 left-0 px-2",
//                 nav_button: "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity border-none outline-none focus:ring-2 focus:ring-[#B4E64E] rounded-full",
//                 table: "w-full border-collapse",
//                 head_row: "flex justify-between mb-2",
//                 head_cell: "text-gray-400 w-10 font-medium text-sm",
//                 row: "flex w-full justify-between mt-1",
//                 cell: "relative p-0 text-center focus-within:relative focus-within:z-20",
//                 day: "h-10 w-10 p-0 font-medium text-gray-700 rounded-xl transition-all hover:bg-[#B4E64E] hover:text-black focus:bg-[#B4E64E] focus:text-black outline-none border-none",
//                 day_selected: "bg-[#B4E64E] !text-black font-bold rounded-2xl scale-110 shadow-sm", // Rounded square green background
//                 day_today: "text-[#B4E64E] font-extrabold",
//                 day_outside: "invisible", // Ensures outside numbers are completely hidden
//                 day_disabled: "text-gray-200",
//               }}
//               // FIX FOR ICON ERROR: Wrap in functional components that accept props
//               components={{
//                 IconLeft: ({ ...props }) => <ChevronLeft className="h-5 w-5" />,
//                 IconRight: ({ ...props }) => <ChevronRight className="h-5 w-5" />,
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }