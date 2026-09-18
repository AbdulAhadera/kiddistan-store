"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import NavDropdown from "./NavDropdown";
export default function DesktopNavbar({ onOpenSearch, onOpenCart }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  return (
    <header className="relative z-40 bg-white border-b border-store-border/80 shadow-xs font-sans">
      {" "}
      <div className="mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {" "}
        {/* LEFT: CATEGORIES & PROMO */}{" "}
        <nav className="flex items-center space-x-9">
          {" "}
          <div
            className="py-6"
            onMouseEnter={() => setActiveDropdown("baba")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            {" "}
            <Link
              href="/baba"
              className="text-sm font-bold uppercase tracking-wider text-store-text hover:text-store-primary transition-colors"
            >
              {" "}
              BABA{" "}
            </Link>{" "}
          </div>{" "}
          <div
            className="py-6"
            onMouseEnter={() => setActiveDropdown("baby")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            {" "}
            <Link
              href="/baby"
              className="text-sm font-bold uppercase tracking-wider text-store-text hover:text-store-primary transition-colors"
            >
              {" "}
              BABY{" "}
            </Link>{" "}
          </div>{" "}
          <Link
            href="/baba/eastern"
            className="flex items-center space-x-1.5 text-sm font-bold uppercase tracking-wider text-red-600 hover:text-red-700 transition-colors"
          >
            {" "}
            <span className="text-base">★</span>{" "}
            <span>WINTER FEST 26</span>{" "}
          </Link>{" "}
        </nav>{" "}
        {/* CENTER: BRAND LOGO */}{" "}
        <Link href="/" className="flex items-center justify-center">
          {" "}
          <Image
            src="/icon.svg"
            alt="Kiddistan Logo"
            width={48}
            height={48}
            priority
            className="w-36 h-36 object-contain pt-2"
          />{" "}
        </Link>{" "}
        {/* RIGHT: SEARCH, WISHLIST, BAG */}{" "}
        <div className="flex items-center space-x-8">
          {" "}
          <button
            onClick={onOpenSearch}
            className="text-sm font-bold uppercase tracking-wider text-store-text hover:text-store-primary transition-colors cursor-pointer"
          >
            {" "}
            SEARCH{" "}
          </button>{" "}
          <Link
            href="/wishlist"
            className="relative flex items-center text-sm font-bold uppercase tracking-wider text-store-text hover:text-store-primary transition-colors"
          >
            {" "}
            <span>WISHLIST</span>{" "}
            <span className="ml-2 w-5 h-5 rounded-full bg-store-bg-secondary text-store-text text-xs font-bold flex items-center justify-center">
              {" "}
              0{" "}
            </span>{" "}
          </Link>{" "}
          <button
            onClick={onOpenCart}
            className="relative flex items-center text-sm font-bold uppercase tracking-wider text-store-text hover:text-store-primary transition-colors cursor-pointer"
          >
            {" "}
            <span>BAG</span>{" "}
            <span className="ml-2 w-5 h-5 rounded-full bg-store-bg-secondary text-store-text text-xs font-bold flex items-center justify-center">
              {" "}
              0{" "}
            </span>{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
      {/* DROPDOWN MENU */}{" "}
      <AnimatePresence>
        {" "}
        {activeDropdown && (
          <div
            onMouseEnter={() => setActiveDropdown(activeDropdown)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            {" "}
            <NavDropdown
              activeTab={activeDropdown}
              onClose={() => setActiveDropdown(null)}
            />{" "}
          </div>
        )}{" "}
      </AnimatePresence>{" "}
    </header>
  );
}
