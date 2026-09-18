// src/components/layout/navbar/NavDropdown.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function NavDropdown({ activeTab, onClose }) {
  const categories = {
    baba: {
      title: "Baba Collection",
      genderPath: "/baba",
      items: [
        {
          name: "Eastern Wear",
          // Query parameter ke sath route update kar diya hai
          href: "/baba?filter=eastern",
          image:
            "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1200&auto=format&fit=crop",
        },
        {
          name: "Western Wear",
          href: "/baba?filter=western",
          image:
            "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=1200&auto=format&fit=crop",
        },
      ],
    },

    baby: {
      title: "Baby Collection",
      genderPath: "/baby",
      items: [
        {
          name: "Eastern Wear",
          href: "/baby?filter=eastern",
          image:
            "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1200&auto=format&fit=crop",
        },
        {
          name: "Western Wear",
          href: "/baby?filter=western",
          image:
            "https://images.unsplash.com/photo-1607453998774-d533f65dac99?q=80&w=1200&auto=format&fit=crop",
        },
      ],
    },
  };

  const currentCategory = categories[activeTab];

  if (!currentCategory) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute top-full left-0 w-full bg-white border-b border-store-border shadow-xl z-50 overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-store-text-secondary">
            {currentCategory.title}
          </h3>

          <Link
            href={currentCategory.genderPath}
            onClick={onClose}
            className="flex items-center text-xs font-medium text-store-primary hover:text-store-primary-hover transition-colors"
          >
            View All
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Link>
        </div>

        {/* Collections */}
        <div className="grid grid-cols-2 gap-4">
          {currentCategory.items.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className="group relative h-64 overflow-hidden rounded-none bg-store-bg-secondary"
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 1024px) 50vw, 600px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-300" />

              {/* Bottom Gradient */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/70 to-transparent" />

              {/* Text */}
              <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
                <h4 className="text-2xl font-semibold text-white tracking-tight">
                  {item.name}
                </h4>

                <ArrowRight className="w-5 h-5 text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}