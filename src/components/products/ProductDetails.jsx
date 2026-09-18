"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Ruler } from "lucide-react";

export default function ProductDetails({
  product,
  theme = "baby",
  selectedSize,
  setSelectedSize,
}) {
  const isBaba = theme === "baba";

  const [isWishlisted, setIsWishlisted] = useState(() => {
    if (typeof window === "undefined" || !product?.id) {
      return false;
    }

    try {
      const wishlist = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );

      return wishlist.some(
        (item) => item.id === product.id
      );
    } catch {
      return false;
    }
  });

  const [wishlistMessage, setWishlistMessage] = useState("");
  const [showWishlistToast, setShowWishlistToast] = useState(false);

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

  const sizes =
    product?.available_sizes?.map((size) =>
      typeof size === "string" ? size : size?.label
    ) || [];

  const handleWishlist = () => {
    if (!product?.id) return;

    try {
      const wishlist = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );

      const exists = wishlist.some(
        (item) => item.id === product.id
      );

      let updatedWishlist;

      if (exists) {
        updatedWishlist = wishlist.filter(
          (item) => item.id !== product.id
        );
      } else {
        updatedWishlist = [
          ...wishlist,
          {
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            currency: product.currency || "PKR",
            image:
              product.primary_image ||
              product.images?.[0]?.url ||
              (isBaba
                ? "/samples/baba/sample1.1.png"
                : "/samples/baby/sample1.1.png"),
          },
        ];
      }

      localStorage.setItem(
        "wishlist",
        JSON.stringify(updatedWishlist)
      );

      const newWishlistState = !exists;

      setIsWishlisted(newWishlistState);

      setWishlistMessage(
        newWishlistState
          ? "Added to Wishlist"
          : "Removed from Wishlist"
      );

      setShowWishlistToast(true);

      window.dispatchEvent(
        new CustomEvent("wishlistUpdated", {
          detail: updatedWishlist,
        })
      );

      if (navigator.vibrate) {
        navigator.vibrate(30);
      }

      setTimeout(() => {
        setShowWishlistToast(false);
      }, 1800);
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    }
  };

  return (
    <section className="lg:max-h-screen lg:overflow-y-auto">
      {/* Breadcrumbs */}
      <div className="mb-3 flex items-center gap-1.5 text-[11px]">
        <Link
          href="/"
          className={`${styles.secondary} transition-colors hover:${styles.primary}`}
        >
          Home
        </Link>

        <span className={styles.secondary}>/</span>

        <Link
          href={isBaba ? "/baba" : "/baby"}
          className={`${styles.secondary} transition-colors hover:${styles.primary}`}
        >
          {isBaba ? "Baba" : "Baby"}
        </Link>

        <span className={styles.secondary}>/</span>

        <span className={`max-w-60 truncate ${styles.text}`}>
          {product.name}
        </span>
      </div>

      {/* Product Header */}
      <div className={`border-b ${styles.border} pb-4`}>
        <div className="mb-2.5 flex items-center justify-between gap-3">
          <span
            className={`text-[10px] font-medium uppercase tracking-[0.14em] ${styles.secondary}`}
          >
            {product.product_type ||
              (isBaba
                ? "Baba Collection"
                : "Baby Collection")}
          </span>

          {product.id && (
            <span
              className={`text-[9px] uppercase tracking-wider ${styles.secondary}`}
            >
              SKU {product.id}
            </span>
          )}
        </div>

        <div className="flex items-start justify-between gap-4">
          <h1
            className={`font-[playfair-display] max-w-2xl text-3xl font-medium leading-[1.08] tracking-tight sm:text-4xl ${styles.text}`}
          >
            {product.name}
          </h1>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={handleWishlist}
            aria-label={
              isWishlisted
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
            aria-pressed={isWishlisted}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${styles.border} ${styles.surface} transition-all duration-200 hover:${styles.primary} ${
              isWishlisted ? styles.primary : styles.secondary
            }`}
          >
            <Heart
              size={18}
              strokeWidth={1.8}
              fill={isWishlisted ? "currentColor" : "none"}
            />
          </button>
        </div>

        {/* Price */}
        <div className="mt-2.5 flex flex-wrap items-end gap-2.5">
          <span
            className={`font-[playfair-display] text-2xl font-medium ${styles.text}`}
          >
            {product.currency || "PKR"}{" "}
            {Number(product.price).toLocaleString()}
          </span>

          {product.compare_at_price &&
            Number(product.compare_at_price) >
              Number(product.price) && (
              <span
                className={`text-xs line-through ${styles.secondary}`}
              >
                {product.currency || "PKR"}{" "}
                {Number(
                  product.compare_at_price
                ).toLocaleString()}
              </span>
            )}
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <div className={`border-b ${styles.border} py-3.5`}>
          <p
            className={`max-w-xl text-xs leading-5 ${styles.secondary}`}
          >
            {product.description}
          </p>
        </div>
      )}

      {/* Size Selector */}
      {sizes.length > 0 && (
        <div className={`border-b ${styles.border} py-3.5`}>
          <div className="mb-2.5 flex items-center justify-between">
            <h2
              className={`font-[playfair-display] text-xl font-medium ${styles.text}`}
            >
              Select Size
            </h2>

            <button
              type="button"
              className={`flex items-center gap-1 text-[10px] ${styles.secondary} transition hover:${styles.primary}`}
            >
              <Ruler size={13} strokeWidth={1.7} />
              Size Chart
            </button>
          </div>

          <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-5">
            {sizes.map((size) => {
              const value =
                typeof size === "string"
                  ? size
                  : size?.label;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSelectedSize(value)}
                  className={`h-9 border text-xs font-medium transition ${
                    selectedSize === value
                      ? `${styles.primaryBg} border-transparent text-white`
                      : `${styles.border} ${styles.surface} hover:${styles.primary}`
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>

          {!selectedSize && (
            <p
              className={`mt-1.5 text-[10px] ${styles.secondary}`}
            >
              Select a size before adding this item to your
              cart.
            </p>
          )}
        </div>
      )}

      {/* Wishlist Toast */}
      {showWishlistToast && (
        <div className="fixed bottom-5 right-5 z-50">
          <div className="flex items-center gap-2.5 rounded-full border border-black/10 bg-white px-4 py-2.5 text-xs font-medium text-black shadow-lg">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full ${
                isWishlisted
                  ? styles.primaryBg
                  : "bg-black/5"
              }`}
            >
              <Heart
                size={13}
                strokeWidth={2}
                fill={
                  isWishlisted
                    ? "currentColor"
                    : "none"
                }
                className={
                  isWishlisted
                    ? "text-white"
                    : "text-black"
                }
              />
            </div>

            <span>{wishlistMessage}</span>
          </div>
        </div>
      )}
    </section>
  );
}