"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import NavDropdown from "./NavDropdown";

export default function DesktopNavbar({
  onOpenSearch,
  onOpenCart,
  cartCount = 0,
}) {
  const [activeDropdown, setActiveDropdown] =
    useState(null);

  return (
    <header className="relative z-40 bg-white border-b border-store-border/80 shadow-xs font-sans">
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        {/* LEFT: CATEGORIES & PROMO */}
        <nav className="flex items-center space-x-9">
          <div
            className="py-6"
            onMouseEnter={() =>
              setActiveDropdown("baba")
            }
            onMouseLeave={() =>
              setActiveDropdown(null)
            }
          >
            <Link
              href="/baba"
              className="text-sm font-bold uppercase tracking-wider text-store-text transition-colors hover:text-store-primary"
            >
              BABA
            </Link>
          </div>

          <div
            className="py-6"
            onMouseEnter={() =>
              setActiveDropdown("baby")
            }
            onMouseLeave={() =>
              setActiveDropdown(null)
            }
          >
            <Link
              href="/baby"
              className="text-sm font-bold uppercase tracking-wider text-store-text transition-colors hover:text-store-primary"
            >
              BABY
            </Link>
          </div>

          <Link
            href="/baba/eastern"
            className="flex items-center space-x-1.5 text-sm font-bold uppercase tracking-wider text-red-600 transition-colors hover:text-red-700"
          >
            <span className="text-base">★</span>
            <span>WINTER FEST 26</span>
          </Link>
        </nav>

        {/* CENTER: BRAND LOGO */}
        <Link
          href="/"
          className="flex items-center justify-center"
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

        {/* RIGHT: SEARCH, WISHLIST, BAG */}
        <div className="flex items-center space-x-8">
          <button
            type="button"
            onClick={onOpenSearch}
            className="cursor-pointer text-sm font-bold uppercase tracking-wider text-store-text transition-colors hover:text-store-primary"
          >
            SEARCH
          </button>

          <Link
            href="/wishlist"
            className="relative flex items-center text-sm font-bold uppercase tracking-wider text-store-text transition-colors hover:text-store-primary"
          >
            <span>WISHLIST</span>

            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-store-bg-secondary text-xs font-bold text-store-text">
              0
            </span>
          </Link>

          <button
            type="button"
            onClick={onOpenCart}
            className="relative flex cursor-pointer items-center text-sm font-bold uppercase tracking-wider text-store-text transition-colors hover:text-store-primary"
          >
            <span>BAG</span>

            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-store-bg-secondary text-xs font-bold text-store-text">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* DROPDOWN MENU */}
      <AnimatePresence>
        {activeDropdown && (
          <div
            onMouseEnter={() =>
              setActiveDropdown(
                activeDropdown
              )
            }
            onMouseLeave={() =>
              setActiveDropdown(null)
            }
          >
            <NavDropdown
              activeTab={activeDropdown}
              onClose={() =>
                setActiveDropdown(null)
              }
            />
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}