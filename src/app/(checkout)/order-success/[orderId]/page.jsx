"use client";

import {
  use,
  useSyncExternalStore,
} from "react";

import Link from "next/link";

import {
  ArrowRight,
  Check,
} from "lucide-react";

export default function OrderSuccessPage({
  params,
}) {
  const { orderId } = use(params);

  const orderJson =
    useSyncExternalStore(
      (callback) => {
        if (
          typeof window ===
          "undefined"
        ) {
          return () => {};
        }

        const handleOrderCreated =
          () => callback();

        const handleStorage =
          () => callback();

        window.addEventListener(
          "orderCreated",
          handleOrderCreated
        );

        window.addEventListener(
          "storage",
          handleStorage
        );

        return () => {
          window.removeEventListener(
            "orderCreated",
            handleOrderCreated
          );

          window.removeEventListener(
            "storage",
            handleStorage
          );
        };
      },

      () => {
        if (
          typeof window ===
          "undefined"
        ) {
          return "";
        }

        return (
          window.localStorage.getItem(
            `order:${orderId}`
          ) || ""
        );
      },

      () => ""
    );

  let order = null;

  try {
    order = orderJson
      ? JSON.parse(
          orderJson
        )
      : null;
  } catch {
    order = null;
  }

  if (!order) {
    return (
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <h1 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text">
            Order not found
          </h1>

          <p className="mt-2 text-sm text-store-text-secondary">
            This order could not be found.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 bg-black px-7 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-neutral-800"
          >
            Back to Store

            <ArrowRight
              className="h-4 w-4"
              strokeWidth={1.8}
            />
          </Link>
        </div>
      </main>
    );
  }

  const firstName =
    order?.customer
      ?.firstName || "";

  const lastName =
    order?.customer
      ?.lastName || "";

  const customerName =
    `${firstName} ${lastName}`.trim();

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-xl border border-store-border bg-white px-6 py-10 text-center sm:px-10">
        {/* Success */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
          <Check
            className="h-7 w-7"
            strokeWidth={2}
          />
        </div>

        <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-store-text-secondary">
          Order Confirmed
        </p>

        <h1 className="mt-2 font-[var(--font-playfair)] text-3xl font-semibold text-store-text sm:text-4xl">
          Thank You
          {customerName
            ? `, ${firstName}`
            : ""}
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-store-text-secondary">
          Your order has been received successfully.
          We&apos;ll contact you using the details
          provided during checkout.
        </p>

        {/* Customer + Order */}
        <div className="mt-7 border-y border-store-border py-5">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-store-text-secondary">
              Customer
            </p>

            <p className="mt-1 text-sm font-medium text-store-text">
              {customerName ||
                "Customer"}
            </p>
          </div>

          <div className="mt-5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-store-text-secondary">
              Order Number
            </p>

            <p className="mt-1 font-[var(--font-playfair)] text-xl font-semibold text-store-text">
              #
              {order.orderNumber ||
                order.id ||
                orderId}
            </p>
          </div>

          <div className="mt-5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-store-text-secondary">
              Customer ID
            </p>

            <p className="mt-1 text-sm font-medium text-store-text">
              {order?.customer
                ?.id || "N/A"}
            </p>
          </div>
        </div>

        {/* Total */}
        <div className="mt-5 flex items-center justify-between border-b border-store-border pb-4">
          <span className="text-xs text-store-text-secondary">
            Order Total
          </span>

          <span className="font-[var(--font-playfair)] text-xl font-semibold text-store-text">
            PKR{" "}
            {Number(
              order.total || 0
            ).toLocaleString()}
          </span>
        </div>

        <p className="mt-4 text-[11px] leading-5 text-store-text-secondary">
          Keep your order number for future reference.
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex h-11 items-center justify-center gap-2 bg-black px-7 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-neutral-800"
        >
          Continue Shopping

          <ArrowRight
            className="h-4 w-4"
            strokeWidth={1.8}
          />
        </Link>
      </div>
    </main>
  );
}