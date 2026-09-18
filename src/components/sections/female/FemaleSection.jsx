"use client";

import React, { useMemo, useState } from "react";
import ProductCard from "../../products/ProductCard.jsx";
import { products } from "../../../mock/mockData.js";

export default function FemaleSection() {
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const categorySlug = product.category?.slug?.toLowerCase() || "";
      const categoryName = product.category?.name?.toLowerCase() || "";
      const productId = product.category_id?.toLowerCase() || "";

      return (
        categorySlug.includes("baby") ||
        categorySlug.includes("girl") ||
        categorySlug.includes("female") ||
        categoryName.includes("baby") ||
        categoryName.includes("girl") ||
        categoryName.includes("female") ||
        productId.includes("baby") ||
        productId.includes("girl") ||
        productId.includes("female")
      );
    });

    if (sortBy === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      result = [...result].reverse();
    }

    return result;
  }, [sortBy]);

  return (
    <div className="w-full space-y-6 rounded-none">
      <div className="flex items-center justify-between pb-4 border-b border-baby-border">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-wide text-baby-text">
          Female Collection
        </h2>

        <div className="flex items-center gap-2">
          <label
            htmlFor="female-sort"
            className="hidden sm:block text-xs font-semibold uppercase tracking-wider text-baby-text-secondary"
          >
            Sort by:
          </label>

          <select
            id="female-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-baby-surface border border-baby-border text-baby-text text-xs rounded-none p-2.5 focus:outline-none focus:ring-1 focus:ring-baby-primary font-medium cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-baby-surface border border-dashed border-baby-border space-y-3">
          <p className="font-serif text-lg font-semibold text-baby-text uppercase tracking-wider">
            No articles found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}