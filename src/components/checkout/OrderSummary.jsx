"use client";

import Image from "next/image";
import {
  Check,
  Tag,
} from "lucide-react";

export default function OrderSummary({
  cart,
  subtotal,
  deliveryFee,
  total,
  discountCode,
  setDiscountCode,
  onApplyDiscount,
  discountApplied,
}) {
  return (
    <div className="mx-auto max-w-md lg:ml-0">
      {/* Order */}
      <div className="mb-6">
        <h2 className="font-[var(--font-playfair)] text-xl font-semibold text-store-text">
          Your Order
        </h2>

        <p className="mt-1 text-[10px] text-store-text-secondary">
          Review your items before placing your order.
        </p>
      </div>

      {/* Cart Items */}
      <div className="divide-y divide-store-border">
        {cart.map((item) => {
          const quantity = Number(
            item.quantity || 1
          );

          const lineTotal =
            Number(item.price || 0) *
            quantity;

          return (
            <div
              key={`${item.id}-${item.size}`}
              className="flex items-center gap-3 py-3.5"
            >
              {/* Image */}
              <div className="relative h-16 w-14 shrink-0 overflow-hidden border border-store-border bg-white">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                )}

                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[8px] font-bold text-white">
                  {quantity}
                </span>
              </div>

              {/* Product */}
              <div className="min-w-0 flex-1">
                <h4 className="line-clamp-2 font-[var(--font-playfair)] text-[14px] font-semibold leading-tight text-store-text">
                  {item.name}
                </h4>

                <p className="mt-1 text-[10px] text-store-text-secondary">
                  Size:{" "}
                  <span className="text-store-text">
                    {item.size ||
                      "Default"}
                  </span>
                </p>
              </div>

              {/* Price */}
              <div className="shrink-0 text-right">
                <div className="text-[12px] font-semibold text-store-text">
                  PKR{" "}
                  {lineTotal.toLocaleString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Discount */}
      <div className="border-t border-store-border py-4">
        <div className="flex gap-2">
          <div className="relative min-w-0 flex-1">
            <Tag
              className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-store-text-secondary"
              strokeWidth={1.7}
            />

            <input
              type="text"
              value={
                discountCode
              }
              onChange={(e) =>
                setDiscountCode(
                  e.target.value
                )
              }
              placeholder="Discount code"
              className="h-9 w-full border border-store-border bg-white pl-8 pr-2.5 text-[11px] text-store-text outline-none transition-all duration-200 placeholder:text-zinc-400 focus:border-zinc-800 focus:ring-1 focus:ring-zinc-800/10"
            />
          </div>

          <button
            type="button"
            onClick={
              onApplyDiscount
            }
            className="h-9 border border-store-border bg-white px-3 text-[10px] font-semibold uppercase tracking-wider text-store-text transition-colors hover:bg-store-bg-secondary"
          >
            Apply
          </button>
        </div>

        {discountApplied && (
          <p className="mt-1.5 flex items-center gap-1 text-[9px] font-medium text-green-600">
            <Check className="h-3 w-3" />
            Discount code saved
          </p>
        )}
      </div>

      {/* Pricing */}
      <div className="space-y-2 border-t border-store-border pt-4 text-[12px]">
        <div className="flex justify-between">
          <span className="text-store-text-secondary">
            Subtotal
          </span>

          <span className="font-medium text-store-text">
            PKR{" "}
            {subtotal.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-store-text-secondary">
            Shipping
          </span>

          <span className="font-semibold text-store-text">
            {deliveryFee === 0
              ? "FREE"
              : `PKR ${deliveryFee.toLocaleString()}`}
          </span>
        </div>

        <div className="flex items-end justify-between border-t border-store-border pt-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-store-text">
            Total
          </span>

          <div className="text-right">
            <span className="mr-1 text-[9px] text-store-text-secondary">
              PKR
            </span>

            <span className="font-[var(--font-playfair)] text-[22px] font-semibold text-store-text">
              {total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}