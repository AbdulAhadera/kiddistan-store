"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  X,
} from "lucide-react";

import CartItem from "./CartItem";

import {
  getCart,
  getCartSubtotal,
  updateCartItemQuantity,
  removeCartItem,
} from "@/lib/cart";

export default function CartDrawer({
  isOpen,
  onClose,
}) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const syncCart = () => {
      setCart(getCart());
    };

    syncCart();

    window.addEventListener(
      "cartUpdated",
      syncCart
    );

    window.addEventListener(
      "storage",
      syncCart
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        syncCart
      );

      window.removeEventListener(
        "storage",
        syncCart
      );
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [isOpen, onClose]);

  const handleIncrease = (item) => {
    updateCartItemQuantity(
      item.id,
      item.size,
      1
    );
  };

  const handleDecrease = (item) => {
    updateCartItemQuantity(
      item.id,
      item.size,
      -1
    );
  };

  const handleRemove = (item) => {
    removeCartItem(
      item.id,
      item.size
    );
  };

  const subtotal =
    getCartSubtotal(cart);

  const totalItems = cart.reduce(
    (total, item) =>
      total + Number(item?.quantity || 0),
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
            }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 34,
            }}
            className="absolute right-0 top-0 flex h-dvh w-full max-w-[380px] flex-col bg-white shadow-2xl"
            aria-label="Shopping bag"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-store-border px-4 py-3.5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-[var(--font-playfair)] text-[20px] font-semibold leading-none text-store-text">
                    Your Bag
                  </h2>

                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-[9px] font-bold text-white">
                    {totalItems}
                  </span>
                </div>

                <p className="mt-1 text-[10px] text-store-text-secondary">
                  {totalItems === 0
                    ? "Nothing here yet"
                    : `${totalItems} ${
                        totalItems === 1
                          ? "item"
                          : "items"
                      } selected`}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-store-text-secondary transition-colors hover:bg-store-bg-secondary hover:text-store-text"
                aria-label="Close shopping bag"
              >
                <X
                  className="h-4.5 w-4.5"
                  strokeWidth={1.6}
                />
              </button>
            </div>

            {/* Cart Content */}
            <div className="min-h-0 flex-1 overflow-y-auto px-4">
              {cart.length === 0 ? (
                <div className="flex min-h-full flex-col items-center justify-center px-5 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-store-border bg-store-bg-secondary">
                    <ShoppingBag
                      className="h-5 w-5 text-store-text"
                      strokeWidth={1.4}
                    />
                  </div>

                  <h3 className="mt-4 font-[var(--font-playfair)] text-[20px] font-semibold text-store-text">
                    Your bag is empty
                  </h3>

                  <p className="mt-1.5 max-w-[240px] text-[11px] leading-5 text-store-text-secondary">
                    Add something you love and
                    it will appear here.
                  </p>

                  <Link
                    href="/"
                    onClick={onClose}
                    className="mt-5 inline-flex h-10 items-center justify-center gap-2 bg-black px-6 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-neutral-800"
                  >
                    Shop Now

                    <ArrowRight
                      className="h-3 w-3"
                      strokeWidth={1.8}
                    />
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-store-border">
                  {cart.map((item) => (
                    <CartItem
                      key={`${item.id}-${item.size}`}
                      item={item}
                      onIncrease={
                        handleIncrease
                      }
                      onDecrease={
                        handleDecrease
                      }
                      onRemove={
                        handleRemove
                      }
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="shrink-0 border-t border-store-border bg-white px-4 pb-4 pt-3.5 shadow-[0_-8px_30px_rgba(0,0,0,0.05)]">
                {/* Subtotal */}
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-store-text-secondary">
                      Subtotal
                    </span>

                    <p className="mt-0.5 text-[9px] text-store-text-secondary">
                      Shipping calculated at checkout
                    </p>
                  </div>

                  <span className="font-[var(--font-playfair)] text-[19px] font-semibold tracking-tight text-store-text">
                    PKR{" "}
                    {subtotal.toLocaleString()}
                  </span>
                </div>

                {/* Checkout */}
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="mt-3 flex h-11 w-full items-center justify-center gap-2 bg-black text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-neutral-800 active:scale-[0.99]"
                >
                  Proceed to Checkout

                  <ArrowRight
                    className="h-3.5 w-3.5"
                    strokeWidth={1.8}
                  />
                </Link>

                {/* Continue Shopping */}
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-2.5 flex h-10 w-full items-center justify-center gap-2 border border-store-border bg-white text-[10px] font-semibold uppercase tracking-[0.12em] text-store-text transition-all hover:border-store-text hover:bg-store-bg-secondary active:scale-[0.99]"
                >
                  <ArrowLeft
                    className="h-3 w-3"
                    strokeWidth={1.8}
                  />

                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}