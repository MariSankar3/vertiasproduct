"use client";

import { EyeIcon, Link, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function NewClient() {
  const [] = useState("all");
  const router = useRouter();

  return (
    <div className="max-h-screen bg-[#f7f7f7] px-4">
      <div className="flex items-center justify-between px-2 h-14 rounded-full">
        <div className="flex items-center gap-2 ml-3 bg-[#121212] text-white rounded-full px-1 py-1 pr-3">
          <button
            onClick={() => router.back()}
            className="h-10 w-10 rounded-full bg-white text-black border-2 flex items-center justify-center transition cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <h1 className="text-[24px] font-medium">NEW CLIENT</h1>
        </div>
        <button className="px-10 py-2 rounded-full font-semibold bg-lime-300 text-black cursor-not-allowed">
          Next
        </button>
      </div>

      <div className="w-full flex py-8 px-24">
  <div className="w-full  rounded-xl">
    <div className="grid grid-cols-1  md:grid-cols-2 gap-8 text-black ">
      <InputBox label="Client First Name" value=""/>
      <InputBox label="Client Last Name" value="" />

      <InputBox label="Pan Number" value="" />
      <InputBox label="Email Address" value="" />

      <InputBox label="Mobile Number" value="" />
      <InputBox label="Date Of Birth" value="" />
    </div>
  </div>
</div>

    </div>
  );
}

function InputBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="w-full mt-1 border rounded-2xl border-[#A8A8A8] px-8 py-3 bg-white-50 focus:outline-none">
      <label className="text-xs text-gray-500">{label}</label>
      <input
        type="text"
        value={value}
        className="w-full mt-1 rounded-md text-[#1D2939] font-semibold focus:outline-none focus:ring-0 text-sm"
      />
    </div>
  );
}

function CheckItem({
  label,
  defaultChecked = false,
}: {
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          className="w-5 h-5 accent-purple-600"
        />
        <span className="text-gray-700 text-sm">{label}</span>
      </div>

      <EyeIcon className="text-[#E16448]" />
    </div>
  );
}
