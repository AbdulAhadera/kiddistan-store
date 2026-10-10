import Link from "next/link";

export const metadata = {
  title: "Shipping & Delivery | Kiddistan",
};

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        <h1 className="font-[var(--font-playfair)] text-4xl font-semibold text-store-text sm:text-5xl">
          Shipping & Delivery
        </h1>

        <p className="mt-3 text-base text-store-text-secondary">
          Last updated: October 2026
        </p>

        <div className="mt-12 space-y-14 text-base leading-8 text-store-text-secondary sm:text-lg">
          {/* DOMESTIC */}
          <section>
            <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
              Domestic Shipping
            </h2>

            <ul className="mt-5 list-disc space-y-3 pl-6">
              <li>
                A shipping fee of <strong className="text-store-text">Rs. 420</strong> is applicable on all orders.
              </li>
              <li>
                All orders may take up to <strong className="text-store-text">3-5 working days</strong> to be delivered.
              </li>
              <li>
                All <strong className="text-store-text">Karachi</strong> orders will be delivered within{" "}
                <strong className="text-store-text">48 hours</strong> of the order being placed.
              </li>
              <li>
                If Karachi orders are not delivered within 48 hours, please contact our{" "}
                <a href="mailto:info@kiddistan.com" className="font-semibold text-store-text underline">
                  customer support
                </a>{" "}
                or call us at{" "}
                <a href="tel:+923012987787" className="font-semibold text-store-text underline">
                  +92 301 2987787
                </a>.
              </li>
            </ul>
          </section>

          {/* INTERNATIONAL */}
          <section>
            <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
              International Shipping
            </h2>

            <p className="mt-5">
              Unfortunately, we do not offer international shipping yet.
            </p>
          </section>

          {/* ORDER PROCESS */}
          <section>
            <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
              Online Order Process
            </h2>

            <ol className="mt-5 list-decimal space-y-4 pl-6">
              <li>
                Order on the Kiddistan website by selecting a product and clicking on{" "}
                <strong className="text-store-text">“Add to Cart”</strong>.
              </li>
              <li>
                Click on the bag icon located at the top right corner.
              </li>
              <li>
                After reviewing the items in your cart, click on{" "}
                <strong className="text-store-text">“Proceed to Checkout”</strong>.
              </li>
              <li>
                Fill in the following details:
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  <li>First name</li>
                  <li>Last name</li>
                  <li>Email</li>
                  <li>Phone number</li>
                  <li>Address</li>
                  <li>City</li>
                  <li>Postal code (optional)</li>
                </ul>
              </li>
              <li>
                Select your payment method: <strong className="text-store-text">Cash on Delivery</strong>.
              </li>
              <li>
                Press the <strong className="text-store-text">“Place Order”</strong> button to place your order and receive your order number.
              </li>
              <li>
                Once your order is confirmed, you will receive a confirmation message.
              </li>
              <li>
                You may receive a confirmation call from our team to verify your order. If you do not receive a call, reach out to us at{" "}
                <a href="tel:+923012987787" className="font-semibold text-store-text underline">
                  +92 301 2987787
                </a>{" "}
                or{" "}
                <a href="mailto:info@kiddistan.com" className="font-semibold text-store-text underline">
                  info@kiddistan.com
                </a>.
              </li>
              <li>
                Upon receiving your order, please pay the due amount in cash and keep your invoice safe for at least 14 days, as per our{" "}
                <Link href="/returns" className="font-semibold text-store-text underline">
                  Return & Exchange Policy
                </Link>.
              </li>
            </ol>
          </section>

          {/* RETURNS */}
          <section>
            <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
              Returns & Exchange
            </h2>

            <p className="mt-5">
              We offer a <strong className="text-store-text">7-day return and exchange</strong> policy. Items must be unused, unwashed, and in their original packaging with tags attached. For full details, read our{" "}
              <Link href="/returns" className="font-semibold text-store-text underline">
                Return & Refund Policy
              </Link>.
            </p>
          </section>

          {/* CONTACT */}
          <section>
            <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
              Contact Us
            </h2>

            <p className="mt-5">
              For any shipping-related questions, contact us at{" "}
              <a href="mailto:info@kiddistan.com" className="font-semibold text-store-text underline">
                info@kiddistan.com
              </a>{" "}
              or call{" "}
              <a href="tel:+923012987787" className="font-semibold text-store-text underline">
                +92 301 2987787
              </a>.
            </p>
          </section>
        </div>

        <div className="mt-16 border-t border-store-border pt-8">
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