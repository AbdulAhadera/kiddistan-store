"use client";

import { useMemo, useState } from "react";

import ProductCard from "@/components/products/ProductCard";
import SaleProductCard from "@/components/products/SaleProductCard";
import SaleMarquee from "@/components/shop/SaleMarquee";
import TestimonialsSection from "@/components/sections/landing/TestimonialsSection";

export default function MaleSection({ products = [] }) {
  const [sortBy, setSortBy] = useState("featured");

  // Sirf boys ke products filter karo
  const boysProducts = useMemo(
    () =>
      products.filter((product) => {
        const categorySlug = product.category?.slug?.toLowerCase() || "";
        return categorySlug.startsWith("boys-");
      }),
    [products]
  );

  // Sirf sale wale boys products
  const saleProducts = useMemo(
    () =>
      boysProducts
        .filter(
          (product) =>
            product.compare_at_price &&
            Number(product.compare_at_price) > Number(product.price)
        )
        .slice(0, 8),
    [boysProducts]
  );

  const sortedProducts = useMemo(() => {
    const result = [...boysProducts];

    if (sortBy === "price-low") {
      return result.sort(
        (first, second) => Number(first.price) - Number(second.price)
      );
    }

    if (sortBy === "price-high") {
      return result.sort(
        (first, second) => Number(second.price) - Number(first.price)
      );
    }

    if (sortBy === "newest") {
      return result.sort(
        (first, second) =>
          new Date(second.created_at) - new Date(first.created_at)
      );
    }

    return result;
  }, [boysProducts, sortBy]);

  return (
    <div className="w-full space-y-12 rounded-none">
      {/* 1. MAIN COLLECTION — filtered boys products */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-baba-border pb-4">
          <h2 className="font-serif text-2xl font-medium tracking-wide text-baba-text sm:text-3xl">
            Boys Collection
          </h2>

          <div className="flex items-center gap-2">
            <label
              htmlFor="boys-sort"
              className="hidden text-xs font-semibold uppercase tracking-wider text-baba-text-secondary sm:block"
            >
              Sort by:
            </label>

            <select
              id="boys-sort"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="cursor-pointer rounded-none border border-baba-border bg-baba-surface p-2.5 text-xs font-medium text-baba-text focus:outline-none focus:ring-1 focus:ring-baba-primary"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {sortedProducts.length === 0 ? (
          <div className="space-y-3 border border-dashed border-baba-border bg-baba-surface py-20 text-center">
            <p className="font-serif text-lg font-semibold uppercase tracking-wider text-baba-text">
              No articles found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                gender="boys"
                isBaba={false}
              />
            ))}
          </div>
        )}
      </section>

      {/* 2 + 3. SALE MARQUEE + SALE CARDS — transparent bg */}
      {saleProducts.length > 0 && (
        <section className="px-6 py-6 md:px-12 md:py-8">
          {/* Sale Marquee */}
          <SaleMarquee
            bgColor="bg-blue-600"
            borderColor="border-blue-700"
          />

          {/* Sale Heading */}
          <div className="mt-10 text-center md:mt-16">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-baba-text sm:text-4xl md:mb-3 md:text-5xl">
              The Little Sale
            </h2>
            <p className="text-sm font-light text-baba-text-secondary sm:text-base md:text-lg">
              More play. Less spend.
            </p>
          </div>

          {/* Sale Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {saleProducts.map((product) => (
              <SaleProductCard
                key={product.id}
                product={product}
                gender="boys"
              />
            ))}
          </div>
        </section>
      )}

      {/* 4. CUSTOMER REVIEWS */}
      <TestimonialsSection />
    </div>
  );
}