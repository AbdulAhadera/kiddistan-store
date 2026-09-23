"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Minus,
  Plus,
  Share2,
  Truck,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import Button from "@/components/ui/Button";
import {
  addProductToCart,
  openCartDrawer,
} from "@/lib/cart";

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

        
  const availableSizes = useMemo(() => {
    return (product?.available_sizes ?? []).filter(
      (size) =>
        size?.label &&
        Number(size.stock_qty) > 0
    );
  }, [product?.available_sizes]);


  const hasSizes = availableSizes.length > 0;

  const selectedSizeRecord = availableSizes.find(
    (size) => size.label === selectedSize
  );

  const maximumQuantity = hasSizes
    ? Number(selectedSizeRecord?.stock_qty ?? 0)
    : 1;

  const cartSize = hasSizes ? selectedSize : "Standard";

  const canAddToCart =
    !isAdding &&
    Boolean(cartSize) &&
    (!hasSizes || maximumQuantity > 0);

  const productAttributes = Object.entries(
    product?.attributes ?? {}
  ).filter(
    ([, value]) =>
      value !== null &&
      value !== undefined &&
      value !== ""
  );

  useEffect(() => {
    setQuantity(1);
  }, [product?.id, selectedSize]);

  useEffect(() => {
    if (
      maximumQuantity > 0 &&
      quantity > maximumQuantity
    ) {
      setQuantity(maximumQuantity);
    }
  }, [maximumQuantity, quantity]);

  const handleQuantityDecrease = () => {
    setQuantity((previous) => Math.max(1, previous - 1));
  };

  const handleQuantityIncrease = () => {
    setQuantity((previous) => {
      if (maximumQuantity <= 0) {
        return 1;
      }

      return Math.min(previous + 1, maximumQuantity);
    });
  };

  const handleAddToCart = () => {
    if (!canAddToCart) {
      return;
    }

    if (hasSizes && !selectedSizeRecord) {
      return;
    }

    try {
      addProductToCart(product, {
        size: cartSize,
        quantity,
        image: currentImage || product.primary_image,
      });

      openCartDrawer();

      if (navigator.vibrate) {
        navigator.vibrate(40);
      }

      setIsAdding(true);

      window.setTimeout(() => {
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
        return;
      }

      await navigator.clipboard.writeText(
        window.location.href
      );
    } catch (error) {
      if (error?.name !== "AbortError") {
        console.error("Share failed:", error);
      }
    }
  };

  return (
    <section className="pt-4">
      <div className="grid grid-cols-[100px_1fr] gap-2">
        <div
          className={`flex h-11 items-center justify-between border ${styles.border} ${styles.surface}`}
        >
          <button
            type="button"
            onClick={handleQuantityDecrease}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className={`flex h-full w-8 items-center justify-center ${styles.secondary} transition-colors hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-30`}
          >
            <Minus size={14} strokeWidth={1.8} />
          </button>

          <span className={`text-sm font-semibold ${styles.text}`}>
            {quantity}
          </span>

          <button
            type="button"
            onClick={handleQuantityIncrease}
            disabled={
              maximumQuantity <= 0 ||
              quantity >= maximumQuantity
            }
            aria-label="Increase quantity"
            className={`flex h-full w-8 items-center justify-center ${styles.secondary} transition-colors hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-30`}
          >
            <Plus size={14} strokeWidth={1.8} />
          </button>
        </div>

        <Button
          type="button"
          onClick={handleAddToCart}
          disabled={!canAddToCart}
          className={`h-11 w-full ${styles.primaryBg} text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50`}
        >
          {isAdding ? "Added to Cart" : "Add to Cart"}
        </Button>
      </div>

      {hasSizes && selectedSizeRecord && (
        <p className={`mt-2 text-[10px] ${styles.secondary}`}>
          {maximumQuantity} item
          {maximumQuantity === 1 ? "" : "s"} available in this size.
        </p>
      )}

      {productAttributes.length > 0 && (
        <div className={`mt-4 border-t ${styles.border} pt-3.5`}>
          <h2
            className={`mb-3 font-[playfair-display] text-lg font-semibold ${styles.text}`}
          >
            Product Details
          </h2>

          <div className={`space-y-2 text-[13px] ${styles.secondary}`}>
            {productAttributes.map(([key, value]) => (
              <div key={key} className="flex gap-2">
                <span className={`font-semibold capitalize ${styles.text}`}>
                  {key.replace(/_/g, " ")}:
                </span>

                <span className="font-normal">
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

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

      <div className={`mt-4 grid grid-cols-3 border-y ${styles.border}`}>
        <div
          className={`flex flex-col items-center justify-center gap-1.5 border-r ${styles.border} px-2 py-3 text-center`}
        >
          <Truck
            size={17}
            strokeWidth={1.6}
            className={styles.primary}
          />

          <span className={`text-xs font-semibold ${styles.text}`}>
            Delivery
          </span>

          <span className={`text-[11px] ${styles.secondary}`}>
            Nationwide
          </span>
        </div>

        <div
          className={`flex flex-col items-center justify-center gap-1.5 border-r ${styles.border} px-2 py-3 text-center`}
        >
          <RefreshCw
            size={17}
            strokeWidth={1.6}
            className={styles.primary}
          />

          <span className={`text-xs font-semibold ${styles.text}`}>
            Exchange
          </span>

          <span className={`text-[11px] ${styles.secondary}`}>
            Easy returns
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-1.5 px-2 py-3 text-center">
          <ShieldCheck
            size={17}
            strokeWidth={1.6}
            className={styles.primary}
          />

          <span className={`text-xs font-semibold ${styles.text}`}>
            Secure
          </span>

          <span className={`text-[11px] ${styles.secondary}`}>
            Safe checkout
          </span>
        </div>
      </div>
    </section>
  );
}