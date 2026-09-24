"use client";

import { useMemo, useState } from "react";

import ProductGridCard from "@/components/products/ProductGridCard";

function isNewArrival(product) {
  return product.collection_slugs?.includes("new-arrivals");
}

export default function TrendingSection({
  newArrivals = [],
  boysProducts = [],
  girlsProducts = [],
}) {
  const categories = useMemo(
    () => ({
      "New Arrivals": newArrivals,
      Boys: boysProducts,
      Girls: girlsProducts,
    }),
    [newArrivals, boysProducts, girlsProducts]
  );

  const tabNames = Object.keys(categories);

  const [activeTab, setActiveTab] = useState("New Arrivals");

  const activeProducts = categories[activeTab] ?? [];

  return (
    <section className="bg-store-bg px-4 py-8 md:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-['Playfair_Display'] text-lg font-bold uppercase tracking-wider text-store-text md:text-xl">
          Trending
        </h2>

        <nav
          className="flex items-center gap-2 md:gap-3"
          aria-label="Trending product categories"
        >
          {tabNames.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                aria-pressed={isActive}
                className={`px-3 py-1 text-xs uppercase tracking-wide transition-all md:text-sm ${
                  isActive
                    ? "border border-store-text font-medium text-store-text"
                    : "border border-transparent text-store-text-secondary hover:text-store-text"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </nav>
      </div>

      {activeProducts.length === 0 ? (
        <p className="py-4 text-sm text-store-text-secondary">
          No products available in this collection.
        </p>
      ) : (
        <div className="no-scrollbar flex w-full flex-nowrap gap-3 overflow-x-auto pb-2">
          {activeProducts.map((product) => {
            const gender =
              product.gender === "boys" ||
              product.gender === "girls"
                ? product.gender
                : null;

            if (!gender) {
              return null;
            }

            return (
              <div
                key={product.id}
                className="w-[53%] shrink-0 sm:w-[36%] md:w-[23%]"
              >
                <ProductGridCard
                  product={product}
                  gender={gender}
                  isBaba={gender === "boys"}
                  isNew={isNewArrival(product)}
                />
              </div>
            );
          })}
        </div>
      )}

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