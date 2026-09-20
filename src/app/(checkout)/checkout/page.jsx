"use client";

import Link from "next/link";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
  return (
    <main className="min-h-[calc(100vh-64px)] w-full bg-white">
      <CheckoutForm />

      <footer className="border-t border-gray-200 bg-white py-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-gray-500">
            <Link
              href="/privacy"
              className="transition-colors hover:text-gray-900"
            >
              Refund policy
            </Link>

            <Link
              href="/shipping"
              className="transition-colors hover:text-gray-900"
            >
              Shipping policy
            </Link>

            <Link
              href="/privacy"
              className="transition-colors hover:text-gray-900"
            >
              Privacy policy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-gray-900"
            >
              Terms of service
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}