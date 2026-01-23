"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"

export function Verification() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="bg-[#121212] flex items-center justify-center p-8 lg:p-16">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-5">
          <div className="flex items-center gap-5">
            <Link href="/">
            <ArrowLeft className="h-8 w-9 text-white cursor-pointer" /> </Link>
            <h2 className="text-4xl font-bold text-white">Verify Code</h2>
          </div>
          <p className="text-[#fff] leading-relaxed">
            Verification code has send your mobile xxxxx87934|myregistermail@mail.com
          </p>
        </div>

        <div className="space-y-6">

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Input
                type="text"
                placeholder="0"
                defaultValue=""
                className="pl-8 h-16 w-18 rounded-2xl bg-white border-0 text-[#121212] placeholder:text-[#888888]"
              />
              <Input
                type="text"
                placeholder="0"
                defaultValue=""
                className="pl-8 h-16 w-18 rounded-2xl bg-white border-0 text-[#121212] placeholder:text-[#888888]"
              />
              <Input
                type="text"
                placeholder="0"
                defaultValue=""
                className="pl-8 h-16 w-18 rounded-2xl bg-white border-0 text-[#121212] placeholder:text-[#888888]"
              />
              <Input
                type="text"
                placeholder="0"
                defaultValue=""
                className="pl-8 h-16 w-18 rounded-2xl bg-white border-0 text-[#121212] placeholder:text-[#888888]"
              />
            </div>

            <div>
              <label htmlFor="terms" className="text-sm text-white cursor-pointer">
                Resend code in 00:23
              </label>
            </div>

            <Button className="w-xs h-[42px] rounded-full bg-[#DBF900] text-black font-semibold text-lg hover:bg-[#95d04a]">
              Validate
            </Button>

          </div>
        </div>
      </div>
    </div>
  )
}
