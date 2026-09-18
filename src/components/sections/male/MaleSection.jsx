"use client";

import React, { useState, useMemo } from "react";
import ProductCard from "../../products/ProductCard.jsx";
import { products, categories } from "../../../mock/mockData.js";

export default function MaleSection() {
  const [sortBy, setSortBy] = useState("featured");

  // 1. Male/Boys Subcategories helper
  const boysCategoryIds = useMemo(() => {
    const boysParent = categories.find(
      (c) => c.slug === "boys" || c.name.toLowerCase() === "boys",
    );

    if (!boysParent) return [];

    return [
      boysParent.id,
      ...categories
        .filter((c) => c.parent_id === boysParent.id)
        .map((c) => c.id),
    ];
  }, []);

  // 2. Filter male products and apply sorting
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      if (
        boysCategoryIds.length > 0 &&
        !boysCategoryIds.includes(product.category_id)
      ) {
        return false;
      }
      return true;
    });

    if (sortBy === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      result = [...result].reverse();
    }

    return result;
  }, [sortBy, boysCategoryIds]);

  return (
    <div className="w-full space-y-6 rounded-none">
      {/* Section Title with Playfair Display */}

      {/* Top Bar: Count & Sort */}
      <div className="flex items-center justify-between pb-4 border-b border-baba-border rounded-none">
        <h2 className="font-['Playfair_Display']  text-2xl sm:text-3xl font-medium tracking-wide text-baba-text">
          Male Collection
        </h2>

        <div className="flex items-center gap-2 rounded-none">
          <label
            htmlFor="sort"
            className="text-xs font-semibold uppercase tracking-wider text-baba-text-secondary hidden sm:block"
          >
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-baba-surface border border-baba-border text-baba-text text-xs rounded-none p-2.5 focus:ring-1 focus:ring-baba-primary outline-none font-medium cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Full-width Clean Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-baba-surface border border-dashed border-baba-border rounded-none space-y-3">
          <p className="font-['Playfair_Display'] font-serif text-lg font-semibold text-baba-text uppercase tracking-wider">
            No articles found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 rounded-none">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
