"use client";

import { ArrowLeft, Calendar, Eye, Check, Link as LinkIcon, Copy } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const mobileRegex = /^[6-9]\d{9}$/;

export function NewClient() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 Form State
  const [errors, setErrors] = useState<{
    pan?: string;
    email?: string;
    mobile?: string;
  }>({});

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    pan: "",
    email: "",
    mobile: "",
    dob: undefined as Date | undefined,
  });

  // Step 2 Compliance State
  const [complianceState, setComplianceState] = useState({
    kyc: false,
    clientIdentity: false,
    riskProfile: false,
    investmentObjectives: false,
    adviceEligibility: false,
    riaAgreement: false,
  });

 const handleNext = () => {
  if (currentStep === 1 && !isStep1Valid) return; // 🚫 block
  if (currentStep < 3) setCurrentStep((p) => p + 1);
};


  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((p) => p - 1);
    } else {
      router.back();
    }
  };
  const isStep1Valid =
  form.firstName.trim() !== "" &&
  form.lastName.trim() !== "" &&
  panRegex.test(form.pan) &&
  gmailRegex.test(form.email) &&
  mobileRegex.test(form.mobile) &&
  !!form.dob &&
  !errors.pan &&
  !errors.email &&
  !errors.mobile;


  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className=" bg-[#f7f7f7] px-4 pb-10"
    >
      {/* HEADER */}
      <div className="relative flex items-center justify-between px-2 h-14 rounded-full mt-2">
        <div className="flex items-center gap-2 ml-3 bg-[#121212] text-white rounded-full px-1 pr-4 py-1">
          <button
            onClick={handleBack}
            className="h-10 w-10 rounded-full bg-white text-black border-2 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <h1 className="text-[24px] font-medium uppercase">New Client</h1>
        </div>

        {/* STEPPER aligned to center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
         <Stepper currentStep={currentStep} onStepChange={setCurrentStep} />
        </div>

        <button
  onClick={handleNext}
  disabled={currentStep === 1 && !isStep1Valid}
  className={cn(
    "px-10 py-2 rounded-full font-semibold transition",
    currentStep === 3
      ? "bg-[#dcfcc3] text-black/40 cursor-default"
      : currentStep === 1 && !isStep1Valid
      ? "bg-lime-300/50 text-black/50 cursor-not-allowed"
      : "bg-lime-300 text-black cursor-pointer hover:bg-lime-400"
  )}
>
  Next
</button>

      </div>

      {/* CONTENT AREA */}
      <div className="w-full flex justify-center py-8">
        <div className="w-full py-4 px-4 md:px-12">
          {currentStep === 1 && (
            <Step1Form 
              form={form} 
              setForm={setForm} 
              errors={errors} 
              setErrors={setErrors} 
            />
          )}
          {currentStep === 2 && (
            <Step2Compliance 
              state={complianceState} 
              setState={setComplianceState} 
            />
          )}
          {currentStep === 3 && <Step3MagicLink clientName={`${form.firstName} ${form.lastName}`} />}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- STEP 1: CREATE CLIENT ---------------- */
function Step1Form({
  form,
  setForm,
  errors,
  setErrors,
}: {
  form: any;
  setForm: any;
  errors: any;
  setErrors: any;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 5 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -5 }}
      className="w-full"
    >
      <p className="text-2xl font-semibold pb-6 pt-4 uppercase text-black">Create Client</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        <InputBox
          label="Client First Name"
          placeholder="First Name"
          value={form.firstName}
          required
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />

        <InputBox
          label="Client Last Name"
          placeholder="Last Name"
          value={form.lastName}
          required
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />

        <InputBox
          label="PAN Number"
          placeholder="ABCDE1234F"
          value={form.pan}
          required
          error={errors.pan}
          onChange={(e) => {
            const val = e.target.value.toUpperCase();
            setForm({ ...form, pan: val });
            setErrors((prev: any) => ({
              ...prev,
              pan: panRegex.test(val) ? undefined : "Invalid PAN format Excepted : ABCDE1234F",
            }));
          }}
        />

        <InputBox
          label="Email Address"
          placeholder="example@gmail.com"
          value={form.email}
          required
          error={errors.email}
          onChange={(e) => {
            const val = e.target.value;
            setForm({ ...form, email: val });
            setErrors((prev: any) => ({
              ...prev,
              email: gmailRegex.test(val) ? undefined : "Only Gmail addresses allowed",
            }));
          }}
        />

        <InputBox
          label="Mobile Number"
          placeholder="xxxxx xxxxx"
          value={form.mobile}
          required
          error={errors.mobile}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "").slice(0, 10);
            setForm({ ...form, mobile: val });
            setErrors((prev: any) => ({
              ...prev,
              mobile: mobileRegex.test(val)
                ? undefined
                : "Enter valid 10-digit mobile number",
            }));
          }}
        />

        <DatePickerBox
          label="Date of Birth"
          required
          value={form.dob}
          onChange={(date) => setForm({ ...form, dob: date })}
        />
      </div>
    </motion.div>
  );
}

/* ---------------- STEP 2: COMPLIANCE PREREQUISITES ---------------- */
function Step2Compliance({ state, setState }: { state: any; setState: any }) {
  const toggle = (key: string) => {
    setState((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 5 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -5 }}
      className="w-full"
    >
      <div className="flex items-center justify-between pb-8">
         <p className="text-2xl pt-4 font-semibold uppercase text-black">Compliance Prerequisites</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        {/* Left Column */}
        <div className="space-y-6">
          <ComplianceItem 
            label="KYC" 
            checked={state.kyc} 
            onChange={() => toggle("kyc")} 
            disabled
          />
          <ComplianceItem 
            label="Risk profile" 
            checked={state.riskProfile} 
            onChange={() => toggle("riskProfile")} 
            hasEye 
          />
          <ComplianceItem 
            label="Advice Eligibility Configuration" 
            checked={state.adviceEligibility} 
            onChange={() => toggle("adviceEligibility")} 
            hasEye 
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <ComplianceItem 
            label="Client Identity Created" 
            checked={state.clientIdentity} 
            onChange={() => toggle("clientIdentity")} 
            disabled
          />
          <ComplianceItem 
            label="Investment Objectives" 
            checked={state.investmentObjectives} 
            onChange={() => toggle("investmentObjectives")} 
            hasEye 
          />
          <ComplianceItem 
            label="RIA Agreement & MITC" 
            checked={state.riaAgreement} 
            onChange={() => toggle("riaAgreement")} 
            hasEye 
          />
        </div>
      </div>
    </motion.div>
  );
}

function ComplianceItem({
  label,
  checked,
  onChange,
  hasEye = false,
  disabled = false,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  hasEye?: boolean;
  disabled?: boolean;
}) {

  return (
    <div 
      onClick={() => {
    if (!disabled) onChange();
  }}
     className={cn(
  "flex items-center justify-between p-4 rounded-xl border bg-white transition select-none h-[72px]",
  disabled
    ? "cursor-not-allowed opacity-95"
    : checked
    ? "border-[#A7E55C] bg-[#fafff5] cursor-pointer"
    : "border-gray-400 hover:border-[#A7E55C] cursor-pointer"
)}

    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-5 h-5 rounded-full border-2 flex items-center justify-center transition",
          checked ? "border-[#66c61c]" : "border-gray-300"
        )}>
           {checked && <div className="w-2.5 h-2.5 bg-[#66c61c] rounded-full" />}
        </div>
        <span className={cn("font-semibold text-sm", checked ? "text-black" : "text-gray-800")}>
          {label}
        </span>
      </div>

      {hasEye && (
        <Eye className="w-5 h-5 text-[#E16448]" />
      )}
    </div>
  );
}

/* ---------------- STEP 3: MAGIC LINK ---------------- */
import { Send } from "lucide-react";

function Step3MagicLink({ clientName }: { clientName: string }) {
  const displayClientName = clientName.trim() || "Aditya Verma";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex items-center justify-center pt-20"
    >
        <div className="bg-white rounded-3xl p-10 border border-gray-200 flex flex-col items-center text-center max-w-xl w-full">
           {/* Icon Circle */}
           <div className="w-20 h-20 rounded-full border-2 border-gray-800 flex items-center justify-center mb-6">
              <Send className="w-8 h-8 text-gray-800 mt-0.5 mr-0.5" />
           </div>
           
           <h2 className="text-xl font-bold text-[#121212] uppercase mb-2 tracking-wide">
             Ready to Onboard Client
           </h2>
           
           <p className="text-[#888888] text-sm leading-relaxed mb-8 max-w-[85%]">
             {/* All compliance checks for RIA workflow are complete. Send the secure Magic Link to <span className="text-gray-900 font-medium">{displayClientName}</span> to initiate the client-side approval process. */}
               All compliance checks for RIA workflow are complete. Send the secure Magic Link to {displayClientName} to initiate the client-side approval process.
           </p>
           
           <button className="cursor-pointer bg-[#a7e55c] hover:bg-[#96d649] text-[#121212] font-bold py-3 px-6 rounded-full transition transform hover:scale-102 active:scale-100 shadow-sm">
             Send Magic Link
           </button>
        </div>
    </motion.div>
  );
}

/* ---------------- STEPPER COMPONENT ---------------- */

export default function Stepper({
  currentStep,
  onStepChange,
}: {
  currentStep: number;
  onStepChange: (step: number) => void;
}) {
  const steps = [
    { id: 1, label: "Create" },
    { id: 2, label: "Compliance" },
    { id: 3, label: "Magic Link" },
  ];

  return (
    <div className="flex items-start justify-center">
      {steps.map((step, idx) => {
        const isCompleted = step.id < currentStep;
        const isActive = step.id === currentStep;
        const isClickable = step.id <= currentStep;

        return (
          <div key={step.id} className="flex items-start">
            {/* Step Circle & Label Container */}
            <div className="flex flex-col items-center w-9 relative">
              {/* Circle (CLICKABLE) */}
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => onStepChange(step.id)}
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center transition-all shrink-0 z-10",
                  isCompleted && "bg-[#4D4D4D] cursor-pointer", // Match the dark grey from your image
                  isActive && "border-[3px] border-black cursor-pointer bg-white",
                  !isCompleted && !isActive && "border-[2px] border-[#D1D5DB] bg-white",
                  !isClickable && "cursor-not-allowed"
                )}
              >
                {isCompleted && (
                  <Check className="w-4 h-4 text-white" strokeWidth={4} />
                )}
                {isActive && (
                  <div className="w-2.5 h-2.5 bg-black rounded-full" />
                )}
              </button>

              {/* Label (Positioned absolutely to avoid pushing the line) */}
              <div className="absolute top-12 whitespace-nowrap">
                 <button
                    type="button"
                    disabled={!isClickable}
                    onClick={() => onStepChange(step.id)}
                    className={cn(
                      "text-[14px] font-medium transition",
                      isActive ? "text-black" : "text-[#9CA3AF]",
                      isClickable ? "cursor-pointer" : "cursor-not-allowed"
                    )}
                  >
                    {step.label}
                  </button>
              </div>
            </div>

            {/* Connecting line */}
            {idx < steps.length - 1 && (
              <div
                className={cn(
                  "w-24 h-[2px] mt-[18px] transition-colors", // h-[2px] and mt calculation for perfect center
                  step.id < currentStep ? "bg-[#4D4D4D]" : "bg-[#D1D5DB]"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- REUSABLE HELPERS ---------------- */

function InputBox({
  label,
  value,
  placeholder,
  onChange,
  required = false,
  error,
}: {
  label: string;
  value: string;
  placeholder: string;
  required?: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="w-full">
      <div
        className={cn(
          "border rounded-2xl px-6 py-4 bg-white transition hover:shadow-sm",
          error ? "border-red-500" : "border-gray-400 focus-within:border-black"
        )}
      >
        <label className="text-[14px] font-medium text-gray-500 flex justify-between tracking-wide">
          <span>
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </span>
          {error && <span className="text-red-500 lowercase normal-case">{error}</span>}
        </label>

        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full text-[16px] mt-2 font-semibold text-lg text-gray-900 focus:outline-none placeholder:text-gray-300"
        />
      </div>
    </div>
  );
}

function DatePickerBox({
  label,
  value,
  onChange,
  required = false,
}: {
  label: string;
  value?: Date;
  required?: boolean;
  onChange: (date?: Date) => void;
}) {
  const [open, setOpen] = useState(false);
  const [textValue, setTextValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const displayDate = value ?? new Date();

  useEffect(() => {
    if (value) {
      setTextValue(format(value, "dd / MM / yyyy"));
    }
  }, [value]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-format DOB input
  const handleInputChange = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 8);
    let formatted = "";

    if (digits.length <= 2) formatted = digits;
    else if (digits.length <= 4) formatted = `${digits.slice(0, 2)} / ${digits.slice(2)}`;
    else formatted = `${digits.slice(0, 2)} / ${digits.slice(2, 4)} / ${digits.slice(4)}`;

    setTextValue(formatted);

    if (digits.length === 8) {
      const dd = Number(digits.slice(0, 2));
      const mm = Number(digits.slice(2, 4));
      const yyyy = Number(digits.slice(4, 8));
      const parsed = new Date(yyyy, mm - 1, dd);
      if (
        parsed.getFullYear() === yyyy &&
        parsed.getMonth() === mm - 1 &&
        parsed.getDate() === dd
      ) {
        onChange(parsed);
      }
    }
  };

  return (
    <div ref={ref} className="relative w-full">
      <div className="w-full border border-gray-400 hover:shadow-sm rounded-2xl px-6 py-3.5 bg-white focus-within:border-black transition">
        <label className="text-xs font-medium text-gray-500  tracking-wide">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>

        <div className="flex items-center justify-between mt-3.5">
          <input
            type="text"
            value={textValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="DD / MM / YYYY"
            maxLength={14}
            className="text-sm w-full font-semibold text-lg text-gray-900 focus:outline-none placeholder:text-gray-300"
          />
          <Calendar
            className="h-5 w-5 text-gray-400 cursor-pointer hover:text-black transition"
            onClick={() => setOpen((p) => !p)}
          />
        </div>
      </div>

      {open && (
        <div className="absolute z-50 right-0 mt-[-320] h-[450px] w-[340px] rounded-3xl shadow-2xl bg-white overflow-hidden border border-gray-100">
          <div className="bg-[#B4E64E] px-6 py-4">
            <div className="text-sm font-medium opacity-80">{format(displayDate, "yyyy")}</div>
            <div className="text-2xl font-bold">{format(displayDate, "EEE, MMM d")}</div>
          </div>
          <div className="p-4 custom-daypicker">
            <DayPicker
              mode="single"
              selected={value}
              defaultMonth={displayDate}
              onSelect={(date) => {
                onChange(date);
                setOpen(false);
              }}
              fromYear={1950}
              toYear={new Date().getFullYear()}
              classNames={{
                day_selected: "bg-[#B4E64E] text-black rounded-lg font-bold",
                day_today: "text-[#B4E64E] font-bold",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

