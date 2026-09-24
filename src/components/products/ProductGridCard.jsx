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
  product,
  gender,
  isBaba = true,
  isNew = false,
}) {
  const [showSizePicker, setShowSizePicker] =
    useState(false);

  const [isWishlisted, setIsWishlisted] =
    useState(false);

  const [addedSuccess, setAddedSuccess] =
    useState(false);

  const [selectedSize, setSelectedSize] =
    useState("");

  if (
    !product?.id ||
    !product?.slug ||
    !product?.name ||
    !gender ||
    (gender !== "boys" && gender !== "girls")
  ) {
    return null;
  }

  const productUrl = `/${gender}/${product.slug}`;

  const primaryImg =
    product.primary_image ||
    product.images?.find((image) => image.is_primary)
      ?.url ||
    product.images?.[0]?.url ||
    null;

  const hoverImg =
    product.images?.find((image) => !image.is_primary)
      ?.url || null;

  const price = Number(product.price);

  const comparePrice =
    product.compare_at_price === null ||
    product.compare_at_price === undefined
      ? null
      : Number(product.compare_at_price);

  const isOnSale =
    comparePrice !== null && comparePrice > price;

  const availableSizes = (
    product.available_sizes ??
    product.sizes ??
    []
  )
    .filter((size) => {
      if (typeof size === "string") {
        return Boolean(size);
      }

      return (
        Boolean(size?.label) &&
        (size.stock_qty === undefined ||
          Number(size.stock_qty) > 0)
      );
    })
    .map((size) =>
      typeof size === "string" ? size : size.label
    );

  if (!primaryImg) {
    return null;
  }

  const handleOpenPicker = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (availableSizes.length === 0) {
      handleAddToCart("Standard");
      return;
    }

    setSelectedSize(
      (currentSelectedSize) =>
        currentSelectedSize || availableSizes[0]
    );

    setShowSizePicker(true);
  };

  const handleAddToCart = (size = "Standard") => {
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

      window.setTimeout(() => {
        setAddedSuccess(false);
        setShowSizePicker(false);
        setSelectedSize("");
      }, 1200);
    } catch (error) {
      console.error(
        "Failed to add item to cart:",
        error
      );
    }
  };

  const handleConfirmAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();

    handleAddToCart(
      selectedSize || availableSizes[0] || "Standard"
    );
  };

  const handleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsWishlisted((current) => !current);
  };

  const handleClosePicker = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setShowSizePicker(false);
    setSelectedSize("");
  };

  return (
    <div className="group relative w-full text-left">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-none bg-store-bg-secondary shadow-sm">
        {isNew && (
          <span className="absolute left-2.5 top-2.5 z-10 bg-black px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            New
          </span>
        )}

        {isOnSale && (
          <span className="absolute bottom-2.5 left-2.5 z-10 bg-red-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            Sale
          </span>
        )}

        <Link
          href={productUrl}
          className="block h-full w-full"
        >
          <Image
            src={primaryImg}
            alt={product.name}
            fill
            sizes="(min-width: 768px) 28vw, 68vw"
            className={`object-cover transition-opacity duration-300 ${
              hoverImg ? "group-hover:opacity-0" : ""
            }`}
          />

          {hoverImg && (
            <Image
              src={hoverImg}
              alt=""
              aria-hidden="true"
              fill
              sizes="(min-width: 768px) 28vw, 68vw"
              className="absolute inset-0 object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
        </Link>

        <button
          type="button"
          onClick={handleWishlist}
          className="absolute right-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black shadow-sm transition-transform hover:scale-105"
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          aria-pressed={isWishlisted}
        >
          <Heart
            className={`h-4 w-4 ${
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-black"
            }`}
          />
        </button>

        {!showSizePicker && (
          <button
            type="button"
            onClick={handleOpenPicker}
            disabled={addedSuccess}
            className={`absolute bottom-2.5 right-2.5 z-10 flex h-9 w-9 items-center justify-center rounded-full text-white shadow-sm transition-transform hover:scale-105 active:scale-95 ${
              addedSuccess
                ? "bg-emerald-600"
                : "bg-black"
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

        {showSizePicker && (
          <div
            className="absolute inset-x-2 bottom-2 z-20 rounded-none border border-neutral-200 bg-white p-3 shadow-md"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            <div className="mb-2 flex items-center justify-between border-b border-neutral-100 pb-1.5">
              <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-700">
                Size:{" "}
                <span className="font-bold">
                  {selectedSize || "Select"}
                </span>
              </span>

              <button
                type="button"
                onClick={handleClosePicker}
                className="p-0.5 text-neutral-400 hover:text-neutral-900"
                aria-label="Close size picker"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mb-2.5 flex flex-wrap gap-1">
              {availableSizes.map((size) => {
                const isSelected = selectedSize === size;

                return (
                  <button
                    key={size}
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      setSelectedSize(size);
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
              })}
            </div>

            <button
              type="button"
              onClick={handleConfirmAdd}
              disabled={addedSuccess}
              className={`relative flex w-full items-center justify-center gap-1.5 rounded-none py-2 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 ${
                addedSuccess
                  ? "scale-95 bg-emerald-600"
                  : "bg-black hover:bg-neutral-800 active:scale-90"
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="h-4 w-4" />
                  Item Added
                </>
              ) : (
                <>
                  <ShoppingBag className="h-3.5 w-3.5" />
                  Add To Cart
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <div className="mt-2.5 space-y-1 px-0.5">
        <Link href={productUrl}>
          <h3 className="line-clamp-1 text-xs font-normal uppercase tracking-wide text-neutral-900 hover:underline md:text-sm">
            {product.name}
          </h3>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {isOnSale && (
            <span className="text-xs text-neutral-400 line-through md:text-sm">
              {product.currency} {comparePrice.toLocaleString()}
            </span>
          )}

          <span className="text-xs font-bold text-neutral-900 md:text-sm">
            {product.currency} {price.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}