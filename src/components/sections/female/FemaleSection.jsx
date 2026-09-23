"use client";

import { useMemo, useState } from "react";

import ProductCard from "@/components/products/ProductCard";

export default function FemaleSection({ products = [] }) {
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
      <div className="flex items-center justify-between border-b border-baby-border pb-4">
        <h2 className="font-serif text-2xl font-medium tracking-wide text-baby-text sm:text-3xl">
          Girls Collection
        </h2>

        <div className="flex items-center gap-2">
          <label
            htmlFor="girls-sort"
            className="hidden text-xs font-semibold uppercase tracking-wider text-baby-text-secondary sm:block"
          >
            Sort by:
          </label>

          <select
            id="girls-sort"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="cursor-pointer rounded-none border border-baby-border bg-baby-surface p-2.5 text-xs font-medium text-baby-text focus:outline-none focus:ring-1 focus:ring-baby-primary"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="space-y-3 border border-dashed border-baby-border bg-baby-surface py-20 text-center">
          <p className="font-serif text-lg font-semibold uppercase tracking-wider text-baby-text">
            No articles found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              gender="girls"
              isBaba={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}