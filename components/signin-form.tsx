"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Check } from "lucide-react"
import { signIn } from "next-auth/react"
import { useEffect } from "react"



export function SignInForm() {
  const router = useRouter()
  const [rememberMe, setRememberMe] = useState(false)
  const [showtypePassword, setShowtypePassword] = useState(false)
  const [email, setEmail] = useState("")
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [password, setPassword] = useState("")
  const isDisabled = email.trim() === "" || password.trim() === ""
  const [formData, setFormData] = useState({
    email: "",
  })
  const SOFT_LOCK_AFTER = 3
  const HARD_LOCK_AFTER = 5

  const SOFT_LOCK_TIME = 2 * 60 // 2 minutes
  const HARD_LOCK_TIME = 30 * 60 // 30 minutes

  const [failedAttempts, setFailedAttempts] = useState(0)
  const [lockType, setLockType] = useState<"none" | "soft" | "hard">("none")
  const [remainingTime, setRemainingTime] = useState(0)

  const validateEmail = (value: string) =>
    /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)

  // const handleSignIn = () => { 
  //   const newErrors: { email?: string } = {}

  //   if (!validateEmail(email)) {
  //     newErrors.email = "Enter a valid Gmail address"
  //   }

  //   setErrors(newErrors)

  //   if (Object.keys(newErrors).length > 0) return

  //   // ✅ Proceed with API call
  //   console.log("Valid email, login allowed")
  // }



  //testing purpose only
const handleSignIn = () => {
  if (lockType !== "none") return

  const newErrors: { email?: string; password?: string } = {}
  let isFailed = false

  if (email !== "admin_ethereal@gmail.com") {
    newErrors.email = "Invalid email"
    isFailed = true
  }

  if (password !== "Test@123") {
    newErrors.password = "Incorrect password"
    isFailed = true
  }

  setErrors(newErrors)

  // ⛔ STOP HERE IF FAILED
  if (isFailed) {
    const attempts = failedAttempts + 1
    setFailedAttempts(attempts)

    if (attempts === SOFT_LOCK_AFTER) {
      setLockType("soft")
      setRemainingTime(SOFT_LOCK_TIME)
    }

    if (attempts >= HARD_LOCK_AFTER) {
      setLockType("hard")
      setRemainingTime(HARD_LOCK_TIME)
    }

    return // 🔴 THIS WAS MISSING
  }

  // ✅ SUCCESS (ONLY when email + password match)
  setFailedAttempts(0)
  setLockType("none")
  setErrors({})

  if (rememberMe) {
    localStorage.setItem("auth", "true")
    localStorage.setItem("email", email)
  }

  router.push("/dashboard")
}


  useEffect(() => {
    if (lockType === "none") return

    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setLockType("none")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [lockType])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  if (lockType === "hard") {
    return (
      <div className="bg-[#121212] flex items-center justify-center p-8 rounded-xl">
        <div className="bg-white p-8 rounded-xl max-w-md text-center space-y-4">

          <h2 className="text-xl font-bold">🔒 Account Locked</h2>

          <p className="text-gray-600">
            Too many failed login attempts.
          </p>

          <p className="font-semibold">
            Try again in {formatTime(remainingTime)}
          </p>

          <Link href="/forgot-password" className="text-blue-600 underline">
            Reset Password
          </Link>

          <p className="text-sm text-gray-500">
            Need help? support@vertias.app
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#121212] flex justify-center pt-15 rounded-[10px]">
      <div className="w-full max-w-md space-y-3">
        <div className="space-y-2 mb-6">
          <h2 className="text-4xl font-bold text-white font-nunito">Welcome!</h2>
          <p className="text-[#FFFFFF] text-[16px] leading-relaxed font-nunito">
            Upgrade to zero-friction compliance. Easy records, simple audits
          </p>
        </div>


        {lockType === "soft" && (
          <div className="text-yellow-900 p-4 rounded-lg text-sm text-center">
            ⚠️ Too many attempts. Please wait <b>{formatTime(remainingTime)}</b> before trying again.
          </div>
        )}

        <div className="space-y-6">
          <div className="flex rounded-full bg-white p-1">
            <button className="flex-1 font-nunito text-[16px] font-bold rounded-full bg-[#DBF900] text-black font-semibold py-3 transition">
              Signin
            </button>
            <Link
              href="/signup"
              className="flex-1 font-nunito text-[16px] font-bold rounded-full text-[#121212] font-semibold py-3 text-center hover:bg-[#f6f6f6] transition"
            >
              Signup
            </Link>
          </div>

          <div className="space-y-4">
            <div className="relative mt-8">
              <div className="h-20 rounded-full bg-white pl-20 border border-slate-300 px-16 flex flex-col justify-center">

                <label className="font-nunito text-sm text-[#888888] leading-none">Email \ Phone Number</label>

                <input
                  type="email"
                  list="saved-emails"
                  value={email}
                  onChange={(e) => {
                    const value = e.target.value
                    setEmail(value)

                    const valid = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)
                    setIsEmailValid(valid)

                    setErrors((prev) => ({ ...prev, email: undefined }))
                  }}
                  name="email"
                  autoComplete="email"
                  className="font-nunito text-base text-[#121212] placeholder:text-[#cccccc] outline-none bg-transparent pr-10"
                  placeholder="x.xxx@gmail.com"
                />
                {isEmailValid && (
                  <div className="absolute right-5 top-1/2 -translate-y-1/2">
                    <Check className="h-6 w-6 text-green-500" />
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

              <div className="h-20 rounded-full bg-white  border border-slate-300 px-20 flex flex-col justify-center">

                <label className="text-sm text-[#888888] leading-none font-nunito">Password</label>

                <input
                  type={showtypePassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="font-nunito text-base text-[#121212] placeholder:text-[#cccccc] outline-none bg-transparent"
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
                onClick={() => setShowtypePassword(!showtypePassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#121212]"
              >
                {showtypePassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>

            </div>

            <div className="flex items-center gap-2 px-5 py-3">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(value) => setRememberMe(Boolean(value))}
                className="cursor-pointer bg-white border-white data-[state=checked]:bg-green-500 data-[state=checked]:border-[#a7e55c]"
              />
              <label htmlFor="remember" className="font-nunito text-[14px] text-white cursor-pointer">
                Remember this device
              </label>
            </div>

            <Button
              disabled={isDisabled}
              onClick={handleSignIn}
              className={`
            w-full h-14 rounded-full text-lg cursor-pointer font-nunito font-bold 
            ${isDisabled
                  ? "bg-[#DBF900]/100 text-black cursor-not-allowed"
                  : "bg-[#DBF900] hover:bg-[#DBF100] text-black"}
            `}>
              Continue
            </Button>
            <div>
              <Button className="flex justify-center align-center text-sm w-full cursor-pointer font-nunito">
                Forget Password ?
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#FFFFFF]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 text-[#FFFFFF] bg-[#121212] font-nunito">or Continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">

              <Button
                variant="outline"
                className="cursor-pointer h-14 rounded-lg bg-white hover:bg-[#f6f6f6] border-0"
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              >
                <svg className="h-14 w-14 scale-[1.5]" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </Button>
              <Button variant="outline" className="cursor-pointer h-14 rounded-lg bg-white hover:bg-[#f6f6f6] border-0">
                <svg className="h-14 w-14 scale-[1.5]" fill="#000000" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
