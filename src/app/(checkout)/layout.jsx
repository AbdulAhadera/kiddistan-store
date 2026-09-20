import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

export default function CheckoutLayout({ children }) {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      {/* Header with Exact Original Logo Sizing */}
      <header className="relative z-40 border-b border-store-border/80 bg-white font-sans shadow-xs">
        <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
          {/* Spacer to keep logo perfectly centered */}
          <div className="w-10" />

          {/* Logo with Original Sizing Props */}
          <Link
            href="/"
            className="flex items-center justify-center"
            aria-label="Kiddistan Home"
          >
            <Image
              src="/icon.svg"
              alt="Kiddistan Logo"
              width={48}
              height={48}
              priority
              className="h-36 w-36 object-contain pt-2"
            />
          </Link>

          {/* Right Shopping Bag Icon */}
          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center text-gray-800 transition hover:text-black"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5 stroke-[1.5]" />
          </Link>
        </div>
      </header>

      {/* Split Screen Body */}
      {children}
    </div>
  );
}