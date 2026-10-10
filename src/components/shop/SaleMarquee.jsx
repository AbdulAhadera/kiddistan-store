"use client";

export default function SaleMarquee({
  bgColor = "bg-red-600",
  borderColor = "border-red-700",
}) {
  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      <div
        className={`h-4 overflow-hidden border-y-2 ${borderColor} ${bgColor} text-white`}
      >
        <div className="animate-marquee flex h-full w-max">
          {Array.from({ length: 30 }).map((_, index) => (
            <div key={index} className="flex h-full items-center px-6">
              <span className="whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.2em]">
                SALE
              </span>
              <span className="mx-4 text-[12px]">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}