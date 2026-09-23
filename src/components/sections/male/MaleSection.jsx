"use client";

import { useMemo, useState } from "react";

import ProductCard from "@/components/products/ProductCard";

export default function MaleSection({ products = [] }) {
  const [sortBy, setSortBy] = useState("featured");

  const sortedProducts = useMemo(() => {
    const result = [...products];

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
  }, [products, sortBy]);

  return (
    <div className="w-full space-y-6 rounded-none">
      <div className="flex items-center justify-between rounded-none border-b border-baba-border pb-4">
        <h2 className="font-['Playfair_Display'] text-2xl font-medium tracking-wide text-baba-text sm:text-3xl">
          Boys Collection
        </h2>

        <div className="flex items-center gap-2 rounded-none">
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
            className="cursor-pointer rounded-none border border-baba-border bg-baba-surface p-2.5 text-xs font-medium text-baba-text outline-none focus:ring-1 focus:ring-baba-primary"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="space-y-3 rounded-none border border-dashed border-baba-border bg-baba-surface py-20 text-center">
          <p className="font-['Playfair_Display'] font-serif text-lg font-semibold uppercase tracking-wider text-baba-text">
            No articles found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 rounded-none sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              gender="boys"
              isBaba
            />
          ))}
        </div>
      )}
    </div>
  );
}