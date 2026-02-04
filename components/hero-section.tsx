import Image from "next/image";

export function HeroSection() {
  return (
    <div className="bg-[#d8d8d8] flex flex-col justify-between lg:p-6 min-h-screen">
      <div className="mb-1">
       <div className="w-[36px] h-[36px] relative">
  <Image
    src="/verita_logo_dark.png"
    alt="Logo"
    fill
    priority
    className="object-contain"
  />
</div>

      </div>

      <div className="flex-1 flex flex-col justify-center text-center mt-1">
        <h1 className="text-3xl lg:text-[44px] font-bold text-[#121212] leading-tight font-nunito">
          Never Fail an Audit Due to
        </h1>
        <h1 className="text-3xl lg:text-[44px] font-bold text-[#121212] mb-6 leading-tight font-nunito">
          Missing Records
        </h1>
        <p className="text-[14px] font-semibold text-[#1d2939] max-w-[96%] mx-auto leading-relaxed">
          Our software is designed specifically for SEBI-regulated firms. It
          automatically captures and files all interactions—calls, messages, and
          documents—linking them directly to the right client. Get your complete
          audit trail instantly. Stay compliant, stay protected.
        </p>
      </div>

      <div className="mt-1 relative w-full h-[220px] sm:h-[300px] lg:h-[360px]">
  <Image
    src="/sign_in_1.webp"
    alt="Product Screenshots"
    fill
    priority
    sizes="(max-width: 768px) 100vw, 900px"
    className="object-contain"
  />
</div>

    </div>
  );
}
