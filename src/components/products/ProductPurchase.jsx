"use client";

import { useState } from "react";

import {
  Minus,
  Plus,
  Share2,
  Truck,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import Button from "@/components/ui/Button";

import { addProductToCart, openCartDrawer } from "@/lib/cart";

export default function ProductPurchase({
  product,
  theme = "baby",
  selectedSize,
  currentImage,
}) {
  const [quantity, setQuantity] = useState(1);

  const [isAdding, setIsAdding] = useState(false);

  const isBaba = theme === "baba";

  const styles = isBaba
    ? {
        text: "text-baba-text",
        secondary: "text-baba-text-secondary",
        border: "border-baba-border",
        primary: "text-baba-primary",
        primaryBg: "bg-baba-primary",
        surface: "bg-baba-surface",
      }
    : {
        text: "text-baby-text",
        secondary: "text-baby-text-secondary",
        border: "border-baby-border",
        primary: "text-baby-primary",
        primaryBg: "bg-baby-primary",
        surface: "bg-baby-surface",
      };

  const handleQuantityDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleQuantityIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    if (!selectedSize || isAdding) {
      return;
    }

    try {
      addProductToCart(product, {
        size: selectedSize,
        quantity,
        image: currentImage || product?.primary_image || null,
      });

      openCartDrawer();

      if (navigator.vibrate) {
        navigator.vibrate(40);
      }

      setIsAdding(true);

      setTimeout(() => {
        setIsAdding(false);
      }, 800);
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: product.description || product.name,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch (error) {
      if (error?.name !== "AbortError") {
        console.error("Share failed:", error);
      }
    }
  };

  return (
    <section className="pt-4">
      {/* Quantity + Add To Cart */}
      <div className="grid grid-cols-[100px_1fr] gap-2">
        {/* Quantity */}
        <div
          className={`flex h-11 items-center justify-between border ${styles.border} ${styles.surface}`}
        >
          <button
            type="button"
            onClick={handleQuantityDecrease}
            aria-label="Decrease quantity"
            className={`flex h-full w-8 items-center justify-center ${styles.secondary} transition-colors hover:opacity-60`}
          >
            <Minus size={14} strokeWidth={1.8} />
          </button>

          <span className={`text-sm font-semibold ${styles.text}`}>
            {quantity}
          </span>

          <button
            type="button"
            onClick={handleQuantityIncrease}
            aria-label="Increase quantity"
            className={`flex h-full w-8 items-center justify-center ${styles.secondary} transition-colors hover:opacity-60`}
          >
            <Plus size={14} strokeWidth={1.8} />
          </button>
        </div>

        {/* Add */}
        <Button
          type="button"
          onClick={handleAddToCart}
          disabled={!selectedSize || isAdding}
          className={`h-11 w-full ${styles.primaryBg} text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50`}
        >
          {isAdding ? "Added to Cart" : "Add to Cart"}
        </Button>
      </div>

      {/* Product Details */}
      {product?.attributes && Object.keys(product.attributes).length > 0 && (
        <div className={`mt-4 border-t ${styles.border} pt-3.5`}>
          <h2
            className={`mb-3 font-[playfair-display] text-lg font-semibold ${styles.text}`}
          >
            Product Details
          </h2>

          <div className={`space-y-2 text-[13px] ${styles.secondary}`}>
            {Object.entries(product.attributes).map(([key, value]) => (
              <div key={key} className="flex gap-2">
                <span className={`font-semibold capitalize ${styles.text}`}>
                  {key.replace(/_/g, " ")}:
                </span>

                <span className="font-normal">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Share */}
      <div className={`mt-4 border-t ${styles.border} pt-3`}>
        <button
          type="button"
          onClick={handleShare}
          className={`flex items-center gap-2 text-[13px] font-medium ${styles.secondary} transition hover:opacity-60`}
        >
          <Share2 size={14} strokeWidth={1.8} />
          Share this product
        </button>
      </div>

      {/* Benefits */}
      <div className={`mt-4 grid grid-cols-3 border-y ${styles.border}`}>
        {/* Delivery */}
        <div
          className={`flex flex-col items-center justify-center gap-1.5 border-r ${styles.border} px-2 py-3 text-center`}
        >
          <Truck size={17} strokeWidth={1.6} className={styles.primary} />

          <span className={`text-xs font-semibold ${styles.text}`}>
            Delivery
          </span>

          <span className={`text-[11px] ${styles.secondary}`}>Nationwide</span>
        </div>

        {/* Exchange */}
        <div
          className={`flex flex-col items-center justify-center gap-1.5 border-r ${styles.border} px-2 py-3 text-center`}
        >
          <RefreshCw size={17} strokeWidth={1.6} className={styles.primary} />

          <span className={`text-xs font-semibold ${styles.text}`}>
            Exchange
          </span>

          <span className={`text-[11px] ${styles.secondary}`}>
            Easy returns
          </span>
        </div>

        {/* Secure */}
        <div className="flex flex-col items-center justify-center gap-1.5 px-2 py-3 text-center">
          <ShieldCheck size={17} strokeWidth={1.6} className={styles.primary} />

          <span className={`text-xs font-semibold ${styles.text}`}>Secure</span>

          <span className={`text-[11px] ${styles.secondary}`}>
            Safe checkout
          </span>
        </div>
      </div>
    </section>
  );
}
