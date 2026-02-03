"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, FileText, User, Phone, IdCard, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
// import {X} from "lucide-react"

export function SignUpForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [mobile, setMobile] = useState("")
  const [isMobileValid, setIsMobileValid] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showRetypePassword, setShowRetypePassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [sebiReg, setSebiReg] = useState("")
  const [isSebiValid, setIsSebiValid] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const validateSebi = (value: string) =>
    /^IN[A-Z]{1,3}\d{6}$/.test(value)

  const validateMobile = (value: string) =>
    /^[6-9]\d{9}$/.test(value)

  const validateGmail = (value: string) =>
    /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)


  const [errors, setErrors] = useState<Record<string, string>>({})
  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key]: "" })) // clear error on typing
  }
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!isSebiValid) {
      newErrors.sebi = "Invalid SEBI number (Format: INH / INA + 6 digits)"
    }

    if (!isEmailValid) {
      newErrors.email = "Enter a valid Gmail address"
    }

    if (!isMobileValid) {
      newErrors.phone = "Enter valid 10-digit mobile number"
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password)) {
      newErrors.password =
        "Password must be 8+ chars, include uppercase, lowercase & number"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!selectedRole) {
      newErrors.role = "Please select a role"
    }

    if (!agreeTerms) {
      newErrors.terms = "You must agree the Terms & Conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const canSubmit =
    sebiReg &&
    email &&
    mobile &&
    formData.password &&
    formData.confirmPassword

  return (
    <div className="bg-[#121212] flex justify-center p-15 rounded-[10px] lg:h-[calc(100vh-4px)] lg:overflow-y-auto no-scrollbar font-nunito">
      <div className="w-full max-w-md space-y-3">
        <div className="space-y-2 mb-6">
          <h2 className="text-4xl font-bold text-white font-nunito">Welcome!</h2>
          <p className="text-[#FFFFFF] text-[16px] leading-relaxed font-nunito">
            Upgrade to zero-friction compliance. Easy records, simple audits
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex rounded-full bg-white p-1">
            <Link
              href="/signin"
              className="flex-1 font-nunito rounded-full text-[#121212] font-semibold py-3 text-center transition hover:bg-[#f6f6f6]"
            >
              Signin
            </Link>
            <button className="flex-1 font-nunito rounded-full bg-[#DBF900] text-black font-semibold py-3 transition">
              Signup
            </button>
          </div>
          {errors.role && (
            <p className="text-red-500 text-xs mb-2">
              {errors.role}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                setSelectedRole("research")
                setErrors(prev => ({ ...prev, role: "" }))
              }}

              className={cn(
                "p-6 rounded-[22px] border-2 transition-all text-left",
                selectedRole === "research" ? "bg-white border-white" : "bg-white border-[#344054]",
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <FileText
                  className={cn("h-6 w-6", selectedRole === "research" ? "text-[#121212]" : "text-[#888888]")}
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 16 16"
                  className={cn(
                    "transition-colors duration-200",
                    selectedRole === "research"
                      ? "text-green-500"
                      : "text-gray-400"
                  )}
                  fill="currentColor"
                >
                  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                </svg>

              </div>

              <p
                className={cn("text-sm font-medium", selectedRole === "research" ? "text-[#121212]" : "text-[#888888]")}
              >
                Research
                <br />
                Analysts
              </p>
            </button>

            <button
              onClick={() => setSelectedRole("investment")}
              className={cn(
                "p-6 rounded-3xl border-2 transition-all text-left",
                selectedRole === "investment" ? "bg-white border-white" : "bg-white border-[#344054]",
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <User className={cn("h-6 w-6", selectedRole === "investment" ? "text-[#121212]" : "text-[#888888]")} />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 16 16"
                  className={cn(
                    "transition-colors duration-200",
                    selectedRole === "investment"
                      ? "text-green-500"
                      : "text-gray-400"
                  )}
                  fill="currentColor"
                >
                  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                </svg>
              </div>
              <p
                className={cn(
                  "text-sm font-medium",
                  selectedRole === "investment" ? "text-[#121212]" : "text-[#888888]",
                )}
              >
                Investment
                <br />
                Advisor
              </p>
            </button>
          </div>

          <div className="space-y-4">
            <div className="relative mt-8">
              <div className="h-20 rounded-full bg-white pl-20 border border-[#E0E0E0] px-16 flex flex-col justify-center">

                <label className="text-sm text-[#888888] leading-none">SEBI Registration Number</label>



                <input
                  type="text"
                  value={sebiReg}
                  onChange={(e) => {
                    const value = e.target.value.toUpperCase()
                    setSebiReg(value)

                    const valid = validateSebi(value)
                    setIsSebiValid(valid)

                    if (valid) {
                      setErrors(prev => ({ ...prev, sebi: "" }))
                    }
                  }}

                  placeholder="INA0000xxxxx or INH0000xxxxx"
                  className="text-base text-[#121212] placeholder:text-[#cccccc] outline-none"
                />

                {isSebiValid && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                )}


                {errors.sebi && (
                  <p className="text-red-500 text-xs mt-1">{errors.sebi}</p>
                )}

              </div>


              <div className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center h-full">
                <IdCard className="h-6 w-6 text-[#616161]" />
                <div className="h-10 border-r border-[#A8A8A8] ml-3"></div>
              </div>
            </div>
            <div className="relative mt-8">
              <div className="h-20 rounded-full bg-white pl-20 border border-[#E0E0E0] px-16 flex flex-col justify-center">

                <label className="text-sm text-[#888888] leading-none">Email</label>


                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    const value = e.target.value.toLowerCase()
                    setEmail(value)

                    const valid = validateGmail(value)
                    setIsEmailValid(valid)

                    if (valid) {
                      setErrors(prev => ({ ...prev, email: "" }))
                    }
                  }}

                  placeholder="x.xxx@domainname.com"
                  className="text-base text-[#121212] placeholder:text-[#cccccc] outline-none"
                />

                {/* ✅ Green tick */}
                {isEmailValid && (
                  <div className="absolute right-5 top-1/2 -translate-y-1/2">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                )}
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>


              <div className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center h-full">
                <Mail className="h-6 w-6 text-[#616161]" />
                <div className="h-10 border-r border-[#A8A8A8] ml-3"></div>
              </div>
            </div>
            <div className="relative mt-8">
              <div className="h-20 rounded-full bg-white pl-20 border border-[#E0E0E0] px-16 flex flex-col justify-center">

                <label className="text-sm text-[#888888] leading-none">Mobile Number</label>

                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "")
                    setMobile(value)

                    const valid = validateMobile(value)
                    setIsMobileValid(valid)

                    if (valid) {
                      setErrors(prev => ({ ...prev, phone: "" }))
                    }
                  }}

                  placeholder="91761 12345"
                  className="text-base text-[#121212] placeholder:text-[#cccccc] outline-none"
                />

                {isMobileValid && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                )}
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>


              <div className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center h-full">
                <Phone className="h-6 w-6 text-[#616161]" />
                <div className="h-10 border-r border-[#A8A8A8] ml-3"></div>
              </div>
            </div>

            <div className="relative mt-8">

              <div className="h-20 rounded-full bg-white border border-[#E0E0E0] px-20 flex flex-col justify-center">

                <label className="text-sm text-[#888888] leading-none">Password</label>

                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="text-base text-[#121212] placeholder:text-[#cccccc] outline-none"
                  placeholder="Enter Password"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center h-full">
                <Lock className="h-6 w-6 text-[#616161]" />
                <div className="h-10 border-r border-[#A8A8A8] ml-3"></div>
              </div>

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#121212]"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>

            </div>

            <div className="relative mt-8">

              <div className="h-20 rounded-full bg-white border border-[#E0E0E0] px-20 flex flex-col justify-center">

                <label className="text-sm text-[#888888] leading-none">Retype Password</label>

                <input
                  type={showRetypePassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  className="text-base text-[#121212] placeholder:text-[#cccccc] outline-none"
                  placeholder="Retype Password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center h-full">
                <Lock className="h-6 w-6 text-[#616161]" />
                <div className="h-10 border-r border-[#A8A8A8] ml-3"></div>
              </div>

              <button
                type="button"
                onClick={() => setShowRetypePassword(!showRetypePassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#121212]"
              >
                {showRetypePassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>

            </div>


            <div className="flex items-center gap-2 mt-8 ml-5 pb-4">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                disabled={!agreeTerms}
                onCheckedChange={(value) => {
                  setAgreeTerms(Boolean(value))
                  setErrors(prev => ({ ...prev, terms: "" }))
                }}
                className="bg-white cursor-pointer border-white data-[state=checked]:bg-green-500 data-[state=checked]:border-[#a7e55c]"
              />

              <label htmlFor="terms" className="text-sm text-white cursor-pointer">
                Agree all
              </label>
              <button
                type="button"
                onClick={() => setShowTerms(true)}
                className="text-[#AEB6FF] font-medium cursor-pointer"
              >
                T&C
              </button>


            </div>
            {errors.terms && (
              <p className="text-red-500 text-xs ml-5 mt-[-14px] mb-[20px]">
                {errors.terms}
              </p>
            )}
          </div>

        </div>
        <Button
          onClick={() => {
            if (validateForm()) {
              console.log("Form valid:", {
                sebiReg,
                email,
                mobile,
                selectedRole,
                ...formData,
              })

              // ✅ Navigate to verification page
              router.push("/verification")
            }
          }}
          disabled={!canSubmit}
          className="font-bold mb-9 w-full h-14 rounded-full bg-[#DBF900] text-black font-semibold text-lg hover:bg-[#DBF100] cursor-pointer"
        >
          Continue
        </Button>

      </div>
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40  p-4">
          <div className="w-[85vw] h-[90vh] bg-[#F2F2F2] rounded-[20px] flex flex-col shadow-2xl overflow-hidden relative border border-white/20">

            {/* Close Button */}
            <button
              onClick={() => setShowTerms(false)}
              className="absolute top-6 right-8 text-3xl font-light text-gray-400 hover:text-black transition-colors z-10 cursor-pointer"
            >
              ×
            </button>

            {/* Header - Centered as per image */}
            <div className="mt-8 pt-4 pb-2 flex justify-center bg-[white] rounded-t-[20px] mx-60">
              <h2 className="text-[24px] font-bold text-gray-900">
                Terms & Conditions
              </h2>
            </div>

            {/* White Content Card */}
            <div className="flex-1 overflow-hidden px-60 pb-4 ">
              <div className="h-full bg-white rounded-b-[20px] flex flex-col">
                {/* Scrollable Text Area */}
                <div className="flex-1 overflow-y-auto px-10 py-10 text-[14px] text-gray-600 leading-relaxed custom-scrollbar">
                  <div className="space-y-6">
                    <p>
                      This Agreement (“Agreement”) is made and entered into as of
                      <span className="font-medium text-[#101828]"> 2025-10-22 </span>
                      (the “Signing Date”) by and between:
                    </p>

                    <p>
                      This SERVICE Agreement (“Agreement”) is made between
                      <span className="font-medium text-[#101828]"> A and Y Market Research</span>,
                      having its registered office at 512, Sun Avenue One, Ambawadi, Manekbag Shyamal Road
                      (hereinafter referred to as “Service Provider” or “RA”) and
                      <span className="font-medium text-[#101828]"> Suganth alagesan</span>,
                      PAN: <span className="font-medium text-[#101828]">BNJPA5529D</span>,
                      officially registered on Signalz.in (hereinafter referred to as “User”).
                    </p>

                    <p>
                      The Service Provider and the User are hereinafter individually referred to
                      as a “Party” and collectively referred to as the “Parties”.
                    </p>

                    <div className="pt-2">
                      <h3 className="font-bold mb-3">1. DEFINITIONS:</h3>
                      <div className="space-y-4">
                        <p>A. “User” refers to any individual who avails services after consenting to this agreement.</p>
                        <p>B. “Service Provider” is a SEBI-registered Research Analyst (RA) or Registered Investment Advisor (RIA).</p>
                        <p>C. “Signalz” refers to the platform owned by Katalx Technologies Pvt Ltd, used by SEBI-
                          registered RAs or RIAs for managing and delivering research services such as
                          recommendations across asset class, educational content, webinars, facilitation of
                          user KYC, digital signing of agreements and record keeping.</p>
                        <p>6. DEFINITIONS:</p>
                        <p>P. “User” refers to any individual who avails services after consenting to this
                          agreement.</p>
                        <p>Q. “Service Provider” is a SEBI-registered Research Analyst (RA) or Registered
                          Investment Advisor (RIA).</p>
                        <p>R. “Signalz” refers to the platform owned by Katalx Technologies Pvt Ltd, used by SEBI-
                          registered RAs or RIAs for managing and delivering research services such as
                          recommendations across asset class, educational content, webinars, facilitation of
                          user KYC, digital signing of agreements and record keeping.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer - Exactly like the image button */}
            <div className="pb-8 pt-2 flex justify-center">
              <button
                onClick={() => {
                  setAgreeTerms(true);
                  setShowTerms(false);
                }}
                className="flex items-center gap-3 px-8 py-3 bg-[#A8E65C] border-[2px] border-black rounded-full shadow-[0px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[0px_1px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-[2px] active:shadow-none cursor-pointer"
              >
                {/* <div className="w-5 h-5 bg-white border border-gray-300 rounded flex items-center justify-center">
             <div className="w-3 h-3 bg-[#A8E65C] rounded-sm"></div>
          </div> */}
                <span className="text-black font-bold text-sm">
                  Read and Agreed all
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>


  )
}
