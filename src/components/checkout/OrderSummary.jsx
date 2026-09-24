"use client";

import Image from "next/image";

export default function OrderSummary({
  cart = [],
  subtotal = 0,
  deliveryFee = 0,
  total = 0,
}) {
  return (
    <div className="mx-auto max-w-md lg:ml-0">
      <div className="mb-6">
        <h2 className="font-[var(--font-playfair)] text-xl font-semibold text-store-text">
          Your Order
        </h2>

        <p className="mt-1 text-[10px] text-store-text-secondary">
          Final prices and stock are confirmed when your order is placed.
        </p>
      </div>

      <div className="divide-y divide-store-border">
        {cart.map((item) => {
          const quantity = Number(item.quantity || 1);
          const lineTotal =
            Number(item.price || 0) * quantity;

          return (
            <div
              key={`${item.id}-${item.size}`}
              className="flex items-center gap-3 py-3.5"
            >
              <div className="relative h-16 w-14 shrink-0 overflow-hidden border border-store-border bg-white">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name || "Product"}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center px-1 text-center text-[8px] font-semibold uppercase tracking-wide text-store-text-secondary">
                    No image
                  </div>
                )}

                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[8px] font-bold text-white">
                  {quantity}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="line-clamp-2 font-[var(--font-playfair)] text-[14px] font-semibold leading-tight text-store-text">
                  {item.name}
                </h4>

                <p className="mt-1 text-[10px] text-store-text-secondary">
                  Size:{" "}
                  <span className="text-store-text">
                    {item.size || "Standard"}
                  </span>
                </p>
              </div>

              <div className="shrink-0 text-right">
                <div className="text-[12px] font-semibold text-store-text">
                  {item.currency || "PKR"}{" "}
                  {lineTotal.toLocaleString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-2 border-t border-store-border pt-4 text-[12px]">
        <div className="flex justify-between">
          <span className="text-store-text-secondary">
            Estimated subtotal
          </span>

          <span className="font-medium text-store-text">
            PKR {subtotal.toLocaleString()}
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
            Estimated total
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