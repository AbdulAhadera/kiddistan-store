"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Heart, X, Check } from "lucide-react";

import { addProductToCart, openCartDrawer } from "@/lib/cart";

export default function ProductCard({ product, isBaba = true }) {
  const [showSizePicker, setShowSizePicker] = useState(false);

  const [isWishlisted, setIsWishlisted] = useState(false);

  const [addedSuccess, setAddedSuccess] = useState(false);

  const [selectedSize, setSelectedSize] = useState("");

  const gender = product.gender
    ? product.gender
    : product.slug?.startsWith("baby")
      ? "baby"
      : isBaba
        ? "baba"
        : "baby";

  const productUrl = `/${gender}/${product.slug}`;

  const primaryImg =
    product?.primary_image ||
    product?.images?.find((img) => img?.is_primary)?.url ||
    product?.images?.[0]?.url ||
    null;

  const secondaryImg =
    product?.images?.find((img) => !img?.is_primary)?.url ||
    product?.images?.[1]?.url ||
    null;
  const price = Number(product.price || 0);

  const comparePrice = Number(product.compare_at_price || 0);

  const isOnSale = comparePrice > price;

  const rawSizes = product.sizes || product.available_sizes || [];

  const availableSizes = rawSizes
    .map((size) => (typeof size === "string" ? size : size?.label))
    .filter(Boolean);

  const theme = {
    text: isBaba ? "text-baba-text" : "text-store-text",

    secondary: isBaba
      ? "text-baba-text-secondary"
      : "text-store-text-secondary",
  };

  const addToCart = (size = "Standard") => {
    try {
      addProductToCart(product, {
        size,
        quantity: 1,
        image: primaryImg,
      });

      openCartDrawer();

      if (window.navigator?.vibrate) {
        window.navigator.vibrate(40);
      }

      setAddedSuccess(true);

      setTimeout(() => {
        setAddedSuccess(false);
        setShowSizePicker(false);
        setSelectedSize("");
      }, 1200);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (availableSizes.length === 0) {
      addToCart("Standard");
      return;
    }

    setSelectedSize(availableSizes[0]);

    setShowSizePicker(true);
  };

  const handleConfirmAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(selectedSize || availableSizes[0] || "Standard");
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsWishlisted((prev) => !prev);
  };

  const handleClosePicker = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setShowSizePicker(false);
    setSelectedSize("");
  };

  return (
    <div className="group">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-store-bg-secondary">
        <Link href={productUrl} className="absolute inset-0 block">
          <Image
            src={primaryImg}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:opacity-0"
          />

          <Image
            src={secondaryImg}
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:opacity-100"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </Link>

        {/* Sale */}
        {isOnSale && (
          <span className="pointer-events-none absolute left-3 top-3 z-10 inline-flex bg-red-600 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white">
            Sale
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={handleWishlist}
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-black/5 bg-white/95 shadow-[0_2px_12px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white active:scale-95"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`h-[17px] w-[17px] ${
              isWishlisted ? "fill-black text-black" : "text-black"
            }`}
            strokeWidth={1.8}
          />
        </button>

        {/* Cart */}
        <button
          type="button"
          onClick={handleQuickAdd}
          className={`absolute bottom-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.18)] transition-all duration-200 ${
            addedSuccess
              ? "pointer-events-none bg-black text-white"
              : showSizePicker
                ? "pointer-events-none scale-95 opacity-0"
                : "bg-black text-white hover:scale-[1.03] hover:bg-neutral-800 active:scale-95"
          }`}
          aria-label="Add to cart"
        >
          {addedSuccess ? (
            <Check className="h-4 w-4" strokeWidth={2.5} />
          ) : (
            <ShoppingBag className="h-4 w-4" strokeWidth={1.8} />
          )}
        </button>

        {/* Size Picker */}
        <div
          className={`absolute inset-x-0 bottom-0 z-30 transition-all duration-300 ease-out ${
            showSizePicker
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-full opacity-0"
          }`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className="overflow-hidden border-t border-black/5 bg-white/97 shadow-[0_-4px_24px_rgba(0,0,0,0.14)] backdrop-blur-md">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-100 px-3.5 py-2.5">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                  Select size
                </div>

                <div className="mt-0.5 text-[12px] font-medium text-neutral-900">
                  {selectedSize || "Choose a size"}
                </div>
              </div>

              <button
                type="button"
                onClick={handleClosePicker}
                className="flex h-7 w-7 items-center justify-center text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                aria-label="Close size selector"
              >
                <X className="h-4 w-4" strokeWidth={1.8} />
              </button>
            </div>

            {/* Sizes */}
            <div className="px-3.5 pt-3">
              <div className="flex flex-wrap gap-1.5">
                {availableSizes.map((size) => {
                  const isSelected = selectedSize === size;

                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedSize(size);
                      }}
                      className={`min-w-[40px] border px-2.5 py-1.5 text-[10px] font-semibold transition-all duration-150 ${
                        isSelected
                          ? "border-black bg-black text-white"
                          : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-500 hover:text-black"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="px-3.5 pb-3.5 pt-3">
              <button
                type="button"
                onClick={handleConfirmAdd}
                disabled={addedSuccess}
                className={`flex h-10 w-full items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-200 active:scale-[0.98] ${
                  addedSuccess
                    ? "bg-emerald-600"
                    : "bg-black hover:bg-neutral-800"
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="h-4 w-4" />
                    Added to cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    Add to cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <Link href={productUrl} className="block pt-3">
        <div
          className={`mb-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] ${theme.secondary}`}
        >
          {product.category?.name}
        </div>

        <div className="flex items-start justify-between gap-4">
          <h3
            className={`min-w-0 flex-1 font-[var(--font-playfair)] text-[16px] leading-[1.35] tracking-normal ${theme.text}`}
          >
            {product.name}
          </h3>

          <div className="shrink-0 text-right">
            <div
              className={`whitespace-nowrap text-sm font-semibold tracking-tight ${theme.text}`}
            >
              {product.currency || "PKR"} {price.toLocaleString()}
            </div>

            {isOnSale && (
              <div className="mt-0.5 whitespace-nowrap text-[12px] text-stone-400 line-through">
                {product.currency || "PKR"} {comparePrice.toLocaleString()}
              </div>
            )}
          </div>
        </div>

        {product.product_type && (
          <div className={`mt-1.5 text-[10px] ${theme.secondary}`}>
            {product.product_type}
          </div>
        )}
      </Link>
    </div>
  );
}
