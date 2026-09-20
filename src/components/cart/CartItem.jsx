"use client";

import Image from "next/image";
import {
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  const quantity = Number(
    item?.quantity || 1
  );

  const price = Number(
    item?.price || 0
  );

  const lineTotal =
    price * quantity;

  const image =
    item?.image || null;

  return (
    <article className="group py-3">
      <div className="flex gap-3">
        {/* Product Image */}
        <div className="relative h-[92px] w-[70px] shrink-0 overflow-hidden bg-store-bg-secondary">
          {image ? (
            <Image
              src={image}
              alt={
                item?.name || "Product"
              }
              fill
              sizes="70px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center px-2 text-center text-[8px] font-semibold uppercase tracking-[0.12em] text-store-text-secondary">
              No Image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Product Name */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-[var(--font-playfair)] text-[14px] font-semibold leading-[1.2] text-store-text">
                {item?.name}
              </h3>

              <div className="mt-1 flex items-center gap-1.5 text-[9px] text-store-text-secondary">
                <span>Size</span>

                <span className="font-semibold text-store-text">
                  {item?.size ||
                    "Standard"}
                </span>
              </div>
            </div>

            {/* Remove */}
            <button
              type="button"
              onClick={() =>
                onRemove(item)
              }
              className="shrink-0 rounded-full p-1 text-store-text-secondary transition-colors hover:bg-store-bg-secondary hover:text-red-600"
              aria-label={`Remove ${item?.name}`}
            >
              <Trash2
                className="h-3.5 w-3.5"
                strokeWidth={1.7}
              />
            </button>
          </div>

          {/* Quantity + Price */}
          <div className="mt-auto flex items-end justify-between gap-2 pt-2.5">
            {/* Quantity */}
            <div className="inline-flex h-7 items-center border border-store-border bg-white">
              <button
                type="button"
                onClick={() =>
                  onDecrease(item)
                }
                className="flex h-full w-7 items-center justify-center text-store-text-secondary transition-colors hover:bg-store-bg-secondary hover:text-store-text"
                aria-label="Decrease quantity"
              >
                <Minus
                  className="h-2.5 w-2.5"
                  strokeWidth={1.8}
                />
              </button>

              <span className="flex h-full min-w-7 items-center justify-center border-x border-store-border px-1 text-[10px] font-semibold text-store-text">
                {quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  onIncrease(item)
                }
                className="flex h-full w-7 items-center justify-center text-store-text-secondary transition-colors hover:bg-store-bg-secondary hover:text-store-text"
                aria-label="Increase quantity"
              >
                <Plus
                  className="h-2.5 w-2.5"
                  strokeWidth={1.8}
                />
              </button>
            </div>

            {/* Price */}
            <div className="text-right">
              <div className="font-[var(--font-playfair)] text-[14px] font-semibold text-store-text">
                {item?.currency ||
                  "PKR"}{" "}
                {lineTotal.toLocaleString()}
              </div>

              {quantity > 1 && (
                <div className="mt-0.5 text-[8px] text-store-text-secondary">
                  {item?.currency ||
                    "PKR"}{" "}
                  {price.toLocaleString()}{" "}
                  each
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}