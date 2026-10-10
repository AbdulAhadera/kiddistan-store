"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  Phone,
} from "lucide-react";

export default function MobileNavbar({ onOpenSearch, onOpenCart }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="lg:hidden relative z-40 bg-white border-b border-store-border px-4 h-16 flex items-center justify-between font-sans">
      {/* Menu Button */}
      <button
        type="button"
        onClick={() => setIsMenuOpen(true)}
        className="p-2 text-store-text hover:text-store-primary transition-colors"
        aria-label="Open Menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Logo */}
      <Link
        href="/"
        onClick={closeMenu}
        className="flex items-center justify-center"
      >
        <Image
          src="/icon.svg"
          alt="Kiddistan Logo"
          width={32}
          height={32}
          priority
          className="w-32 h-32 object-contain"
        />
      </Link>

      {/* Right Actions */}
      <div className="flex items-center space-x-1">
        <button
          type="button"
          onClick={onOpenSearch}
          className="p-2 text-store-text hover:text-store-primary transition-colors"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={onOpenCart}
          className="relative p-2 text-store-text hover:text-store-primary transition-colors"
          aria-label="Shopping Bag"
        >
          <ShoppingBag className="w-5 h-5" />

          <span className="absolute top-1 right-1 bg-store-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            0
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 220,
              }}
              className="relative z-10 flex h-full w-4/5 max-w-xs flex-col overflow-y-auto bg-white p-6 shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="mb-6 flex items-center justify-between border-b border-store-border pb-4">
                <button
                  type="button"
                  onClick={closeMenu}
                  className="p-1 text-store-text-secondary hover:text-store-primary transition-colors"
                  aria-label="Close Menu"
                >
                  <X className="w-6 h-6" />
                </button>

                <Image
                  src="/icon.svg"
                  alt="Kiddistan"
                  width={32}
                  height={32}
                  className="w-32 h-32 object-contain -my-12"
                />
              </div>

              {/* Simple Links */}
              <div className="flex-1 space-y-1">
                <Link
                  href="/boys"
                  onClick={closeMenu}
                  className="flex items-center justify-between border-b border-store-border py-4 text-base font-semibold text-store-text hover:text-store-primary transition-colors"
                >
                  <span>Boys</span>
                </Link>

                <Link
                  href="/girls"
                  onClick={closeMenu}
                  className="flex items-center justify-between border-b border-store-border py-4 text-base font-semibold text-store-text hover:text-store-primary transition-colors"
                >
                  <span>Girls</span>
                </Link>

                <Link
                  href="/collections/winter-fest-26"
                  onClick={closeMenu}
                  className="flex items-center justify-between border-b border-store-border py-4 text-base font-semibold text-red-600 hover:text-red-700 transition-colors"
                >
                  <span>★ Winter Fest 26</span>
                </Link>

                <Link
                  href="/sale"
                  onClick={closeMenu}
                  className="flex items-center justify-between border-b border-store-border py-4 text-base font-semibold text-store-text hover:text-store-primary transition-colors"
                >
                  <span>Sale</span>
                </Link>
              </div>

              {/* Need Help */}
              <div className="mt-8 border-t border-store-border pt-5">
                <p className="text-xs uppercase tracking-widest text-store-text-secondary mb-2">
                  Need Help?
                </p>

                <a
                  href="tel:+923012987787"
                  className="flex items-center gap-2 text-sm font-medium text-store-text hover:text-store-primary transition-colors"
                >
                  <Image
                    src="/pk-flag.png"
                    alt="Pakistan Flag"
                    width={16}
                    height={12}
                    className="w-4 h-3 object-contain"
                  />
                  <span>+92 301 2987787</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}