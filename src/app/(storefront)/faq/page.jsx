"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";


const faqs = [
  {
    category: "Orders",
    items: [
      {
        q: "How do I place an order?",
        a: "Browse our collection, select your desired product, choose the size, and click “Add to Cart”. Then click on the bag icon, review your items, and proceed to checkout. Fill in your details and place your order.",
      },
      {
        q: "How will I know my order is confirmed?",
        a: "Once your order is placed, you will receive an order number. Our team may also contact you to confirm your order details.",
      },
      {
        q: "Can I cancel my order?",
        a: "Yes, you can cancel your order before it is shipped. Contact us at info@kiddistan.com or call +92 301 2987787.",
      },
    ],
  },
  {
    category: "Payment",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We currently accept Cash on Delivery (COD). You pay in cash when you receive your order.",
      },
      {
        q: "Do I need to pay anything in advance?",
        a: "No. With Cash on Delivery, you only pay when your order is delivered to you.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    items: [
      {
        q: "How long does delivery take?",
        a: "Orders are typically delivered within 3-5 working days. Karachi orders are delivered within 48 hours.",
      },
      {
        q: "What is the delivery charge?",
        a: "A shipping fee of Rs. 420 applies to all orders.",
      },
      {
        q: "Do you deliver across Pakistan?",
        a: "Yes, we deliver to most cities across Pakistan. Unfortunately, we do not offer international shipping yet.",
      },
      {
        q: "How can I track my order?",
        a: "Once your order is shipped, our team will share the delivery updates with you. For any updates, contact us at info@kiddistan.com.",
      },
    ],
  },
  {
    category: "Returns & Exchange",
    items: [
      {
        q: "What is your exchange policy?",
        a: "We offer a 7-day exchange policy on non-sale items. The product must be unused, with tags and price label intact, and you must have the purchase invoice.",
      },
      {
        q: "Do you accept returns or refunds?",
        a: "No, we do not offer returns or refunds. Only exchanges are accepted as per our exchange policy.",
      },
      {
        q: "Can I exchange sale items?",
        a: "No, sale items are not eligible for exchange.",
      },
      {
        q: "How do I exchange an item if I live in Karachi?",
        a: "If you are in Karachi, you can visit our office for an exchange: DJ Collection, Sector 14/A, House No 92, Orangi Town, Karachi.",
      },
      {
        q: "How do I exchange an item if I live outside Karachi?",
        a: "Contact us at info@kiddistan.com or call +92 301 2987787, and our team will guide you through the process.",
      },
      {
        q: "What if I receive a damaged or incorrect product?",
        a: "Contact us within 7 days of delivery with images of the product at info@kiddistan.com. After reviewing, we will help you with an exchange.",
      },
    ],
  },
  {
    category: "Support",
    items: [
      {
        q: "How can I contact customer support?",
        a: "Email us at info@kiddistan.com or call +92 301 2987787. Our support hours are Monday to Saturday, 10:00 AM – 8:00 PM PKT.",
      },
      {
        q: "Where is your office located?",
        a: "Our office is located at DJ Collection, Sector 14/A, House No 92, Orangi Town, Karachi.",
      },
    ],
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        <h1 className="font-[var(--font-playfair)] text-4xl font-semibold text-store-text sm:text-5xl">
          Frequently Asked Questions
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-8 text-store-text-secondary sm:text-lg">
          Find answers to common questions about ordering, delivery, payments, and exchanges.
        </p>

        <div className="mt-14 space-y-16">
          {faqs.map((section) => (
            <section key={section.category}>
              <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
                {section.category}
              </h2>

              <div className="mt-6 divide-y divide-store-border border-y border-store-border">
                {section.items.map((faq, i) => {
                  const globalIndex = `${section.category}-${i}`;
                  const isOpen = openIndex === globalIndex;

                  return (
                    <div key={faq.q}>
                      <button
                        type="button"
                        onClick={() => toggle(globalIndex)}
                        className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:bg-store-bg-secondary/50"
                        aria-expanded={isOpen}
                      >
                        <span className="text-lg font-semibold text-store-text sm:text-xl">
                          {faq.q}
                        </span>

                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-store-text-secondary transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          strokeWidth={2}
                        />
                      </button>

                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="pb-6 pr-12 text-base leading-8 text-store-text-secondary sm:text-lg">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* CONTACT CTA */}
        <div className="mt-16 border-t border-store-border pt-10">
          <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
            Still have questions?
          </h2>

          <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
            We are here to help. Reach out to us at{" "}
            <a
              href="mailto:info@kiddistan.com"
              className="font-semibold text-store-text underline"
            >
              info@kiddistan.com
            </a>{" "}
            or call{" "}
            <a
              href="tel:+923012987787"
              className="font-semibold text-store-text underline"
            >
              +92 301 2987787
            </a>
            .
          </p>
        </div>

        <div className="mt-12 border-t border-store-border pt-8">
          <Link
            href="/"
            className="text-sm font-bold uppercase tracking-[0.14em] text-store-text underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}