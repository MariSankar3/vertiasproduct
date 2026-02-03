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
    kyc: true,
    clientIdentity: true,
    riskProfile: false,
    investmentObjectives: false,
    adviceEligibility: false,
    riaAgreement: false,
  });

  // Step 3 Eligibility State
  const [eligibilityState, setEligibilityState] = useState({
    intraday: { enabled: true, items: { equityCash: false, fno: false, commodity: false, mutualFunds: false, bonds: false } },
    shortTerm: { enabled: false, items: { equityCash: false, fno: false, commodity: false, mutualFunds: false, bonds: false } },
    positional: { enabled: false, items: { equityCash: false, fno: false, commodity: false, mutualFunds: false, bonds: false } },
    longTerm: { enabled: true, items: { equityCash: false, fno: false, commodity: false, mutualFunds: false, bonds: false } },
  });

 const handleNext = () => {
  if (currentStep === 1 && !isStep1Valid) return; // 🚫 block
  if (currentStep < 4) setCurrentStep((p) => p + 1);

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
    currentStep === 4
      ? "bg-[#dcfcc3] text-black/40 cursor-default"
      : currentStep === 1 && !isStep1Valid
      ? "bg-[#A7E55C]/30 text-black/50 cursor-not-allowed"
      : "bg-[#a7e55c] text-black cursor-pointer hover:bg-[#a7e55c]"
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
          {currentStep === 3 && (
            <Step3Eligibility
              state={eligibilityState}
              setState={setEligibilityState}
            />
          )}
          {currentStep === 4 && <Step4MagicLink clientName={`${form.firstName} ${form.lastName}`} />}
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
    mandatory
  />

  <ComplianceItem 
    label="Risk profile" 
    checked={state.riskProfile} 
    onChange={() => toggle("riskProfile")} 
    hasEye 
    mandatory
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
    mandatory
  />

  <ComplianceItem 
    label="Investment Objectives" 
    checked={state.investmentObjectives} 
    onChange={() => toggle("investmentObjectives")} 
    hasEye 
    mandatory
  />

  <ComplianceItem 
    label="RIA Agreement & MITC" 
    checked={state.riaAgreement} 
    onChange={() => toggle("riaAgreement")} 
    hasEye 
    mandatory
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
  mandatory = false,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  hasEye?: boolean;
  disabled?: boolean;
  mandatory?: boolean;
}) {
  return (
    <div
      onClick={() => {
        if (!disabled) onChange();
      }}
      className={cn(
        "flex items-center justify-between p-4 rounded-[20px] border bg-[#FFFFFF] border-[#EDEDED] transition select-none h-[72px]",
        disabled
          ? "cursor-not-allowed"
          : "cursor-pointer"
      )}
    >
      {/* LEFT : Checkbox + Label */}
      <div className="flex items-center gap-3">
        {/* Checkbox */}
        <div
          className={cn(
            "w-5 h-5 rounded border-2 flex items-center justify-center transition",
            checked
              ? "border-black bg-black"
              : "border-gray-400 bg-white"
          )}
        >
          {checked && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>

        {/* Label + Mandatory Star */}
        <span className="font-semibold text-[16px] text-[#344054]">
          {label}
          {mandatory && <span className="text-red-500 ml-0.5">*</span>}
        </span>
      </div>

      {/* RIGHT : Eye + Toggle */}
      <div className="flex items-center gap-4">
        {hasEye && <Eye className="w-5 h-5 text-[#E16448]" />}
      </div>
    </div>
  );
}




/* ---------------- STEP 3: ELIGIBILITY ---------------- */
function Step3Eligibility({ state, setState }: { state: any; setState: any }) {
  const toggleCard = (key: string) => {
    setState((prev: any) => ({
      ...prev,
      [key]: { ...prev[key], enabled: !prev[key].enabled },
    }));
  };

  const toggleItem = (cardKey: string, itemKey: string) => {
    setState((prev: any) => {
      const card = prev[cardKey];
      if (!card.enabled) return prev; // Cannot toggle items if card is disabled
      return {
        ...prev,
        [cardKey]: {
          ...card,
          items: { ...card.items, [itemKey]: !card.items[itemKey] },
        },
      };
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 5 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -5 }}
      className="w-full"
    >
      <div className="flex items-center justify-between pb-8">
        <p className="text-2xl pt-4 font-semibold uppercase text-black">Eligibility</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EligibilityCard
          title="INTRA DAY"
          enabled={state.intraday.enabled}
          items={state.intraday.items}
          onToggle={() => toggleCard("intraday")}
          onItemToggle={(item) => toggleItem("intraday", item)}
        />
        <EligibilityCard
          title="SHORT-TERM"
          enabled={state.shortTerm.enabled}
          items={state.shortTerm.items}
          onToggle={() => toggleCard("shortTerm")}
          onItemToggle={(item) => toggleItem("shortTerm", item)}
        />
        <EligibilityCard
          title="POSITIONAL"
          enabled={state.positional.enabled}
          items={state.positional.items}
          onToggle={() => toggleCard("positional")}
          onItemToggle={(item) => toggleItem("positional", item)}
        />
        <EligibilityCard
          title="LONG-TERM"
          enabled={state.longTerm.enabled}
          items={state.longTerm.items}
          onToggle={() => toggleCard("longTerm")}
          onItemToggle={(item) => toggleItem("longTerm", item)}
        />
      </div>
    </motion.div>
  );
}

function EligibilityCard({
  title,
  enabled,
  items,
  onToggle,
  onItemToggle,
}: {
  title: string;
  enabled: boolean;
  items: any;
  onToggle: () => void;
  onItemToggle: (key: string) => void;
}) {
  return (
    <div className="bg-[#FFFFFF] rounded-[16px] p-4 border border-[#DDDDDD]">
      <div className="flex items-center gap-4 mb-6">
        <h3 className="text-lg font-semibold text-[#121212] uppercase tracking-wide">{title}</h3>
        {/* Toggle Switch */}
        <button
          onClick={onToggle}
          className={cn(
            "w-10 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out",
            enabled ? "bg-black" : "bg-gray-300"
          )}
        >
          <div
            className={cn(
              "w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ease-in-out",
              enabled ? "translate-x-4" : "translate-x-0"
            )}
          />
        </button>
      </div>

      <div className={cn("grid grid-cols-3 gap-y-4 gap-x-2 transition-opacity duration-300", enabled ? "opacity-100" : "opacity-40 pointer-events-none")}>
        <CheckboxLabel label="Equity cash" checked={items.equityCash} onChange={() => onItemToggle("equityCash")} />
        <CheckboxLabel label="F&O" checked={items.fno} onChange={() => onItemToggle("fno")} />
        <CheckboxLabel label="Commodity" checked={items.commodity} onChange={() => onItemToggle("commodity")} />
        <CheckboxLabel label="Mutual funds" checked={items.mutualFunds} onChange={() => onItemToggle("mutualFunds")} />
        <CheckboxLabel label="Bonds" checked={items.bonds} onChange={() => onItemToggle("bonds")} />
      </div>
    </div>
  );
}

function CheckboxLabel({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div
      onClick={onChange}
      className="flex items-center gap-3 cursor-pointer select-none"
    >
      {/* Checkbox */}
      <div
        className={cn(
          "w-5 h-5 rounded border-2 flex items-center justify-center transition",
          checked
            ? "bg-black border-black"
            : "bg-white border-gray-300"
        )}
      >
        {checked && (
          <svg
            className="w-3.5 h-3.5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>

      {/* Label */}
      <span
        className={cn(
          "text-[#515151] font-medium",
          checked && "text-[#515151]"
        )}
      >
        {label}
      </span>
    </div>
  );
}




/* ---------------- STEP 4: MAGIC LINK ---------------- */
import { Send } from "lucide-react";

function Step4MagicLink({ clientName }: { clientName: string }) {
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
    { id: 3, label: "Eligibility" },
    { id: 4, label: "Magic Link" },
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
        <label className="text-xs font-medium text-gray-500  tracking-wide ">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>

        <div className="flex items-center justify-between mt-1.5 mb-2">
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

