// src/components/layout/navbar/SearchModal.jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp } from "lucide-react";

export default function SearchModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");

  const trendingSearches = [
    "Cotton Kurta Set",
    "Silk Waistcoat",
    "Lawn Lehenga",
    "Festive Frocks",
    "Boys Denim Trousers",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 font-sans">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          />

          {/* Search Panel */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative z-10 w-full bg-white border-b border-store-border shadow-xl"
          >
            <div className="max-w-7xl mx-auto px-8">
              {/* Search Input */}
              <div className="flex items-center h-20 border-b border-store-border">
                <Search className="w-5 h-5 text-store-text-secondary flex-shrink-0 mr-4" />

                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent text-base text-store-text placeholder-store-text-secondary focus:outline-none"
                />

                <button
                  onClick={onClose}
                  className="ml-4 p-1 text-store-text-secondary hover:text-store-text transition-colors"
                  aria-label="Close Search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Popular Searches */}
              <div className="py-6">
                <div className="flex items-center gap-2 mb-4 text-store-text-secondary">
                  <TrendingUp className="w-4 h-4" />

                  <span className="text-xs font-semibold uppercase tracking-widest">
                    Popular Searches
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-8 gap-y-3 pb-2">
                  {trendingSearches.map((item) => (
                    <button
                      key={item}
                      onClick={() => setSearchQuery(item)}
                      className="text-sm text-store-text hover:text-store-primary transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}