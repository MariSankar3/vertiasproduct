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
    if (currentStep < 3) setCurrentStep((p) => p + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((p) => p - 1);
    } else {
      router.back();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
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
          <Stepper currentStep={currentStep} />
        </div>

        <button
          onClick={handleNext}
          className={cn(
            "px-10 py-2 rounded-full font-semibold transition",
            currentStep === 3
              ? "bg-[#dcfcc3] text-black/40 cursor-default" // Disabled look for step 3 header button
              : "bg-lime-300 text-black hover:bg-[#ccf7a7] cursor-pointer"
          )}
        >
          {currentStep === 3 ? "Next" : "Next"}
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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full"
    >
      <p className="text-2xl font-semibold pb-8 uppercase text-[#475467]">Create Client</p>

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
              pan: panRegex.test(val) ? undefined : "Invalid PAN format (ABCDE1234F)",
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
          placeholder="9876543210"
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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full"
    >
      <div className="flex items-center justify-between pb-8">
         <p className="text-2xl font-semibold uppercase text-[#475467]">Compliance Prerequisites</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        {/* Left Column */}
        <div className="space-y-6">
          <ComplianceItem 
            label="KYC" 
            checked={state.kyc} 
            onChange={() => toggle("kyc")} 
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
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  hasEye?: boolean;
}) {
  return (
    <div 
      onClick={onChange}
      className={cn(
        "flex items-center justify-between p-4 rounded-xl border bg-white cursor-pointer transition select-none h-[72px]",
        checked ? "border-[#A7E55C] bg-[#fafff5]" : "border-[#e0e0e0] hover:border-[#A7E55C]"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-5 h-5 rounded-full border-2 flex items-center justify-center transition",
          checked ? "border-[#66c61c]" : "border-gray-300"
        )}>
           {checked && <div className="w-2.5 h-2.5 bg-[#66c61c] rounded-full" />}
        </div>
        <span className={cn("font-semibold text-sm", checked ? "text-gray-900" : "text-gray-500")}>
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
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-200 flex flex-col items-center text-center max-w-xl w-full">
           {/* Icon Circle */}
           <div className="w-20 h-20 rounded-full border-2 border-gray-800 flex items-center justify-center mb-6">
              <Send className="w-8 h-8 text-gray-800 ml-1" />{/* ml-1 to visually center the paper plane properly */}
           </div>
           
           <h2 className="text-xl font-bold text-[#121212] uppercase mb-4 tracking-wide">
             Ready to Onboard Client
           </h2>
           
           <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md">
             All compliance checks for RIA workflow are complete. Send the secure Magic Link to <span className="text-gray-900 font-medium">{displayClientName}</span> to initiate the client-side approval process.
           </p>
           
           <button className="bg-[#a7e55c] hover:bg-[#96d649] text-[#121212] font-bold py-3 px-8 rounded-full transition transform hover:scale-105 active:scale-95 shadow-sm">
             Send Magic Link
           </button>
        </div>
    </motion.div>
  );
}

/* ---------------- STEPPER COMPONENT ---------------- */
function Stepper({ currentStep }: { currentStep: number }) {
  const steps = [
    { id: 1, label: "Create" },
    { id: 2, label: "Compliance" },
    { id: 3, label: "Magic Link" },
  ];

  return (
    <div className="flex items-center gap-2 md:gap-4">
      {steps.map((step, idx) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;

        return (
          <div key={step.id} className="flex items-center">
            {/* Circle & Label */}
            <div className="flex flex-col items-center">
               <div className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all",
                  isActive ? "bg-black border-black scale-110" : 
                  isCompleted ? "bg-gray-400 border-gray-400" : "bg-white border-gray-300"
               )}>
                  {isCompleted && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                  {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
               </div>
               <span className={cn(
                 "text-[10px] uppercase font-bold tracking-wider absolute top-12 w-20 text-center transition-colors",
                 isActive ? "text-black" : isCompleted ? "text-gray-500" : "text-gray-300"
               )}>
                 {step.label}
               </span>
            </div>

            {/* Connecting Line */}
            {idx < steps.length - 1 && (
              <div className="w-16 h-[2px] bg-gray-200 mx-2 relative translate-y-[-8px]">
                <div 
                   className="absolute left-0 top-0 h-full bg-gray-400 transition-all duration-500"
                   style={{ width: isCompleted ? "100%" : "0%" }}
                />
              </div>
            )}
            
            {/* Spacing for absolute labels */}
            <div className="w-4"></div>
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
        <label className="text-xs font-medium text-gray-500 flex justify-between tracking-wide">
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
          className="w-full mt-2 font-semibold text-lg text-gray-900 focus:outline-none placeholder:text-gray-300"
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

  // Sync input when calendar changes
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
      <div className="w-full border border-gray-400 hover:shadow-sm rounded-2xl px-6 py-4 bg-white focus-within:border-black transition">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>

        <div className="flex items-center justify-between mt-2">
          <input
            type="text"
            value={textValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="DD / MM / YYYY"
            maxLength={14}
            className="w-full font-semibold text-lg text-gray-900 focus:outline-none placeholder:text-gray-300"
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
          <div className="p-4">
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

