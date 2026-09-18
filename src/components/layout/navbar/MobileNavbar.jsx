// src/components/layout/navbar/MobileNavbar.jsx
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
  ChevronDown,
  Phone,
} from "lucide-react";

export default function MobileNavbar({ onOpenSearch, onOpenCart }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setExpandedSection(null);
  };

  const categories = {
    boys: {
      label: "Boys",
      sections: [
        {
          label: "Eastern Wear",
          items: [
            {
              label: "Kurtas",
              href: "/baba/eastern/kurtas",
            },
            {
              label: "Shalwar Kameez",
              href: "/baba/eastern/shalwar-kameez",
            },
            {
              label: "Waistcoats",
              href: "/baba/eastern/waistcoats",
            },
            {
              label: "Prince Coats",
              href: "/baba/eastern/prince-coats",
            },
          ],
        },
        {
          label: "Western Wear",
          items: [
            {
              label: "Shirts",
              href: "/baba/western/shirts",
            },
            {
              label: "T-Shirts",
              href: "/baba/western/t-shirts",
            },
            {
              label: "Trousers",
              href: "/baba/western/trousers",
            },
            {
              label: "Shorts",
              href: "/baba/western/shorts",
            },
            {
              label: "Jackets",
              href: "/baba/western/jackets",
            },
          ],
        },
      ],
    },

    girls: {
      label: "Girls",
      sections: [
        {
          label: "Eastern Wear",
          items: [
            {
              label: "Lehengas",
              href: "/baby/eastern/lehengas",
            },
            {
              label: "Kurtis",
              href: "/baby/eastern/kurtis",
            },
            {
              label: "Frocks",
              href: "/baby/eastern/frocks",
            },
            {
              label: "Shalwar Kameez",
              href: "/baby/eastern/shalwar-kameez",
            },
          ],
        },
        {
          label: "Western Wear",
          items: [
            {
              label: "Tops",
              href: "/baby/western/tops",
            },
            {
              label: "Skirts",
              href: "/baby/western/skirts",
            },
            {
              label: "Dresses",
              href: "/baby/western/dresses",
            },
            {
              label: "T-Shirts",
              href: "/baby/western/t-shirts",
            },
            {
              label: "Pants",
              href: "/baby/western/pants",
            },
          ],
        },
      ],
    },
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

              {/* Categories */}
              <div className="flex-1 space-y-5">
                {Object.entries(categories).map(
                  ([categoryKey, category]) => {
                    const isOpen = expandedSection === categoryKey;

                    return (
                      <div
                        key={categoryKey}
                        className="border-b border-store-border pb-4"
                      >
                        {/* Main Category */}
                        <button
                          type="button"
                          onClick={() => toggleSection(categoryKey)}
                          className="flex w-full items-center justify-between text-base font-semibold text-store-text hover:text-store-primary transition-colors"
                        >
                          <span>{category.label}</span>

                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Eastern + Western Auto Open */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{
                                height: 0,
                                opacity: 0,
                              }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                              }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 ml-3 space-y-5">
                                {category.sections.map((section) => (
                                  <div key={section.label}>
                                    {/* Section Title */}
                                    <div className="mb-2">
                                      <Link
                                        href={
                                          categoryKey === "boys"
                                            ? section.label === "Eastern Wear"
                                              ? "/baba/eastern"
                                              : "/baba/western"
                                            : section.label === "Eastern Wear"
                                              ? "/baby/eastern"
                                              : "/baby/western"
                                        }
                                        onClick={closeMenu}
                                        className="text-sm font-semibold text-store-text hover:text-store-primary transition-colors"
                                      >
                                        {section.label}
                                      </Link>
                                    </div>

                                    {/* Items Always Visible */}
                                    <div className="ml-3 flex flex-col gap-2">
                                      {section.items.map((item) => (
                                        <Link
                                          key={item.href}
                                          href={item.href}
                                          onClick={closeMenu}
                                          className="py-0.5 text-sm text-store-text-secondary hover:text-store-primary transition-colors"
                                        >
                                          {item.label}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }
                )}
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
                  <Phone className="w-4 h-4" />
                  <span>🇵🇰 +92 301 2987787</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}