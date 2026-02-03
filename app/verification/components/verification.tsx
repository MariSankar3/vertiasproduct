"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"

export function Verification() {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""])

  // ✅ Correct ref type for shadcn Input
  const inputsRef = useRef<(React.ElementRef<typeof Input> | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return // only one digit

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  return (
    <div className="bg-[#121212] min-h-screen flex items-center justify-center p-8 lg:p-16">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="space-y-5">
          <div className="flex items-center gap-5">
            <Link href="/">
              <ArrowLeft className="h-8 w-9 text-white cursor-pointer" />
            </Link>
            <h2 className="text-4xl font-bold text-white">Verify Code</h2>
          </div>

          <p className="text-white leading-relaxed">
            Verification code has been sent to your mobile xxxxx87934 |
            myregistermail@mail.com
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="space-y-6">
          <div className="flex items-center gap-7">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el: React.ElementRef<typeof Input> | null) => {
                  inputsRef.current[index] = el
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="
                  h-18 w-20 text-center text-3xl font-bold
                  rounded-[18px] bg-white border-0
                  text-[#121212]
                  focus:ring-2 focus:ring-[#DBF900]
                "
              />
            ))}
          </div>

          {/* Resend */}
          <p className="text-sm text-white cursor-pointer">
            Resend code in <span className="font-semibold">00:23</span>
          </p>

          {/* Submit */}
          <Button
            className="w-full h-[42px] rounded-full bg-[#DBF900] text-black font-semibold text-lg"
            disabled={otp.some((d) => d === "")}
          >
            Validate
          </Button>
        </div>
      </div>
    </div>
  )
}
