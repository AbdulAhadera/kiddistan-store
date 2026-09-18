"use client";

import { usePathname } from "next/navigation";

export default function AnnouncementBar() {
  const pathname = usePathname();
  const message = "WINTER SALE — FLAT 50% OFF";

  // Route ke mutabiq dynamic background color
  const getBgColor = () => {
    if (pathname?.includes("/baby")) return "bg-baby-primary";
    if (pathname?.includes("/baba")) return "bg-baba-primary";
    return "bg-red-600"; // Default red
  };

  return (
    <div className={`h-4 ${getBgColor()} text-white overflow-hidden font-sans transition-colors duration-300`}>
      <div className="flex h-full w-max animate-marquee">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center h-full px-8"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] whitespace-nowrap">
              {message}
            </span>
            <span className="mx-8 text-[8px]">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}