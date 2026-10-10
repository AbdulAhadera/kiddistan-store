import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions | Kiddistan",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        <h1 className="font-[var(--font-playfair)] text-4xl font-semibold text-store-text sm:text-5xl">
          Terms & Conditions
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-8 text-store-text-secondary sm:text-lg">
          By accessing or using the Kiddistan website, you agree to be bound by these Terms & Conditions. Please read them carefully before placing an order.
        </p>

        <div className="mt-14 space-y-12">
          {/* USE OF WEBSITE */}
          <section>
            <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
              Use of Website
            </h2>

            <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
              By browsing, accessing, or placing an order on Kiddistan, you agree to use this website only for lawful purposes. You agree not to misuse, hack, scrape, or attempt to disrupt the website or its services in any way.
            </p>
          </section>

          {/* PRODUCTS & PRICING */}
          <section>
            <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
              Products & Pricing
            </h2>

            <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
              All products listed on Kiddistan are subject to availability. We make every effort to display product images and descriptions accurately; however, slight variations in color may occur due to screen settings and lighting.
            </p>

            <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
              Prices are listed in Pakistani Rupees (PKR) and are subject to change without prior notice. In the event of a pricing error, Kiddistan reserves the right to cancel the affected order and issue a full refund if payment was already made.
            </p>
          </section>

          {/* ORDERS */}
          <section>
            <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
              Orders
            </h2>

            <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
              Placing an order on Kiddistan constitutes an offer to purchase. Your order is confirmed once our team verifies the details and confirms it with you. We reserve the right to refuse or cancel any order at our discretion, including orders with incorrect pricing, suspected fraud, or unavailable stock.
            </p>
          </section>

          {/* PAYMENT */}
          <section>
            <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
              Payment
            </h2>

            <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
              We currently accept Cash on Delivery (COD). Payment is due in full at the time of delivery. Please ensure the correct amount is available at the time of receiving your order.
            </p>
          </section>

          {/* SHIPPING */}
          <section>
            <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
              Shipping & Delivery
            </h2>

            <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
              A shipping fee of Rs. 420 applies to all orders. Orders are typically delivered within 3-5 working days. Karachi orders are delivered within 48 hours.
            </p>

            <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
              Delivery timelines are estimates and may vary due to circumstances beyond our control, such as weather, courier delays, or public holidays. Kiddistan is not liable for delays caused by third-party courier services.
            </p>
          </section>

          {/* EXCHANGE POLICY */}
          <section>
            <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
              Exchange Policy
            </h2>

            <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
              We offer a 7-day exchange policy on non-sale items. To be eligible for exchange, the product must be unused, with tags and price label intact, and you must have the purchase invoice.
            </p>

            <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
              Sale items are not eligible for exchange. We do not offer returns or refunds on any purchased items.
            </p>
          </section>

          {/* INTELLECTUAL PROPERTY */}
          <section>
            <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
              Intellectual Property
            </h2>

            <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
              All content on this website, including text, images, logos, and design, is the property of Kiddistan and is protected by applicable intellectual property laws. You may not copy, reproduce, or distribute any content without prior written permission.
            </p>
          </section>

          {/* LIMITATION OF LIABILITY */}
          <section>
            <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
              Limitation of Liability
            </h2>

            <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
              Kiddistan shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website or the products purchased. In the event of any unauthorized attack, breach, or malicious activity beyond our control, Kiddistan does not take any responsibility for resulting damages or data loss.
            </p>
          </section>

          {/* GOVERNING LAW */}
          <section>
            <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
              Governing Law
            </h2>

            <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
              These Terms & Conditions are governed by the laws of Pakistan. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the courts of Karachi, Pakistan.
            </p>
          </section>

          {/* CHANGES */}
          <section>
            <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
              Changes to These Terms
            </h2>

            <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
              Kiddistan reserves the right to update or modify these Terms & Conditions at any time. Changes will be posted on this page with an updated date. Continued use of the website after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          {/* CONTACT */}
          <section>
            <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
              Contact Us
            </h2>

            <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
              For any questions regarding these Terms & Conditions, contact us at{" "}
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
          </section>
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