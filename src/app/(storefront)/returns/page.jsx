import Link from "next/link";

export const metadata = {
  title: "Return & Exchange Policy | Kiddistan",
};

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        <h1 className="font-[var(--font-playfair)] text-4xl font-semibold text-store-text sm:text-5xl">
          Return & Exchange Policy
        </h1>

        <p className="mt-3 text-base text-store-text-secondary sm:text-lg">
          Last updated: October 2026
        </p>

        <div className="mt-12 space-y-14 text-base leading-8 text-store-text-secondary sm:text-lg">
          {/* EXCHANGE */}
          <section>
            <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
              Exchange Policy
            </h2>

            <p className="mt-5">
              <strong className="text-store-text">Note:</strong> Kiddistan has no exchange policy on sale items.
            </p>

            <p className="mt-4">
              Products not on sale can be exchanged by visiting our office in Karachi within{" "}
              <strong className="text-store-text">7 days</strong> from the date of delivery. If more than 7 days have passed, the exchange is not possible.
            </p>

            <p className="mt-4">Our exchange policy is flexible, provided that:</p>

            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>The product is unused.</li>
              <li>The price label and tags are intact.</li>
              <li>You have the purchase invoice.</li>
              <li>The exchange is made within 7 days of delivery.</li>
            </ul>

            <p className="mt-5">
              If an incorrect or faulty product has been delivered, contact our customer service by emailing images of the product to{" "}
              <a href="mailto:info@kiddistan.com" className="font-semibold text-store-text underline">
                info@kiddistan.com
              </a>{" "}
              or calling us at{" "}
              <a href="tel:+923012987787" className="font-semibold text-store-text underline">
                +92 301 2987787
              </a>{" "}
              within 7 days of delivery. After our team reviews the product, we will gladly help you with your exchange.
            </p>

            <p className="mt-4">
              Once 7 days have passed from the delivery date, our team will no longer be able to entertain any claims.
            </p>
          </section>

          {/* HOW TO EXCHANGE */}
          <section>
            <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
              How to Exchange
            </h2>

            <ul className="mt-5 list-disc space-y-3 pl-6">
              <li>
                <strong className="text-store-text">If you are in Karachi:</strong> Visit our office physically for exchange.
              </li>
              <li>
                <strong className="text-store-text">If you are outside Karachi:</strong> Contact us on the provided number or email to discuss your exchange.
              </li>
            </ul>

            <p className="mt-5">
              <strong className="text-store-text">Office Address:</strong> DJ Collection, Sector 14/A, House No 92, Orangi Town, Karachi
            </p>
          </section>

          {/* RETURNS */}
          <section>
            <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
              Return Policy
            </h2>

            <p className="mt-5">
              Kiddistan does <strong className="text-store-text">not</strong> offer a return or refund policy on purchased items. Only exchanges are accepted as per the policy above.
            </p>

            <p className="mt-4">
              <strong className="text-store-text">Note:</strong> Please do not accept the parcel if it is already opened or tampered with in any way.
            </p>
          </section>

          {/* CONTACT */}
          <section>
            <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
              Contact Us
            </h2>

            <p className="mt-5">
              For any questions or exchange requests, reach out to our customer support:
            </p>

            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>
                Email:{" "}
                <a href="mailto:info@kiddistan.com" className="font-semibold text-store-text underline">
                  info@kiddistan.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a href="tel:+923012987787" className="font-semibold text-store-text underline">
                  +92 301 2987787
                </a>
              </li>
            </ul>
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