// src/components/layout/navbar/CartDrawer.jsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function CartDrawer({ isOpen, onClose }) {
  const router = useRouter();

  const handleStartShopping = () => {
    onClose();
    router.push("/eastern-wear"); // Aap apne exact route path ke mutabiq ise change kar sakte hain
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 220,
              }}
              className="relative w-screen max-w-md bg-white shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="h-20 px-6 border-b border-store-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-store-primary" />

                  <h3 className="text-lg font-semibold text-store-text">
                    Shopping Bag
                  </h3>
                </div>

                <button
                  onClick={onClose}
                  type="button"
                  aria-label="Close Shopping Bag"
                  className="p-2 text-store-text-secondary hover:text-store-text transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Empty State */}
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <div className="w-16 h-16 flex items-center justify-center mb-5 border border-store-border bg-store-bg rounded-none">
                  <ShoppingBag className="w-7 h-7 text-store-text-secondary" />
                </div>

                <h4 className="text-base font-semibold text-store-text">
                  Your bag is currently empty
                </h4>

                <p className="max-w-xs mt-2 text-sm leading-relaxed text-store-text-secondary">
                  Explore our Baba and Baby collections to find something
                  special for your little ones.
                </p>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-store-border bg-white">
                <Button
                  fullWidth
                  onClick={handleStartShopping}
                  variant="primary"
                  size="lg"
                >
                  Start Shopping
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}