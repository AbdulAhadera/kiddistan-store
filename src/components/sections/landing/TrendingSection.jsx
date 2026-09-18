"use client";

import { useState } from "react";
import { products as mockProducts } from "@/mock/mockData";
import ProductGridCard from "../../products/ProductGridCard.jsx";

function formatProduct(prod) {
  return {
    ...prod,
    isNew: prod.collection_slugs?.includes("new-arrivals"),
  };
}

const getCategoryProducts = () => {
  return {
    "New Arrivals": mockProducts
      .filter((p) => p.collection_slugs?.includes("new-arrivals"))
      .map(formatProduct),

    Baby: mockProducts
      .filter((p) => p.category_id?.includes("baby"))
      .map(formatProduct),

    Baba: mockProducts
      .filter((p) => p.category_id?.includes("boys"))
      .map(formatProduct),
  };
};

export default function TrendingSection() {
  const CATEGORIES = getCategoryProducts();
  const TAB_NAMES = Object.keys(CATEGORIES);

  const [activeTab, setActiveTab] = useState("Baba");

  const activeProducts = CATEGORIES[activeTab] || [];

  return (
    <section className="bg-store-bg py-8 px-4 md:px-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-['Playfair_Display'] font-bold tracking-wider text-store-text uppercase">
          Trending
        </h2>

        {/* Tabs */}
        <nav className="flex items-center gap-2 md:gap-3">
          {TAB_NAMES.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-xs md:text-sm uppercase tracking-wide transition-all ${
                  isActive
                    ? "border border-store-text text-store-text font-medium"
                    : "border border-transparent text-store-text-secondary hover:text-store-text"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Debug — remove once working */}
      {activeProducts.length === 0 && (
        <p className="text-sm text-red-500 mb-4">
          No products found for tab: {activeTab}. Check category_id values in mockData.
        </p>
      )}

      {/* Horizontal Product Slider */}
      <div className="no-scrollbar flex w-full flex-nowrap gap-3 overflow-x-auto pb-2">
        {activeProducts.map((product) => (
          <div
            key={product.id}
            className="shrink-0 w-[53%] sm:w-[36%] md:w-[23%]"
          >
            <ProductGridCard product={product} />
          </div>
        ))}
      </div>

      <style jsx>{`
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}