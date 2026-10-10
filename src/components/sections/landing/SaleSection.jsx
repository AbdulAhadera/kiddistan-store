"use client";

import Link from "next/link";

import SaleProductCard from "@/components/products/SaleProductCard";

export default function SaleSection({ products = [], gender }) {
  // Filter by gender if provided
  let filteredProducts = products;

  if (gender) {
    filteredProducts = products.filter((product) => {
      const categorySlug = product.category?.slug?.toLowerCase() || "";

      if (gender === "boys") {
        return categorySlug.startsWith("boys-");
      }
      if (gender === "girls") {
        return categorySlug.startsWith("girls-");
      }
      return true;
    });
  }

  // Filter sale products (with discount)
  const saleProducts = filteredProducts
    .filter(
      (product) =>
        product.compare_at_price &&
        Number(product.compare_at_price) > Number(product.price)
    )
    .slice(0, 8);

  return (
    <section className="border-store-border bg-store-bg px-6 py-6 md:px-12 md:py-8">
      <div className="mx-auto max-w-auto">
        {/* Infinite SALE Banner */}
        <div className="-mx-6 mb-10 h-4 overflow-hidden border-y-2 border-red-700 bg-red-600 px-6 text-white md:-mx-12 md:mb-16 md:px-12">
          <div className="animate-marquee flex h-full w-max">
            {Array.from({ length: 30 }).map((_, index) => (
              <div key={index} className="flex h-full items-center px-6">
                <span className="whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.2em]">
                  SALE
                </span>
                <span className="mx-4 text-[12px]">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Heading */}
        <div className="mb-10 text-center md:mb-16">
          <h2 className="mb-2 font-['Playfair_Display'] text-3xl font-bold tracking-tight text-store-text sm:text-4xl md:mb-3 md:text-5xl lg:text-6xl">
            The Little Sale
          </h2>
          <p className="text-sm font-light text-store-text-secondary sm:text-base md:text-lg">
            More play. Less spend.
          </p>
        </div>

        {/* Products */}
        {saleProducts.length === 0 ? (
          <div className="rounded-xl bg-store-bg-secondary py-16 text-center">
            <p className="text-base text-store-text-secondary md:text-lg">
              No sale products available.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
              {saleProducts.map((product) => (
                <SaleProductCard
                  key={product.id}
                  product={product}
                  gender={gender}
                />
              ))}
            </div>

            {/* View All Sale Button */}
            <div className="mt-10 text-center md:mt-14">
              <Link
                href="/sale"
                className="inline-block border-2 border-store-text bg-store-text px-10 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:bg-transparent hover:text-store-text"
              >
                View All Sale
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}