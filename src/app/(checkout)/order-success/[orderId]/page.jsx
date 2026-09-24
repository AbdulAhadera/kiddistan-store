import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Check,
} from "lucide-react";

import { getOrderById } from "@/services/orders";

export default async function OrderSuccessPage({
  params,
}) {
  const { orderId } = await params;

  const order = await getOrderById(orderId);

  if (!order) {
    notFound();
  }

  const firstName =
    order.customer_name?.split(" ")[0] || "";

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-xl border border-store-border bg-white px-6 py-10 text-center sm:px-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
          <Check className="h-7 w-7" strokeWidth={2} />
        </div>

        <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-store-text-secondary">
          Order Placed
        </p>

        <h1 className="mt-2 font-[var(--font-playfair)] text-3xl font-semibold text-store-text sm:text-4xl">
          Thank You
          {firstName ? `, ${firstName}` : ""}
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-store-text-secondary">
          Your Cash on Delivery order has been received successfully.
          We&apos;ll contact you using the details provided during checkout.
        </p>

        <div className="mt-7 border-y border-store-border py-5">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-store-text-secondary">
              Customer
            </p>

            <p className="mt-1 text-sm font-medium text-store-text">
              {order.customer_name}
            </p>
          </div>

          <div className="mt-5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-store-text-secondary">
              Order Number
            </p>

            <p className="mt-1 font-[var(--font-playfair)] text-xl font-semibold text-store-text">
              #{order.order_number}
            </p>
          </div>

          <div className="mt-5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-store-text-secondary">
              Payment Method
            </p>

            <p className="mt-1 text-sm font-medium text-store-text">
              Cash on Delivery
            </p>
          </div>
        </div>

        <div className="mt-5 divide-y divide-store-border border-y border-store-border">
          {order.order_items?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 py-3 text-left"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-store-text">
                  {item.products?.name || "Product"}
                </p>

                <p className="mt-0.5 text-[10px] text-store-text-secondary">
                  Size: {item.size_label} · Qty: {item.quantity}
                </p>
              </div>

              <p className="shrink-0 text-sm font-semibold text-store-text">
                PKR{" "}
                {(
                  Number(item.unit_price) *
                  Number(item.quantity)
                ).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-b border-store-border pb-4">
          <span className="text-xs text-store-text-secondary">
            Order Total
          </span>

          <span className="font-[var(--font-playfair)] text-xl font-semibold text-store-text">
            PKR{" "}
            {Number(order.total_amount).toLocaleString()}
          </span>
        </div>

        <p className="mt-4 text-[11px] leading-5 text-store-text-secondary">
          Keep order #{order.order_number} for future reference.
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