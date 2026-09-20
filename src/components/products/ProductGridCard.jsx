"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ShoppingBag,
  Heart,
  X,
  Check,
} from "lucide-react";

import {
  addProductToCart,
  openCartDrawer,
} from "@/lib/cart";

export default function ProductGridCard({
  product = {},
  isBaba = true,
}) {
  const [showSizePicker, setShowSizePicker] =
    useState(false);

  const [isWishlisted, setIsWishlisted] =
    useState(false);

  const [addedSuccess, setAddedSuccess] =
    useState(false);

  const rawSizes =
    product.sizes ||
    product.available_sizes ||
    [];

  const availableSizes = rawSizes
    .map((size) =>
      typeof size === "string"
        ? size
        : size?.label
    )
    .filter(Boolean);

  const [selectedSize, setSelectedSize] =
    useState(availableSizes[0] || "");

  const gender = product.gender
    ? product.gender
    : product.slug?.startsWith("baby")
    ? "baby"
    : isBaba
    ? "baba"
    : "baby";

  const productUrl = `/${gender}/${product.slug}`;

  const primaryImg =
    product.src ||
    product.primary_image;

  const hoverImg =
    product.hoverSrc ||
    product.images?.find(
      (img) => !img.is_primary
    )?.url;

  const displayPrice =
    typeof product.price === "number"
      ? `PKR ${product.price.toLocaleString()}`
      : product.price || "";

  const displayOriginalPrice =
    typeof product.compare_at_price ===
    "number"
      ? `PKR ${product.compare_at_price.toLocaleString()}`
      : product.compare_at_price || null;

  const isOnSale =
    Boolean(
      product.compare_at_price &&
        product.price &&
        Number(product.compare_at_price) >
          Number(product.price)
    );

  const handleOpenPicker = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (availableSizes.length === 0) {
      handleAddToCart("Standard");
      return;
    }

    if (!selectedSize) {
      setSelectedSize(
        availableSizes[0]
      );
    }

    setShowSizePicker(true);
  };

  const handleAddToCart = (
    size = "Standard"
  ) => {
    try {
      addProductToCart(product, {
        size,
        quantity: 1,
        image:
          primaryImg ||
          "/samples/baby/sample1.1.png",
      });

      openCartDrawer();

      if (window.navigator?.vibrate) {
        window.navigator.vibrate(40);
      }

      setAddedSuccess(true);

      setTimeout(() => {
        setAddedSuccess(false);
        setShowSizePicker(false);
      }, 1200);
    } catch (error) {
      console.error(
        "Failed to add item to cart:",
        error
      );
    }
  };

  const handleConfirmAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    handleAddToCart(
      selectedSize || "Standard"
    );
  };

  return (
    <div className="group relative w-full text-left">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-none bg-store-bg-secondary shadow-sm">
        {/* Badges */}
        {product.isNew && (
          <span className="absolute left-2.5 top-2.5 z-10 bg-black px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            New
          </span>
        )}

        {isOnSale && (
          <span className="absolute bottom-2.5 left-2.5 z-10 bg-red-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            Sale
          </span>
        )}

        {/* Product Image */}
        <Link
          href={productUrl}
          className="block h-full w-full"
        >
          {primaryImg && (
            <Image
              src={primaryImg}
              alt={
                product.name ||
                "Product Image"
              }
              fill
              sizes="(min-width: 768px) 28vw, 68vw"
              className={`object-cover transition-opacity duration-300 ${
                hoverImg
                  ? "group-hover:opacity-0"
                  : ""
              }`}
            />
          )}

          {hoverImg && (
            <Image
              src={hoverImg}
              alt={`${product.name} alternate view`}
              fill
              sizes="(min-width: 768px) 28vw, 68vw"
              className="absolute inset-0 object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
        </Link>

        {/* Wishlist */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            setIsWishlisted(
              !isWishlisted
            );
          }}
          className="absolute right-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black shadow-sm transition-transform hover:scale-105"
          aria-label="Wishlist"
        >
          <Heart
            className={`h-4 w-4 ${
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-black"
            }`}
          />
        </button>

        {/* Quick Cart Button */}
        {!showSizePicker && (
          <button
            type="button"
            onClick={
              handleOpenPicker
            }
            className={`absolute bottom-2.5 right-2.5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black text-white shadow-sm transition-transform hover:scale-105 active:scale-95 ${
              addedSuccess
                ? "bg-emerald-600"
                : ""
            }`}
            aria-label="Quick add to cart"
          >
            {addedSuccess ? (
              <Check className="h-4 w-4" />
            ) : (
              <ShoppingBag className="h-4 w-4" />
            )}
          </button>
        )}

        {/* Size Picker */}
        {showSizePicker && (
          <div
            className="absolute inset-x-2 bottom-2 z-20 rounded-none border border-neutral-200 bg-white p-3 shadow-md"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div className="mb-2 flex items-center justify-between border-b border-neutral-100 pb-1.5">
              <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-700">
                Size:{" "}
                <span className="font-bold">
                  {selectedSize ||
                    "Select"}
                </span>
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowSizePicker(
                    false
                  );
                }}
                className="p-0.5 text-neutral-400 hover:text-neutral-900"
                aria-label="Close"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Sizes */}
            <div className="mb-2.5 flex flex-wrap gap-1">
              {availableSizes.length >
              0 ? (
                availableSizes.map(
                  (size) => {
                    const isSelected =
                      selectedSize ===
                      size;

                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();

                          setSelectedSize(
                            size
                          );
                        }}
                        className={`rounded-none px-2 py-1 text-[11px] font-medium transition-all ${
                          isSelected
                            ? "bg-black text-white"
                            : "border border-neutral-300 bg-white text-neutral-700 hover:border-black"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  }
                )
              ) : (
                <span className="text-[10px] text-neutral-400">
                  Standard / Free Size
                </span>
              )}
            </div>

            {/* Confirm */}
            <button
              type="button"
              onClick={
                handleConfirmAdd
              }
              disabled={addedSuccess}
              className={`relative flex w-full items-center justify-center gap-1.5 rounded-none py-2 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 ${
                addedSuccess
                  ? "scale-95 bg-emerald-600"
                  : "bg-black hover:bg-neutral-800 active:scale-90"
              }`}
            >
              {addedSuccess ? (
                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4" />
                  Item Added
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <ShoppingBag className="h-3.5 w-3.5" />
                  Add To Cart
                </span>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="mt-2.5 space-y-1 px-0.5">
        <Link href={productUrl}>
          <h3 className="line-clamp-1 text-xs font-normal uppercase tracking-wide text-neutral-900 hover:underline md:text-sm">
            {product.name}
          </h3>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {displayOriginalPrice &&
            isOnSale && (
              <span className="text-xs text-neutral-400 line-through md:text-sm">
                {displayOriginalPrice}
              </span>
            )}

          <span className="text-xs font-bold text-neutral-900 md:text-sm">
            {displayPrice}
          </span>
        </div>
      </div>
    </div>
  );
}